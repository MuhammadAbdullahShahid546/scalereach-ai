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

        # -----------------------------------------------------------
        # DYNAMIC API ROUTE: POST /api/process-video (Strict User URL Download)
        # -----------------------------------------------------------
        if ($request.HttpMethod -eq "POST" -and ($decodedPath -eq "api/process-video" -or $decodedPath -eq "api/download")) {
            $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
            $body = $reader.ReadToEnd()
            $reader.Close()

            $parsed = $null
            try { $parsed = ConvertFrom-Json $body } catch {}
            $inputUrl = if ($parsed) { $parsed.url } else { $null }
            if ([string]::IsNullOrWhiteSpace($inputUrl) -and $parsed) { $inputUrl = $parsed.videoUrl }

            if ([string]::IsNullOrWhiteSpace($inputUrl)) {
                $response.StatusCode = 400
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes('{"success":false,"error":"Video URL is required in request body"}')
                $response.ContentType = "application/json; charset=utf-8"
                $response.ContentLength64 = $errBytes.Length
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
                $response.Close()
                continue
            }

            $style = if ($parsed -and $parsed.style) { $parsed.style.ToString().ToLower() } else { "classic" }
            Write-Host "Frontend se aya URL: $inputUrl"

            # 1. Clean old temporary files (Strict user requirement: delete old files)
            $tempDir = Join-Path $baseDir "temp_processing"
            if (Test-Path $tempDir) {
                Get-ChildItem -Path $tempDir -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
            } else {
                New-Item -ItemType Directory -Force -Path $tempDir | Out-Null
            }

            $jobId = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds().ToString()
            $fileName = "video_$jobId.mp4"
            Write-Host "Download ho rahi file ka naam: $fileName"

            $videoFile = Join-Path $tempDir $fileName
            $assFile = Join-Path $tempDir "caption_$jobId.ass"
            $clipsDir = Join-Path $baseDir "clips"
            if (!(Test-Path $clipsDir)) { New-Item -ItemType Directory -Force -Path $clipsDir | Out-Null }
            $outputClip = Join-Path $clipsDir "clip_$jobId.mp4"
            $ytdlp = Join-Path $baseDir "yt-dlp.exe"
            $ffmpeg = Join-Path $baseDir "ffmpeg.exe"

            # 2. Download ONLY the exact requested URL
            & $ytdlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" --no-playlist -o $videoFile $inputUrl

            if (Test-Path $videoFile) {
                # 3. Generate CapCut Word-by-Word Animated .ass Subtitles
                $hiCol = if ($style -eq "toxic_green") { "&H0014FF39&" } elseif ($style -eq "cyan_slide") { "&H00FFFF00&" } elseif ($style -eq "italic_red") { "&H001E1EFF&" } else { "&H0000FFFF&" }
                $fontName = if ($style -eq "toxic_green" -or $style -eq "italic_red") { "Impact" } else { "Arial Black" }
                $borderSt = if ($style -eq "classic") { "3" } else { "1" }
                $backCol = if ($style -eq "classic") { "&H80000000&" } else { "&H00000000&" }

                $assContent = @"
[Script Info]
Title: ScaleReach CapCut Animated Captions
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: CapCutStyle,$fontName,80,&H00FFFFFF&,$hiCol,&H00000000&,$backCol,-1,0,0,0,100,100,1,0,$borderSt,6,3,2,40,40,420,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:00.00,0:00:00.60,CapCutStyle,,0,0,0,,{\c$hiCol\fscx130\fscy130\t(0,90,\fscx100\fscy100)}THIS{\r\c&H00FFFFFF&} IS VIRAL
Dialogue: 0,0:00:00.60,0:00:01.20,CapCutStyle,,0,0,0,,{\c&H00FFFFFF&}THIS {\c$hiCol\fscx130\fscy130\t(0,90,\fscx100\fscy100)}IS{\r\c&H00FFFFFF&} VIRAL
Dialogue: 0,0:00:01.20,0:00:02.00,CapCutStyle,,0,0,0,,{\c&H00FFFFFF&}THIS IS {\c$hiCol\fscx130\fscy130\t(0,90,\fscx100\fscy100)}VIRAL{\r}
Dialogue: 0,0:00:02.00,0:00:02.70,CapCutStyle,,0,0,0,,{\c$hiCol\fscx130\fscy130\t(0,90,\fscx100\fscy100)}WATCH{\r\c&H00FFFFFF&} THIS NOW
Dialogue: 0,0:00:02.70,0:00:03.40,CapCutStyle,,0,0,0,,{\c&H00FFFFFF&}WATCH {\c$hiCol\fscx130\fscy130\t(0,90,\fscx100\fscy100)}THIS{\r\c&H00FFFFFF&} NOW
Dialogue: 0,0:00:03.40,0:00:04.50,CapCutStyle,,0,0,0,,{\c&H00FFFFFF&}WATCH THIS {\c$hiCol\fscx130\fscy130\t(0,90,\fscx100\fscy100)}NOW{\r}
"@
                [System.IO.File]::WriteAllText($assFile, $assContent, [System.Text.Encoding]::UTF8)

                # 4. Cut clip with ffmpeg and burn CapCut .ass subtitles at CRF 18
                $escAss = $assFile.Replace("\", "/").Replace(":", "\:")
                & $ffmpeg -y -ss 0 -to 45 -i $videoFile -vf "ass='$escAss'" -c:v libx264 -crf 18 -preset fast -c:a aac -b:a 320k $outputClip

                # 5. Strict cleanup of raw temp video
                Remove-Item -Path $videoFile -Force -ErrorAction SilentlyContinue

                $jsonResp = @{
                    success = $true
                    jobId = $jobId
                    clipUrl = "clips/clip_$jobId.mp4"
                    downloadUrl = "clips/clip_$jobId.mp4"
                    title = "AI Dynamic Reel ($jobId)"
                    duration = 45
                } | ConvertTo-Json

                $respBytes = [System.Text.Encoding]::UTF8.GetBytes($jsonResp)
                $response.StatusCode = 200
                $response.ContentType = "application/json; charset=utf-8"
                $response.ContentLength64 = $respBytes.Length
                $response.OutputStream.Write($respBytes, 0, $respBytes.Length)
                $response.Close()
                continue
            } else {
                $response.StatusCode = 500
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes('{"success":false,"error":"Download failed for the requested URL"}')
                $response.ContentType = "application/json; charset=utf-8"
                $response.ContentLength64 = $errBytes.Length
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
                $response.Close()
                continue
            }
        }

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
