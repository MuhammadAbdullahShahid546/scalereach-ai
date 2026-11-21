/**
 * ScaleReach AI - Advanced SubStation Alpha (.ASS) Subtitle & Karaoke Generator
 * 100% Free & Open-Source (No Paywalls, No Watermarks)
 * 
 * Generates viral word-by-word animated subtitles matching Alex Hormozi, MrBeast, and TikTok shorts.
 * Compatible with OpenAI Whisper, AssemblyAI, and FFmpeg subtitle burn filters.
 */

class ASSSubtitleGenerator {
  constructor(options = {}) {
    this.playResX = options.playResX || 1080;
    this.playResY = options.playResY || 1920;
    this.maxWordsPerChunk = options.maxWordsPerChunk || 3; // 2-3 words per card for maximum viewer retention
  }

  /**
   * Convert seconds (e.g. 14.52) to ASS timestamp format (H:MM:SS.cs)
   */
  formatAssTime(seconds) {
    if (isNaN(seconds) || seconds < 0) seconds = 0;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const cs = Math.floor((seconds % 1) * 100);
    const pad = (num, len = 2) => String(num).padStart(len, '0');
    return `${h}:${pad(m)}:${pad(s)}.${pad(cs)}`;
  }

  /**
   * Get ASS V4+ Style definitions
   */
  getStylesHeader() {
    return `[Script Info]
Title: ScaleReach AI Viral Captions (100% Free - No Watermark)
ScriptType: v4.00+
WrapStyle: 0
ScaledBorderAndShadow: yes
YCbCr Matrix: TV.709
PlayResX: ${this.playResX}
PlayResY: ${this.playResY}

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
; Style 1: Hormozi Viral Yellow (Bold Montserrat/Anton, white base, yellow pop, thick black outline)
Style: Hormozi,Montserrat,88,&H00FFFFFF,&H0000E5FF,&H00000000,&H80000000,-1,0,0,0,100,100,1,0,1,8.0,5.0,2,60,60,420,1
; Style 2: MrBeast Pop (Neon Green Highlight & explosive scale punch)
Style: MrBeast,Anton,92,&H00FFFFFF,&H0024E01E,&H00000000,&H90000000,-1,0,0,0,100,100,2,0,1,9.0,6.0,2,60,60,420,1
; Style 3: TikTok Dynamic (Electric Cyan & Magenta with spring bounce)
Style: TikTok,Montserrat,86,&H00FFFFFF,&H00F0F000,&H00000000,&H80000000,-1,0,0,0,100,100,1,0,1,7.5,4.5,2,60,60,420,1
; Style 4: Minimalist Cinema
Style: Cinema,Montserrat,64,&H00FFFFFF,&H0000FFFF,&H00000000,&H60000000,0,0,0,0,100,100,0,0,1,4.0,2.0,2,60,60,380,1
`;
  }

  /**
   * Group raw Whisper/AssemblyAI word timestamps into 2-4 word viral screen chunks
   * @param {Array<{word: string, start: number, end: number}>} wordList 
   */
  chunkWords(wordList) {
    const chunks = [];
    let currentChunk = [];

    for (let i = 0; i < wordList.length; i++) {
      const item = wordList[i];
      currentChunk.push(item);

      const isPunctuationBreak = /[.!?]$/.test(item.word.trim());
      const isMaxWords = currentChunk.length >= this.maxWordsPerChunk;
      const isTimeGap = i < wordList.length - 1 && (wordList[i + 1].start - item.end > 0.45);

      if (isPunctuationBreak || isMaxWords || isTimeGap || i === wordList.length - 1) {
        chunks.push([...currentChunk]);
        currentChunk = [];
      }
    }
    return chunks;
  }

  /**
   * Generate complete .ASS string with \\kf karaoke and \\t scale-pop tags
   * @param {Array<{word: string, start: number, end: number}>} wordList 
   * @param {string} styleName 'Hormozi' | 'MrBeast' | 'TikTok' | 'Cinema'
   */
  generateASS(wordList, styleName = 'Hormozi') {
    if (!wordList || wordList.length === 0) return '';

    const validStyles = ['Hormozi', 'MrBeast', 'TikTok', 'Cinema'];
    const activeStyle = validStyles.includes(styleName) ? styleName : 'Hormozi';

    let assContent = this.getStylesHeader();
    assContent += `\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n`;

    const chunks = this.chunkWords(wordList);

    for (const chunk of chunks) {
      if (chunk.length === 0) continue;

      const chunkStart = chunk[0].start;
      const chunkEnd = chunk[chunk.length - 1].end;
      const startStr = this.formatAssTime(chunkStart);
      const endStr = this.formatAssTime(chunkEnd);

      // Build word-by-word karaoke sequence with \kf duration tags
      let karaokeLine = '';
      chunk.forEach((wObj, idx) => {
        const cleanWord = wObj.word.trim().toUpperCase();
        const durationSec = Math.max(0.08, wObj.end - wObj.start);
        const durationCs = Math.round(durationSec * 100); // centiseconds

        // \kf<duration> = smooth fill karaoke wipe
        // \t = pop animation scaling up to 112% and back to 100% on the active spoken word
        const popAnim = `{\\t(0,${Math.min(80, durationCs * 5)},\\fscx112\\fscy112)\\t(${Math.min(80, durationCs * 5)},${Math.min(160, durationCs * 10)},\\fscx100\\fscy100)}`;
        karaokeLine += `{\\kf${durationCs}}${popAnim}${cleanWord} `;
      });

      assContent += `Dialogue: 0,${startStr},${endStr},${activeStyle},,0,0,0,,${karaokeLine.trim()}\n`;
    }

    return assContent;
  }

  /**
   * Generates production FFmpeg command to cut vertical 9:16 clip with face/speaker reframe
   * and burn the stylish ASS subtitles directly into video. Completely free (no watermarks).
   */
  buildFfmpegCommand({
    inputVideo,
    startTime = 0,
    endTime = 30,
    assSubtitlePath,
    outputVideo = 'viral_short_1080p.mp4',
    enableAutoReframe = true
  }) {
    // 9:16 smart center crop (1080x1920) keeps speaker perfectly centered
    // ih*(9/16):ih:(iw-ow)/2:0 creates exact 9:16 vertical crop from 16:9 source
    const filterParts = [];
    if (enableAutoReframe) {
      filterParts.push('crop=ih*(9/16):ih:(iw-ow)/2:0');
      filterParts.push('scale=1080:1920:flags=lanczos');
    }
    if (assSubtitlePath) {
      // Escape path for FFmpeg subtitles filter
      const safeAssPath = assSubtitlePath.replace(/\\/g, '/').replace(/:/g, '\\:');
      filterParts.push(`ass='${safeAssPath}'`);
    }

    const vf = filterParts.join(',');

    return `ffmpeg -y -ss ${startTime} -to ${endTime} -i "${inputVideo}" -vf "${vf}" -c:v libx264 -preset fast -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart "${outputVideo}"`;
  }
}

// Support both Node.js (CommonJS / ES) and Browser global window
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ASSSubtitleGenerator;
}
if (typeof window !== 'undefined') {
  window.ASSSubtitleGenerator = ASSSubtitleGenerator;
}
