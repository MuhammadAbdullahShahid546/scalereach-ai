$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "ScaleReach AI Server running at http://localhost:$port/"
$baseDir = $PSScriptRoot

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $path = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($path)) { $path = "index.html" }
        $filePath = Join-Path $baseDir $path

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".mp4"  { "video/mp4" }
                ".webm" { "video/webm" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".svg"  { "image/svg+xml" }
                default { "application/octet-stream" }
            }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $totalLen = $bytes.Length
            $rangeHeader = $request.Headers["Range"]

            $response.ContentType = $mime
            $response.AddHeader("Accept-Ranges", "bytes")
            $response.AddHeader("Access-Control-Allow-Origin", "*")

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
            $response.ContentLength64 = $msg.Length
            if ($request.HttpMethod -ne "HEAD") {
                $response.OutputStream.Write($msg, 0, $msg.Length)
            }
        }
        $response.Close()
    } catch {
        # ignore client aborted connections
    }
}
