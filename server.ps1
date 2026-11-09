$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "[Z++ SECURITY ACTIVE] ScaleReach AI Server running at http://localhost:$port/"
$baseDir = [System.IO.Path]::GetFullPath($PSScriptRoot)

# Strict whitelist of permitted safe web file extensions
$allowedExtensions = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".mp4"  = "video/mp4"
    ".webm" = "video/webm"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

# Blocked sensitive files & directories pattern
$blockedPatterns = @(".git", ".vscode", ".env", "server.ps1", ".gitignore", "Thumbs.db", "Desktop.ini")

while ($listener.IsListening) {
    $context = $null
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # -----------------------------------------------------------
        # Z++ SECURITY HEADERS (Injected on every HTTP response)
        # -----------------------------------------------------------
        $response.AddHeader("X-Content-Type-Options", "nosniff")
        $response.AddHeader("X-Frame-Options", "SAMEORIGIN")
        $response.AddHeader("X-XSS-Protection", "1; mode=block")
        $response.AddHeader("Referrer-Policy", "strict-origin-when-cross-origin")
        $response.AddHeader("Permissions-Policy", "geolocation=(), camera=(), microphone=(), payment=()")
        $response.AddHeader("Accept-Ranges", "bytes")
        $response.AddHeader("Access-Control-Allow-Origin", "*")

        $rawPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($rawPath)) { $rawPath = "index.html" }

        # URL decode path using built-in System.Uri
        $decodedPath = try { [System.Uri]::UnescapeDataString($rawPath) } catch { $rawPath }

        # 1. Path Traversal & Dot-Dot Security Check
        if ($decodedPath.Contains("..") -or $decodedPath.Contains(":") -or $decodedPath.StartsWith("/") -or $decodedPath.StartsWith("\")) {
            $response.StatusCode = 403
            $msg = [System.Text.Encoding]::UTF8.GetBytes("403 Forbidden: Malicious Path Traversal Blocked by Z++ Security")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
            $response.Close()
            continue
        }

        # 2. Block Hidden Files & Sensitive Files
        $isBlocked = $false
        foreach ($pattern in $blockedPatterns) {
            if ($decodedPath.ToLower().Contains($pattern.ToLower())) {
                $isBlocked = $true
                break
            }
        }
        if ($isBlocked) {
            $response.StatusCode = 403
            $msg = [System.Text.Encoding]::UTF8.GetBytes("403 Forbidden: Sensitive File Access Blocked")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
            $response.Close()
            continue
        }

        $combinedPath = Join-Path $baseDir $decodedPath
        $fullPath = [System.IO.Path]::GetFullPath($combinedPath)

        # 3. Canonical Root Boundary Jail Check
        if (!$fullPath.StartsWith($baseDir, [System.StringComparison]::OrdinalIgnoreCase)) {
            $response.StatusCode = 403
            $msg = [System.Text.Encoding]::UTF8.GetBytes("403 Forbidden: Directory Boundary Violation Blocked")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
            $response.Close()
            continue
        }

        # 4. Check if file exists and is a leaf (not directory)
        if (Test-Path $fullPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()

            # 5. Extension Whitelist Enforcement (Anti-Executable / Anti-Virus Shield)
            if (!$allowedExtensions.ContainsKey($ext)) {
                $response.StatusCode = 403
                $msg = [System.Text.Encoding]::UTF8.GetBytes("403 Forbidden: File type not permitted")
                $response.ContentType = "text/plain; charset=utf-8"
                $response.ContentLength64 = $msg.Length
                $response.OutputStream.Write($msg, 0, $msg.Length)
                $response.Close()
                continue
            }

            $mime = $allowedExtensions[$ext]
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            $totalLen = $bytes.Length
            $rangeHeader = $request.Headers["Range"]

            $response.ContentType = $mime

            # Range request handling for smooth video streaming
            if ($rangeHeader -and ($rangeHeader -match "bytes=(\d+)-(\d*)")) {
                $start = [int64]$matches[1]
                $end = if ($matches[2]) { [int64]$matches[2] } else { $totalLen - 1 }
                if ($end -ge $totalLen) { $end = $totalLen - 1 }
                if ($start -gt $end) { $start = $end }
                $length = $end - $start + 1

                $response.StatusCode = 206
                $response.ContentLength64 = $length
                $response.AddHeader("Content-Range", "bytes $start-$end/$totalLen")

                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($bytes, [int]$start, [int]$length)
                }
            } else {
                $response.StatusCode = 200
                $response.ContentLength64 = $totalLen
                if ($request.HttpMethod -ne "HEAD") {
                    $response.OutputStream.Write($bytes, 0, [int]$totalLen)
                }
            }
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $msg.Length
            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($msg, 0, $msg.Length)
            }
        }
        $response.Close()
    } catch {
        if ($context -and $context.Response) {
            try { $context.Response.Close() } catch {}
        }
    }
}
