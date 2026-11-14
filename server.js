/**
 * ScaleReach AI - Pure Dynamic Video Downloader (Clean & Direct)
 * 
 * Focused 100% on reliable video downloading without heavy encoding or complex pipelines.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(__dirname));

const CLIPS_DIR = path.join(__dirname, 'clips');
if (!fs.existsSync(CLIPS_DIR)) fs.mkdirSync(CLIPS_DIR, { recursive: true });

const ytdlpBin = fs.existsSync(path.join(__dirname, 'yt-dlp.exe'))
  ? `"${path.join(__dirname, 'yt-dlp.exe')}"`
  : 'yt-dlp';

/**
 * Clean & direct video download function using yt-dlp
 */
function downloadVideo(targetUrl, outputPath) {
  const fileName = path.basename(outputPath);
  console.log("Download ho rahi file ka naam:", fileName);

  // Using --merge-output-format mp4 without restrictive -f filters (prevents format unavailable errors)
  const cmd = `${ytdlpBin} --no-playlist --merge-output-format mp4 -o "${outputPath}" "${targetUrl}"`;
  execSync(cmd, { stdio: 'inherit' });

  if (!fs.existsSync(outputPath)) {
    throw new Error(`Download failed: File ${fileName} not created.`);
  }
  return outputPath;
}

/**
 * POST /api/process-video (Direct Video Download Endpoint)
 */
app.post('/api/process-video', (req, res) => {
  console.log("Frontend se aya URL:", req.body.url);

  const incomingUrl = req.body.url || req.body.videoUrl;
  if (!incomingUrl || typeof incomingUrl !== 'string' || !incomingUrl.trim()) {
    return res.status(400).json({ success: false, error: 'Valid URL is required.' });
  }

  const targetUrl = incomingUrl.trim();
  const jobId = `${Date.now()}`;
  const fileName = `clip_${jobId}.mp4`;
  const outputFilePath = path.join(CLIPS_DIR, fileName);

  try {
    downloadVideo(targetUrl, outputFilePath);

    const relativeUrl = `clips/${fileName}`;
    console.log(`[SUCCESS] Video downloaded successfully: ${relativeUrl}`);

    res.json({
      success: true,
      jobId,
      clipUrl: relativeUrl,
      downloadUrl: relativeUrl,
      title: `Downloaded Video (${jobId})`,
      directPath: outputFilePath
    });
  } catch (err) {
    console.error('[ERROR] Download failed:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  ScaleReach Video Downloader running on port ${PORT}`);
  console.log(`======================================================\n`);
});
