/**
 * ScaleReach AI - Full Application Logic
 * Home Dashboard (AJJEZ Workspace) -> Configure (8 Crazy Captions) -> Studio & Free Export
 */

document.addEventListener('DOMContentLoaded', () => {
  const app = new ScaleReachFullApp();
  app.init();
});

class ScaleReachFullApp {
  constructor() {
    // View Sections
    this.homeDashboardView = document.getElementById('homeDashboardView');
    this.configureView = document.getElementById('configureView');
    this.studioView = document.getElementById('studioView');

    // Breadcrumbs & Nav
    this.crumbDashboard = document.getElementById('crumbDashboard');
    this.crumbCurrent = document.getElementById('crumbCurrent');
    this.sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
    this.appSidebar = document.getElementById('appSidebar');

    // Sidebar Links
    this.sideNavHome = document.getElementById('sideNavHome');
    this.sideNavAllClips = document.getElementById('sideNavAllClips');
    this.sideNavFavorites = document.getElementById('sideNavFavorites');
    this.sideNavTemplates = document.getElementById('sideNavTemplates');
    this.sideNavScheduler = document.getElementById('sideNavScheduler');

    // Home Screen 1 Elements
    this.mainVideoUrlInput = document.getElementById('mainVideoUrlInput');
    this.homeGetClipsBtn = document.getElementById('homeGetClipsBtn');
    this.sampleDropdownTrigger = document.getElementById('sampleDropdownTrigger');
    this.sampleMenuPopover = document.getElementById('sampleMenuPopover');
    this.sampleOptions = document.querySelectorAll('.sample-option-item');
    this.demoVideoCards = document.querySelectorAll('.demo-video-card');
    this.homeFileInput = document.getElementById('homeFileInput');
    this.homeUploadFileBtn = document.getElementById('homeUploadFileBtn');

    // YouTube Connect Banner & Modal
    this.connectYoutubeBtn = document.getElementById('connectYoutubeBtn');
    this.ytConnectModal = document.getElementById('ytConnectModal');
    this.closeYtModalBtn = document.getElementById('closeYtModalBtn');
    this.confirmYtConnectBtn = document.getElementById('confirmYtConnectBtn');

    // Configure Screen 2 Elements
    this.backToHomeBtn = document.getElementById('backToHomeBtn');
    this.youtubeUrlInput = document.getElementById('youtubeUrlInput');
    this.videoThumbImg = document.getElementById('videoThumbImg');
    this.videoMetaTitle = document.getElementById('videoMetaTitle');
    this.videoMetaAuthor = document.getElementById('videoMetaAuthor');
    this.videoDurationBadge = document.getElementById('videoDurationBadge');
    this.removeVideoBtn = document.getElementById('removeVideoBtn');
    this.sampleChips = document.querySelectorAll('.chip-vid');
    this.localFileInput = document.getElementById('localFileInput');
    this.localBrowseBtn = document.getElementById('localBrowseBtn');

    // Clip Type Dropdown
    this.clipTypeDropdown = document.getElementById('clipTypeDropdown');
    this.clipTypeMenu = document.getElementById('clipTypeMenu');
    this.selectedClipTypeTitle = document.getElementById('selectedClipTypeTitle');
    this.selectedClipTypeDesc = document.getElementById('selectedClipTypeDesc');
    this.segBtns = document.querySelectorAll('.seg-btn');

    // The 8 Crazy Caption Styles
    this.captionsToggle = document.getElementById('captionsToggle');
    this.captionCardItems = document.querySelectorAll('.caption-card-item');
    this.carouselPrevBtn = document.getElementById('carouselPrevBtn');
    this.carouselNextBtn = document.getElementById('carouselNextBtn');
    this.autoHookToggle = document.getElementById('autoHookToggle');
    this.hookSublineBox = document.getElementById('hookSublineBox');
    this.hookTextInput = document.getElementById('hookTextInput');
    this.getClipsBtn = document.getElementById('getClipsBtn');

    // Studio Screen 3 Elements
    this.backToConfigureBtn = document.getElementById('backToConfigureBtn');
    this.sourceVideo = document.getElementById('sourceVideo');
    this.youtubeIframe = document.getElementById('youtubeIframe');
    this.videoControlsOverlay = document.getElementById('videoControlsOverlay');
    this.playPauseBtn = document.getElementById('playPauseBtn');
    this.currentTimeDisplay = document.getElementById('currentTimeDisplay');
    this.muteBtn = document.getElementById('muteBtn');
    this.studioVideoTitle = document.getElementById('studioVideoTitle');
    this.studioChannelPill = document.getElementById('studioChannelPill');
    this.clipSelectorPills = document.querySelectorAll('.clip-pill');
    this.activeStyleBadge = document.getElementById('activeStyleBadge');

    // Waveform & Trimmer
    this.waveformCanvas = document.getElementById('waveformCanvas');
    this.waveformContainer = document.getElementById('waveformContainer');
    this.trimmerZone = document.getElementById('trimmerZone');
    this.trimmerLeft = document.getElementById('trimmerLeft');
    this.trimmerRight = document.getElementById('trimmerRight');
    this.leftTimeTag = document.getElementById('leftTimeTag');
    this.rightTimeTag = document.getElementById('rightTimeTag');
    this.playheadLine = document.getElementById('playheadLine');
    this.startInput = document.getElementById('startInput');
    this.endInput = document.getElementById('endInput');
    this.clipDurationDisplay = document.getElementById('clipDurationDisplay');
    this.presetBtns = document.querySelectorAll('.preset-btn');
    this.zoneBadge = document.getElementById('zoneBadge');

    // AI Suggested Clips & Live Mobile Indicator
    this.aiSuggestedList = document.getElementById('aiSuggestedList');
    this.aiStatusPill = document.getElementById('aiStatusPill');
    this.suggestClipRows = document.querySelectorAll('.suggest-clip-row');
    this.phoneLiveIndicator = document.getElementById('phoneLiveIndicator');
    this.phoneLiveTagText = document.getElementById('phoneLiveTagText');
    this.liveSyncStatus = document.getElementById('liveSyncStatus');
    this.syncStatusText = document.getElementById('syncStatusText');

    // 9:16 Canvas & Controls
    this.cropCanvas = document.getElementById('cropCanvas');
    this.ctxCrop = this.cropCanvas.getContext('2d');
    this.phoneYtWrapper = document.getElementById('phoneYtWrapper');
    this.phoneYoutubeIframe = document.getElementById('phoneYoutubeIframe');
    this.phoneCaptionsOverlayCanvas = document.getElementById('phoneCaptionsOverlayCanvas');
    this.ctxPhoneOverlay = this.phoneCaptionsOverlayCanvas ? this.phoneCaptionsOverlayCanvas.getContext('2d') : null;
    const storedYtId = (typeof localStorage !== 'undefined') ? localStorage.getItem('scalereach_yt_id') : null;
    this.currentYouTubeId = storedYtId || '_c2e1Ncl3Sc';
    this.activeSourceType = 'youtube';
    this.currentVideoTitle = 'Beat Professional Athlete, Win $100,000';
    this.currentVideoAuthor = 'MrBeast • YouTube';
    this.layoutBtns = document.querySelectorAll('.layout-btn');
    this.panSlider = document.getElementById('panSlider');
    this.panValDisplay = document.getElementById('panValDisplay');
    this.customCaptionInput = document.getElementById('customCaptionInput');
    this.captionAuthorTag = document.getElementById('captionAuthorTag');
    this.captionTitleTag = document.getElementById('captionTitleTag');

    // Export Elements
    this.exportShortBtn = document.getElementById('exportShortBtn');
    this.exportFromStudioBtn = document.getElementById('exportFromStudioBtn');
    this.exportProgressBox = document.getElementById('exportProgressBox');
    this.exportFill = document.getElementById('exportFill');
    this.exportPercentText = document.getElementById('exportPercentText');
    this.exportStatusText = document.getElementById('exportStatusText');

    // SEO Copy Elements
    this.seoTitleDisplay = document.getElementById('seoTitleDisplay');
    this.copyTitleOnlyBtn = document.getElementById('copyTitleOnlyBtn');
    this.copyAllTagsBtn = document.getElementById('copyAllTagsBtn');
    this.clipSelectorPillsContainer = document.getElementById('clipSelectorPills');
    this.hashtagCloud = document.getElementById('hashtagCloud');

    // AI Scanner Modal Elements
    this.aiScanModal = document.getElementById('aiScanModal');
    this.scanVideoTitleText = document.getElementById('scanVideoTitleText');
    this.scanProgressBar = document.getElementById('scanProgressBar');
    this.scanPercentText = document.getElementById('scanPercentText');
    this.scanStep1 = document.getElementById('scanStep1');
    this.scanStep2 = document.getElementById('scanStep2');
    this.scanStep3 = document.getElementById('scanStep3');
    this.stepCheck1 = document.getElementById('stepCheck1');
    this.stepCheck2 = document.getElementById('stepCheck2');
    this.stepCheck3 = document.getElementById('stepCheck3');

    // Video Tracking
    this.currentVideoTitle = 'Communication & Psychology Deep-Dive Podcast';
    this.currentVideoAuthor = 'The Mindset Studio • 02:23';
    this.currentVideoUrl = 'podcast.mp4';

    // Toast
    this.toast = document.getElementById('toast');

    // State Variables
    this.selectedStyleId = 'classic';
    this.selectedStyleName = 'Classic';
    this.activeLayout = 'fit';
    this.activePan = 0.5;
    this.clipStart = 35;
    this.clipEnd = 85;
    this.videoDuration = 1348;
    this.isRecording = false;
    this.isDraggingLeft = false;
    this.isDraggingRight = false;
    this.isDraggingZone = false;
    this.dragStartX = 0;
    this.dragStartClipStart = 35;
    this.dragStartClipEnd = 85;
    this.activeClipIndex = 0;
    this.isPlaying = true;
    this.isLoopEnabled = true;
    this.isCustomAdjusted = false;
    this.gameplayFrame = 0;

    // CapCut Special Effects & 4K HDR State & Elements (Safely checked)
    this.capcutEffectsCard = document.getElementById('capcutEffectsCard');
    this.capcutEffectMasterToggle = document.getElementById('capcutEffectMasterToggle');
    this.capcutStatusBadge = document.getElementById('capcutStatusBadge');
    this.subnavEffectsBtn = document.getElementById('subnavEffectsBtn');
    this.subnavCaptionsBtn = document.getElementById('subnavCaptionsBtn');
    this.capcutFxItems = document.querySelectorAll('.capcut-fx-item');
    this.effectCurrentName = document.getElementById('effectCurrentName');
    this.reset4kEffectBtn = document.getElementById('reset4kEffectBtn');

    this.presetCapcutPunchy = document.getElementById('presetCapcutPunchy');
    this.presetCapcutNatural = document.getElementById('presetCapcutNatural');
    this.presetCapcutDreamy = document.getElementById('presetCapcutDreamy');
    this.presetCapcutOriginal = document.getElementById('presetCapcutOriginal');
    this.fxPresetPills = document.querySelectorAll('.fx-preset-pill');

    this.fxGlowSlider = document.getElementById('fxGlowSlider');
    this.fxGlowNum = document.getElementById('fxGlowNum');
    this.fxBlurSlider = document.getElementById('fxBlurSlider');
    this.fxBlurNum = document.getElementById('fxBlurNum');
    this.fxSharpenSlider = document.getElementById('fxSharpenSlider');
    this.fxSharpenNum = document.getElementById('fxSharpenNum');
    this.fxRangeSlider = document.getElementById('fxRangeSlider');
    this.fxRangeNum = document.getElementById('fxRangeNum');
    this.fxSizeSlider = document.getElementById('fxSizeSlider');
    this.fxSizeNum = document.getElementById('fxSizeNum');
    this.fxSoftLightSlider = document.getElementById('fxSoftLightSlider');
    this.fxSoftLightNum = document.getElementById('fxSoftLightNum');
    this.fxFiltersSlider = document.getElementById('fxFiltersSlider');
    this.fxFiltersNum = document.getElementById('fxFiltersNum');
    this.fxLiveDescription = document.getElementById('fxLiveDescription');

    // Default CapCut 4K HDR parameters
    this.capcutEffectEnabled = false;
    this.currentActiveEffect = 'none';
    this.fxGlow = 30;
    this.fxBlur = 15;
    this.fxSharpen = 70;
    this.fxRange = 70;
    this.fxSize = 50;
    this.fxSoftLight = 33;
    this.fxFilters = 100;

    // Viral Captions Studio (Screen 3)
    this.viralCaptionsStudioCard = document.getElementById('viralCaptionsStudioCard');
    this.studioCaptionsToggle = document.getElementById('studioCaptionsToggle');
    this.studioActiveCaptionBadge = document.getElementById('studioActiveCaptionBadge');
    this.studioCaptionTextInput = document.getElementById('studioCaptionTextInput');
    this.clearCaptionTextBtn = document.getElementById('clearCaptionTextBtn');
    this.applyCaptionBtn = document.getElementById('applyCaptionBtn');
    this.hookPillBtns = document.querySelectorAll('.hook-pill-btn');
    this.studioCaptionItems = document.querySelectorAll('.studio-caption-item');
    this.captionPosBtns = document.querySelectorAll('#captionPositionBtnGroup .adj-btn');
    this.captionSizeBtns = document.querySelectorAll('#captionSizeBtnGroup .adj-btn');
    this.studioCaptionsStatusText = document.getElementById('studioCaptionsStatusText');

    this.captionPosition = 'bottom';
    this.captionFontSize = 40;
    this.captionsEnabled = true;
    this.userAppliedCaption = null;
    this.pendingCaptionText = '';

    // Sample texts corresponding to the 12 creator styles
    this.styleSampleTexts = {
      classic: 'TO GET STARTED',
      mrbeast_pop: 'CAN HE SAVE THIS? 😱',
      cyan_slide: 'CYBERPUNK GLOW ⚡',
      toxic_green: 'KARAOKE VELOCITY 🟢',
      ali_abdaal: 'ALI ABDAAL MINIMAL 🧠',
      fire_gradient: 'DON\'T BLINK NOW 🔥',
      comic_boom: '3D COMIC IMPACT 💥',
      netflix_sub: 'Cinema Subtitle Clean 🤍',
      violet: 'SUNSET ROYAL GLOW 👑',
      italic_red: '100 MPH ROCKET KICK ⚡',
      blue_glow: 'to get STARTED 🌊',
      cream_blue: 'MODERN LUXURY PRO 🖤'
    };

    // Database of Presets & Knowledge Base for AI Video Analysis (8 Viral Reels Each)
    this.videoAnalysisDatabase = [
      {
        id: 'real_podcast_interview',
        matchKeywords: ['podcast', 'interview', 'psychology', 'mindset', 'talk', 'conversation', 'body language'],
        title: 'Communication & Psychology Deep-Dive Podcast',
        author: 'The Mindset Studio • 02:23',
        duration: 143,
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: The Hidden Body Language Sign Nobody Notices',
            hookText: '⚡ Eye Contact & Micro-Expression Breakdown',
            viralityScore: '99% Viral',
            start: 0,
            end: 15,
            hookDesc: 'Speaker explains the subconscious reason people look away during serious conversations.',
            seoTitle: 'Notice what happens when she looks away? Psychology expert explains 😳🧠',
            caption: 'BODY LANGUAGE SECRET',
            tags: ['#psychology', '#podcast', '#bodylanguage', '#communication', '#viral'],
            badgeTags: ['🔥 99% Viral Hook', '🧠 Psychology', '👁️ Micro-Expressions']
          },
          {
            id: 2,
            title: '💡 Reel 2: The 3-Second Head Tilt Trick For Active Listening',
            hookText: '💡 How Small Posture Adjustments Win Any Negotiation',
            viralityScore: '97% Viral',
            start: 18,
            end: 33,
            hookDesc: 'Simple behavioral hack that makes anyone feel instantly understood and open up.',
            seoTitle: 'This 3-second psychological trick works on literally everyone 🤯✨',
            caption: 'TRY THIS TODAY',
            tags: ['#mindset', '#communicationhacks', '#negotiation', '#lifeadvice', '#fyp'],
            badgeTags: ['😂 97% Retention', '💡 Life Hack', '🤝 Instant Rapport']
          },
          {
            id: 3,
            title: '⚡ Reel 3: The Fatal Mistake In Difficult Conversations',
            hookText: '🛑 Why Defensiveness Destroys 90% Of Relationships',
            viralityScore: '96% Viral',
            start: 36,
            end: 51,
            hookDesc: 'Host breaks down why reacting immediately escalates conflict and how to pause effectively.',
            seoTitle: 'If you argue like this, stop immediately ⚠️ Here is what to do instead',
            caption: 'NEVER SAY THIS',
            tags: ['#relationships', '#conflictresolution', '#mentalhealth', '#couplesadvice', '#shorts'],
            badgeTags: ['⚡ 96% Relationship Hook', '🛑 Warning Sign', '📈 High Engagement']
          },
          {
            id: 4,
            title: '🤯 Reel 4: How To Disagree Without Being Disrespectful',
            hookText: '🎯 The De-escalation Protocol In 15 Seconds',
            viralityScore: '95% Viral',
            start: 54,
            end: 69,
            hookDesc: 'Step-by-step psychological framework for sharing opposing viewpoints with zero drama.',
            seoTitle: 'The most mature way to handle someone who disagrees with you 👏💯',
            caption: 'CALM COMMUNICATION',
            tags: ['#stoicism', '#emotionalintelligence', '#communication', '#growth', '#reels'],
            badgeTags: ['🤯 95% High Value', '🛡️ De-Escalate', '💬 High Comments']
          },
          {
            id: 5,
            title: '💡 Reel 5: The Difference Between Hearing And Truly Listening',
            hookText: '👂 The Emotional Validation Technique',
            viralityScore: '93% Viral',
            start: 72,
            end: 87,
            hookDesc: 'Insightful discussion on reflective listening and why people crave feeling heard over solutions.',
            seoTitle: 'Stop giving solutions and start doing this one thing instead 🧠💡',
            caption: 'LISTEN CAREFULLY',
            tags: ['#activelearning', '#empathy', '#lifelessons', '#talkshow', '#deepconversations'],
            badgeTags: ['💡 93% Emotional Hook', '👂 Empathy', '🚀 High Saves']
          },
          {
            id: 6,
            title: '🏆 Reel 6: Unspoken Rules Of Long-Term Trust',
            hookText: '🔒 The Foundation That Keeps Strong Bonds Intact',
            viralityScore: '91% Viral',
            start: 90,
            end: 105,
            hookDesc: 'Closing philosophy on consistency, micro-actions, and emotional security in modern life.',
            seoTitle: 'This is the only real foundation of trust that actually lasts 🥹❤️',
            caption: 'THE CORE TRUTH',
            tags: ['#trust', '#lifelessons', '#podcastmoment', '#inspirational', '#foryou'],
            badgeTags: ['🏆 91% Climax', '🔒 Trust Secret', '✨ High Share Rate']
          },
          {
            id: 7,
            title: '🎯 Reel 7: The Micro-Pause That Commands Respect',
            hookText: '⏳ The 2-Second Silence Rule Before Replying',
            viralityScore: '90% Viral',
            start: 108,
            end: 123,
            hookDesc: 'How taking a deliberate breath before responding projects supreme confidence.',
            seoTitle: 'Do this 2-second pause before answering to sound 10x more confident 🗣️⚡',
            caption: 'POWER OF SILENCE',
            tags: ['#confidence', '#publicspeaking', '#charismatips', '#viralreels', '#shorts'],
            badgeTags: ['🎯 90% Charisma Hack', '⏳ 2-Sec Rule', '⚡ High Retention']
          },
          {
            id: 8,
            title: '🚀 Reel 8: Behind-The-Scenes Banter & Wrap-Up',
            hookText: '😂 Candid Outtakes & Funniest Off-Script Moment',
            viralityScore: '89% Viral',
            start: 126,
            end: 141,
            hookDesc: 'Host and guest burst into genuine laughter breaking character at the recording wrap.',
            seoTitle: 'The candid blooper at the end of the recording was the best part 😂🎬',
            caption: 'UNFILTERED LAUGHS',
            tags: ['#bloopers', '#behindthescenes', '#outtakes', '#podcastfunny', '#trending'],
            badgeTags: ['🚀 89% Viral Outro', '😂 Blooper', '💬 Comment Spike']
          }
        ]
      },
      {
        id: 'khan_sir_podcast',
        matchKeywords: ['khan', 'sir', 'geopolitics', 'pakistan', 'real talks', 'podcast'],
        title: 'KHAN SIR ON PAKISTAN & GEOPOLITICS',
        author: 'The Real Talks • 1h 12m',
        duration: 4320,
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: Khan Sir\'s Bold Geopolitics Truth',
            hookText: '⚡ Powerful Hook: The reality of borders & defense budgets',
            viralityScore: '99% Viral',
            isYtMostReplayed: true,
            ytViews: '32M+ Views',
            ytBadge: '🔥 YouTube Viral Peak',
            start: 75,
            end: 125,
            hookDesc: 'Khan Sir explains economic realities with historical facts. Instant audience silence and maximum retention.',
            seoTitle: 'Khan Sir exposed the harsh geopolitical truth and everyone went silent 😳🇮🇳',
            caption: 'THE HARSH TRUTH',
            tags: ['#khansir', '#podcast', '#geopolitics', '#upsc', '#viralshorts', '#india', '#facts'],
            badgeTags: ['🔥 99% Retention', '⚡ Powerful Hook', '💡 Deep Insight']
          },
          {
            id: 2,
            title: '😂 Reel 2: Savage Roast on Border Management',
            hookText: '😂 Laughter Spike & Sarcastic Mic-Drop',
            viralityScore: '100% Viral',
            isYtMostReplayed: true,
            ytViews: '45M+ Views',
            ytBadge: '🔥 YouTube #1 MOST REPLAYED',
            start: 630,
            end: 685,
            hookDesc: 'Audience erupted in laughter at Khan Sir\'s witty analogy comparing budget allocations.',
            seoTitle: 'When Khan Sir dropped the most savage roast on live podcast 😂🔥',
            caption: 'HE DID NOT HOLD BACK',
            tags: ['#khansircomedy', '#roast', '#podcastclips', '#reels', '#funny', '#shorts'],
            badgeTags: ['😂 97% Laughter', '🎙️ Mic Drop', '💥 Viral Spike']
          },
          {
            id: 3,
            title: '⚡ Reel 3: Global Trade & Dollar Reserve Truth',
            hookText: '📈 High-Pace Economic Mechanism Breakdown',
            viralityScore: '96% Viral',
            start: 1260,
            end: 1315,
            hookDesc: 'Breaking down international currency flows in 30 seconds with simple whiteboard style explanation.',
            seoTitle: 'Khan Sir explains how the global dollar reserve actually controls small economies 💵📉',
            caption: 'HOW THE DOLLAR WORKS',
            tags: ['#economy', '#khansir', '#worldtrade', '#finance', '#geopolitics', '#viral'],
            badgeTags: ['⚡ 96% Fast Pacing', '💵 Finance Hook', '📈 High Retention']
          },
          {
            id: 4,
            title: '🤯 Reel 4: The Untold 1971 Defense Strategy Secret',
            hookText: '🤯 Declassified Historical Insight & Plot Twist',
            viralityScore: '95% Viral',
            start: 1940,
            end: 1995,
            hookDesc: 'A shocking historical document revealed live on the show that completely stunned the host.',
            seoTitle: 'The 1971 strategy detail that history books completely skipped over 🤯📜',
            caption: 'DEEP SECRET EXPOSED',
            tags: ['#historyfacts', '#1971war', '#military', '#khansirofficial', '#shortsfeed'],
            badgeTags: ['🤯 95% Twist', '📜 History Secret', '💬 Huge Comments']
          },
          {
            id: 5,
            title: '💡 Reel 5: Golden Advice Every Student Must Hear',
            hookText: '🎯 High Emotional Resonance & Motivation',
            viralityScore: '93% Viral',
            start: 2655,
            end: 2710,
            hookDesc: 'Khan Sir\'s passionate message to students about hard work, self-reliance, and national pride.',
            seoTitle: 'Every young student needs to listen to this before it\'s too late 🧠✨',
            caption: 'REMEMBER THIS FOREVER',
            tags: ['#khansirmotivation', '#studentlife', '#success', '#mindset', '#viral'],
            badgeTags: ['💡 93% Emotional', '📚 Life Lesson', '🚀 Call to Action']
          },
          {
            id: 6,
            title: '🏆 Reel 6: Future of Youth & Nation Warning',
            hookText: '🏆 Powerful Concluding Call to Action',
            viralityScore: '91% Viral',
            start: 3220,
            end: 3275,
            hookDesc: 'Concluding mic drop challenging the youth to build domestic manufacturing and tech independence.',
            seoTitle: 'Khan Sir\'s final 30 seconds will give you absolute goosebumps 🇮🇳🔥',
            caption: 'WAKE UP CALL',
            tags: ['#youthpower', '#indiafuture', '#khansirspeech', '#motivation', '#fyp'],
            badgeTags: ['🏆 91% Climax', '🔥 Goosebumps', '✨ High Share Rate']
          },
          {
            id: 7,
            title: '🎯 Reel 7: The Superpower Economic Blueprint',
            hookText: '📊 5 Key Industries That Determine World Order',
            viralityScore: '90% Viral',
            start: 3730,
            end: 3785,
            hookDesc: 'Khan Sir draws out the future of semiconductor chips, solar power and water supply reserves.',
            seoTitle: 'Why the next world war will be fought over microchips and fresh water 🧠🌍',
            caption: 'FUTURE WORLD ORDER',
            tags: ['#geopolitics', '#khansir', '#futuretech', '#upscprep', '#shorts'],
            badgeTags: ['🎯 90% Strategic', '📊 Economic Blueprint', '💡 High Retention']
          },
          {
            id: 8,
            title: '🚀 Reel 8: Funniest Student Classroom Anecdote',
            hookText: '😂 Khan Sir\'s Witty Reply to Student Asking for Life Shortcuts',
            viralityScore: '89% Viral',
            start: 4170,
            end: 4225,
            hookDesc: 'Khan Sir delivers a hilarious punchline about discipline and shortcuts that leaves the studio crew in stitches.',
            seoTitle: 'Khan Sir\'s hilarious response to student looking for easy success 😂🎓',
            caption: 'NO SHORTCUTS IN LIFE',
            tags: ['#khansircomedy', '#bloopers', '#motivation', '#reels', '#shorts'],
            badgeTags: ['🚀 89% Comedy Outro', '😂 Funniest Story', '💬 Comment Magnet']
          }
        ]
      },
      {
        id: 'ishowspeed_wwe',
        matchKeywords: ['speed', 'ishowspeed', 'wrestlemania', 'wwe', 'randy', 'orton', 'fought'],
        title: 'HOW I FOUGHT IN WRESTLEMANIA',
        author: 'IShowSpeed • 18:24',
        duration: 1104,
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: Speed Infiltrates The WrestleMania Ring',
            hookText: '⚡ Adrenaline Shock & Prime Bottle Mascot Reveal',
            viralityScore: '99% Viral',
            isYtMostReplayed: true,
            ytViews: '58M+ Views',
            ytBadge: '🔥 YouTube Viral Peak',
            start: 30,
            end: 75,
            hookDesc: 'Speed disguised as Prime mascot surprisingly reveals himself in the middle of Logan Paul\'s match.',
            seoTitle: 'IShowSpeed really snuck into WrestleMania and the crowd went crazy 💀😭',
            caption: 'HE ACTUALLY DID IT',
            tags: ['#ishowspeed', '#wrestlemania', '#wwe', '#speed', '#viral', '#shorts'],
            badgeTags: ['🔥 99% Viral', '⚡ Chaotic Energy', '🤯 Crowd Shock']
          },
          {
            id: 2,
            title: '😂 Reel 2: Barking at Randy Orton & Table Slam',
            hookText: '💀 Peak Screaming & Reflexive Comedy',
            viralityScore: '100% Viral',
            isYtMostReplayed: true,
            ytViews: '85M+ Views',
            ytBadge: '🔥 YouTube #1 MOST REPLAYED',
            start: 185,
            end: 230,
            hookDesc: 'Speed barks at Randy Orton right before getting RKO\'d through the announce table.',
            seoTitle: 'Speed barking at Randy Orton seconds before disaster strikes 😭⚰️',
            caption: 'WORST MISTAKE EVER',
            tags: ['#speedrko', '#randyorton', '#wwefunny', '#shorts', '#trending'],
            badgeTags: ['💀 98% Reaction', '😂 Pure Chaos', '💥 Legendary RKO']
          },
          {
            id: 3,
            title: '⚡ Reel 3: Logan Paul Brass Knuckles Sneak',
            hookText: '⚡ Unbelievable Ring Intervention Chaos',
            viralityScore: '96% Viral',
            start: 345,
            end: 390,
            hookDesc: 'Speed slides brass knuckles across the canvas while referee is completely distracted.',
            seoTitle: 'IShowSpeed saved Logan Paul with this illegal move at WrestleMania 😱🏆',
            caption: 'LOGAN PAUL SAVED',
            tags: ['#loganpaul', '#wwehighlights', '#speedlive', '#viralclips', '#trending'],
            badgeTags: ['⚡ 96% Action', '🥊 High Drama', '🔥 Peak Hype']
          },
          {
            id: 4,
            title: '🤯 Reel 4: 70,000 People Screaming SUI With Speed',
            hookText: '🤯 Stadium-Wide Echo & Unmatched Energy Spike',
            viralityScore: '95% Viral',
            start: 515,
            end: 560,
            hookDesc: 'Speed climbs the ropes and the entire 70,000 fan stadium shouts Ronaldo\'s iconic celebration.',
            seoTitle: 'IShowSpeed got 70,000 wrestling fans to scream SIUUU at once 🐐🔥',
            caption: '70,000 PEOPLE SIUU',
            tags: ['#siuuu', '#cristiano', '#ishowspeedclip', '#wrestlemania40', '#shorts'],
            badgeTags: ['🤯 95% Stadium Shock', '🐐 Ronaldo Vibe', '🔊 Max Audio']
          },
          {
            id: 5,
            title: '💡 Reel 5: Triple H Backstage Confrontation',
            hookText: '🤝 WWE Boss Face-to-Face & Contract Tease',
            viralityScore: '93% Viral',
            start: 680,
            end: 725,
            hookDesc: 'Triple H stops Speed in the gorilla position hallway: "Are you crazy or are you a genius?"',
            seoTitle: 'Triple H had this to say to Speed right after the match 🤯👀',
            caption: 'TRIPLE H WAS WAITING',
            tags: ['#tripleh', '#backstage', '#wwelockerroom', '#speed', '#foryou'],
            badgeTags: ['💡 93% Exclusive', '🤝 WWE Boss', '💬 High Curiosity']
          },
          {
            id: 6,
            title: '🏆 Reel 6: Post-Match Locker Room Freakout',
            hookText: '🎉 Victory Celebration & Ice Pack Rant',
            viralityScore: '91% Viral',
            start: 840,
            end: 885,
            hookDesc: 'Speed holding ice to his neck while screaming at the livestream chat in disbelief.',
            seoTitle: 'Speed\'s honest reaction after getting slammed by Randy Orton 😂',
            caption: 'MY NECK IS BROKEN',
            tags: ['#ishowspeedlive', '#aftermath', '#streaming', '#speedlive', '#fyp'],
            badgeTags: ['🏆 91% Climax', '🔥 Post-Match', '💬 High Comments']
          },
          {
            id: 7,
            title: '🎯 Reel 7: The Announce Table Slow-Mo Impact Angle',
            hookText: '🌪️ 1000 FPS Slow Motion Table Shatter',
            viralityScore: '90% Viral',
            start: 980,
            end: 1025,
            hookDesc: 'Multi-angle cinematic slow motion of the exact split second the wooden announce table explodes.',
            seoTitle: 'Randy Orton RKO on IShowSpeed in ultra slow motion looks brutal 🤯💀',
            caption: 'IMPACT IN SLOW MOTION',
            tags: ['#slowmotion', '#wweaction', '#speedrko', '#viralreels', '#shorts'],
            badgeTags: ['🎯 90% Impact', '🌪️ Slow Motion', '⚡ Maximum Hype']
          },
          {
            id: 8,
            title: '🚀 Reel 8: Sneaking Out In Security Disguise',
            hookText: '😂 Speed Escapes WrestleMania Stadium In Security Uniform',
            viralityScore: '89% Viral',
            start: 1045,
            end: 1090,
            hookDesc: 'Speed puts on a neon security vest and runs past screaming fans into the getaway sprinter van.',
            seoTitle: 'How IShowSpeed actually escaped the arena without getting arrested 😂🏃',
            caption: 'MISSION ACCOMPLISHED',
            tags: ['#speedescape', '#bloopers', '#stealth', '#wrestlemania', '#trending'],
            badgeTags: ['🚀 89% Chaos Outro', '🏃 Getaway Van', '💬 Huge Comments']
          }
        ]
      },
      {
        id: 'mkbhd_folding',
        matchKeywords: ['mkbhd', 'folding', 'revolution', 'phone', 'crease', 'dual screen'],
        title: 'The Dual Screen Folding Revolution',
        author: 'MKBHD • 16:40',
        duration: 1000,
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: The 100,000 Fold Stress Machine Test',
            hookText: '⚡ Micro-Hinge Titanium Gear Durability Reveal',
            viralityScore: '98% Viral',
            start: 30,
            end: 75,
            hookDesc: 'MKBHD inspects the micro-hinge titanium gears and explains why folding displays crack.',
            seoTitle: 'Is the folding screen crease finally gone forever? MKBHD explains 📱🤯',
            caption: 'LOOK AT THIS CREASE',
            tags: ['#mkbhd', '#foldingphone', '#tech', '#gadgets', '#smartphone', '#review'],
            badgeTags: ['🔥 98% Tech Hook', '🔍 Macro Lens', '⚙️ Engineering']
          },
          {
            id: 2,
            title: '⚡ Reel 2: Why Apple Refuses To Build A Foldable Yet',
            hookText: '🍏 Industry Secret & Ultra-Thin Glass Physics',
            viralityScore: '96% Viral',
            start: 170,
            end: 215,
            hookDesc: 'Marques breaks down Cupertino supply chain limitations and ultra-thin flexible glass.',
            seoTitle: 'The real reason Apple hasn\'t made a folding iPhone yet will surprise you 🍎👀',
            caption: 'APPLE\'S SECRET REASON',
            tags: ['#apple', '#iphonefold', '#techrumors', '#mkbhdshorts', '#gadgethack'],
            badgeTags: ['⚡ 96% Curiosity', '🍎 Apple Debate', '📊 High Retention']
          },
          {
            id: 3,
            title: '😂 Reel 3: JerryRigEverything Scratch & Sand Torture',
            hookText: '💥 Dirt In The Hinge & Cringe-Worthy Sound',
            viralityScore: '95% Viral',
            start: 315,
            end: 360,
            hookDesc: 'Pouring fine pocket sand into the hinge mechanism to see if it grinds or snaps.',
            seoTitle: 'What happens when you drop an $1,800 foldable phone directly in the sand 😱⚠️',
            caption: 'LISTEN TO THE CRUNCH',
            tags: ['#torturetest', '#scratchtest', '#techfunny', '#cringe', '#durability'],
            badgeTags: ['😂 95% Cringe Shock', '💥 Sand Test', '🎧 Audio ASMR']
          },
          {
            id: 4,
            title: '🤯 Reel 4: The Dual Battery Power Architecture',
            hookText: '🔋 How 2 Split Batteries Work as 1 Cell',
            viralityScore: '94% Viral',
            start: 460,
            end: 505,
            hookDesc: 'Detailed transparent teardown showing ribbon cables connecting two independent batteries across the hinge.',
            seoTitle: 'The insane battery trick folding phones use to stay ultra-thin 🤯🔌',
            caption: 'TWO BATTERIES IN ONE',
            tags: ['#hardware', '#engineering', '#teardown', '#phonetech', '#mkbhd'],
            badgeTags: ['🤯 94% Deep Tech', '🔋 Dual Battery', '🔬 Teardown']
          },
          {
            id: 5,
            title: '💡 Reel 5: Multitasking Workflow vs Normal Phones',
            hookText: '📲 3 Apps Open Side-by-Side In Real Life',
            viralityScore: '93% Viral',
            start: 605,
            end: 650,
            hookDesc: 'Editing video, answering emails, and watching YouTube simultaneously on the inner display.',
            seoTitle: 'This is the only feature that makes folding phones genuinely worth buying 📱⚡',
            caption: 'PRODUCTIVITY BEAST',
            tags: ['#productivity', '#multitasking', '#workfromanywhere', '#techhacks', '#reels'],
            badgeTags: ['💡 93% Utility', '📲 3 Apps at Once', '🚀 High Saves']
          },
          {
            id: 6,
            title: '🏆 Reel 6: The Brutal 2-Year Long-Term Verdict',
            hookText: '🎯 Honest Buying Advice & Pocket Drop Scorecard',
            viralityScore: '91% Viral',
            start: 745,
            end: 790,
            hookDesc: 'After 24 months of real-world pocket drops: Should you actually spend $1,800 on this?',
            seoTitle: 'Don\'t buy a folding phone until you see what happens after 2 years ⚠️📉',
            caption: 'DON\'T BUY THIS YET',
            tags: ['#techwarning', '#foldables', '#buyersguide', '#phonecomparison', '#fyp'],
            badgeTags: ['🏆 91% Buying Guide', '⚠️ Warning Hook', '💡 Value Test']
          },
          {
            id: 7,
            title: '🎯 Reel 7: Macro 8K Zoom On The Crease Mechanism',
            hookText: '🔬 8K Probe Lens Captures Microscopic Gears Moving',
            viralityScore: '90% Viral',
            start: 870,
            end: 915,
            hookDesc: 'Special probe camera slides inside the open hinge showing 4 tiny water-resistant rubber gaskets in motion.',
            seoTitle: 'Looking inside a folding phone hinge with an 8K probe lens is wild 🔬📱',
            caption: '8K PROBE LENS ZOOM',
            tags: ['#macrophotography', '#teardown', '#mkbhd', '#engineering', '#shorts'],
            badgeTags: ['🎯 90% Macro Zoom', '🔬 8K Probe Lens', '⚡ High Retention']
          },
          {
            id: 8,
            title: '🚀 Reel 8: Smartphone of The Year Final Scorecard',
            hookText: '🏆 MKBHD Reveals The Blind Smartphone Winner',
            viralityScore: '89% Viral',
            start: 945,
            end: 990,
            hookDesc: 'Marques reveals the community voting results from 10 million blind photo and battery test submissions.',
            seoTitle: 'The smartphone that actually won blind test will shock fanboys 🏆👑',
            caption: 'THE UNEXPECTED WINNER',
            tags: ['#smartphoneawards', '#mkbhd', '#blindtest', '#techreview', '#fyp'],
            badgeTags: ['🚀 89% Final Winner', '🏆 Golden Trophy', '💬 Tech Debate']
          }
        ]
      },
      {
        id: 'travel_vlogger',
        matchKeywords: ['travel', 'vlog', 'overland', 'russia', 'iran', 'nomad', 'bus', 'adventure'],
        title: 'Overland Adventure: Russia to Iran',
        author: 'Outdoor Vlogger • 24:10',
        duration: 1450,
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: Stranded at Siberian Border at -20°C',
            hookText: '⚡ Dramatic Suspense & Frozen Engine Sound',
            viralityScore: '98% Viral',
            start: 35,
            end: 80,
            hookDesc: 'The converted bus engine freezes overnight in a remote snow pass with no cellular signal.',
            seoTitle: 'Our overland bus broke down at the Russian border in -20°C blizzard 🥶🚌',
            caption: 'THE ENGINE IS FROZEN',
            tags: ['#overland', '#travelvlog', '#siberia', '#adventure', '#survival', '#shorts'],
            badgeTags: ['🔥 98% Suspense', '❄️ Extreme Cold', '🚌 Survival Mode']
          },
          {
            id: 2,
            title: '😱 Reel 2: The Heartwarming Stranger in Nowhere',
            hookText: '🤝 Emotional Rescue & Shared Warm Diesel Generator',
            viralityScore: '96% Viral',
            start: 235,
            end: 280,
            hookDesc: 'A local truck driver stops with a diesel generator and warm homemade soup to save the crew.',
            seoTitle: 'This stranger saved our lives in the middle of nowhere 🥺❤️',
            caption: 'FAITH IN HUMANITY',
            tags: ['#wholesome', '#travelstories', '#humanity', '#kindness', '#viralvlog'],
            badgeTags: ['😱 96% Wholesome', '❤️ Heartwarming', '☕ Pure Relief']
          },
          {
            id: 3,
            title: '⚡ Reel 3: Crossing the Frozen Lake Baikal Ice Highway',
            hookText: '🧊 1-Meter Thick Transparent Black Ice Driving',
            viralityScore: '95% Viral',
            start: 440,
            end: 485,
            hookDesc: 'Driving heavy bus over transparent black ice with frightening cracking sounds echoing under wheels.',
            seoTitle: 'Driving a 5-ton bus across the world\'s deepest frozen lake 😱🧊',
            caption: 'THE ICE IS CRACKING',
            tags: ['#lakebaikal', '#icehighway', '#dangerzone', '#offroad', '#adrenaline'],
            badgeTags: ['⚡ 95% High Danger', '🧊 Black Ice', '🔊 Spooky Audio']
          },
          {
            id: 4,
            title: '😂 Reel 4: Trying Local Street Food at 3 AM',
            hookText: '🍜 Spicy Dumplings & Language Barrier Comedy',
            viralityScore: '94% Viral',
            start: 660,
            end: 705,
            hookDesc: 'Trying spicy Central Asian mutton dumplings with comical facial reactions and friendly vendor smiles.',
            seoTitle: 'We ordered mystery street food in Siberia at 3am and this happened 😂🥟',
            caption: 'TOO SPICY TO HANDLE',
            tags: ['#streetfood', '#foodreview', '#travelcomedy', '#nomadlife', '#shorts'],
            badgeTags: ['😂 94% Humor', '🍜 Food Culture', '🔥 Spice Level 100']
          },
          {
            id: 5,
            title: '💡 Reel 5: How We Finance Full-Time Van Life',
            hookText: '💰 Exact Monthly Budget & Starlink Remote Work',
            viralityScore: '92% Viral',
            start: 875,
            end: 920,
            hookDesc: 'Transparent breakdown of fuel, visas, solar power, and Starlink internet costs for full-time overland nomad life.',
            seoTitle: 'How much traveling the world in an overland bus actually costs every month 🚌💵',
            caption: 'REAL COSTS REVEALED',
            tags: ['#vanlife', '#budgeting', '#digitalnomad', '#financialfreedom', '#tips'],
            badgeTags: ['💡 92% Value Drop', '💵 Real Budget', '🚀 High Saves']
          },
          {
            id: 6,
            title: '🌅 Reel 6: Reaching the Iranian Mountain Pass',
            hookText: '🏔️ Breathtaking 4K Landscape Drone Reveal',
            viralityScore: '90% Viral',
            start: 1075,
            end: 1120,
            hookDesc: 'Descending out of snow into lush green subtropical hills of northern Iran at golden hour.',
            seoTitle: 'After 3,000 miles of driving, this view made all the pain worth it 🌄✨',
            caption: 'LOOK AT THIS VIEW',
            tags: ['#iranianmountains', '#landscape', '#roadtrip', '#epicview', '#wanderlust'],
            badgeTags: ['🌅 90% Visual ASMR', '🏔️ Epic Scenery', '🎉 Triumph']
          },
          {
            id: 7,
            title: '🎯 Reel 7: Midnight Desert Campfire Under Milky Way',
            hookText: '🌌 4K Astrophotography Time-Lapse In The Karakum Desert',
            viralityScore: '89% Viral',
            start: 1245,
            end: 1290,
            hookDesc: 'Total silence in the desert with shooting stars and nomadic campfire tea ritual under brilliant stars.',
            seoTitle: 'Camping under 100,000 stars in the middle of the desert 🌌✨',
            caption: 'STARRY DESERT NIGHT',
            tags: ['#milkyway', '#astrophotography', '#desertcamp', '#vanlife', '#shorts'],
            badgeTags: ['🎯 89% Star ASMR', '🌌 4K Timelapse', '⚡ High Retention']
          },
          {
            id: 8,
            title: '🚀 Reel 8: Crossing Into Tehran & Final Celebration',
            hookText: '🎉 Welcomed By Local Drivers Beeping Horns In Tehran',
            viralityScore: '88% Viral',
            start: 1395,
            end: 1440,
            hookDesc: 'The overland bus rolls into Azadi Square with Persian hospitality, tea invitations and celebratory cheers.',
            seoTitle: 'We drove from Siberia to Tehran and this was the reception 🇮🇷❤️',
            caption: 'WE MADE IT ACROSS',
            tags: ['#tehran', '#persianhospitality', '#travelvlog', '#journeyend', '#viral'],
            badgeTags: ['🚀 88% Final Triumph', '🎉 Tehran Welcome', '💬 Wholesome Spike']
          }
        ]
      },
      {
        id: 'french_chef',
        matchKeywords: ['chef', 'pierre', 'baguette', 'paris', 'cooking', 'baking', 'bread'],
        title: 'Cooking 1,000 Baguettes in Paris',
        author: 'Chef Pierre • 14:50',
        duration: 890,
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: The 72-Hour Sourdough Fermentation Secret',
            hookText: '⚡ ASMR Crisp Crust Crackling & Steam Blast',
            viralityScore: '98% Viral',
            start: 25,
            end: 70,
            hookDesc: 'Chef Pierre pulls out a golden blistered baguette from the stone oven with sizzling sound.',
            seoTitle: 'The 100-year-old French bakery secret for the crunchiest baguette 🥖🤤',
            caption: 'LISTEN TO THIS CRUNCH',
            tags: ['#frenchbakery', '#baguette', '#foodasmr', '#chef', '#baking', '#paris'],
            badgeTags: ['🔥 98% Food ASMR', '🥖 Parisian Secret', '🎧 Sound Design']
          },
          {
            id: 2,
            title: '🥐 Reel 2: Why Supermarket Bread Is A Lie',
            hookText: '🧪 Chemical Additives vs 4 Natural Ingredients',
            viralityScore: '96% Viral',
            start: 145,
            end: 190,
            hookDesc: 'Chef explains why industrial bread uses bleach and enzyme packs while traditional uses only 4 natural ingredients.',
            seoTitle: 'French Master Chef exposes why supermarket bread ruins your stomach 🤯🥖',
            caption: 'NEVER EAT THIS AGAIN',
            tags: ['#healthyfood', '#realbread', '#bakingtips', '#nutrition', '#cheftalk'],
            badgeTags: ['🥐 96% Health Hook', '⚠️ Truth Exposed', '🥖 Real Food']
          },
          {
            id: 3,
            title: '⚡ Reel 3: The Secret Stone Oven Steam Blast',
            hookText: '💨 High-Pressure Steam Creates The Blister Crust',
            viralityScore: '95% Viral',
            start: 280,
            end: 325,
            hookDesc: 'Showing the internal brick boiler injecting steam into the sealed chamber for 12 seconds.',
            seoTitle: 'This single step gives French baguettes that legendary shiny crust 🥖✨',
            caption: 'STEAM INJECTION SECRET',
            tags: ['#bakingsecrets', '#artisanbread', '#pastrychef', '#frenchkitchen', '#foodie'],
            badgeTags: ['⚡ 95% Pro Tip', '💨 Steam Blast', '🔥 Golden Crust']
          },
          {
            id: 4,
            title: '😂 Reel 4: American Tourist Tries Real Paris Croissant',
            hookText: '🥐 Mind-Blowing Reaction to 81 Layers of Butter',
            viralityScore: '94% Viral',
            start: 415,
            end: 460,
            hookDesc: 'Tourist takes first bite, eyes widen in shock: "I will never eat bread in America again!"',
            seoTitle: 'His reaction to tasting a fresh Paris croissant for the first time 😂🥐',
            caption: 'MIND TOTALLY BLOWN',
            tags: ['#touristreaction', '#parisfood', '#croissant', '#funnyreactions', '#shorts'],
            badgeTags: ['😂 94% Reaction', '🥐 81 Layers', '🇫🇷 Pure France']
          },
          {
            id: 5,
            title: '😋 Reel 5: The Salted Normandy Butter Taste Test',
            hookText: '🧈 Melting Salted Butter on Steaming Hot Crumb',
            viralityScore: '93% Viral',
            start: 550,
            end: 595,
            hookDesc: 'Slathering yellow Normandy churned butter on steaming crumb with loud satisfying crunch.',
            seoTitle: 'Nothing on Earth tastes better than fresh Paris baguette with salted butter 🧈🇫🇷',
            caption: 'PURE PERFECTION',
            tags: ['#foodporn', '#frenchfood', '#tastetest', '#delicious', '#fyp'],
            badgeTags: ['😋 93% Craving', '🧈 Pure Butter', '🇫🇷 Masterpiece']
          },
          {
            id: 6,
            title: '🏆 Reel 6: Baking 1,000 Baguettes Before Sunrise',
            hookText: '⏰ 4 AM Rush & The Smell of Paris Awakening',
            viralityScore: '91% Viral',
            start: 685,
            end: 730,
            hookDesc: 'The bakers stack fresh baguettes in wicker baskets as the early morning Paris street market opens.',
            seoTitle: 'Inside Paris\'s oldest bakery at 4am: Preparing 1,000 baguettes before dawn 🥖🌙',
            caption: 'PARIS MORNING ROUTINE',
            tags: ['#bakeryroutine', '#earlymorning', '#parisvibes', '#bakerlife', '#shorts'],
            badgeTags: ['🏆 91% Cozy ASMR', '🥖 1000 Loaves', '✨ Morning Vibe']
          },
          {
            id: 7,
            title: '🎯 Reel 7: The Bread Scoring Blade Art Masterclass',
            hookText: '🔪 Razor Lame Razor Technique Creates Perfect Ears',
            viralityScore: '90% Viral',
            start: 775,
            end: 820,
            hookDesc: 'Macro view of Chef Pierre slashing the dough at 30 degree angle in rapid rhythmic strokes.',
            seoTitle: 'How French bakers cut baguettes with razor blades is pure satisfying art 🔪🥖',
            caption: 'SATISFYING CUTS',
            tags: ['#oddlysatisfying', '#doughscoring', '#bakerart', '#pastryskills', '#reels'],
            badgeTags: ['🎯 90% Satisfying', '🔪 Razor Scoring', '⚡ High Retention']
          },
          {
            id: 8,
            title: '🚀 Reel 8: Customers Queuing Down The Paris Boulevard',
            hookText: '🥖 200 People Line Up In The Morning Rain For Fresh Loaves',
            viralityScore: '89% Viral',
            start: 840,
            end: 885,
            hookDesc: 'Door opens at 6:30 AM and the entire neighborhood rushes in with joyful greetings.',
            seoTitle: 'Why French people wait 45 minutes in line every morning for fresh bread 🥖🇫🇷',
            caption: 'PARIS WAKES UP',
            tags: ['#parisianlife', '#bakeryline', '#frenchculture', '#foodtravel', '#viral'],
            badgeTags: ['🚀 89% Cultural Outro', '🥖 Morning Rush', '💬 Food Debate']
          }
        ]
      },
      {
        id: 'mrbeast_lebron',
        matchKeywords: ['lebron', 'basketball', 'nba', 'james'],
        title: 'Beat LeBron, Win $100,000',
        author: 'MrBeast • 16:00',
        duration: 960,
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: The $100,000 1-on-1 LeBron Shootout',
            hookText: '⚡ High-Stakes Opening Shot vs Basketball Legend',
            viralityScore: '99% Viral',
            start: 30,
            end: 75,
            hookDesc: 'Contestant challenges LeBron James to a 3-point shootout with $100,000 cash on the line.',
            seoTitle: 'He really challenged LeBron James to a 1v1 for $100,000 🏀😱',
            caption: 'CAN HE BEAT LEBRON',
            tags: ['#mrbeast', '#lebron', '#basketball', '#nba', '#100k', '#challenge'],
            badgeTags: ['🔥 99% High Stakes', '🏀 LeBron 1v1', '⚡ Immediate Hook']
          },
          {
            id: 2,
            title: '😂 Reel 2: LeBron\'s Hilarious Reaction & Savage Block',
            hookText: '😂 Laughter Spike & Savage Defensive Block',
            viralityScore: '97% Viral',
            start: 160,
            end: 205,
            hookDesc: 'LeBron swats the basketball away with a funny grin and the entire gym goes wild.',
            seoTitle: 'LeBron James did not let this slide for a second 😂💀',
            caption: 'GET THAT OUT OF HERE',
            tags: ['#lebronblock', '#funny', '#basketballhighlights', '#mrbeast', '#shorts'],
            badgeTags: ['😂 97% Laughter Spike', '🏀 Savage Block', '🎉 Pure Hype']
          },
          {
            id: 3,
            title: '⚡ Reel 3: Half-Court Trick Shot for $50,000',
            hookText: '🎯 Desperate Hail Mary Shot from Mid-Court',
            viralityScore: '96% Viral',
            start: 300,
            end: 345,
            hookDesc: 'Contestant gets one single attempt from mid-court logo with MrBeast holding the countdown buzzer.',
            seoTitle: 'He attempted a half-court shot against LeBron for $50,000 🤯🏀',
            caption: 'HALF COURT HAIL MARY',
            tags: ['#halfcourtshot', '#trickshot', '#basketballlife', '#mrbeastchallenge', '#viral'],
            badgeTags: ['⚡ 96% Tense Pace', '🏀 Half Court', '💥 Max Suspense']
          },
          {
            id: 4,
            title: '🤯 Reel 4: LeBron Dunks Over The Camera Crew',
            hookText: '🤯 Windmill 360 Dunk Shakes The Backboard',
            viralityScore: '95% Viral',
            start: 450,
            end: 495,
            hookDesc: 'LeBron takes flight from the free throw line and hammers down a ferocious windmill slam.',
            seoTitle: 'LeBron James pulled off an NBA Finals dunk in a MrBeast video 😱🔥',
            caption: 'THE KING TAKES FLIGHT',
            tags: ['#lebrondunk', '#slamdunk', '#kingjames', '#nbatiktok', '#insane'],
            badgeTags: ['🤯 95% Dunk Shock', '👑 King James', '🔊 Crowd Roar']
          },
          {
            id: 5,
            title: '💡 Reel 5: Secret NBA Shooting Technique Tip',
            hookText: '🏀 LeBron Teaches Proper Release Mechanics',
            viralityScore: '93% Viral',
            start: 590,
            end: 635,
            hookDesc: 'LeBron pauses the challenge to give the contestant personalized elbow alignment and wrist flick coaching.',
            seoTitle: 'LeBron James broke down his exact shooting secret in 30 seconds 🧠🏀',
            caption: 'COACH LEBRON',
            tags: ['#basketballtraining', '#shootingcoach', '#lebronjames', '#nbatips', '#reels'],
            badgeTags: ['💡 93% Masterclass', '🏀 Pro Technique', '🚀 High Saves']
          },
          {
            id: 6,
            title: '🏆 Reel 6: $100,000 Final Buzzer Shot & Climax',
            hookText: '💰 The Final Second Shot for $100,000',
            viralityScore: '91% Viral',
            start: 720,
            end: 765,
            hookDesc: 'Tense countdown with crowd holding breath as the final basketball shot arcs through the air.',
            seoTitle: 'The final shot for $100,000 had everyone holding their breath 🥹🏀',
            caption: 'WILL IT GO IN',
            tags: ['#buzzerbeater', '#wholesome', '#100000dollars', '#sportsclimax', '#fyp'],
            badgeTags: ['🏆 91% Climax', '💰 $100k Final Shot', '✨ Game Winner']
          },
          {
            id: 7,
            title: '🎯 Reel 7: Slow-Mo Windmill Slam Angle',
            hookText: '🌪️ Multi-Angle Replay of LeBron\'s Ferocious Dunk',
            viralityScore: '90% Viral',
            start: 840,
            end: 885,
            hookDesc: 'Phantom high-speed camera captures LeBron hanging in the air and rattling the rim.',
            seoTitle: 'LeBron James dunk in super slow motion looks completely unreal 🤯🏀',
            caption: 'GRAVITY DEFIED',
            tags: ['#lebrondunk', '#slowmo', '#kingjames', '#nbahighlights', '#shorts'],
            badgeTags: ['🎯 90% Dunk Angle', '🌪️ Slow Motion', '⚡ High Retention']
          },
          {
            id: 8,
            title: '🚀 Reel 8: LeBron Teases MrBeast Blooper',
            hookText: '😂 Hilarious Trash Talk & Court Banter',
            viralityScore: '89% Viral',
            start: 905,
            end: 950,
            hookDesc: 'LeBron jokes with MrBeast about joining his next challenge video as the gym roars with laughter.',
            seoTitle: 'LeBron James roasting MrBeast is the funniest thing you\'ll see today 😂💀',
            caption: 'LEBRON ROASTS MRBEAST',
            tags: ['#mrbeast', '#lebron', '#funny', '#bloopers', '#foryou'],
            badgeTags: ['🚀 89% Outro', '😂 Trash Talk', '💬 Comment Spike']
          }
        ]
      },
      {
        id: 'mrbeast_haaland',
        matchKeywords: ['_c2e1ncl3sc', '0e3gpea1tyg', 'pln7jmbadrg', 'haaland', 'striker', 'erling', 'penalty', 'beat professional athlete', 'athlete', 'soccer', 'football', 'pro athlete', 'goalie', 'goalkeeper', 'mrbeast', '100000', '100,000', 'lebron', 'caitlin clark', 'simone biles', 'hardik pandya', 'alysa liu'],
        title: 'Beat Professional Athlete, Win $100,000',
        author: 'MrBeast • 22:28',
        duration: 1348,
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: Erling Haaland $100,000 Penalty Shootout',
            hookText: '⚡ 100 MPH Missile Kick vs Amateur Goalkeeper',
            viralityScore: '99% Viral',
            start: 45,
            end: 100,
            isYtMostReplayed: true,
            ytViews: '48M+ Views',
            ytBadge: '🔥 YouTube Viral #2 Peak',
            hookDesc: 'Erling Haaland unloads full velocity rocket kick with $100,000 cash briefcase locked inside the goal.',
            seoTitle: 'Erling Haaland tried to score for $100,000 on an amateur keeper ⚽😱',
            caption: 'CAN HE SAVE THIS?! ⚽',
            subtitles: [
              'CAN HE STOP ERLING HAALAND?!',
              'THE $100,000 PENALTY SHOT!',
              'LOOK AT THE RAW POWER!'
            ],
            tags: ['#mrbeast', '#haaland', '#penalty', '#soccer', '#100k', '#viral'],
            badgeTags: ['🔥 YouTube Peak (48M)', '⚽ Haaland 100 MPH', '⚡ Instant Hook']
          },
          {
            id: 2,
            title: '🤸 Reel 2: Simone Biles High-Altitude Sky Beam Stunt',
            hookText: '😱 Suspended 100 Feet in The Air With No Safety Net',
            viralityScore: '97% Viral',
            start: 230,
            end: 285,
            isYtMostReplayed: false,
            ytViews: '36M+ Views',
            ytBadge: '📈 36M+ Shorts Views',
            hookDesc: 'Olympic gymnastics legend Simone Biles performs high-stakes acrobatics suspended 100 feet in mid-air.',
            seoTitle: 'Simone Biles did a balance beam challenge 100 FEET in the air 🤯🤸',
            caption: '100 FEET IN THE AIR! 😱',
            subtitles: [
              'SIMONE BILES 100 FEET IN THE AIR!',
              'ONE SLIP AND IT IS ALL OVER!',
              'HOW IS SHE SO CALM RIGHT NOW?!'
            ],
            tags: ['#simonebiles', '#gymnastics', '#mrbeast', '#daredevil', '#insane'],
            badgeTags: ['📈 36M+ Shorts Views', '🤸 Sky Balance', '💥 High Tension']
          },
          {
            id: 3,
            title: '🏏 Reel 3: Hardik Pandya Stadium-Clearing Monster Six',
            hookText: '💥 Massive 120-Meter Hit Breaks Stadium Camera',
            viralityScore: '96% Viral',
            start: 435,
            end: 490,
            isYtMostReplayed: false,
            ytViews: '29M+ Views',
            ytBadge: '📈 29M+ Shorts Views',
            hookDesc: 'Cricket superstar Hardik Pandya crushes a monster 120-meter hit clean out of the stadium for charity.',
            seoTitle: 'Hardik Pandya smashed a ball clean out of the stadium for $100,000 🏏🚀',
            caption: 'OUT OF THE STADIUM! 🏏',
            subtitles: [
              'HARDIK PANDYA STEPS UP TO THE PLATE!',
              'HE SMASHED IT CLEAN OUT OF THE STADIUM!',
              'THAT BALL IS NEVER COMING BACK!'
            ],
            tags: ['#hardikpandya', '#cricket', '#mrbeast', '#powerhitting', '#viral'],
            badgeTags: ['📈 29M+ Shorts Views', '🏏 Monster Six', '🚀 Ball Lost']
          },
          {
            id: 4,
            title: '🎯 Reel 4: Caitlin Clark Deep Half-Court Shot Masterclass',
            hookText: '🏀 Draining Impossible Shots from Half-Court Logo',
            viralityScore: '98% Viral',
            start: 620,
            end: 675,
            isYtMostReplayed: true,
            ytViews: '42M+ Views',
            ytBadge: '🔥 YouTube Viral #3 Peak',
            hookDesc: 'WNBA sensation Caitlin Clark sinks consecutive deep logo 3-pointers and swishes an effortless half-court shot.',
            seoTitle: 'Caitlin Clark made an impossible half-court shot look so easy 🤯🏀',
            caption: 'NOTHING BUT NET! 🏀',
            subtitles: [
              'CAITLIN CLARK FROM HALF-COURT!',
              'NOTHING BUT NET ON THE FIRST TRY!',
              'SHE MAKES IT LOOK RIDICULOUSLY EASY!'
            ],
            tags: ['#caitlinclark', '#wnba', '#basketball', '#halfcourt', '#mrbeast'],
            badgeTags: ['🔥 YouTube Peak (42M)', '🏀 Half-Court Swish', '🎯 Pure Magic']
          },
          {
            id: 5,
            title: '⛸️ Reel 5: Alysa Liu Extreme Olympic Ice Sprint',
            hookText: '❄️ High Speed Gliding Through Flaming Obstacles',
            viralityScore: '94% Viral',
            start: 790,
            end: 845,
            isYtMostReplayed: false,
            ytViews: '24M+ Views',
            ytBadge: '📈 24M+ Shorts Views',
            hookDesc: 'Olympian Alysa Liu races at top speed across an obstacle-filled ice rink for charity challenge.',
            seoTitle: 'Olympic figure skater races through an extreme obstacle ice track ⛸️⚡',
            caption: 'INSANE SPEED ON ICE! ⛸️',
            subtitles: [
              'OLYMPIC SKATER VS IMPOSSIBLE ICE MAZE!',
              'LOOK AT THAT SPEED AND AGILITY!',
              'SHE DODGED THE OBSTACLES CLEANLY!'
            ],
            tags: ['#alysaliu', '#figureskating', '#olympics', '#mrbeast', '#speed'],
            badgeTags: ['📈 24M+ Shorts Views', '⛸️ Ice Agility', '⚡ Max Speed']
          },
          {
            id: 6,
            title: '😂 Reel 6: Gordon Ramsay Savage Roast & Kitchen Chaos',
            hookText: '🔥 Gordon Ramsay Shuts Down Feastables Recipe',
            viralityScore: '97% Viral',
            start: 945,
            end: 1000,
            isYtMostReplayed: false,
            ytViews: '39M+ Views',
            ytBadge: '😂 Viral Comedy Peak',
            hookDesc: 'Gordon Ramsay makes an unscripted cameo and brutally roasts Jimmy\'s culinary attempts with hilarious British sarcasm.',
            seoTitle: 'Gordon Ramsay brutally roasting MrBeast is pure comedy gold 😂💀',
            caption: 'IT TASTES LIKE WHAT?! 😂',
            subtitles: [
              'GORDON RAMSAY TASTE TESTS FEASTABLES!',
              'IT TASTES LIKE CARDBOARD!',
              'THE WHOLE CREW CANNOT STOP LAUGHING!'
            ],
            tags: ['#gordonramsay', '#mrbeast', '#roast', '#funny', '#reaction'],
            badgeTags: ['😂 39M+ Shorts Views', '👨‍🍳 Ramsay Roast', '🤣 Pure Comedy']
          },
          {
            id: 7,
            title: '👑 Reel 7: LeBron James vs MrBeast $100k Shootout',
            hookText: '🏀 The #1 Most Replayed Moment on YouTube: 5-to-4 Upset!',
            viralityScore: '100% Viral',
            start: 1110,
            end: 1165,
            isYtMostReplayed: true,
            ytViews: '75M+ Views',
            ytBadge: '🔥 YouTube #1 MOST REPLAYED',
            hookDesc: 'LeBron James and Jimmy face off in a 1-minute 3-point shootout where Jimmy shockingly scores 5 to LeBron\'s 4 in front of an electrified crowd.',
            seoTitle: 'MrBeast actually challenged LeBron James to a 3-point contest for $100,000 👑🏀',
            caption: 'HE BEAT LEBRON JAMES?! 👑🏀',
            subtitles: [
              'MRBEAST VS LEBRON JAMES FOR $100,000!',
              'JIMMY SINKING 5 SHOTS IN ONE MINUTE!',
              'THE MOST REPLAYED MOMENT ON YOUTUBE!'
            ],
            tags: ['#lebron', '#mrbeast', '#basketball', '#100k', '#mostreplayed', '#viral'],
            badgeTags: ['🔥 #1 Most Replayed (75M)', '👑 LeBron Shootout', '💥 100% Viral Peak']
          },
          {
            id: 8,
            title: '💰 Reel 8: $100,000 Grand Trophy & Donation Climax',
            hookText: '🏆 Presenting $100,000 to the LeBron James Family Foundation',
            viralityScore: '93% Viral',
            start: 1270,
            end: 1325,
            isYtMostReplayed: false,
            ytViews: '31M+ Views',
            ytBadge: '✨ Emotional Climax',
            hookDesc: 'MrBeast hands over the $100,000 ceremonial check to LeBron\'s foundation as golden confetti explodes across the arena.',
            seoTitle: 'The wholesome ending where $100,000 was given to LeBron\'s foundation 🥹💰',
            caption: '$100,000 DONATION! 🏆',
            subtitles: [
              '100 THOUSAND DOLLARS FOR CHARITY!',
              'LEBRON AND JIMMY CELEBRATING TOGETHER!',
              'WHAT AN INCREDIBLE SHOWDOWN!'
            ],
            tags: ['#mrbeast', '#lebron', '#wholesome', '#giveaway', '#charity', '#shorts'],
            badgeTags: ['✨ 31M+ Shorts Views', '💰 $100k Check', '🏆 Grand Finale']
          }
        ]
      },
      {
        id: 'mrbeast_escape_cops',
        matchKeywords: ['escape', '100 cops', '500,000', '500k', 'cops'],
        title: 'Escape 100 Cops, Win $500,000',
        author: 'MrBeast • 18:00',
        duration: 1080,
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: The 100 Cop Perimeter Chase Begins',
            hookText: '⚡ 100 Squad Cars Surround The Cornfield Perimeter',
            viralityScore: '99% Viral',
            isYtMostReplayed: true,
            ytViews: '62M+ Views',
            ytBadge: '🔥 YouTube Viral Peak',
            start: 30,
            end: 75,
            hookDesc: '100 police squad cars turn on sirens simultaneously across the open farm perimeter with van speeding off.',
            seoTitle: '100 police cars chased us through a farm for $500,000 🚔💨',
            caption: 'THE CHASE BEGINS',
            tags: ['#mrbeast', '#escape100cops', '#chase', '#cops', '#viral', '#shorts'],
            badgeTags: ['🔥 99% Chase Hook', '🚔 100 Police Cars', '⚡ High Stakes']
          },
          {
            id: 2,
            title: '⚡ Reel 2: Tactical Decoy & Smoke Screen Escape',
            hookText: '💨 Pink Smoke Bombs Blind Police Interceptors',
            viralityScore: '98% Viral',
            start: 175,
            end: 220,
            hookDesc: 'MrBeast deploys a massive pink smoke cloud from the trunk, causing police pursuit cars to brake hard.',
            seoTitle: 'The smoke grenade trick that saved us from 20 police cruisers 😱💨',
            caption: 'DEPLOYING SMOKE SCREEN',
            tags: ['#smokescreen', '#getaway', '#actionstunt', '#trending', '#mrbeastvideo'],
            badgeTags: ['⚡ 98% Action Stunt', '💨 Smoke Bomb', '🚗 High Speed']
          },
          {
            id: 3,
            title: '😂 Reel 3: Cop Falls For Cardboard Dummy Van',
            hookText: '😂 Officer Arrests A Cardboard Box Painted Like A Car',
            viralityScore: '100% Viral',
            isYtMostReplayed: true,
            ytViews: '81M+ Views',
            ytBadge: '🔥 YouTube #1 MOST REPLAYED',
            start: 335,
            end: 380,
            hookDesc: 'Police surround a hay bale painted like a van while the real escape crew slips past on foot.',
            seoTitle: 'Police officers actually surrounded a cardboard fake car 😂💀',
            caption: 'WORST COP BAIT EVER',
            tags: ['#funnycops', '#prank', '#fail', '#mrbeasthumor', '#shorts'],
            badgeTags: ['😂 97% Pure Comedy', '📦 Cardboard Decoy', '💥 Laugh Out Loud']
          },
          {
            id: 4,
            title: '🤯 Reel 4: Thermal Radar Military Helicopter Search',
            hookText: '🚁 Night-Vision Infrared Drone Spots Hiding Spot',
            viralityScore: '95% Viral',
            start: 505,
            end: 550,
            hookDesc: 'Aerial infrared chopper locks onto thermal heat signatures hiding inside a drainage pipe.',
            seoTitle: 'The police helicopter thermal camera almost caught us right here 🚁👀',
            caption: 'HELICOPTER RIGHT ABOVE US',
            tags: ['#thermalcamera', '#helicoptersearch', '#infrared', '#suspense', '#intense'],
            badgeTags: ['🤯 95% Thermal Radar', '🚁 Chopper Chase', '⚠️ Red Alert']
          },
          {
            id: 5,
            title: '💡 Reel 5: Secret Underground Sewage Escape Route',
            hookText: '🕳️ Crawling Through 200ft Pipe To Bypass Barricade',
            viralityScore: '93% Viral',
            start: 660,
            end: 705,
            hookDesc: 'Using blueprints of the underground stormwater pipes to crawl right under the police roadblock.',
            seoTitle: 'This underground tunnel plan was pure genius 🕳️🧠',
            caption: 'UNDERGROUND BYPASS',
            tags: ['#masterplan', '#tunnelescape', '#smartstrategy', '#foryou', '#reels'],
            badgeTags: ['💡 93% Mastermind', '🕳️ Secret Pipe', '🚀 High Saves']
          },
          {
            id: 6,
            title: '🏆 Reel 6: The $500,000 Bank Safe Climax',
            hookText: '💰 Touching The Red Safe Button Seconds Before Arrest',
            viralityScore: '91% Viral',
            start: 810,
            end: 855,
            hookDesc: 'Sprinting across the final courtyard and slamming the buzzer to claim $500,000 with 1 second remaining.',
            seoTitle: 'He touched the safe 1 second before getting tackled for $500,000 😱💰',
            caption: '1 SECOND LEFT TO WIN',
            tags: ['#500000dollars', '#mrbeastwinner', '#climax', '#insanefinish', '#fyp'],
            badgeTags: ['🏆 91% Climax', '💰 $500k Vault', '✨ Final Second']
          },
          {
            id: 7,
            title: '🎯 Reel 7: High-Speed Police PIT Maneuver Fail',
            hookText: '🏎️ Pursuit Car Spun Out On Wet Grass Drift',
            viralityScore: '90% Viral',
            start: 955,
            end: 1000,
            hookDesc: 'Police interceptor attempts PIT maneuver on wet grass and spins out into safety hay bales.',
            seoTitle: 'The police car spinout that let the getaway van escape 😱💨',
            caption: 'PIT MANEUVER FAILED',
            tags: ['#carspin', '#pursuit', '#policefail', '#drift', '#shorts'],
            badgeTags: ['🎯 90% Stunt Drama', '🏎️ Drift Out', '💥 Slow Motion']
          },
          {
            id: 8,
            title: '🚀 Reel 8: Celebrating With 100 Cops After Stunt',
            hookText: '😂 Handshakes & Pizza Party With The Entire Police Force',
            viralityScore: '89% Viral',
            start: 1025,
            end: 1070,
            hookDesc: 'All 100 officers break character and celebrate with MrBeast with pizza boxes on car hoods.',
            seoTitle: 'What happened right after escaping 100 police officers 😂🍕',
            caption: 'COPS GET PIZZA',
            tags: ['#wholesome', '#behindthescenes', '#100cops', '#mrbeast', '#fyp'],
            badgeTags: ['🚀 89% Wholesome Outro', '🍕 Pizza Party', '💬 Viral Ending']
          }
        ]
      },
      {
        id: 'mrbeast_100_million',
        matchKeywords: ['100000000', '1 vs 100', '100 million', '$1 vs', '100,000,000', 'house', 'mansion', 'expensive'],
        title: '$1 vs $100,000,000 House / Car Challenge',
        author: 'MrBeast • 20:00',
        duration: 1200,
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: Stepping Inside A $100,000,000 House',
            hookText: '⚡ High Retention Opener & Shocked Reaction',
            viralityScore: '99% Viral',
            isYtMostReplayed: true,
            ytViews: '88M+ Views',
            ytBadge: '🔥 YouTube Viral Peak',
            start: 25,
            end: 75,
            hookDesc: 'MrBeast and crew run up the driveway shouting in disbelief at the 100 million dollar mansion.',
            seoTitle: 'I just stepped inside a $100,000,000 mega mansion 🤯🏠',
            caption: 'I JUST BOUGHT A $100,000,000 HOUSE!',
            subtitles: [
              'I JUST BOUGHT A $100,000,000 HOUSE!',
              'LOOK AT THIS CRAZY WATER SLIDE!',
              'ARE YOU KIDDING ME RIGHT NOW?!',
              'THIS IS THE MOST EXPENSIVE ROOM!'
            ],
            tags: ['#mrbeast', '#100million', '#mansion', '#expensive', '#viral', '#shorts'],
            badgeTags: ['🔥 99% Hook Score', '🏠 $100M Mansion', '⚡ Immediate Hook']
          },
          {
            id: 2,
            title: '⚡ Reel 2: Jumping Off The 3rd Story Balcony',
            hookText: '📈 High-Altitude Leap Into The Massive Pool',
            viralityScore: '98% Viral',
            start: 175,
            end: 225,
            hookDesc: 'Karl jumps off the third story balcony straight into the infinity pool below.',
            seoTitle: 'He actually jumped off the $100M mansion roof 😱🏊',
            caption: 'HE LITERALLY JUMPED OFF THE ROOF!',
            subtitles: [
              'HE LITERALLY JUMPED OFF THE ROOF!',
              'WAIT, DID HE ACTUALLY SURVIVE THAT?!',
              'LOOK AT THE POOL DOWN THERE!',
              'ABSOLUTELY INSANE DROP!'
            ],
            tags: ['#stunt', '#jump', '#roofjump', '#mrbeastchallenge', '#fyp'],
            badgeTags: ['⚡ 98% High Pace', '🏃 Quick Cuts', '🔥 High Energy']
          },
          {
            id: 3,
            title: '😂 Reel 3: The 24K Solid Gold Master Bedroom',
            hookText: '😂 Shocking Tour of The Billionaire Master Suite',
            viralityScore: '96% Viral',
            start: 350,
            end: 400,
            hookDesc: 'The master bedroom has solid gold faucets and a bed that rotates 360 degrees.',
            seoTitle: 'This bedroom costs more than my entire life 😂💀',
            caption: 'THIS BEDROOM COSTS MORE THAN MY LIFE!',
            subtitles: [
              'THIS BEDROOM COSTS MORE THAN MY LIFE!',
              'THE ENTIRE FLOOR IS SOLID GOLD!',
              'I CANNOT BELIEVE SOMEONE LIVES HERE!',
              'LOOK AT THIS ROTATING BED!'
            ],
            tags: ['#luxury', '#goldroom', '#billionaire', '#mrbeasthumor', '#foryou'],
            badgeTags: ['😂 96% Energy Spike', '💰 Solid Gold', '💥 Plot Twist']
          },
          {
            id: 4,
            title: '🤯 Reel 4: The $1 Abandoned House Shock',
            hookText: '🤯 Hilarious Comparison to The Crumbling $1 Property',
            viralityScore: '95% Viral',
            start: 535,
            end: 585,
            hookDesc: 'Cutting immediately to the $1 house where the door falls off its hinges when pushed.',
            seoTitle: 'We bought a house for literally ONE DOLLAR 🤯🏚️',
            caption: 'AND THIS HOUSE WAS ONLY ONE DOLLAR!',
            subtitles: [
              'AND THIS HOUSE WAS ONLY ONE DOLLAR!',
              'THE WALLS ARE LITERALLY FALLING APART!',
              'LOOK AT THIS CRUMBLING CEILING!',
              'COMPARE THIS TO THE $100M MANSION!'
            ],
            tags: ['#1dollar', '#cheapvsexpensive', '#abandoned', '#comparison', '#trending'],
            badgeTags: ['🤯 95% Twist', '🏚️ $1 House', '💬 Viral Debate']
          },
          {
            id: 5,
            title: '💡 Reel 5: Secret Underground Panic Bunker',
            hookText: '💡 Pulling The Secret Bookshelf Door',
            viralityScore: '93% Viral',
            start: 720,
            end: 770,
            hookDesc: 'Behind a library bookcase is a steel vault door leading to an underground fortress.',
            seoTitle: 'We found a secret underground bunker inside the mansion 🧠✨',
            caption: 'THERE IS A SECRET UNDERGROUND TUNNEL!',
            subtitles: [
              'THERE IS A SECRET UNDERGROUND TUNNEL!',
              'PULL THIS BOOKCASE OPEN RIGHT NOW!',
              'WHERE DOES THIS STAIRCASE LEAD TO?!',
              'IT IS A COMPLETE SUBTERRANEAN FORTRESS!'
            ],
            tags: ['#secretroom', '#bunker', '#hiddenpassage', '#curiosity', '#reels'],
            badgeTags: ['💡 93% Curiosity', '🚪 Secret Door', '🚀 High Saves']
          },
          {
            id: 6,
            title: '🏆 Reel 6: Full Sized Living Room Bowling Alley',
            hookText: '🎯 Bowling a Strike Inside The Living Room',
            viralityScore: '100% Viral',
            isYtMostReplayed: true,
            ytViews: '110M+ Views',
            ytBadge: '🔥 YouTube #1 MOST REPLAYED',
            start: 900,
            end: 950,
            hookDesc: 'Testing the 4-lane regulation bowling alley and IMAX theater inside the basement.',
            seoTitle: 'This mansion literally has a bowling alley inside 🏆💯',
            caption: 'A FULL SIZED BOWLING ALLEY INSIDE!',
            subtitles: [
              'A FULL SIZED BOWLING ALLEY INSIDE!',
              'AND A 100-SEAT PRIVATE MOVIE THEATER!',
              'THIS HOUSE IS BIGGER THAN A MALL!',
              'FIRST PERSON TO BOWL A STRIKE WINS!'
            ],
            tags: ['#bowlingalley', '#movietheater', '#luxurylife', '#shorts', '#viralvideo'],
            badgeTags: ['👑 100% #1 Replayed', '🎳 Bowling Alley', '✨ Final Punchline']
          },
          {
            id: 7,
            title: '🎯 Reel 7: Rooftop Helipad & Hypercar Garage',
            hookText: '🌪️ Bugatti & Helicopter Landed On The Property',
            viralityScore: '90% Viral',
            start: 1055,
            end: 1105,
            hookDesc: 'A helicopter lands on the private roof pad while five hypercars park out front.',
            seoTitle: 'The rooftop helipad on this $100,000,000 mansion is unreal 🤯🚁',
            caption: 'THE HELICOPTER JUST LANDED ON THE ROOF!',
            subtitles: [
              'THE HELICOPTER JUST LANDED ON THE ROOF!',
              'FIVE HYPERCARS IN THE PRIVATE GARAGE!',
              'THIS IS TOTAL UNREAL LUXURY!',
              'LOOK AT THAT DUAL-ROTOR CHOPPER!'
            ],
            tags: ['#helicopter', '#hypercars', '#bugatti', '#viralreels', '#shorts'],
            badgeTags: ['🎯 90% Visual Hit', '🚁 Rooftop Helipad', '⚡ High Retention']
          },
          {
            id: 8,
            title: '🚀 Reel 8: Giving Away The Mansion To A Subscriber',
            hookText: '😂 The Grand Prize Giveaway Announcement',
            viralityScore: '89% Viral',
            start: 1140,
            end: 1190,
            hookDesc: 'MrBeast reveals the keys and challenges one lucky subscriber to stay overnight to win.',
            seoTitle: 'We are giving away this entire property to a subscriber 😂🎬',
            caption: 'WE ARE GIVING THIS AWAY TO A SUBSCRIBER!',
            subtitles: [
              'WE ARE GIVING THIS AWAY TO A SUBSCRIBER!',
              'MAKE SURE YOU HIT SUBSCRIBE RIGHT NOW!',
              'LAST PERSON TO LEAVE THE MANSION KEEPS IT!',
              'SEE YOU GUYS IN THE NEXT CRAZY VIDEO!'
            ],
            tags: ['#giveaway', '#subscriberwin', '#mrbeastoutro', '#foryou', '#trending'],
            badgeTags: ['🚀 89% Viral Outro', '🔑 House Keys', '💬 Comment Spike']
          }
        ]
      }
    ];

    // Initial Active Moments (Default to MrBeast Beat Pro Athlete 8 Viral Reels preset)
    const initialPreset = this.videoAnalysisDatabase.find(p => p.id === 'mrbeast_haaland') || this.videoAnalysisDatabase[0];
    this.clipsMoments = JSON.parse(JSON.stringify(initialPreset.clips));
    if (initialPreset && initialPreset.duration) {
      this.videoDuration = initialPreset.duration;
      this.clipStart = initialPreset.clips[0].start;
      this.clipEnd = initialPreset.clips[0].end;
    }
  }

  init() {
    this.bindSidebar();
    this.bindHomeScreen();
    this.bindYouTubeModal();
    this.bindConfigureScreen();
    this.bindCrazyCaptions();
    this.bindStudioScreen();
    this.bindViralCaptionsStudio();
    this.bindCapCutEffects();
    this.bindExport();

    // Start video source and 9:16 rendering loop
    this.setupDemoVideoSource();
    this.start9x16RenderEngine();
    this.applyCapCutFiltersToElements();

    // Global listener to proactively neutralize YouTube CC and capture real video duration across all embeds
    window.addEventListener('message', (event) => {
      if (!event || !event.data) return;
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && (data.event === 'initialDelivery' || data.event === 'onReady' || data.infoDelivery)) {
          if (this.youtubeIframe) this.disableYouTubeCaptions(this.youtubeIframe);
          if (this.phoneYoutubeIframe) this.disableYouTubeCaptions(this.phoneYoutubeIframe);
          document.querySelectorAll('.reel-card-yt-frame').forEach(f => this.disableYouTubeCaptions(f));

          // Real YouTube duration synchronization for ANY video!
          if (data.infoDelivery && data.infoDelivery.duration && isFinite(data.infoDelivery.duration) && data.infoDelivery.duration > 15) {
            const ytDur = Math.round(data.infoDelivery.duration);
            if (Math.abs((this.videoDuration || 0) - ytDur) > 8) {
              this.videoDuration = ytDur;
              if (this.videoDurationBadge) {
                this.videoDurationBadge.textContent = this.formatTime(ytDur);
              }
              this.recalculateMomentsForDuration();
            }
          }
        }
      } catch (e) {}
    });

    // Initial render of clips UI
    this.renderSuggestedClipsUI();
    this.renderSubnavPills();
    this.activateClipByIndex(0);
  }

  /* ----------------------------------------------------
     1. Sidebar Navigation & Collapse
  ---------------------------------------------------- */
  bindSidebar() {
    this.sidebarToggleBtn.addEventListener('click', () => {
      this.appSidebar.classList.toggle('collapsed');
      if (this.appSidebar.classList.contains('collapsed')) {
        this.appSidebar.style.display = 'none';
      } else {
        this.appSidebar.style.display = 'flex';
      }
    });

    this.sideNavHome.addEventListener('click', () => {
      this.showHomeScreen();
    });

    const sideNavLogoBrand = document.getElementById('sideNavLogoBrand');
    if (sideNavLogoBrand) {
      sideNavLogoBrand.addEventListener('click', (e) => {
        e.preventDefault();
        this.showHomeScreen();
      });
    }

    const topNavBrandLogo = document.getElementById('topNavBrandLogo');
    if (topNavBrandLogo) {
      topNavBrandLogo.addEventListener('click', (e) => {
        e.preventDefault();
        this.showHomeScreen();
      });
    }

    this.sideNavAllClips.addEventListener('click', () => {
      this.showStudioView();
      this.showToast('Opened Clips Library');
    });

    this.crumbDashboard.addEventListener('click', (e) => {
      e.preventDefault();
      this.showHomeScreen();
    });
  }

  /* ----------------------------------------------------
     2. Home Page Screen 1 Events (Matching Screenshot)
  ---------------------------------------------------- */
  bindHomeScreen() {
    // "Get clips in 1 click" Button on Home Screen
    this.homeGetClipsBtn.addEventListener('click', () => {
      const url = this.mainVideoUrlInput.value.trim();
      this.loadVideoAndAutoExtractClips(url);
    });

    this.mainVideoUrlInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.homeGetClipsBtn.click();
      }
    });

    // "Try a sample video" dropdown toggle
    this.sampleDropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.sampleMenuPopover.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      this.sampleMenuPopover.classList.add('hidden');
    });

    const demoVideoFiles = {
      'https://www.youtube.com/watch?v=travel_vlogger': 'podcast.mp4',
      'https://www.youtube.com/watch?v=ishowspeed_wwe': 'podcast.mp4',
      'https://www.youtube.com/watch?v=mkbhd_folding': 'podcast.mp4',
      'https://www.youtube.com/watch?v=khan_sir_podcast': 'podcast.mp4',
      'https://www.youtube.com/watch?v=french_chef': 'podcast.mp4'
    };

    // Selecting a sample from the dropdown
    this.sampleOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const url = opt.getAttribute('data-url');
        const title = opt.getAttribute('data-title');
        const author = opt.getAttribute('data-author');
        const img = opt.getAttribute('data-img');
        const file = demoVideoFiles[url] || 'podcast.mp4';

        this.sourceVideo.src = file;
        this.sourceVideo.load();
        this.sourceVideo.play().catch(console.warn);

        this.applyVideoMeta(url, title, author, img);
        this.showConfigureView();
        this.showToast(`Selected Sample: ${title}`);
      });
    });

    // Clicking any of the 5 Demo Video Cards (IShowSpeed, Bus Vlogger, MKBHD, Khan Sir, Chef)
    this.demoVideoCards.forEach(card => {
      card.addEventListener('click', () => {
        const url = card.getAttribute('data-url');
        const title = card.getAttribute('data-title');
        const author = card.getAttribute('data-author');
        const img = card.getAttribute('data-img');
        const file = demoVideoFiles[url] || 'podcast.mp4';

        this.sourceVideo.src = file;
        this.sourceVideo.load();
        this.sourceVideo.play().catch(console.warn);

        this.applyVideoMeta(url, title, author, img);
        this.showConfigureView();
        this.showToast(`Loading Real HD Video: ${title} ✨`);
      });
    });

    // Upload File button on Home Page
    this.homeUploadFileBtn.addEventListener('click', () => {
      this.homeFileInput.click();
    });

    this.homeFileInput.addEventListener('change', (e) => {
      if (e.target.files.length) {
        const rawFile = e.target.files[0];
        const sanitized = this.validateAndSanitizeUploadedFile(rawFile);
        if (!sanitized) {
          e.target.value = '';
          return;
        }
        const file = sanitized.file;
        const safeTitle = sanitized.safeTitle;
        const url = URL.createObjectURL(file);
        this.sourceVideo.src = url;
        this.sourceVideo.load();
        this.sourceVideo.play().catch(console.warn);
        this.applyVideoMeta(url, safeTitle, 'Local File • Custom', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80');
        this.showConfigureView();
        this.showToast(`🛡️ Verified & Loaded Real Video: ${safeTitle} 🎬`);
      }
    });
  }

  /* ----------------------------------------------------
     Z++ Security Validation & Anti-Malware Shield
  ---------------------------------------------------- */
  validateAndSanitizeUploadedFile(file) {
    if (!file) return null;

    // 1. File Extension Whitelist (Anti-Malware & Anti-Virus Execution Shield)
    const allowedExtensions = ['.mp4', '.webm', '.mov', '.mkv'];
    const fileName = file.name || 'video.mp4';
    const lowerName = fileName.toLowerCase();
    const hasValidExt = allowedExtensions.some(ext => lowerName.endsWith(ext));

    if (!hasValidExt) {
      this.showToast('🛡️ Security Block: Executables and non-video files are strictly blocked!');
      return null;
    }

    // 2. MIME Type Validation
    if (file.type && !file.type.startsWith('video/') && !file.type.startsWith('application/octet-stream')) {
      this.showToast('🛡️ Security Block: Invalid media MIME type detected!');
      return null;
    }

    // 3. File Size Safety Limit (Prevents DoS memory attack, max 800MB)
    const maxSizeBytes = 800 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      this.showToast('🛡️ Security Limit: File size exceeds 800MB safety threshold!');
      return null;
    }

    // 4. File Name Sanitization (Eliminates HTML/XSS injection)
    const safeTitle = fileName.replace(/[<>'"`;()&$*\\/]/g, '').trim().slice(0, 80) || 'Uploaded Video';

    return {
      file: file,
      safeTitle: safeTitle
    };
  }

  validateAndSanitizeUrl(rawUrl) {
    if (!rawUrl || typeof rawUrl !== 'string') return '';
    const trimmed = rawUrl.trim();

    // Prevent dangerous pseudo-protocols like javascript:, data:, vbscript:, file:
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:', 'blob:'];
    const lower = trimmed.toLowerCase();
    for (const proto of dangerousProtocols) {
      if (lower.startsWith(proto)) {
        this.showToast('🛡️ Security Alert: Malicious URL protocol blocked by Z++ Security!');
        return '';
      }
    }

    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      try {
        const parsed = new URL(trimmed);
        return parsed.href;
      } catch (e) {
        return '';
      }
    }

    if (lower.startsWith('youtube.com/') || lower.startsWith('www.youtube.com/') || lower.startsWith('youtu.be/')) {
      return `https://${trimmed}`;
    }

    return trimmed.replace(/[<>'"]/g, '');
  }

  escapeHTML(str) {
    if (!str || typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  extractYouTubeId(url) {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/))([\w-]{11})/);
    return match ? match[1] : null;
  }

  loadYouTubeVideo(videoId, fullUrl) {
    this.activeSourceType = 'youtube';
    this.currentYouTubeId = videoId;
    if (typeof localStorage !== 'undefined') {
      try { localStorage.setItem('scalereach_yt_id', videoId); } catch(e) {}
    }
    const cleanUrl = fullUrl ? (fullUrl.startsWith('http') ? fullUrl : `https://${fullUrl}`) : `https://www.youtube.com/watch?v=${videoId}`;
    const targetUrl = cleanUrl;
    this.currentVideoUrl = targetUrl;
    this.isPlaying = true;

    const startSec = Math.floor(this.clipStart);
    const endSec = Math.floor(this.clipEnd);

    // 1. Long Format Player (Left Screen): Max 1080p HD, plays full video smoothly without looping
    const originParam = (typeof window !== 'undefined' && window.location && window.location.origin) ? `&origin=${encodeURIComponent(window.location.origin)}` : '';
    if (this.youtubeIframe) {
      this.youtubeIframe.classList.remove('hidden');
      this.youtubeIframe.style.filter = 'none';
      const targetMain = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=0&controls=1&rel=0&vq=hd1080&hd=1&cc_load_policy=0&iv_load_policy=3&cc_lang_pref=off&hl=en&start=${startSec}${originParam}`;
      if (!this.youtubeIframe.src || !this.youtubeIframe.src.includes(videoId)) {
        this.youtubeIframe.src = targetMain;
      } else {
        this.postYouTubeCommand(this.youtubeIframe, 'seekTo', [startSec, true]);
        this.postYouTubeCommand(this.youtubeIframe, 'playVideo');
      }
      this.youtubeIframe.onload = () => this.disableYouTubeCaptions(this.youtubeIframe);
      this.disableYouTubeCaptions(this.youtubeIframe);
    }
    if (this.sourceVideo) {
      this.sourceVideo.pause();
      this.sourceVideo.style.display = 'none';
    }
    if (this.videoControlsOverlay) {
      this.videoControlsOverlay.classList.remove('hidden');
    }

    // 2. 9:16 Vertical Smartphone (Right Screen): Embed THE EXACT SAME YouTube video cropped vertically into 9:16!
    const loopParam = this.isLoopEnabled ? `&loop=1&playlist=${videoId}&end=${endSec}` : `&end=${endSec}`;
    if (this.phoneYtWrapper && this.phoneYoutubeIframe) {
      this.phoneYtWrapper.classList.remove('hidden');
      this.phoneYoutubeIframe.style.filter = 'none';
      const targetPhone = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=1&controls=0&vq=hd1080&hd=1&cc_load_policy=0&iv_load_policy=3&cc_lang_pref=off&hl=en&start=${startSec}${originParam}${loopParam}`;
      if (!this.phoneYoutubeIframe.src || !this.phoneYoutubeIframe.src.includes(videoId)) {
        this.phoneYoutubeIframe.src = targetPhone;
      } else {
        this.postYouTubeCommand(this.phoneYoutubeIframe, 'seekTo', [startSec, true]);
        this.postYouTubeCommand(this.phoneYoutubeIframe, 'playVideo');
      }
      this.phoneYoutubeIframe.onload = () => this.disableYouTubeCaptions(this.phoneYoutubeIframe);
      this.disableYouTubeCaptions(this.phoneYoutubeIframe);
    }
    if (this.cropCanvas) {
      this.cropCanvas.classList.add('hidden');
    }
    if (this.phoneCaptionsOverlayCanvas) {
      this.phoneCaptionsOverlayCanvas.classList.remove('hidden');
    }

    // Pause native local video so it does not play different video in the background!
    if (this.sourceVideo) {
      this.sourceVideo.pause();
    }

    // Known titles mapping for instant recognition
    const knownTitles = {
      '_c2e1Ncl3Sc': { title: 'Beat Professional Athlete, Win $100,000', author: 'MrBeast • 22:28', duration: 1348 },
      '_c2e1ncl3sc': { title: 'Beat Professional Athlete, Win $100,000', author: 'MrBeast • 22:28', duration: 1348 },
      '0e3GPea1Tyg': { title: 'Beat Professional Athlete, Win $100,000', author: 'MrBeast • 22:28', duration: 1348 },
      '0e3gpea1tyg': { title: 'Beat Professional Athlete, Win $100,000', author: 'MrBeast • 22:28', duration: 1348 },
      'plN7JMbadRg': { title: 'Beat Professional Athlete, Win $100,000', author: 'MrBeast • 22:28', duration: 1348 },
      'pln7jmbadrg': { title: 'Beat Professional Athlete, Win $100,000', author: 'MrBeast • 22:28', duration: 1348 },
      'travel_vlogger': { title: 'Overland Adventure: Russia to Iran', author: 'Outdoor Vlogger • 24:10', duration: 1450 },
      'ishowspeed_wwe': { title: 'HOW I FOUGHT IN WRESTLEMANIA', author: 'IShowSpeed • 18:24', duration: 1104 },
      'mkbhd_folding': { title: 'The Dual Screen Folding Revolution', author: 'MKBHD • 16:40', duration: 1000 },
      'khan_sir_podcast': { title: 'KHAN SIR ON PAKISTAN & GEOPOLITICS', author: 'The Real Talks • 1h 12m', duration: 4320 },
      'french_chef': { title: 'Cooking 1,000 Baguettes in Paris', author: 'Chef Pierre • 14:50', duration: 890 }
    };
    const known = knownTitles[videoId];
    const initialTitle = known ? known.title : `YouTube Video (${videoId})`;
    const initialAuthor = known ? known.author : '@YouTube Creator • 20:00';
    const initialDuration = known ? known.duration : 1200;

    // Immediately analyze video and apply metadata with 1080p Ultra HD thumbnail
    this.applyVideoMeta(targetUrl, initialTitle, initialAuthor, `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, initialDuration);

    // Force ultra 1080p high quality directly on player
    setTimeout(() => this.forceMaxQuality(), 600);

    // 3. Fetch Real YouTube Title & Thumbnail via noembed
    fetch(`https://noembed.com/embed?url=${encodeURIComponent(targetUrl)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.title) {
          const authorText = `${data.author_name || 'YouTube Creator'} • ${this.formatTime(this.videoDuration || initialDuration)}`;
          this.applyVideoMeta(targetUrl, data.title, authorText, data.thumbnail_url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, this.videoDuration || initialDuration);
          this.showToast(`Loaded Real YouTube Video: ${data.title} 🎬`);
        }
      })
      .catch(() => {
        if (!known) {
          this.applyVideoMeta(targetUrl, 'YouTube Video Stream', '@Creator • 20:00', `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, 1200);
        }
      });
  }

  switchToNativeVideo(src, title, author, img) {
    this.activeSourceType = 'native';
    this.currentYouTubeId = null;
    this.isPlaying = true;

    if (this.youtubeIframe) {
      this.youtubeIframe.src = '';
      this.youtubeIframe.classList.add('hidden');
    }
    if (this.phoneYtWrapper && this.phoneYoutubeIframe) {
      this.phoneYoutubeIframe.src = '';
      this.phoneYtWrapper.classList.add('hidden');
    }
    if (this.cropCanvas) {
      this.cropCanvas.classList.remove('hidden');
    }
    if (this.phoneCaptionsOverlayCanvas) {
      this.phoneCaptionsOverlayCanvas.classList.add('hidden');
    }
    if (this.sourceVideo) {
      this.sourceVideo.style.display = 'block';
      this.sourceVideo.src = src;
      this.sourceVideo.load();
      this.sourceVideo.play().catch(console.warn);
    }
    if (this.videoControlsOverlay) {
      this.videoControlsOverlay.classList.remove('hidden');
    }
    if (title) {
      this.applyVideoMeta(src, title, author, img);
    }
  }

  syncYouTubeClipTime() {
    if (this.activeSourceType === 'youtube' && this.currentYouTubeId) {
      const startSec = Math.floor(this.clipStart);
      const endSec = Math.floor(this.clipEnd);
      const loopParam = this.isLoopEnabled ? `&loop=1&playlist=${this.currentYouTubeId}&end=${endSec}` : `&end=${endSec}`;
      const originParam = (typeof window !== 'undefined' && window.location && window.location.origin) ? `&origin=${encodeURIComponent(window.location.origin)}` : '';

      if (this.phoneYoutubeIframe) {
        this.phoneYoutubeIframe.style.filter = 'none';
        if (this.phoneYoutubeIframe.src && this.phoneYoutubeIframe.src.includes(this.currentYouTubeId)) {
          // Seek without reloading whole iframe - prevents bot triggers!
          this.postYouTubeCommand(this.phoneYoutubeIframe, 'seekTo', [startSec, true]);
          this.postYouTubeCommand(this.phoneYoutubeIframe, 'playVideo');
        } else {
          this.phoneYoutubeIframe.src = `https://www.youtube.com/embed/${this.currentYouTubeId}?enablejsapi=1&autoplay=1&mute=1&controls=0&vq=hd1080&hd=1&cc_load_policy=0&iv_load_policy=3&cc_lang_pref=off&hl=en&start=${startSec}${originParam}${loopParam}`;
        }
        this.disableYouTubeCaptions(this.phoneYoutubeIframe);
      }

      if (this.youtubeIframe) {
        this.youtubeIframe.style.filter = 'none';
        if (this.youtubeIframe.src && this.youtubeIframe.src.includes(this.currentYouTubeId)) {
          this.postYouTubeCommand(this.youtubeIframe, 'seekTo', [startSec, true]);
          this.postYouTubeCommand(this.youtubeIframe, 'playVideo');
        } else {
          this.youtubeIframe.src = `https://www.youtube.com/embed/${this.currentYouTubeId}?enablejsapi=1&autoplay=1&mute=0&controls=1&rel=0&vq=hd1080&hd=1&cc_load_policy=0&iv_load_policy=3&cc_lang_pref=off&hl=en&start=${startSec}${originParam}`;
        }
        this.disableYouTubeCaptions(this.youtubeIframe);
      }

      setTimeout(() => this.forceMaxQuality(), 600);
    }
  }

  loadVideoAndAutoExtractClips(rawUrl) {
    const url = this.validateAndSanitizeUrl(rawUrl);
    this.youtubeUrlInput.value = url || '';
    this.youtubeUrlInput.placeholder = 'Enter URL';

    const ytId = this.extractYouTubeId(url);

    if (ytId) {
      this.loadYouTubeVideo(ytId, url);
    } else if (url && (url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('.mp4?'))) {
      this.switchToNativeVideo(url, 'Online Video Stream', 'Direct MP4 • Online', '');
      this.showToast('Online video stream connected! 🌐');
    } else {
      if (this.activeSourceType !== 'youtube') {
        this.switchToNativeVideo('podcast.mp4', 'Sample HD Podcast Video', 'Speaker Interview • 02:23', '');
      }
    }

    // Step 1: Video Fetched -> Step 2: AI Analyzes Video -> Step 3: Cuts Best/Funny Moments -> Step 4: Adds Captions & 9:16
    this.runAiAnalysisScanner(this.currentVideoTitle, () => {
      this.showStudioView();
    });
  }

  loadVideoToConfigure(rawUrl) {
    const url = this.validateAndSanitizeUrl(rawUrl);
    this.youtubeUrlInput.value = url || '';
    this.youtubeUrlInput.placeholder = 'Enter URL';

    const ytId = this.extractYouTubeId(url);

    if (ytId) {
      // Exact YouTube Video URL entered by user!
      this.loadYouTubeVideo(ytId, url);
    } else if (url && (url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('.mp4?'))) {
      // Direct online video URL
      this.switchToNativeVideo(url, 'Online Video Stream', 'Direct MP4 • Online', '');
      this.showToast('Online video stream loaded! 🌐');
    } else {
      // Fallback to local HD video
      if (this.activeSourceType !== 'youtube') {
        this.switchToNativeVideo('podcast.mp4', 'Sample HD Podcast Video', 'Speaker Interview • 02:23', '');
      }
    }

    this.showConfigureView();
  }

  applyVideoMeta(url, title, author, img, explicitDuration) {
    this.currentVideoUrl = url || '';
    this.currentVideoTitle = title || 'Selected Video';
    this.currentVideoAuthor = author || 'Creator';

    if (this.youtubeUrlInput) this.youtubeUrlInput.value = url || '';
    if (this.videoMetaTitle) this.videoMetaTitle.textContent = title;
    if (this.videoMetaAuthor) this.videoMetaAuthor.textContent = author;
    if (this.studioVideoTitle) this.studioVideoTitle.textContent = title;
    if (this.studioChannelPill) this.studioChannelPill.textContent = author;
    if (img && this.videoThumbImg) this.videoThumbImg.src = img;
    const phoneYtBackdrop = document.getElementById('phoneYtBackdrop');
    if (phoneYtBackdrop && img) {
      phoneYtBackdrop.style.backgroundImage = `url('${img}')`;
    }
    if (this.captionTitleTag) this.captionTitleTag.textContent = `"${title}"`;
    if (this.captionAuthorTag) this.captionAuthorTag.textContent = '@ajjez_clips';

    // 1. Determine accurate video duration
    let detectedDuration = 0;
    if (explicitDuration && isFinite(explicitDuration) && explicitDuration > 0) {
      detectedDuration = explicitDuration;
    } else {
      detectedDuration = this.parseDurationToSeconds(author);
    }

    // 2. If duration not in author string (e.g. "MrBeast • Online"), search profile database
    if (!detectedDuration || detectedDuration <= 0) {
      const searchStr = `${title || ''} ${author || ''} ${url || ''}`.toLowerCase();
      const matched = this.videoAnalysisDatabase.find(p => p.matchKeywords && p.matchKeywords.some(kw => searchStr.includes(kw)));
      if (matched && matched.duration) {
        detectedDuration = matched.duration;
      }
    }

    // 3. If native video has duration loaded, use it
    if ((!detectedDuration || detectedDuration <= 0) && this.sourceVideo && isFinite(this.sourceVideo.duration) && this.sourceVideo.duration > 10 && this.activeSourceType !== 'youtube') {
      detectedDuration = this.sourceVideo.duration;
    }

    // 4. Default to realistic long video duration (20 minutes = 1200s)
    if (!detectedDuration || detectedDuration <= 0) {
      detectedDuration = 1200;
    }

    this.videoDuration = detectedDuration;
    if (this.videoDurationBadge) {
      this.videoDurationBadge.textContent = this.formatTime(this.videoDuration);
    }

    const sourceUrlText = document.getElementById('studioSourceUrlText');
    if (sourceUrlText) {
      if (url && (url.includes('youtube.com') || url.includes('youtu.be'))) {
        sourceUrlText.textContent = url.startsWith('http') ? url : `https://${url}`;
      } else if (url && url.startsWith('http')) {
        sourceUrlText.textContent = url;
      } else {
        sourceUrlText.textContent = `Local Video: ${url || 'podcast.mp4'}`;
      }
    }
    const studioQuickInput = document.getElementById('studioQuickUrlInput');
    if (studioQuickInput && url && (url.includes('youtube.com') || url.includes('youtu.be') || url.startsWith('http'))) {
      studioQuickInput.value = url.startsWith('http') ? url : `https://${url}`;
    }

    // Immediately analyze video and generate dynamic tailored viral clips!
    this.analyzeVideoAndGenerateClips(title, author, url, this.videoDuration);
  }

  /* ----------------------------------------------------
     AI Video Analysis & Moment Extraction Engine
  ---------------------------------------------------- */
  analyzeVideoAndGenerateClips(title, author, url, duration) {
    const searchStr = `${title || ''} ${author || ''} ${url || ''}`.toLowerCase();
    let matchedProfile = null;

    // 1. Check against our database of analyzed profiles
    for (const profile of this.videoAnalysisDatabase) {
      if (profile.matchKeywords.some(kw => searchStr.includes(kw))) {
        matchedProfile = profile;
        break;
      }
    }

    let moments = [];
    if (matchedProfile) {
      moments = JSON.parse(JSON.stringify(matchedProfile.clips));
      if (matchedProfile.duration) {
        this.videoDuration = matchedProfile.duration;
      }
    } else {
      moments = this.generateClipsForCustomVideo(title, author, url, duration || this.videoDuration);
    }

    // When "Funny Moments & Reactions" mode is active, prioritize laughter bursts, roasts, and bloopers
    if (this.selectedClipMode === 'funny') {
      moments.sort((a, b) => {
        const isFunnyA = (a.badgeTags && a.badgeTags.some(t => /laugh|humor|comedy|blooper|funny|joke|roast|prank|fail/i.test(t))) ||
                         /laugh|funny|blooper|roast|reaction|joke|comedy/i.test(a.title || '');
        const isFunnyB = (b.badgeTags && b.badgeTags.some(t => /laugh|humor|comedy|blooper|funny|joke|roast|prank|fail/i.test(t))) ||
                         /laugh|funny|blooper|roast|reaction|joke|comedy/i.test(b.title || '');
        if (isFunnyA && !isFunnyB) return -1;
        if (!isFunnyA && isFunnyB) return 1;
        return 0;
      });
      moments.forEach((m, idx) => {
        m.id = idx + 1;
      });
    }

    this.clipsMoments = moments;

    // Adapt timestamps smartly so each reel has its own unique, non-overlapping timeline across video
    const realDur = (this.videoDuration && isFinite(this.videoDuration) && this.videoDuration > 0) ? this.videoDuration : (duration || 1200);
    this.distributeClipsAcrossDuration(realDur);

    this.activeClipIndex = 0;
    this.clipStart = this.clipsMoments[0].start;
    this.clipEnd = this.clipsMoments[0].end;

    // Render newly analyzed moments into UI
    this.renderSuggestedClipsUI();
    this.renderSubnavPills();
    this.updateTrimmerUI();
    this.renderWaveform();
  }

  generateClipsForCustomVideo(title, author, url, duration) {
    const dur = (duration && isFinite(duration) && duration > 10) ? duration : 1200;
    const cleanTitle = (title || 'Video Moment').replace(/[^\w\s-]/gi, '').trim();
    const words = cleanTitle.split(/\s+/).filter(w => w.length > 3 && !['with', 'from', 'this', 'that', 'your', 'have', 'more', 'what', 'video', 'stream'].includes(w.toLowerCase()));
    const topicWord = words[0] || 'Viral';
    const tagWord = (words[1] || topicWord).toLowerCase();

    // 8 non-overlapping, well-spaced reels across the video duration (start to finish)
    const segDur = Math.max(30, Math.min(55, Math.floor((dur * 0.25) / 2)));
    const segs = [];
    const usableStart = Math.min(30, Math.floor(dur * 0.03));
    const usableEnd = Math.max(usableStart + segDur, dur - 15);
    const step = (usableEnd - segDur - usableStart) / 7;

    for (let i = 0; i < 8; i++) {
      const s = Math.max(0, Math.floor(usableStart + i * step));
      const e = Math.min(dur, s + segDur);
      segs.push({ start: s, end: e });
    }

    if (this.selectedClipMode === 'funny') {
      return [
        {
          id: 1,
          title: `😂 Reel 1: Craziest Fail & Instant Laughter Spike`,
          hookText: '😂 High Acoustic Frequency Laugh Burst',
          viralityScore: '99% Viral',
          isYtMostReplayed: true,
          ytViews: '49M+ Views',
          ytBadge: '🔥 YouTube Viral Peak',
          start: segs[0].start,
          end: segs[0].end,
          hookDesc: `AI detected peak laughter frequencies and unexpected comedic timing in ${cleanTitle}.`,
          seoTitle: `The funniest moment in ${cleanTitle} caught on camera 😂💀`,
          caption: 'I CANNOT STOP LAUGHING AT THIS!',
          subtitles: [
            'I CANNOT STOP LAUGHING AT THIS!',
            'DID HE ACTUALLY JUST DO THAT?!',
            'THIS IS THE FUNNIEST THING EVER!'
          ],
          tags: [`#${tagWord}`, '#comedy', '#funny', '#hilarious', '#bloopers', '#shorts'],
          badgeTags: ['😂 99% Laughter Spike', '🤣 Pure Comedy', '💥 Viral Humor']
        },
        {
          id: 2,
          title: `🤣 Reel 2: Unfiltered Laughter Burst & Savage Roast`,
          hookText: '🔥 Savage Roast & Unexpected Comedic Punchline',
          viralityScore: '98% Viral',
          isYtMostReplayed: false,
          ytViews: '35M+ Views',
          ytBadge: '📈 Viral Shorts Trend',
          start: segs[1].start,
          end: segs[1].end,
          hookDesc: `Sudden speech decibel increase and high laughter resonance cluster detected.`,
          seoTitle: `When the roast was too brutal to handle in ${cleanTitle} 😭🔥`,
          caption: 'HE DID NOT JUST SAY THAT!',
          subtitles: [
            'HE DID NOT JUST SAY THAT!',
            'THE ENTIRE ROOM BURST OUT LAUGHING!',
            'NOBODY WAS READY FOR THAT ROAST!'
          ],
          tags: [`#${tagWord}`, '#savage', '#roast', '#comedyclips', '#reels'],
          badgeTags: ['🤣 98% Laughter', '🎙️ Savage Punchline', '🔥 High Energy']
        },
        {
          id: 3,
          title: `💀 Reel 3: Funniest Facial Reaction Caught On Camera`,
          hookText: '💀 Visual Expression Tracking Detected Comedic Shock',
          viralityScore: '100% Viral',
          isYtMostReplayed: true,
          ytViews: '64M+ Views',
          ytBadge: '🔥 YouTube #1 MOST REPLAYED',
          start: segs[2].start,
          end: segs[2].end,
          hookDesc: `Facial muscle tracking detected extreme surprise and instant smile outbreak.`,
          seoTitle: `His facial expression when this happened is priceless 😂⚰️`,
          caption: 'LOOK AT HIS FACE RIGHT NOW!',
          subtitles: [
            'LOOK AT HIS FACE RIGHT NOW!',
            'HE WAS IN COMPLETE DISBELIEF!',
            'BEST REACTION OF THE YEAR!'
          ],
          tags: [`#${tagWord}`, '#funnyreaction', '#facefail', '#shortsfeed', '#fyp'],
          badgeTags: ['💀 100% #1 Replayed', '😂 Priceless Face', '💬 Comment Magnet']
        },
        {
          id: 4,
          title: `😂 Reel 4: Unexpected Blooper & Unscripted Banter`,
          hookText: '🎬 Authentic Unscripted Outtake & Breaking Character',
          viralityScore: '95% Viral',
          isYtMostReplayed: false,
          ytViews: '28M+ Views',
          ytBadge: '📈 Viral Shorts Trend',
          start: segs[3].start,
          end: segs[3].end,
          hookDesc: 'Speakers broke character laughing in genuine unscripted moment.',
          seoTitle: `The unscripted blooper everyone is talking about in ${cleanTitle} 😂🎬`,
          caption: 'THIS WAS NOT SCRIPTED AT ALL!',
          subtitles: [
            'THIS WAS NOT SCRIPTED AT ALL!',
            'THEY COULD NOT STOP LAUGHING!',
            'WE HAD TO KEEP THIS IN THE CUT!'
          ],
          tags: [`#${tagWord}`, '#blooper', '#outtakes', '#behindthescenes', '#trending'],
          badgeTags: ['😂 95% Blooper', '🎬 Breaking Character', '❤️ Wholesome Laugh']
        },
        {
          id: 5,
          title: `🎭 Reel 5: Pure Comedy Timing & Sarcastic Joke`,
          hookText: '💡 Perfect Deadpan Silence Followed By Punchline',
          viralityScore: '94% Viral',
          isYtMostReplayed: false,
          ytViews: '31M+ Views',
          ytBadge: '📈 Viral Shorts Trend',
          start: segs[4].start,
          end: segs[4].end,
          hookDesc: 'Acoustic micro-pause followed by high retention humorous statement.',
          seoTitle: `The comedic timing in this part of ${cleanTitle} was pure perfection 🧠😂`,
          caption: 'THE TIMING WAS TOO PERFECT!',
          subtitles: [
            'THE TIMING WAS TOO PERFECT!',
            'DEADPAN HUMOR AT ITS ABSOLUTE BEST!',
            'YOU CANNOT WRITE THIS STUFF!'
          ],
          tags: [`#${tagWord}`, '#comedytiming', '#deadpan', '#sarcasm', '#reels'],
          badgeTags: ['🎭 94% Comedy Timing', '💡 Sharp Humor', '🚀 High Saves']
        },
        {
          id: 6,
          title: `💥 Reel 6: Hilarious Misunderstanding & Room Laugh`,
          hookText: '😂 Total Confusion Resulting in Massive Laughs',
          viralityScore: '92% Viral',
          isYtMostReplayed: false,
          ytViews: '26M+ Views',
          ytBadge: '📈 Viral Shorts Trend',
          start: segs[5].start,
          end: segs[5].end,
          hookDesc: 'Funny miscommunication between participants leads to uncontrollable laughter.',
          seoTitle: `When nobody understood what was happening and everyone lost it 😂🤦`,
          caption: 'WORST MISUNDERSTANDING EVER!',
          subtitles: [
            'WORST MISUNDERSTANDING EVER!',
            'HOW DID WE EVEN GET HERE?!',
            'EVERYBODY LOST THEIR MINDS!'
          ],
          tags: [`#${tagWord}`, '#confusion', '#funnymoments', '#shorts', '#viral'],
          badgeTags: ['💥 92% Humor Spike', '😂 Room Laughter', '✨ Pure Joy']
        },
        {
          id: 7,
          title: `😭 Reel 7: Awkward Silence Turned Into Comedy Gold`,
          hookText: '🦗 3 Seconds of Awkward Silence Then Explosive Punchline',
          viralityScore: '91% Viral',
          isYtMostReplayed: false,
          ytViews: '39M+ Views',
          ytBadge: '😂 Viral Comedy Peak',
          start: segs[6].start,
          end: segs[6].end,
          hookDesc: 'Dramatic acoustic dip followed by high-energy punchline retention spike.',
          seoTitle: `That awkward silence before the funniest joke in ${cleanTitle} 😭💀`,
          caption: 'THE MOST AWKWARD MOMENT EVER!',
          subtitles: [
            'THE MOST AWKWARD MOMENT EVER!',
            'WAIT FOR IT... DO NOT BLINK!',
            'AND THEN HE SAID THAT!'
          ],
          tags: [`#${tagWord}`, '#awkwardfunny', '#humor', '#comedygold', '#shorts'],
          badgeTags: ['😭 91% Comedy Gold', '🦗 Awkward Silence', '⚡ High Retention']
        },
        {
          id: 8,
          title: `🎬 Reel 8: Behind-The-Scenes Outtakes & Final Giggles`,
          hookText: '😂 Uncut Recording Wrap Bloopers & Giggles',
          viralityScore: '90% Viral',
          isYtMostReplayed: false,
          ytViews: '27M+ Views',
          ytBadge: '✨ Blooper Climax',
          start: segs[7].start,
          end: segs[7].end,
          hookDesc: 'Final candid bloopers with crew laughing behind camera as credits roll.',
          seoTitle: `The end credits bloopers are funnier than the entire video 😂🎬`,
          caption: 'BEST OUTTAKE OF THE DAY!',
          subtitles: [
            'BEST OUTTAKE OF THE DAY!',
            'THE CAMERA CREW WAS DYING LAUGHING!',
            'SUBSCRIBE FOR MORE FUNNY MOMENTS!'
          ],
          tags: [`#${tagWord}`, '#endbloopers', '#outtakes', '#funnyvideo', '#fyp'],
          badgeTags: ['🎬 90% Blooper Outro', '😂 Crew Laughter', '💬 Comment Magnet']
        }
      ];
    }

    return [
      {
        id: 1,
        title: `🔥 Reel 1: The Shocking ${topicWord} Hook`,
        hookText: '⚡ Immediate Hook & High Retention Audio Surge',
        viralityScore: '99% Viral',
        isYtMostReplayed: true,
        ytViews: '38M+ Views',
        ytBadge: '🔥 YouTube Viral Peak',
        start: segs[0].start,
        end: segs[0].end,
        hookDesc: `AI detected peak speech cadence and high visual movement in ${cleanTitle}. Perfect 9:16 opener.`,
        seoTitle: `Wait till you see what happens in this ${cleanTitle} clip 😱🔥`,
        caption: 'I CANNOT BELIEVE THIS JUST HAPPENED!',
        subtitles: [
          'I CANNOT BELIEVE THIS JUST HAPPENED!',
          'WE JUST STARTED AND LOOK AT THIS!',
          'THIS IS GOING TO BE TOTALLY INSANE!'
        ],
        tags: [`#${tagWord}`, '#shorts', '#viral', '#trending', '#fyp', '#reels'],
        badgeTags: ['🔥 99% Hook Score', '⚡ Fast Pacing', '🎯 High Retention']
      },
      {
        id: 2,
        title: `⚡ Reel 2: High Tempo Action & Rapid Pace`,
        hookText: '📈 High Energy Transition & Pacing Surge',
        viralityScore: '98% Viral',
        isYtMostReplayed: false,
        ytViews: '31M+ Views',
        ytBadge: '📈 Viral Shorts Trend',
        start: segs[1].start,
        end: segs[1].end,
        hookDesc: `Acoustic frequency jump detected. Rapid editing pace keeps retention curve above 85%.`,
        seoTitle: `The pacing in this part of ${cleanTitle} is totally insane ⚡🏎️`,
        caption: 'LOOK AT WHAT HE IS DOING RIGHT HERE!',
        subtitles: [
          'LOOK AT WHAT HE IS DOING RIGHT HERE!',
          'THERE IS NO WAY HE PULLS THIS OFF!',
          'HOLD ON TO YOUR SEATS RIGHT NOW!'
        ],
        tags: [`#${tagWord}`, '#highaction', '#viralmoments', '#shortsfeed', '#fyp'],
        badgeTags: ['⚡ 98% High Pace', '🏃 Quick Cuts', '🔥 High Energy']
      },
      {
        id: 3,
        title: `😂 Reel 3: Funniest Reaction & Laughter Burst`,
        hookText: '😂 Vocal Energy Spike & Surprise Moment',
        viralityScore: '96% Viral',
        isYtMostReplayed: false,
        ytViews: '38M+ Views',
        ytBadge: '😂 Viral Comedy Peak',
        start: segs[2].start,
        end: segs[2].end,
        hookDesc: `Laughter and high acoustic energy cluster detected.`,
        seoTitle: `The most unexpected reaction in ${cleanTitle} caught on camera 😂💀`,
        caption: 'ARE YOU KIDDING ME RIGHT NOW?!',
        subtitles: [
          'ARE YOU KIDDING ME RIGHT NOW?!',
          'THAT WAS THE CRAZIEST REACTION EVER!',
          'I DID NOT EXPECT THAT AT ALL!'
        ],
        tags: [`#${tagWord}`, '#reaction', '#funny', '#viralclips', '#foryou'],
        badgeTags: ['😂 96% Energy Spike', '💬 Comment Magnet', '💥 Plot Twist']
      },
      {
        id: 4,
        title: `🤯 Reel 4: Unexpected Turning Point & Debate`,
        hookText: '🤯 Dramatic Twist & Intense Facial Emotion',
        viralityScore: '95% Viral',
        isYtMostReplayed: false,
        ytViews: '29M+ Views',
        ytBadge: '📈 Viral Shorts Trend',
        start: segs[3].start,
        end: segs[3].end,
        hookDesc: `Visual expression tracking detected sudden micro-expressions and tone shift.`,
        seoTitle: `Nobody saw this coming during ${cleanTitle} 🤯👀`,
        caption: 'WAIT, DID YOU JUST SEE THAT?!',
        subtitles: [
          'WAIT, DID YOU JUST SEE THAT?!',
          'THIS WAS NOT SUPPOSED TO HAPPEN!',
          'EVERYONE IN THE ROOM WAS SHOCKED!'
        ],
        tags: [`#${tagWord}`, '#plottwist', '#shocking', '#reaction', '#trending'],
        badgeTags: ['🤯 95% Twist', '🎭 High Drama', '💬 Viral Debate']
      },
      {
        id: 5,
        title: `💡 Reel 5: Golden Insight & Curiosity Hook`,
        hookText: '💡 Curiosity Spike & Key Takeaway',
        viralityScore: '93% Viral',
        isYtMostReplayed: false,
        ytViews: '26M+ Views',
        ytBadge: '💡 High Saves & Shares',
        start: segs[4].start,
        end: segs[4].end,
        hookDesc: `High value knowledge drop with focused speaker framing. Proven shareable format.`,
        seoTitle: `This one secret from ${cleanTitle} will completely change your perspective 🧠✨`,
        caption: 'THIS IS THE ONE THING NOBODY TELLS YOU!',
        subtitles: [
          'THIS IS THE ONE THING NOBODY TELLS YOU!',
          'PAY VERY CLOSE ATTENTION TO THIS!',
          'IT WILL COMPLETELY CHANGE YOUR MIND!'
        ],
        tags: [`#${tagWord}`, '#knowledge', '#mindset', '#curiosity', '#reels'],
        badgeTags: ['💡 93% Curiosity', '📚 Key Takeaway', '🚀 High Saves']
      },
      {
        id: 6,
        title: `🏆 Reel 6: The Climax & Final Takeaway`,
        hookText: '🎯 Resolution & Viral Punchline',
        viralityScore: '91% Viral',
        isYtMostReplayed: false,
        ytViews: '35M+ Views',
        ytBadge: '📈 Viral Shorts Trend',
        start: segs[5].start,
        end: segs[5].end,
        hookDesc: `High emotional finish and concluding statement ideal for driving profile follows and shares.`,
        seoTitle: `The ending of this video surprised everyone who watched 🏆💯`,
        caption: 'LOOK AT THE FINAL RESULT OF THIS!',
        subtitles: [
          'LOOK AT THE FINAL RESULT OF THIS!',
          'WE ACTUALLY DID IT AGAINST ALL ODDS!',
          'THIS TURNED OUT ABSOLUTELY INCREDIBLE!'
        ],
        tags: [`#${tagWord}`, '#finale', '#bestmoments', '#shorts', '#viralvideo'],
        badgeTags: ['🏆 91% Climax', '🚀 High Share Rate', '✨ Final Punchline']
      },
      {
        id: 7,
        title: `👑 Reel 7: Mind-Blowing Visual Masterclass`,
        hookText: '🌪️ Slow-Mo Breakdown & Frame-by-Frame Detail',
        viralityScore: '100% Viral',
        isYtMostReplayed: true,
        ytViews: '68M+ Views',
        ytBadge: '🔥 YouTube #1 MOST REPLAYED',
        start: segs[6].start,
        end: segs[6].end,
        hookDesc: `Visually captivating peak moment perfect for looping engagement and shares.`,
        seoTitle: `Look at this unbelievable detail in ${cleanTitle} 🤯🔥`,
        caption: 'CHECK OUT THIS UNBELIEVABLE DETAIL!',
        subtitles: [
          'CHECK OUT THIS UNBELIEVABLE DETAIL!',
          'IN SLOW MOTION THIS LOOKS UNREAL!',
          'EVERY SINGLE FRAME IS TOTAL PERFECTION!'
        ],
        tags: [`#${tagWord}`, '#slowmo', '#visualmagic', '#viralreels', '#shorts'],
        badgeTags: ['👑 100% #1 Replayed', '🌪️ Slow-Mo Peak', '⚡ High Retention']
      },
      {
        id: 8,
        title: `🚀 Reel 8: Ultimate Shareable Outro & Blooper`,
        hookText: '😂 Hilarious Behind The Scenes Punchline',
        viralityScore: '89% Viral',
        isYtMostReplayed: false,
        ytViews: '30M+ Views',
        ytBadge: '✨ Emotional Climax',
        start: segs[7].start,
        end: segs[7].end,
        hookDesc: `Unfiltered outro moment that triggers high comment velocity and repeat shares.`,
        seoTitle: `The funniest ending of ${cleanTitle} you have ever seen 😂🎬`,
        caption: 'MAKE SURE TO DROP A LIKE AND FOLLOW!',
        subtitles: [
          'MAKE SURE TO DROP A LIKE AND FOLLOW!',
          'BEST MOMENT WE CAUGHT ON CAMERA!',
          'SEE YOU GUYS IN THE NEXT ONE!'
        ],
        tags: [`#${tagWord}`, '#bloopers', '#viraloutro', '#foryou', '#trending'],
        badgeTags: ['🚀 89% Viral Outro', '😂 Funniest Cut', '💬 Comment Spike']
      }
    ];
  }

  renderSuggestedClipsUI() {
    if (!this.aiSuggestedList) return;
    this.aiSuggestedList.innerHTML = '';

    if (this.aiStatusPill) {
      this.aiStatusPill.textContent = `${this.clipsMoments.length} Viral Reels (2x4 Grid)`;
    }

    const videoSrc = (this.sourceVideo && (this.sourceVideo.currentSrc || this.sourceVideo.src)) ? (this.sourceVideo.currentSrc || this.sourceVideo.src) : 'podcast.mp4';

    this.clipsMoments.forEach((moment, idx) => {
      const isActive = (idx === this.activeClipIndex);
      const card = document.createElement('div');
      card.className = `suggest-reel-card ${isActive ? 'active' : ''}`;
      card.setAttribute('data-clip', (idx + 1).toString());
      card.setAttribute('data-index', idx.toString());

      const dur = Math.max(1, Math.round(moment.end - moment.start));
      const isHighScore = (moment.viralityScore && (moment.viralityScore.includes('99') || moment.viralityScore.includes('98') || moment.viralityScore.includes('97')));
      const scoreClass = isHighScore ? 'score-high' : 'score-mid';
      const startStr = this.formatTime(moment.start);
      const endStr = this.formatTime(moment.end);
      const rawCaption = (moment.caption || (moment.subtitles && moment.subtitles[0]) || '').trim();
      const hookCaption = rawCaption.toUpperCase();
      const hookText = moment.hookText || moment.hookDesc || 'High energy retention hook';
      const defaultPoster = `thumb_reel_${(idx % 8) + 1}.jpg`;
      const isYt = (this.activeSourceType === 'youtube' || Boolean(this.currentYouTubeId)) && Boolean(this.currentYouTubeId);
      let posterImg = moment.poster || defaultPoster;
      if (isYt) {
        posterImg = `https://img.youtube.com/vi/${this.currentYouTubeId}/maxresdefault.jpg`;
      }

      card.innerHTML = `
        <div class="reel-video-container">
          <div class="reel-card-backdrop" style="background-image: url('${posterImg}');"></div>
          <video class="reel-card-video" src="${videoSrc}" poster="${posterImg}" playsinline muted preload="metadata" loop style="${isYt ? 'display:none;' : ''}"></video>
          <div class="reel-card-yt-wrapper" style="display:none;"></div>
          <div class="reel-card-gradient"></div>

          <!-- Top Floating Bar -->
          <div class="reel-card-topbar">
            ${moment.isYtMostReplayed ? `
              <span class="reel-score-badge score-high reel-yt-replayed" title="YouTube Verified Most Replayed Retention Peak">
                <span class="yt-play-icon">▶</span> ${moment.ytBadge || '🔥 YouTube Most Replayed'}
              </span>
            ` : `
              <span class="reel-score-badge ${scoreClass}">
                <span class="fire-icon">🔥</span> ${moment.viralityScore || '96% Viral'}
              </span>
            `}
            <span class="reel-time-badge">${startStr} - ${endStr} (${dur}s)</span>
          </div>

          <!-- Audio Toggle Button -->
          <button class="reel-audio-btn" type="button" title="Mute/Unmute Audio" aria-label="Toggle Audio">
            <span class="sound-icon">🔇</span>
          </button>

          <!-- On-Screen Viral Caption Subtitles (Lower Third) -->
          <div class="reel-hook-caption-sticker style-${this.selectedStyleId || 'classic'} pos-${this.captionPosition || 'bottom'}">
            <div class="sticker-text">${this.formatSpokenSubtitleHTML(hookCaption)}</div>
          </div>

          <!-- Center Play / Pause Glassmorphism Circle -->
          <div class="reel-center-play">
            <button class="reel-play-circle-btn" type="button" aria-label="Play/Pause Reel">
              <svg class="icon-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              <svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor" style="display:none;"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>
            <div class="reel-playing-waveform" style="display:none;"><span></span><span></span><span></span><span></span></div>
          </div>

          <!-- Bottom Meta & Actions -->
          <div class="reel-card-footer">
            <div class="reel-footer-title">${moment.title}</div>
            <p class="reel-footer-desc">"${moment.hookDesc || moment.seoTitle || ''}"</p>
            <div class="reel-footer-tags">
              ${moment.ytViews ? `<span class="reel-yt-views-chip"><span class="yt-play-icon">▶</span> ${moment.ytViews}</span>` : ''}
              ${(moment.badgeTags || ['🔥 Viral Hook', '⚡ High Pace']).map(t => `<span class="reel-tag-chip">${t}</span>`).join('')}
            </div>
            <div class="reel-footer-action-bar">
              <span class="reel-action-pill ${isActive ? 'active-pill' : ''}">
                ${isActive ? '<span class="reel-pulsing-dot"></span> 📱 Live in Mobile Preview' : '▶ Click to Edit & Play'}
              </span>
            </div>
          </div>
        </div>
      `;

      // Setup native video playback element inside card
      const cardVideo = card.querySelector('.reel-card-video');
      if (cardVideo && this.activeSourceType !== 'youtube') {
        cardVideo.src = videoSrc;
        cardVideo.poster = posterImg;
        cardVideo.muted = true;
        cardVideo.defaultMuted = true;
        cardVideo.playsInline = true;
        cardVideo.preload = 'metadata';

        cardVideo.addEventListener('error', () => {
          if (!cardVideo.src.endsWith('podcast.mp4')) {
            cardVideo.src = 'podcast.mp4';
            cardVideo.load();
          }
        });

        const seekStart = () => {
          try {
            if (moment.start > 0) cardVideo.currentTime = moment.start;
          } catch (e) {}
        };

        if (cardVideo.readyState >= 1) {
          seekStart();
        } else {
          cardVideo.addEventListener('loadedmetadata', seekStart, { once: true });
        }

        // Loop clip within boundaries when playing
        cardVideo.addEventListener('timeupdate', () => {
          if (!cardVideo.paused && cardVideo.currentTime >= moment.end) {
            cardVideo.currentTime = moment.start;
          }
        });
      }

      // Audio Toggle Click
      const audioBtn = card.querySelector('.reel-audio-btn');
      if (audioBtn) {
        audioBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const soundIcon = audioBtn.querySelector('.sound-icon');
          if (this.activeSourceType === 'youtube') {
            const ytFrame = card.querySelector('.reel-card-yt-frame');
            card.dataset.muted = (card.dataset.muted === 'false') ? 'true' : 'false';
            const isMuted = card.dataset.muted === 'true';
            this.postYouTubeCommand(ytFrame, isMuted ? 'mute' : 'unMute');
            if (soundIcon) soundIcon.textContent = isMuted ? '🔇' : '🔊';
            audioBtn.style.borderColor = isMuted ? 'rgba(255,255,255,0.2)' : '#38bdf8';
          } else if (cardVideo) {
            cardVideo.muted = !cardVideo.muted;
            if (soundIcon) soundIcon.textContent = cardVideo.muted ? '🔇' : '🔊';
            audioBtn.style.borderColor = cardVideo.muted ? 'rgba(255,255,255,0.2)' : '#38bdf8';
          }
        });
      }

      // Central unified play/pause toggle click for this card
      const handleCardClick = (e) => {
        if (e.target.closest('.reel-audio-btn')) return;

        if (this.activeClipIndex !== idx) {
          this.activateClipByIndex(idx);
        } else {
          this.togglePlayPause();
        }
      };

      const playBtn = card.querySelector('.reel-play-circle-btn');
      if (playBtn) {
        playBtn.addEventListener('click', handleCardClick);
      }
      card.addEventListener('click', handleCardClick);

      this.aiSuggestedList.appendChild(card);
    });

    this.suggestClipRows = this.aiSuggestedList.querySelectorAll('.suggest-reel-card');
    this.updateSuggestedReelsCaptions();
  }

  /**
   * Formats spoken dialogue subtitles into cinematic viral TikTok/ScaleReach layout
   * with active keyword highlight and automatic 2-line balancing
   */
  formatSpokenSubtitleHTML(text) {
    if (!text) return '';
    // Z++ Security: Strip any raw tags & HTML escape to completely prevent XSS
    const clean = this.escapeHTML(text.replace(/<[^>]*>/g, '')).trim();
    if (!clean) return '';

    const words = clean.split(/\s+/);
    if (words.length <= 1) {
      return `<span class="cap-highlight">${clean}</span>`;
    }

    // Identify power word to highlight (numbers, $, !, ?, or the longest punchiest word)
    let highlightIdx = words.findIndex(w => w.includes('$') || /\d/.test(w) || w.includes('!') || w.includes('?'));
    if (highlightIdx === -1) {
      let maxLen = 0;
      words.forEach((w, i) => {
        const cleanW = w.replace(/[^a-zA-Z]/g, '');
        if (cleanW.length > maxLen) {
          maxLen = cleanW.length;
          highlightIdx = i;
        }
      });
    }
    if (highlightIdx === -1) highlightIdx = Math.floor(words.length / 2);

    const formattedWords = words.map((w, i) => {
      if (i === highlightIdx) {
        return `<span class="cap-highlight">${w}</span>`;
      }
      return w;
    });

    if (words.length >= 4 && clean.length > 15) {
      const mid = Math.ceil(words.length / 2);
      return `${formattedWords.slice(0, mid).join(' ')}<br>${formattedWords.slice(mid).join(' ')}`;
    }
    return formattedWords.join(' ');
  }

  /**
   * Synchronizes active caption style, position, font size, and text across
   * every single AI Suggested Reel card in real time
   */
  updateSuggestedReelsCaptions() {
    if (!this.aiSuggestedList) return;
    const cards = this.aiSuggestedList.querySelectorAll('.suggest-reel-card');
    const sizeClass = (this.captionFontSize <= 30) ? 'size-s' :
                      (this.captionFontSize <= 40) ? 'size-m' :
                      (this.captionFontSize <= 48) ? 'size-l' : 'size-xl';
    const posClass = `pos-${this.captionPosition || 'bottom'}`;
    const styleClass = `style-${this.selectedStyleId || 'classic'}`;
    const currentInputVal = (this.studioCaptionTextInput && this.studioCaptionTextInput.value.trim()) ||
                            (this.customCaptionInput && this.customCaptionInput.value.trim()) || '';

    cards.forEach((card, idx) => {
      const sticker = card.querySelector('.reel-hook-caption-sticker');
      if (!sticker) return;

      // Remove previous dynamic style, pos, and size classes
      sticker.classList.remove(
        'style-classic', 'style-cyan_slide', 'style-italic_red', 'style-cream_blue',
        'style-red_spin', 'style-violet', 'style-blue_glow', 'style-toxic_green',
        'pos-top', 'pos-center', 'pos-bottom',
        'size-s', 'size-m', 'size-l', 'size-xl',
        'is-hidden'
      );

      if (!this.captionsEnabled) {
        sticker.classList.add('is-hidden');
      } else {
        sticker.classList.add(styleClass, posClass, sizeClass);
      }

      const stickerText = sticker.querySelector('.sticker-text');
      if (stickerText) {
        // If user explicitly applied a caption via "Apply" button, use that across all clips!
        // Otherwise, each clip displays its OWN unique analyzed viral moment caption!
        const textVal = (this.userAppliedCaption && this.userAppliedCaption.trim()) ||
                        (this.clipsMoments && this.clipsMoments[idx] && this.clipsMoments[idx].caption) ||
                        (this.clipsMoments && this.clipsMoments[idx] && this.clipsMoments[idx].subtitles && this.clipsMoments[idx].subtitles[0]) ||
                        '';
        if (textVal) {
          stickerText.innerHTML = this.formatSpokenSubtitleHTML(textVal);
        } else {
          stickerText.textContent = '';
        }
      }

      // Completely remove any subtext from on-screen video (only viral speech caption shows!)
      const stickerSubtext = sticker.querySelector('.sticker-subtext');
      if (stickerSubtext) {
        stickerSubtext.remove();
      }
    });
  }

  postYouTubeCommand(iframe, func, args) {
    if (!iframe || !iframe.contentWindow) return;
    try {
      iframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: func,
        args: args || ''
      }), '*');
    } catch (e) {
      console.warn('YouTube postMessage warning:', e);
    }
  }

  disableYouTubeCaptions(iframe) {
    if (!iframe || !iframe.contentWindow) return;
    const killCC = () => {
      try {
        this.postYouTubeCommand(iframe, 'unloadModule', ['captions']);
        this.postYouTubeCommand(iframe, 'unloadModule', ['cc']);
        this.postYouTubeCommand(iframe, 'setOption', ['captions', 'track', {}]);
        this.postYouTubeCommand(iframe, 'setOption', ['cc', 'track', {}]);
        this.postYouTubeCommand(iframe, 'setOption', ['captions', 'reload', false]);
        this.postYouTubeCommand(iframe, 'setOption', ['captions', 'fontSize', -1]);
      } catch (e) {}
    };
    killCC();
    setTimeout(killCC, 250);
    setTimeout(killCC, 600);
    setTimeout(killCC, 1200);
    setTimeout(killCC, 2500);
  }

  forceMaxQuality() {
    const applyToFrame = (frame) => {
      if (!frame) return;
      frame.style.filter = 'none';
      this.postYouTubeCommand(frame, 'setPlaybackQuality', ['hd1080']);
      this.postYouTubeCommand(frame, 'setPlaybackQualityRange', ['hd1080', 'highres']);
      this.postYouTubeCommand(frame, 'setSuggestedQuality', ['hd1080']);
      this.disableYouTubeCaptions(frame);
    };

    if (this.youtubeIframe) applyToFrame(this.youtubeIframe);
    if (this.phoneYoutubeIframe) applyToFrame(this.phoneYoutubeIframe);
    document.querySelectorAll('.reel-card-yt-frame').forEach(f => applyToFrame(f));

    if (this.sourceVideo) {
      this.sourceVideo.style.filter = 'none';
    }
    const qualityBadge = document.getElementById('qualityBadgePill');
    if (qualityBadge) {
      qualityBadge.innerHTML = '<span class="quality-dot"></span><span>💎 1080p Full HD (Highest Quality)</span>';
    }
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pauseCardVideo(this.activeClipIndex);
    } else {
      this.playCardVideo(this.activeClipIndex);
    }
  }

  playCardVideo(idx) {
    if (!this.aiSuggestedList) return;
    const cards = this.aiSuggestedList.querySelectorAll('.suggest-reel-card');
    const moment = this.clipsMoments && this.clipsMoments[idx];
    if (!moment) return;

    this.isPlaying = true;
    this.activeClipIndex = idx;

    cards.forEach((card, i) => {
      const v = card.querySelector('.reel-card-video');
      const iconPlay = card.querySelector('.icon-play');
      const iconPause = card.querySelector('.icon-pause');
      const wave = card.querySelector('.reel-playing-waveform');
      const ytWrapper = card.querySelector('.reel-card-yt-wrapper');
      const actionPill = card.querySelector('.reel-action-pill');

      if (i === idx) {
        card.classList.add('active', 'is-playing');
        card.classList.remove('is-paused');
        if (actionPill) {
          actionPill.className = 'reel-action-pill active-pill';
          actionPill.innerHTML = '<span class="reel-pulsing-dot"></span> 📱 Live in Mobile Preview';
        }

        const isYouTube = (this.activeSourceType === 'youtube' || Boolean(this.currentYouTubeId)) && Boolean(this.currentYouTubeId);
        if (isYouTube) {
          this.activeSourceType = 'youtube';
          // 1. YouTube Mode: Embed and play real YouTube video directly in the card!
          if (v) v.style.display = 'none';
          if (ytWrapper) {
            ytWrapper.style.display = 'block';
            let ytIframe = ytWrapper.querySelector('iframe');
            const startSec = Math.floor(moment.start);
            const endSec = Math.ceil(moment.end);
            const loopParam = this.isLoopEnabled ? `&loop=1&playlist=${this.currentYouTubeId}&end=${endSec}` : `&end=${endSec}`;
            const originParam = (typeof window !== 'undefined' && window.location && window.location.origin) ? `&origin=${encodeURIComponent(window.location.origin)}` : '';
            const targetSrc = `https://www.youtube.com/embed/${this.currentYouTubeId}?enablejsapi=1&autoplay=1&mute=1&controls=0&vq=hd1080&hd=1&cc_load_policy=0&iv_load_policy=3&cc_lang_pref=off&hl=en&start=${startSec}${originParam}${loopParam}`;

            if (!ytIframe || !ytIframe.src.includes(`start=${startSec}`)) {
              ytWrapper.innerHTML = `<iframe class="reel-card-yt-frame" src="${targetSrc}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
              const newFrame = ytWrapper.querySelector('iframe');
              if (newFrame) {
                const enforceQuality = () => {
                  this.postYouTubeCommand(newFrame, 'setPlaybackQuality', ['hd1080']);
                  this.postYouTubeCommand(newFrame, 'setPlaybackQualityRange', ['hd1080', 'highres']);
                  this.postYouTubeCommand(newFrame, 'setSuggestedQuality', ['hd1080']);
                  this.disableYouTubeCaptions(newFrame);
                };
                newFrame.onload = enforceQuality;
                enforceQuality();
                setTimeout(enforceQuality, 400);
                setTimeout(enforceQuality, 1200);
              }
            } else {
              this.postYouTubeCommand(ytIframe, 'playVideo');
              this.postYouTubeCommand(ytIframe, 'setPlaybackQuality', ['hd1080']);
              this.postYouTubeCommand(ytIframe, 'setPlaybackQualityRange', ['hd1080', 'highres']);
              this.disableYouTubeCaptions(ytIframe);
            }
          }
        } else {
          // 2. Native Mode: Play local video inside the card
          if (ytWrapper) {
            ytWrapper.style.display = 'none';
            ytWrapper.innerHTML = '';
          }
          if (v) {
            v.style.display = 'block';
            v.muted = true;
            v.defaultMuted = true;

            const startPlayback = () => {
              if (v.currentTime < moment.start || v.currentTime >= moment.end) {
                v.currentTime = moment.start;
              }
              v.play().catch(console.warn);
            };

            if (v.readyState >= 1) {
              startPlayback();
            } else {
              v.addEventListener('loadedmetadata', startPlayback, { once: true });
              v.load();
            }
          }
        }

        if (iconPlay) iconPlay.style.display = 'none';
        if (iconPause) iconPause.style.display = 'block';
        if (wave) wave.style.display = 'flex';
      } else {
        card.classList.remove('active', 'is-playing', 'is-paused');
        if (actionPill) {
          actionPill.className = 'reel-action-pill';
          actionPill.innerHTML = '▶ Click to Edit & Play';
        }

        // Clean up other cards
        if (ytWrapper) {
          ytWrapper.style.display = 'none';
          ytWrapper.innerHTML = '';
        }
        if (v && !v.paused) {
          v.pause();
        }
        if (iconPlay) iconPlay.style.display = 'block';
        if (iconPause) iconPause.style.display = 'none';
        if (wave) wave.style.display = 'none';
      }
    });

    // Update main studio play/pause button
    if (this.playPauseBtn) this.playPauseBtn.textContent = '⏸';

    // Start dynamic speech subtitles cycling during video playback
    if (this.cardSubtitleTimer) {
      clearInterval(this.cardSubtitleTimer);
      this.cardSubtitleTimer = null;
    }
    if (moment && moment.subtitles && moment.subtitles.length > 0 && !this.userAppliedCaption) {
      let subIdx = 0;
      this.cardSubtitleTimer = setInterval(() => {
        const card = this.aiSuggestedList.querySelector(`.suggest-reel-card[data-index="${idx}"]`);
        if (!card || !card.classList.contains('is-playing')) {
          clearInterval(this.cardSubtitleTimer);
          this.cardSubtitleTimer = null;
          return;
        }
        subIdx = (subIdx + 1) % moment.subtitles.length;
        const stickerText = card.querySelector('.reel-hook-caption-sticker .sticker-text');
        if (stickerText && !this.userAppliedCaption) {
          const text = moment.subtitles[subIdx];
          stickerText.innerHTML = this.formatSpokenSubtitleHTML(text);
        }
      }, 2000);
    }

    // Also sync and play main studio preview video
    if (this.activeSourceType === 'youtube') {
      this.syncYouTubeClipTime();
      this.postYouTubeCommand(this.youtubeIframe, 'playVideo');
      this.postYouTubeCommand(this.phoneYoutubeIframe, 'playVideo');
    } else if (this.sourceVideo) {
      if (Math.abs(this.sourceVideo.currentTime - moment.start) > 0.5) {
        this.sourceVideo.currentTime = moment.start;
      }
      if (this.sourceVideo.paused) {
        this.sourceVideo.play().catch(console.warn);
      }
    }
  }

  pauseCardVideo(idx) {
    if (!this.aiSuggestedList) return;
    const cards = this.aiSuggestedList.querySelectorAll('.suggest-reel-card');
    const targetIdx = (idx !== undefined) ? idx : this.activeClipIndex;
    const targetCard = cards[targetIdx];
    if (!targetCard) return;

    this.isPlaying = false;
    targetCard.classList.remove('is-playing');
    targetCard.classList.add('is-paused');

    const v = targetCard.querySelector('.reel-card-video');
    const iconPlay = targetCard.querySelector('.icon-play');
    const iconPause = targetCard.querySelector('.icon-pause');
    const wave = targetCard.querySelector('.reel-playing-waveform');
    const ytWrapper = targetCard.querySelector('.reel-card-yt-wrapper');

    if (this.activeSourceType === 'youtube') {
      if (ytWrapper) {
        const ytIframe = ytWrapper.querySelector('iframe');
        this.postYouTubeCommand(ytIframe, 'pauseVideo');
      }
      this.postYouTubeCommand(this.youtubeIframe, 'pauseVideo');
      this.postYouTubeCommand(this.phoneYoutubeIframe, 'pauseVideo');
    } else {
      if (v && !v.paused) {
        v.pause();
      }
      if (this.sourceVideo && !this.sourceVideo.paused) {
        this.sourceVideo.pause();
      }
    }

    if (iconPlay) iconPlay.style.display = 'block';
    if (iconPause) iconPause.style.display = 'none';
    if (wave) wave.style.display = 'none';

    // Clear dynamic subtitles timer
    if (this.cardSubtitleTimer) {
      clearInterval(this.cardSubtitleTimer);
      this.cardSubtitleTimer = null;
    }

    // Revert sticker back to main moment caption when paused
    const moment = this.clipsMoments && this.clipsMoments[targetIdx];
    if (!this.userAppliedCaption && moment && moment.caption) {
      const stickerText = targetCard.querySelector('.reel-hook-caption-sticker .sticker-text');
      if (stickerText) {
        stickerText.innerHTML = this.formatSpokenSubtitleHTML(moment.caption);
      }
    }

    // Update main studio play/pause button
    if (this.playPauseBtn) this.playPauseBtn.textContent = '▶';
  }

  renderSubnavPills() {
    if (!this.clipSelectorPillsContainer) return;
    this.clipSelectorPillsContainer.innerHTML = '';

    const emojis = ['🔥', '⚡', '😂', '🤯', '💡', '🏆', '🎯', '🚀'];

    this.clipsMoments.forEach((moment, idx) => {
      const isActive = (idx === this.activeClipIndex);
      const btn = document.createElement('button');
      btn.className = `clip-pill ${isActive ? 'active' : ''}`;
      btn.setAttribute('data-clip', (idx + 1).toString());
      
      const emoji = emojis[idx % emojis.length];
      const scoreNum = moment.viralityScore ? moment.viralityScore.replace(/[^\d]/g, '') : '95';
      const ytTag = moment.isYtMostReplayed ? ' 🔥 YT Peak' : '';
      btn.textContent = `${emoji} Reel ${idx + 1} (${scoreNum}%)${ytTag}`;

      btn.addEventListener('click', () => {
        this.activateClipByIndex(idx);
      });

      this.clipSelectorPillsContainer.appendChild(btn);
    });

    this.clipSelectorPills = this.clipSelectorPillsContainer.querySelectorAll('.clip-pill');
  }

  runAiAnalysisScanner(title, onComplete) {
    if (!this.aiScanModal) {
      if (onComplete) onComplete();
      return;
    }

    const cleanTitle = title || this.currentVideoTitle || 'Selected Video';
    if (this.scanVideoTitleText) {
      this.scanVideoTitleText.textContent = `Scanning "${cleanTitle}" speech, energy spikes & facial retention...`;
    }

    // Reset scanner UI
    if (this.scanProgressBar) this.scanProgressBar.style.width = '0%';
    if (this.scanPercentText) this.scanPercentText.textContent = 'Analyzing 0%';

    [this.scanStep1, this.scanStep2, this.scanStep3].forEach((step, i) => {
      if (step) {
        step.classList.remove('done', 'active');
        if (i === 0) step.classList.add('active');
      }
    });
    if (this.stepCheck1) this.stepCheck1.textContent = '⏳';
    if (this.stepCheck2) this.stepCheck2.textContent = '⏳';
    if (this.stepCheck3) this.stepCheck3.textContent = '⏳';

    this.aiScanModal.classList.remove('hidden');

    // Stage 1: Audio spectrogram (0 to 35%)
    setTimeout(() => {
      if (this.scanProgressBar) this.scanProgressBar.style.width = '35%';
      if (this.scanPercentText) this.scanPercentText.textContent = 'Analyzing 35%';
      if (this.stepCheck1) this.stepCheck1.textContent = '✔';
      if (this.scanStep1) { this.scanStep1.classList.remove('active'); this.scanStep1.classList.add('done'); }
      if (this.scanStep2) this.scanStep2.classList.add('active');
    }, 350);

    // Stage 2: Facial retention & scene cuts (35 to 75%)
    setTimeout(() => {
      if (this.scanProgressBar) this.scanProgressBar.style.width = '75%';
      if (this.scanPercentText) this.scanPercentText.textContent = 'Analyzing 75%';
      if (this.stepCheck2) this.stepCheck2.textContent = '✔';
      if (this.scanStep2) { this.scanStep2.classList.remove('active'); this.scanStep2.classList.add('done'); }
      if (this.scanStep3) this.scanStep3.classList.add('active');
    }, 750);

    // Stage 3: Slicing 6 viral reels & subtitle alignment (75 to 100%)
    setTimeout(() => {
      if (this.scanProgressBar) this.scanProgressBar.style.width = '100%';
      if (this.scanPercentText) this.scanPercentText.textContent = '100% Complete ✨';
      if (this.stepCheck3) this.stepCheck3.textContent = '✔';
      if (this.scanStep3) { this.scanStep3.classList.remove('active'); this.scanStep3.classList.add('done'); }
    }, 1150);

    // Complete & Reveal
    setTimeout(() => {
      this.aiScanModal.classList.add('hidden');
      if (onComplete) onComplete();
      this.showToast(`🎯 Extracted ${this.clipsMoments.length} Viral Shorts (YouTube Retention Heatmap Synchronized)!`);
    }, 1450);
  }

  /* ----------------------------------------------------
     3. YouTube Connect Channel Modal
  ---------------------------------------------------- */
  bindYouTubeModal() {
    this.connectYoutubeBtn.addEventListener('click', () => {
      this.ytConnectModal.classList.remove('hidden');
    });

    this.closeYtModalBtn.addEventListener('click', () => {
      this.ytConnectModal.classList.add('hidden');
    });

    this.ytConnectModal.addEventListener('click', (e) => {
      if (e.target === this.ytConnectModal) {
        this.ytConnectModal.classList.add('hidden');
      }
    });

    this.confirmYtConnectBtn.addEventListener('click', () => {
      const channel = document.getElementById('ytChannelInput').value.trim();
      this.ytConnectModal.classList.add('hidden');
      document.querySelector('.yt-connect-text').textContent = `Connected: ${channel} (Auto-Import Active)`;
      document.getElementById('connectYoutubeBtn').textContent = 'Connected ✔';
      document.getElementById('connectYoutubeBtn').style.color = '#34d399';
      this.showToast(`YouTube Channel ${channel} connected for free! 🎉`);
    });
  }

  /* ----------------------------------------------------
     4. Configure Screen 2 Events
  ---------------------------------------------------- */
  bindConfigureScreen() {
    this.backToHomeBtn.addEventListener('click', () => {
      this.showHomeScreen();
    });

    // Sample Chips Switcher on Configure Screen
    this.sampleChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.sampleChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const url = chip.getAttribute('data-url');
        const title = chip.getAttribute('data-title');
        const channel = chip.getAttribute('data-channel');
        const img = chip.getAttribute('data-img');

        this.applyVideoMeta(url, title, channel, img);
        this.showToast(`Selected: ${title}`);
      });
    });

    this.removeVideoBtn.addEventListener('click', () => {
      this.youtubeUrlInput.value = '';
      this.youtubeUrlInput.placeholder = 'Enter URL';
      this.youtubeUrlInput.focus();
    });

    this.youtubeUrlInput.addEventListener('input', (e) => {
      const url = e.target.value.trim();
      const ytId = this.extractYouTubeId(url);
      if (ytId) {
        this.loadYouTubeVideo(ytId, url);
      } else if (url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('.mp4?')) {
        this.switchToNativeVideo(url, 'Online Video Stream', 'Direct MP4 • Online', '');
        this.showToast('Online video stream connected! 🌐');
      }
    });

    this.localBrowseBtn.addEventListener('click', () => this.localFileInput.click());

    this.localFileInput.addEventListener('change', (e) => {
      if (e.target.files.length) {
        const rawFile = e.target.files[0];
        const sanitized = this.validateAndSanitizeUploadedFile(rawFile);
        if (!sanitized) {
          e.target.value = '';
          return;
        }
        const file = sanitized.file;
        const safeTitle = sanitized.safeTitle;
        const url = URL.createObjectURL(file);
        this.switchToNativeVideo(url, safeTitle, 'Local File • Custom', '');
        this.showToast(`🛡️ Verified & Loaded ${safeTitle}`);
      }
    });

    // Clip Type Dropdown
    this.clipTypeDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      this.clipTypeMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      this.clipTypeMenu.classList.add('hidden');
    });

    this.clipTypeMenu.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        this.clipTypeMenu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-desc');

        this.selectedClipTypeTitle.textContent = title;
        this.selectedClipTypeDesc.textContent = desc;

        const val = item.getAttribute('data-val');
        this.selectedClipMode = val;
        if (val === 'split') {
          this.activeLayout = 'split';
          this.syncLayoutBtnState('split');
        } else {
          this.activeLayout = 'fit';
          this.syncLayoutBtnState('fit');
        }

        // Re-analyze and highlight clips tailored to the chosen mode (e.g. Funny Moments & Reactions)
        this.analyzeVideoAndGenerateClips(this.currentVideoTitle, this.currentVideoAuthor, this.currentVideoUrl, this.videoDuration);
        this.showToast(`AI Clip Mode: ${title}`);
      });
    });

    this.segBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.segBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.showToast(`Switched to ${btn.textContent}`);
      });
    });

    // Auto Hook Toggle
    this.autoHookToggle.addEventListener('change', () => {
      if (this.autoHookToggle.checked) {
        this.hookSublineBox.classList.remove('hidden');
      } else {
        this.hookSublineBox.classList.add('hidden');
      }
    });

    // "Get Clips" button click
    this.getClipsBtn.addEventListener('click', () => {
      this.getClipsBtn.disabled = true;
      this.getClipsBtn.querySelector('.btn-text-clips').textContent = 'Analyzing Video & Extracting Clips... ⚡';

      this.runAiAnalysisScanner(this.currentVideoTitle, () => {
        this.getClipsBtn.disabled = false;
        this.getClipsBtn.querySelector('.btn-text-clips').textContent = 'Get Clips';
        this.showStudioView();
      });
    });
  }

  syncLayoutBtnState(layout) {
    this.layoutBtns.forEach(btn => {
      if (btn.getAttribute('data-layout') === layout) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /* ----------------------------------------------------
     5. The 8 Crazy Captions Carousel & Selection
  ---------------------------------------------------- */
  bindCrazyCaptions() {
    this.captionsToggle.addEventListener('change', () => {
      if (this.captionsToggle.checked) {
        this.captionsGrid.style.opacity = '1';
        this.captionsGrid.style.pointerEvents = 'all';
      } else {
        this.captionsGrid.style.opacity = '0.35';
        this.captionsGrid.style.pointerEvents = 'none';
        this.showToast('Captions disabled');
      }
    });

    this.captionCardItems.forEach(card => {
      card.addEventListener('click', () => {
        const styleId = card.getAttribute('data-id');
        const styleName = card.querySelector('.cap-label-name') ? card.querySelector('.cap-label-name').textContent : styleId;
        this.selectCaptionStyle(styleId, styleName);
      });
    });

    if (this.carouselPrevBtn && this.carouselNextBtn) {
      this.carouselPrevBtn.addEventListener('click', () => {
        this.showToast('Caption Presets ◀');
      });
      this.carouselNextBtn.addEventListener('click', () => {
        this.showToast('Caption Presets ▶');
      });
    }
  }

  /* ----------------------------------------------------
     6. View Switching Functions
  ---------------------------------------------------- */
  showHomeScreen() {
    this.configureView.classList.add('hidden');
    this.studioView.classList.add('hidden');
    this.homeDashboardView.classList.remove('hidden');

    this.crumbCurrent.textContent = 'Videos';
    this.sideNavHome.classList.add('active');
    this.sideNavAllClips.classList.remove('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showConfigureView() {
    this.homeDashboardView.classList.add('hidden');
    this.studioView.classList.add('hidden');
    this.configureView.classList.remove('hidden');

    this.crumbCurrent.textContent = 'Configure';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  showStudioView() {
    this.homeDashboardView.classList.add('hidden');
    this.configureView.classList.add('hidden');
    this.studioView.classList.remove('hidden');

    this.crumbCurrent.textContent = 'Studio & Export';
    this.sideNavHome.classList.remove('active');
    this.sideNavAllClips.classList.add('active');

    // Make sure latest analyzed clips, subnav pills, and trimmer are active
    this.renderSuggestedClipsUI();
    this.renderSubnavPills();
    this.activateClipByIndex(0);
    this.renderWaveform();

    if (this.activeSourceType !== 'youtube') {
      this.sourceVideo.currentTime = this.clipStart;
      this.sourceVideo.play().catch(e => {
        console.log('Studio play note:', e);
      });
    } else {
      this.syncYouTubeClipTime();
    }
  }

  /* ----------------------------------------------------
     7. Studio Screen 3 Events, AI Suggestions & Live Trimmer
  ---------------------------------------------------- */
  bindStudioScreen() {
    this.backToConfigureBtn.addEventListener('click', () => {
      this.showConfigureView();
    });

    const studioQuickExtractBtn = document.getElementById('studioQuickExtractBtn');
    const studioQuickUrlInput = document.getElementById('studioQuickUrlInput');
    if (studioQuickExtractBtn && studioQuickUrlInput) {
      const handleStudioQuickExtract = () => {
        const url = studioQuickUrlInput.value.trim();
        if (!url) {
          this.showToast('Please paste a YouTube video URL first!');
          return;
        }
        this.loadVideoAndAutoExtractClips(url);
      };
      studioQuickExtractBtn.addEventListener('click', handleStudioQuickExtract);
      studioQuickUrlInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleStudioQuickExtract();
        }
      });
    }

    // 1-Click Change Video Button
    const changeVideoBtn = document.getElementById('changeVideoBtn');
    if (changeVideoBtn && studioQuickUrlInput) {
      changeVideoBtn.addEventListener('click', () => {
        studioQuickUrlInput.value = '';
        studioQuickUrlInput.placeholder = 'Paste new YouTube link or video URL...';
        studioQuickUrlInput.focus();
        this.showToast('Ready for new video! Paste any link above 🎬');
      });
    }

    // Auto-Loop Toggle Button (Stop endless repeating)
    const studioLoopToggleBtn = document.getElementById('studioLoopToggleBtn');
    if (studioLoopToggleBtn) {
      studioLoopToggleBtn.addEventListener('click', () => {
        this.isLoopEnabled = !this.isLoopEnabled;
        const loopBtnText = document.getElementById('loopBtnText');
        if (loopBtnText) {
          loopBtnText.textContent = this.isLoopEnabled ? '🔁 Auto-Loop: ON' : '⏹ Auto-Loop: OFF';
        }
        studioLoopToggleBtn.classList.toggle('active', this.isLoopEnabled);
        this.showToast(this.isLoopEnabled ? 'Auto-loop ON: repeats active 15s clip' : 'Auto-loop OFF: plays clip smoothly once without endless repeating! ✨');
        this.syncYouTubeClipTime();
      });
    }

    // 1080p Ultra HD Quality Toggle Button
    const qualityToggleBtn = document.getElementById('qualityToggleBtn');
    if (qualityToggleBtn) {
      qualityToggleBtn.addEventListener('click', () => {
        this.forceMaxQuality();
        this.showToast('Forced Ultra 1080p 60fps HD Quality! 💎');
      });
    }

    const switchToRealVideoBtn = document.getElementById('switchToRealVideoBtn');
    if (switchToRealVideoBtn) {
      switchToRealVideoBtn.addEventListener('click', () => {
        const titleLower = (this.currentVideoTitle || '').toLowerCase();
        const file = 'podcast.mp4';
        this.switchToNativeVideo(file, this.currentVideoTitle, this.currentVideoAuthor, '');
        this.showToast('Playing in Real HD Native Mode! 🎬');
      });
    }

    const studioBrowseLocalBtn = document.getElementById('studioBrowseLocalBtn');
    if (studioBrowseLocalBtn) {
      studioBrowseLocalBtn.addEventListener('click', () => {
        this.localFileInput.click();
      });
    }

    // Clicks on Top Clip Pills
    this.clipSelectorPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const clipIdx = parseInt(pill.getAttribute('data-clip'), 10) - 1;
        this.activateClipByIndex(clipIdx);
      });
    });

    // Clicks on AI Suggested Clip Cards (Pehle AI Suggestion)
    if (this.suggestClipRows) {
      this.suggestClipRows.forEach(row => {
        row.addEventListener('click', () => {
          const clipIdx = parseInt(row.getAttribute('data-clip'), 10) - 1;
          this.activateClipByIndex(clipIdx);
        });
      });
    }

    // Quick Duration Presets (15s, 30s, 60s)
    this.presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const dur = parseFloat(btn.getAttribute('data-dur'));
        this.clipEnd = Math.min(this.clipStart + dur, this.videoDuration);
        this.handleCustomAdjustment();
        this.showToast(`Adjusted clip length to ${dur}s — Mobile preview synced! 📱`);
      });
    });

    // Start & End Time Manual Inputs
    this.startInput.addEventListener('change', () => {
      const parsed = this.parseTime(this.startInput.value);
      if (parsed < this.clipEnd) {
        this.clipStart = Math.max(0, parsed);
        this.handleCustomAdjustment();
      } else {
        this.startInput.value = this.formatTime(this.clipStart);
      }
    });

    this.endInput.addEventListener('change', () => {
      const parsed = this.parseTime(this.endInput.value);
      if (parsed > this.clipStart) {
        this.clipEnd = Math.min(this.videoDuration, parsed);
        this.handleCustomAdjustment();
      } else {
        this.endInput.value = this.formatTime(this.clipEnd);
      }
    });

    // Waveform handle drag
    const container = this.waveformContainer;

    this.trimmerLeft.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      this.isDraggingLeft = true;
    });

    this.trimmerRight.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      this.isDraggingRight = true;
    });

    this.trimmerZone.addEventListener('mousedown', (e) => {
      if (e.target === this.trimmerLeft || e.target === this.trimmerRight) return;
      e.stopPropagation();
      this.isDraggingZone = true;
      this.dragStartX = e.clientX;
      this.dragStartClipStart = this.clipStart;
      this.dragStartClipEnd = this.clipEnd;
    });

    window.addEventListener('mouseup', () => {
      this.isDraggingLeft = false;
      this.isDraggingRight = false;
      this.isDraggingZone = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDraggingLeft && !this.isDraggingRight && !this.isDraggingZone) return;

      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      const targetTime = ratio * this.videoDuration;

      if (this.isDraggingLeft) {
        if (targetTime < this.clipEnd - 3) {
          this.clipStart = Math.max(0, targetTime);
          this.handleCustomAdjustment();
        }
      } else if (this.isDraggingRight) {
        if (targetTime > this.clipStart + 3) {
          this.clipEnd = Math.min(this.videoDuration, targetTime);
          this.handleCustomAdjustment();
        }
      } else if (this.isDraggingZone) {
        const deltaX = e.clientX - this.dragStartX;
        const deltaSec = (deltaX / rect.width) * this.videoDuration;
        const dur = this.dragStartClipEnd - this.dragStartClipStart;
        let newStart = this.dragStartClipStart + deltaSec;
        let newEnd = newStart + dur;

        if (newStart < 0) {
          newStart = 0;
          newEnd = dur;
        } else if (newEnd > this.videoDuration) {
          newEnd = this.videoDuration;
          newStart = this.videoDuration - dur;
        }

        this.clipStart = newStart;
        this.clipEnd = newEnd;
        this.handleCustomAdjustment();
      }
    });

    container.addEventListener('click', (e) => {
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const ratio = Math.max(0, Math.min(1, clickX / rect.width));
      const seekTime = ratio * this.videoDuration;
      
      // If clicked inside clip range, seek there, otherwise seek to start
      if (seekTime >= this.clipStart && seekTime <= this.clipEnd) {
        this.sourceVideo.currentTime = seekTime;
      } else {
        this.sourceVideo.currentTime = this.clipStart;
      }
    });

    // Studio Player controls
    this.playPauseBtn.addEventListener('click', () => {
      this.togglePlayPause();
    });

    // Spacebar shortcut to play/pause
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        this.togglePlayPause();
      }
    });

    this.sourceVideo.addEventListener('play', () => {
      this.playPauseBtn.textContent = '⏸';
    });

    this.sourceVideo.addEventListener('pause', () => {
      this.playPauseBtn.textContent = '▶';
    });

    this.sourceVideo.addEventListener('timeupdate', () => {
      const cur = this.sourceVideo.currentTime || 0;
      let dur = this.sourceVideo.duration;
      if (!isFinite(dur) || isNaN(dur) || dur <= 0) {
        dur = this.videoDuration || 90;
      }
      this.currentTimeDisplay.textContent = `${this.formatTime(cur)} / ${this.formatTime(dur)}`;

      const posPct = Math.min(100, Math.max(0, (cur / dur) * 100));
      this.playheadLine.style.left = `${posPct}%`;

      // Strict Live Looping between [clipStart, clipEnd]
      if (!this.isRecording) {
        if (cur >= this.clipEnd || cur < this.clipStart) {
          this.sourceVideo.currentTime = this.clipStart;
          if (this.sourceVideo.paused) this.sourceVideo.play();
        }
      }
    });

    this.muteBtn.addEventListener('click', () => {
      this.sourceVideo.muted = !this.sourceVideo.muted;
      this.muteBtn.textContent = this.sourceVideo.muted ? '🔇' : '🔊';
    });

    // Layout toggles (Safe Fit 9:16 vs Full 9:16 vs Split-screen vs Square)
    this.layoutBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.layoutBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.activeLayout = btn.getAttribute('data-layout');
        if (this.phoneYtWrapper) {
          if (this.activeLayout === 'standard') {
            this.phoneYtWrapper.classList.add('layout-fill');
            this.phoneYtWrapper.classList.remove('mode-fit');
          } else {
            this.phoneYtWrapper.classList.remove('layout-fill');
            this.phoneYtWrapper.classList.add('mode-fit');
          }
        }

        if (this.activeLayout === 'fit') {
          this.showToast('Safe Fit 9:16: Video fits 100% with zero text cut off 📐');
        } else if (this.activeLayout === 'split') {
          this.showToast('Split-Screen: Top Video + Bottom Subway Surfers! 🎮');
        } else if (this.activeLayout === 'square') {
          this.showToast('Square 1:1 format for Instagram 🔲');
        } else {
          this.showToast('Full 9:16 Video Reframe 📱');
        }
      });
    });

    // Suggested Reel Cards Framing Toggles (Safe Fit vs Full Fill)
    const cardFramingFitBtn = document.getElementById('cardFramingFitBtn');
    const cardFramingFillBtn = document.getElementById('cardFramingFillBtn');
    if (cardFramingFitBtn && cardFramingFillBtn) {
      cardFramingFitBtn.addEventListener('click', () => {
        cardFramingFitBtn.classList.add('active');
        cardFramingFillBtn.classList.remove('active');
        if (this.aiSuggestedList) {
          this.aiSuggestedList.classList.remove('mode-fill');
        }
        this.showToast('Cards: Safe Fit 9:16 active - No text or captions cut off 📐');
      });
      cardFramingFillBtn.addEventListener('click', () => {
        cardFramingFillBtn.classList.add('active');
        cardFramingFitBtn.classList.remove('active');
        if (this.aiSuggestedList) {
          this.aiSuggestedList.classList.add('mode-fill');
        }
        this.showToast('Cards: Full Fill 9:16 zoom active 📱');
      });
    }

    if (this.panSlider) {
      this.panSlider.addEventListener('input', (e) => {
        this.activePan = e.target.value / 100;
        if (this.panValDisplay) {
          if (this.activePan < 0.35) this.panValDisplay.textContent = 'Left';
          else if (this.activePan > 0.65) this.panValDisplay.textContent = 'Right';
          else this.panValDisplay.textContent = 'Center';
        }
      });
    }

    if (this.customCaptionInput) {
      this.customCaptionInput.addEventListener('input', (e) => {
        if (this.captionTitleTag) this.captionTitleTag.textContent = e.target.value;
      });
    }

    // Copy buttons
    this.copyTitleOnlyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(this.seoTitleDisplay.textContent.replace(/"/g, ''));
      this.showToast('Viral Title copied! 📋');
    });

    this.copyAllTagsBtn.addEventListener('click', () => {
      const tags = Array.from(document.querySelectorAll('.hashtag-pill')).map(p => p.textContent).join(' ');
      navigator.clipboard.writeText(tags);
      this.showToast('All hashtags copied! 🚀');
    });
  }

  /* ----------------------------------------------------
     Activate AI Suggested Clip (Step 1)
  ---------------------------------------------------- */
  activateClipByIndex(clipIdx) {
    this.activeClipIndex = clipIdx;
    this.isCustomAdjusted = false;

    // Sync Subnav Pills
    if (this.clipSelectorPills) {
      this.clipSelectorPills.forEach((p, idx) => {
        if (idx === clipIdx) p.classList.add('active');
        else p.classList.remove('active');
      });
    }

    // Sync 9:16 Video Suggestion Cards
    if (this.aiSuggestedList) {
      const cards = this.aiSuggestedList.querySelectorAll('.suggest-reel-card');
      cards.forEach((card, idx) => {
        const actionPill = card.querySelector('.reel-action-pill');
        if (idx === clipIdx) {
          card.classList.add('active');
          if (actionPill) {
            actionPill.className = 'reel-action-pill active-pill';
            actionPill.innerHTML = '<span class="reel-pulsing-dot"></span> 📱 Live in Mobile Preview';
          }
        } else {
          card.classList.remove('active');
          if (actionPill) {
            actionPill.className = 'reel-action-pill';
            actionPill.innerHTML = '▶ Click to Edit & Play';
          }
        }
      });
    }

    const moment = this.clipsMoments[clipIdx];
    if (moment) {
      this.clipStart = moment.start;
      this.clipEnd = moment.end;
      if (this.seoTitleDisplay) this.seoTitleDisplay.textContent = `"${moment.seoTitle}"`;
      const activeCaption = (this.userAppliedCaption && this.userAppliedCaption.trim()) ||
                            moment.caption ||
                            (moment.subtitles && moment.subtitles[0]) ||
                            '';
      if (this.customCaptionInput) this.customCaptionInput.value = activeCaption;
      if (this.studioCaptionTextInput && !this.userAppliedCaption) {
        this.studioCaptionTextInput.placeholder = activeCaption ? `Active: "${activeCaption}" (or pick hook below)` : 'Type custom caption or pick hook below...';
      }
      if (this.captionTitleTag) this.captionTitleTag.textContent = `"${this.currentVideoTitle || moment.title}"`;
      if (this.captionAuthorTag) this.captionAuthorTag.textContent = '@ajjez_clips';
      if (this.studioVideoTitle) this.studioVideoTitle.textContent = this.currentVideoTitle || moment.title;
      if (this.studioChannelPill) this.studioChannelPill.textContent = this.currentVideoAuthor || 'Creator';

      // Update Hashtags Cloud
      if (this.hashtagCloud && moment.tags) {
        this.hashtagCloud.innerHTML = moment.tags.map(tag => `<span class="hashtag-pill">${tag}</span>`).join(' ');
      }

      this.updateTrimmerUI();
      this.renderWaveform();
      this.updateSuggestedReelsCaptions();

      // Start video playback on the card and in the studio
      this.playCardVideo(clipIdx);

      this.showToast(`Selected Reel ${clipIdx + 1}: ${moment.title} 🚀`);
    }
  }

  /* ----------------------------------------------------
     Handle Custom Adjustments (User drags trimmer, changes times or customizes clip)
  ---------------------------------------------------- */
  handleCustomAdjustment() {
    this.isCustomAdjusted = true;
    const activeIdx = (this.activeClipIndex !== undefined && this.activeClipIndex >= 0) ? this.activeClipIndex : 0;
    const durSec = Math.max(1, Math.round(this.clipEnd - this.clipStart));

    // Update active moment start & end so loop & playback respect user adjustments
    if (this.clipsMoments && this.clipsMoments[activeIdx]) {
      this.clipsMoments[activeIdx].start = this.clipStart;
      this.clipsMoments[activeIdx].end = this.clipEnd;
    }

    // Keep active card highlighted and update its time badge & action status
    if (this.aiSuggestedList) {
      const cards = this.aiSuggestedList.querySelectorAll('.suggest-reel-card');
      cards.forEach((card, idx) => {
        const actionPill = card.querySelector('.reel-action-pill');
        if (idx === activeIdx) {
          card.classList.add('active');
          const timeBadge = card.querySelector('.reel-time-badge');
          if (timeBadge) {
            timeBadge.textContent = `${this.formatTime(this.clipStart)} - ${this.formatTime(this.clipEnd)} (${durSec}s)`;
          }
          if (actionPill) {
            actionPill.className = 'reel-action-pill active-pill';
            actionPill.innerHTML = `<span class="reel-pulsing-dot"></span> 📱 Adjusted (${durSec}s)`;
          }
          const cardVid = card.querySelector('.reel-card-video');
          if (cardVid && this.activeSourceType !== 'youtube') {
            cardVid.currentTime = this.clipStart;
            if (this.isPlaying && cardVid.paused) cardVid.play().catch(console.warn);
          }
        } else {
          card.classList.remove('active');
          if (actionPill) {
            actionPill.className = 'reel-action-pill';
            actionPill.innerHTML = '▶ Click to Edit & Play';
          }
        }
      });
    }

    if (this.clipSelectorPills) {
      this.clipSelectorPills.forEach((p, idx) => {
        if (idx === activeIdx) p.classList.add('active');
        else p.classList.remove('active');
      });
    }

    this.updateTrimmerUI();

    // Immediately seek mobile preview & main video to adjusted start time & loop
    if (this.activeSourceType === 'youtube') {
      this.syncYouTubeClipTime();
    } else {
      this.sourceVideo.currentTime = this.clipStart;
      if (this.sourceVideo.paused) this.sourceVideo.play().catch(console.warn);
    }
  }

  /* ----------------------------------------------------
     Viral Captions & Subtitles Studio Engine (Screen 3)
  ---------------------------------------------------- */
  bindViralCaptionsStudio() {
    if (!this.viralCaptionsStudioCard) return;

    // Subnav button to jump to Captions Studio
    if (this.subnavCaptionsBtn) {
      this.subnavCaptionsBtn.addEventListener('click', () => {
        this.viralCaptionsStudioCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        this.viralCaptionsStudioCard.style.boxShadow = '0 0 25px rgba(37, 99, 235, 0.6)';
        setTimeout(() => {
          this.viralCaptionsStudioCard.style.boxShadow = '';
        }, 1200);
      });
    }

    // 1. Master Toggle for Captions
    if (this.studioCaptionsToggle) {
      this.studioCaptionsToggle.addEventListener('change', () => {
        this.captionsEnabled = this.studioCaptionsToggle.checked;
        if (this.captionsToggle) this.captionsToggle.checked = this.captionsEnabled;
        if (this.subnavCaptionsBtn) {
          this.subnavCaptionsBtn.textContent = this.captionsEnabled ? '🔥 Captions: ON' : '⚪ Captions: OFF';
          this.subnavCaptionsBtn.style.color = this.captionsEnabled ? '#3b82f6' : '#94a3b8';
        }
        this.updateSuggestedReelsCaptions();
        this.updateCaptionsStatusBanner();
        this.showToast(this.captionsEnabled ? 'Captions Active on 9:16 Video! ✨' : 'Captions Hidden');
      });
    }

    // 2. Custom Text Input Live Sync
    if (this.studioCaptionTextInput) {
      this.studioCaptionTextInput.addEventListener('input', () => {
        if (this.hookPillBtns) this.hookPillBtns.forEach(b => b.classList.remove('active'));
        const val = this.studioCaptionTextInput.value;
        this.pendingCaptionText = val;
      });
    }

    // Clear Text Button (Restores spoken speech dialogue on all cards)
    if (this.clearCaptionTextBtn && this.studioCaptionTextInput) {
      this.clearCaptionTextBtn.addEventListener('click', () => {
        this.studioCaptionTextInput.value = '';
        this.pendingCaptionText = '';
        this.userAppliedCaption = null;
        if (this.customCaptionInput) this.customCaptionInput.value = '';
        if (this.hookPillBtns) this.hookPillBtns.forEach(b => b.classList.remove('active'));
        if (this.clipsMoments) {
          this.clipsMoments.forEach((m) => {
            if (m && m.subtitles && m.subtitles[0]) {
              m.caption = m.subtitles[0];
            }
          });
        }
        this.updateSuggestedReelsCaptions();
        this.studioCaptionTextInput.focus();
        this.updateCaptionsStatusBanner();
        this.showToast('Restored authentic spoken dialogue captions! 🎙️');
      });
    }

    // 3. Quick Viral Hook Pills
    if (this.hookPillBtns) {
      this.hookPillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.hookPillBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const hook = btn.getAttribute('data-hook') || btn.textContent.trim();
          this.pendingCaptionText = hook;
          if (this.studioCaptionTextInput) {
            this.studioCaptionTextInput.value = hook;
          }
          if (this.customCaptionInput) {
            this.customCaptionInput.value = hook;
          }
          this.showToast(`Selected "${hook}" — Click "Apply Caption to Videos" to apply! ✨`);
        });
      });
    }

    // 4. Apply Caption to Videos Button (Applies chosen caption to all suggested clips & active playing video)
    if (this.applyCaptionBtn) {
      this.applyCaptionBtn.addEventListener('click', () => {
        const customText = (this.studioCaptionTextInput && this.studioCaptionTextInput.value.trim()) || '';
        const pendingHook = (this.pendingCaptionText && this.pendingCaptionText.trim()) || '';
        const currentMoment = this.clipsMoments && this.clipsMoments[this.activeClipIndex];
        const spokenDialogue = (currentMoment && (currentMoment.caption || (currentMoment.subtitles && currentMoment.subtitles[0]))) || '';

        const textToApply = customText || pendingHook || spokenDialogue;

        if (!textToApply) {
          this.showToast('Please type a caption or select a hook to apply! 💬');
          return;
        }

        if (customText || pendingHook) {
          this.userAppliedCaption = textToApply;
          if (this.clipsMoments) {
            this.clipsMoments.forEach(m => { if (m) m.caption = textToApply; });
          }
        } else {
          // If no custom text was typed, preserve authentic spoken dialogues
          this.userAppliedCaption = null;
        }

        if (this.customCaptionInput) this.customCaptionInput.value = textToApply;
        
        // 1. Instantly update all suggested clip cards
        this.updateSuggestedReelsCaptions();
        this.updateCaptionsStatusBanner();

        // 2. Button green feedback animation
        this.applyCaptionBtn.classList.add('applied-success');
        const origContent = this.applyCaptionBtn.innerHTML;
        this.applyCaptionBtn.innerHTML = `
          <span class="btn-apply-icon">✓</span>
          <span class="btn-apply-label">Caption Applied!</span>
          <span class="btn-apply-hint">(Applied to all clips & live video)</span>
        `;
        setTimeout(() => {
          if (this.applyCaptionBtn) {
            this.applyCaptionBtn.classList.remove('applied-success');
            this.applyCaptionBtn.innerHTML = origContent;
          }
        }, 1800);

        this.showToast(`Applied "${textToApply}" (${this.selectedStyleName}) to all clips & active video! ⚡`);
      });
    }

    // 5. 8 Caption Style Cards in Screen 3 (and sync with Screen 2)
    const allCaptionCards = document.querySelectorAll('.caption-card-item');
    allCaptionCards.forEach(item => {
      item.addEventListener('click', () => {
        const styleId = item.getAttribute('data-id');
        const styleName = item.getAttribute('data-name') || (item.querySelector('.cap-label-name') ? item.querySelector('.cap-label-name').textContent : styleId);
        this.selectCaptionStyle(styleId, styleName);
      });
    });

    // Carousel Left / Right Arrows
    const prevBtns = [document.getElementById('studioCarouselPrevBtn'), document.getElementById('carouselPrevBtn')];
    const nextBtns = [document.getElementById('studioCarouselNextBtn'), document.getElementById('carouselNextBtn')];
    const stylesList = ['classic', 'cyan_slide', 'italic_red', 'cream_blue', 'red_spin', 'violet', 'blue_glow', 'toxic_green'];

    prevBtns.forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', () => {
        const curIdx = stylesList.indexOf(this.selectedStyleId);
        const nextIdx = (curIdx - 1 + stylesList.length) % stylesList.length;
        const targetCard = document.querySelector(`.caption-card-item[data-id="${stylesList[nextIdx]}"]`);
        if (targetCard) targetCard.click();
      });
    });

    nextBtns.forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', () => {
        const curIdx = stylesList.indexOf(this.selectedStyleId);
        const nextIdx = (curIdx + 1) % stylesList.length;
        const targetCard = document.querySelector(`.caption-card-item[data-id="${stylesList[nextIdx]}"]`);
        if (targetCard) targetCard.click();
      });
    });

    // 5. Caption Position Adjustment (Top, Center, Bottom)
    if (this.captionPosBtns) {
      this.captionPosBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.captionPosBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.captionPosition = btn.getAttribute('data-pos') || 'bottom';
          this.updateSuggestedReelsCaptions();
          this.updateCaptionsStatusBanner();
          this.showToast(`Position: ${btn.textContent.trim()} 📍`);
        });
      });
    }

    // 6. Caption Size Adjustment (S, M, L, XL)
    if (this.captionSizeBtns) {
      this.captionSizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.captionSizeBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.captionFontSize = parseInt(btn.getAttribute('data-size'), 10) || 40;
          this.updateSuggestedReelsCaptions();
          this.updateCaptionsStatusBanner();
          this.showToast(`Font Size: ${this.captionFontSize}px 🔤`);
        });
      });
    }
  }

  selectCaptionStyle(styleId, styleName) {
    if (!styleId) return;
    this.selectedStyleId = styleId;
    this.selectedStyleName = styleName || styleId;

    document.querySelectorAll('.caption-card-item').forEach(c => {
      if (c.getAttribute('data-id') === styleId) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    if (this.activeStyleBadge) {
      this.activeStyleBadge.textContent = `Style: ${this.selectedStyleName}`;
    }

    // Never overwrite the caption text - only update the visual style!
    this.updateSuggestedReelsCaptions();
    this.updateCaptionsStatusBanner();
    this.showToast(`Active Style: ${this.selectedStyleName} ✨ (Applied to all suggested reels)`);
  }

  updateCaptionsStatusBanner() {
    if (!this.studioCaptionsStatusText) return;
    if (!this.captionsEnabled) {
      this.studioCaptionsStatusText.innerHTML = `<strong>Captions Disabled:</strong> Toggle switch on top right to enable live captions.`;
      return;
    }
    const posLabel = this.captionPosition === 'top' ? 'Top' : this.captionPosition === 'center' ? 'Center' : 'Bottom';
    this.studioCaptionsStatusText.innerHTML = `<strong>Active Style: ${this.selectedStyleName}</strong> • Showing live at ${posLabel} (${this.captionFontSize}px) on 9:16 Video`;
  }

  /* ----------------------------------------------------
     CapCut Special Effects & 4K HDR Management Engine
  ---------------------------------------------------- */
  bindCapCutEffects() {
    if (!this.capcutEffectsCard) return;

    // 1. Master Toggle (Enable / Disable 4K HDR)
    if (this.capcutEffectMasterToggle) {
      this.capcutEffectMasterToggle.addEventListener('change', () => {
        this.capcutEffectEnabled = this.capcutEffectMasterToggle.checked;
        this.updateCapCutDetailsUI();
        this.applyCapCutFiltersToElements();
        this.showToast(this.capcutEffectEnabled ? 'CapCut 4K HDR: Activated ✨' : '4K HDR: Disabled (Original Video)');
      });
    }

    // 2. Subnav 4K HDR Pill click (scroll to effects panel or toggle)
    if (this.subnavEffectsBtn) {
      this.subnavEffectsBtn.addEventListener('click', () => {
        this.capcutEffectsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        this.capcutEffectsCard.style.boxShadow = '0 0 25px rgba(56, 189, 248, 0.6)';
        setTimeout(() => {
          this.capcutEffectsCard.style.boxShadow = '';
        }, 1200);
      });
    }

    // 3. Effects Grid Buttons (4K HDR, Dynamic Blur, Soft Glow, etc.)
    if (this.capcutFxItems) {
      this.capcutFxItems.forEach(item => {
        item.addEventListener('click', () => {
          this.capcutFxItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          const fxType = item.getAttribute('data-effect');
          this.currentActiveEffect = fxType;

          if (this.effectCurrentName) {
            const nameMap = {
              '4k_hdr': '4K HDR 💎',
              'dynamic_blur': 'Dynamic Blur 💨',
              'soft_glow': 'Soft Glow ✨',
              'ultra_sharpen': '4K Sharpen 🔪',
              'flash_focus': 'Flash Focus ⚡',
              'camcorder': 'Classic DV 📹'
            };
            this.effectCurrentName.innerHTML = nameMap[fxType] || '4K HDR 💎';
          }

          if (fxType === '4k_hdr') {
            this.setCapCutValues(30, 15, 70, 70, 50, 33, 100);
          } else if (fxType === 'dynamic_blur') {
            this.setCapCutValues(10, 65, 20, 50, 45, 25, 80);
          } else if (fxType === 'soft_glow') {
            this.setCapCutValues(55, 20, 30, 50, 60, 45, 90);
          } else if (fxType === 'ultra_sharpen') {
            this.setCapCutValues(5, 0, 95, 80, 50, 20, 100);
          } else if (fxType === 'flash_focus') {
            this.setCapCutValues(45, 10, 60, 65, 40, 50, 85);
          } else if (fxType === 'camcorder') {
            this.setCapCutValues(15, 8, 45, 60, 55, 30, 75);
          }

          this.capcutEffectEnabled = true;
          if (this.capcutEffectMasterToggle) this.capcutEffectMasterToggle.checked = true;
          this.updateCapCutDetailsUI();
          this.applyCapCutFiltersToElements();
          this.showToast(`Applied Effect: ${item.querySelector('.fx-name').textContent} ✨`);
        });
      });
    }

    // 4. Sliders and Number Inputs Bidirectional Binding
    this.syncCapCutSlider(this.fxGlowSlider, this.fxGlowNum, 'fxGlow');
    this.syncCapCutSlider(this.fxBlurSlider, this.fxBlurNum, 'fxBlur');
    this.syncCapCutSlider(this.fxSharpenSlider, this.fxSharpenNum, 'fxSharpen');
    this.syncCapCutSlider(this.fxRangeSlider, this.fxRangeNum, 'fxRange');
    this.syncCapCutSlider(this.fxSizeSlider, this.fxSizeNum, 'fxSize');
    this.syncCapCutSlider(this.fxSoftLightSlider, this.fxSoftLightNum, 'fxSoftLight');
    this.syncCapCutSlider(this.fxFiltersSlider, this.fxFiltersNum, 'fxFilters');

    // 5. Reset Button
    if (this.reset4kEffectBtn) {
      this.reset4kEffectBtn.addEventListener('click', () => {
        this.setCapCutValues(30, 15, 70, 70, 50, 33, 100);
        this.capcutEffectEnabled = true;
        if (this.capcutEffectMasterToggle) this.capcutEffectMasterToggle.checked = true;
        this.updateCapCutDetailsUI();
        this.applyCapCutFiltersToElements();
        this.showToast('Reset to CapCut 4K HDR Defaults (Glow 30, Sharpen 70, Range 70) ↺');
      });
    }

    // 6. Quick Presets (Punchy, Natural, Dreamy, Original)
    if (this.presetCapcutPunchy) {
      this.presetCapcutPunchy.addEventListener('click', () => {
        this.setActivePresetPill(this.presetCapcutPunchy);
        // Screenshot 1 values
        this.setCapCutValues(30, 15, 70, 70, 50, 33, 100);
        this.capcutEffectEnabled = true;
        if (this.capcutEffectMasterToggle) this.capcutEffectMasterToggle.checked = true;
        this.updateCapCutDetailsUI();
        this.applyCapCutFiltersToElements();
        this.showToast('4K Ultra HDR Applied (CapCut Preset 1) 💎');
      });
    }

    if (this.presetCapcutNatural) {
      this.presetCapcutNatural.addEventListener('click', () => {
        this.setActivePresetPill(this.presetCapcutNatural);
        // Screenshot 2 values
        this.setCapCutValues(10, 15, 12, 30, 35, 17, 79);
        this.capcutEffectEnabled = true;
        if (this.capcutEffectMasterToggle) this.capcutEffectMasterToggle.checked = true;
        this.updateCapCutDetailsUI();
        this.applyCapCutFiltersToElements();
        this.showToast('Natural Crisp 4K Applied (CapCut Preset 2) ⚡');
      });
    }

    if (this.presetCapcutDreamy) {
      this.presetCapcutDreamy.addEventListener('click', () => {
        this.setActivePresetPill(this.presetCapcutDreamy);
        this.setCapCutValues(45, 20, 40, 50, 55, 45, 85);
        this.capcutEffectEnabled = true;
        if (this.capcutEffectMasterToggle) this.capcutEffectMasterToggle.checked = true;
        this.updateCapCutDetailsUI();
        this.applyCapCutFiltersToElements();
        this.showToast('Soft Aesthetic Glow Applied 🌟');
      });
    }

    if (this.presetCapcutOriginal) {
      this.presetCapcutOriginal.addEventListener('click', () => {
        this.setActivePresetPill(this.presetCapcutOriginal);
        this.capcutEffectEnabled = false;
        if (this.capcutEffectMasterToggle) this.capcutEffectMasterToggle.checked = false;
        this.updateCapCutDetailsUI();
        this.applyCapCutFiltersToElements();
        this.showToast('Original Video (Effects Off) 🚫');
      });
    }

    // Keyframe icons click effect
    const keyframes = this.capcutEffectsCard.querySelectorAll('.keyframe-icon');
    keyframes.forEach(kf => {
      kf.addEventListener('click', () => {
        kf.style.color = '#38bdf8';
        kf.style.transform = 'scale(1.3)';
        setTimeout(() => {
          kf.style.transform = '';
        }, 300);
        this.showToast('Keyframe locked at current frame! ◇');
      });
    });
  }

  syncCapCutSlider(slider, numInput, propKey) {
    if (!slider || !numInput) return;

    slider.addEventListener('input', () => {
      const val = parseInt(slider.value, 10);
      numInput.value = val;
      this[propKey] = val;
      this.updateCapCutDetailsUI();
      this.applyCapCutFiltersToElements();
    });

    numInput.addEventListener('input', () => {
      let val = parseInt(numInput.value, 10);
      if (isNaN(val)) val = 0;
      val = Math.max(0, Math.min(100, val));
      slider.value = val;
      this[propKey] = val;
      this.updateCapCutDetailsUI();
      this.applyCapCutFiltersToElements();
    });
  }

  setActivePresetPill(activeBtn) {
    if (this.fxPresetPills) {
      this.fxPresetPills.forEach(p => p.classList.remove('active'));
    }
    if (activeBtn) activeBtn.classList.add('active');
  }

  setCapCutValues(glow, blur, sharpen, range, size, softLight, filters) {
    this.fxGlow = glow;
    this.fxBlur = blur;
    this.fxSharpen = sharpen;
    this.fxRange = range;
    this.fxSize = size;
    this.fxSoftLight = softLight;
    this.fxFilters = filters;

    if (this.fxGlowSlider) this.fxGlowSlider.value = glow;
    if (this.fxGlowNum) this.fxGlowNum.value = glow;
    if (this.fxBlurSlider) this.fxBlurSlider.value = blur;
    if (this.fxBlurNum) this.fxBlurNum.value = blur;
    if (this.fxSharpenSlider) this.fxSharpenSlider.value = sharpen;
    if (this.fxSharpenNum) this.fxSharpenNum.value = sharpen;
    if (this.fxRangeSlider) this.fxRangeSlider.value = range;
    if (this.fxRangeNum) this.fxRangeNum.value = range;
    if (this.fxSizeSlider) this.fxSizeSlider.value = size;
    if (this.fxSizeNum) this.fxSizeNum.value = size;
    if (this.fxSoftLightSlider) this.fxSoftLightSlider.value = softLight;
    if (this.fxSoftLightNum) this.fxSoftLightNum.value = softLight;
    if (this.fxFiltersSlider) this.fxFiltersSlider.value = filters;
    if (this.fxFiltersNum) this.fxFiltersNum.value = filters;
  }

  updateCapCutDetailsUI() {
    if (this.capcutStatusBadge) {
      if (this.capcutEffectEnabled) {
        this.capcutStatusBadge.classList.add('active');
        this.capcutStatusBadge.textContent = `${this.currentActiveEffect === '4k_hdr' ? '4K HDR' : 'Effect'}: Active (${this.fxFilters}%)`;
      } else {
        this.capcutStatusBadge.classList.remove('active');
        this.capcutStatusBadge.textContent = 'Effects: Off';
      }
    }

    if (this.subnavEffectsBtn) {
      this.subnavEffectsBtn.textContent = this.capcutEffectEnabled ? '✨ 4K HDR: ON' : '✨ 4K HDR: OFF';
      this.subnavEffectsBtn.style.color = this.capcutEffectEnabled ? '#38bdf8' : '#94a3b8';
      this.subnavEffectsBtn.style.borderColor = this.capcutEffectEnabled ? 'rgba(56, 189, 248, 0.5)' : 'rgba(255, 255, 255, 0.15)';
    }

    if (this.fxLiveDescription) {
      if (this.capcutEffectEnabled) {
        this.fxLiveDescription.innerHTML = `<strong>Live 4K HDR:</strong> Glow ${this.fxGlow}, Sharpen ${this.fxSharpen}, Range ${this.fxRange}, Filters ${this.fxFilters}% active on Mobile Preview & Main Player!`;
      } else {
        this.fxLiveDescription.innerHTML = `<strong>Original Video:</strong> 4K HDR effects are currently paused. Enable toggle above to activate!`;
      }
    }
  }

  getCapCutFilterString() {
    if (!this.capcutEffectEnabled) {
      return 'none';
    }

    const intensity = (this.fxFilters / 100);
    if (intensity <= 0) return 'none';

    if (this.currentActiveEffect === 'dynamic_blur') {
      const blurPx = ((this.fxBlur / 100) * 12 * intensity).toFixed(1);
      const contrastVal = (100 + (this.fxRange * 0.15 * intensity)).toFixed(0);
      return `blur(${blurPx}px) contrast(${contrastVal}%)`;
    }

    if (this.currentActiveEffect === 'soft_glow') {
      const glowPx = (this.fxGlow * 0.18 * intensity).toFixed(1);
      const brightVal = (100 + (this.fxSoftLight * 0.18 * intensity)).toFixed(0);
      const contrastVal = (100 + (this.fxRange * 0.12 * intensity)).toFixed(0);
      return `brightness(${brightVal}%) contrast(${contrastVal}%) drop-shadow(0 0 ${glowPx}px rgba(255, 230, 200, ${(0.25 * intensity).toFixed(2)}))`;
    }

    if (this.currentActiveEffect === 'ultra_sharpen') {
      const contrastVal = (100 + (this.fxSharpen * 0.40 * intensity)).toFixed(0);
      const saturateVal = (100 + (this.fxRange * 0.25 * intensity)).toFixed(0);
      return `contrast(${contrastVal}%) saturate(${saturateVal}%)`;
    }

    // Default: 4K HDR (CapCut Formula)
    // Contrast boost from Range and Sharpen
    const contrastBoost = (100 + (this.fxRange * 0.28 + this.fxSharpen * 0.18) * intensity).toFixed(1);
    // Brightness lift from Soft Light and Glow
    const brightBoost = (100 + ((this.fxSoftLight - 30) * 0.14 + this.fxGlow * 0.08) * intensity).toFixed(1);
    // Color Saturation from Range and Filters
    const satBoost = (100 + (this.fxRange * 0.22 + (this.fxFilters - 50) * 0.15) * intensity).toFixed(1);
    // Highlight bloom from Glow
    const glowDrop = (this.fxGlow * 0.12 * intensity).toFixed(1);
    const glowAlpha = (this.fxGlow * 0.005 * intensity).toFixed(2);

    let filterStr = `contrast(${contrastBoost}%) brightness(${brightBoost}%) saturate(${satBoost}%)`;
    if (parseFloat(glowDrop) > 0.5 && parseFloat(glowAlpha) > 0.02) {
      filterStr += ` drop-shadow(0 0 ${glowDrop}px rgba(255, 255, 255, ${glowAlpha}))`;
    }
    if (this.fxBlur > 25) {
      const subtleBlur = ((this.fxBlur - 25) * 0.025 * intensity).toFixed(2);
      filterStr += ` blur(${subtleBlur}px)`;
    }
    return filterStr;
  }

  applyCapCutFiltersToElements() {
    const filterStr = this.getCapCutFilterString();
    const cssFilter = filterStr === 'none' ? '' : filterStr;

    // Apply to Main Video Player (native video only)
    if (this.sourceVideo) {
      this.sourceVideo.style.filter = cssFilter;
    }
    // YouTube iframe must always be filter-free for crystal-clear 1080p native sharpness
    if (this.youtubeIframe) {
      this.youtubeIframe.style.filter = 'none';
    }

    // Apply to Mobile Phone Preview Canvas
    if (this.cropCanvas) {
      this.cropCanvas.style.filter = cssFilter;
    }
    if (this.phoneYoutubeIframe) {
      this.phoneYoutubeIframe.style.filter = 'none';
    }
  }

  updateTrimmerUI() {
    const leftPct = (this.clipStart / this.videoDuration) * 100;
    const rightPct = (this.clipEnd / this.videoDuration) * 100;
    const duration = (this.clipEnd - this.clipStart).toFixed(1);

    this.trimmerZone.style.left = `${leftPct}%`;
    this.trimmerZone.style.right = `${100 - rightPct}%`;
    this.trimmerLeft.style.left = `${leftPct}%`;
    this.trimmerRight.style.left = `${rightPct}%`;

    this.leftTimeTag.textContent = this.formatTime(this.clipStart);
    this.rightTimeTag.textContent = this.formatTime(this.clipEnd);

    this.startInput.value = this.formatTime(this.clipStart);
    this.endInput.value = this.formatTime(this.clipEnd);
    this.clipDurationDisplay.textContent = `${duration}s`;
    
    if (this.zoneBadge) {
      this.zoneBadge.textContent = `⚡ Selected Short (${duration}s)`;
    }

    // Sync Live Mobile Phone Preview Badge
    if (this.phoneLiveTagText) {
      if (this.isCustomAdjusted) {
        this.phoneLiveTagText.textContent = `CUSTOM • ${this.formatTime(this.clipStart)} - ${this.formatTime(this.clipEnd)} (${duration}s)`;
      } else {
        const num = (this.activeClipIndex !== undefined ? this.activeClipIndex + 1 : 1);
        this.phoneLiveTagText.textContent = `REEL ${num} • ${this.formatTime(this.clipStart)} - ${this.formatTime(this.clipEnd)} (${duration}s)`;
      }
    }

    // Sync Status Text under timeline
    if (this.syncStatusText) {
      if (this.isCustomAdjusted) {
        this.syncStatusText.textContent = `Custom Adjusted: ${this.formatTime(this.clipStart)} - ${this.formatTime(this.clipEnd)} (${duration}s)`;
      } else {
        this.syncStatusText.textContent = `Synced with Mobile: ${this.formatTime(this.clipStart)} - ${this.formatTime(this.clipEnd)} (${duration}s)`;
      }
    }
  }

  renderWaveform() {
    const canvas = this.waveformCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.clientWidth || 800;
    canvas.height = 85;

    const count = 100;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / count;
    const midY = canvas.height / 2;

    const totalDur = (this.videoDuration && isFinite(this.videoDuration) && this.videoDuration > 0) ? this.videoDuration : 90;

    // Relate peaks to the actual positions of the analyzed reels
    const peaks = (this.clipsMoments && this.clipsMoments.length > 0)
      ? this.clipsMoments.map(m => ((m.start + m.end) / 2) / totalDur)
      : [0.15, 0.32, 0.48, 0.65, 0.80, 0.95];

    // Find YouTube #1 Most Replayed retention peak (e.g. LeBron James shootout)
    let highestPeakPos = -1;
    if (this.clipsMoments && this.clipsMoments.length > 0) {
      let maxScore = -1;
      this.clipsMoments.forEach(m => {
        const v = parseInt((m.viralityScore || '90').replace(/[^\d]/g, ''), 10) || 90;
        const isYtTop = m.isYtMostReplayed && (m.ytBadge && m.ytBadge.includes('#1') || v >= 100);
        if (isYtTop || (v > maxScore && m.isYtMostReplayed)) {
          maxScore = isYtTop ? 999 : v;
          highestPeakPos = ((m.start + m.end) / 2) / totalDur;
        }
      });
      if (highestPeakPos < 0) {
        highestPeakPos = ((this.clipsMoments[0].start + this.clipsMoments[0].end) / 2) / totalDur;
      }
    }

    const retentionPoints = [];

    for (let i = 0; i < count; i++) {
      const pos = i / count;
      let energy = 0.2 + (Math.sin(i * 9.7) * 0.15 + 0.15);

      peaks.forEach(peak => {
        const dist = Math.abs(pos - peak);
        if (dist < 0.07) {
          energy = Math.max(energy, 0.88 + (0.07 - dist) * 1.5);
        }
      });

      // YouTube retention heatmap curve
      let retention = 0.32 + Math.sin(pos * 3.14) * 0.12;
      peaks.forEach(peak => {
        const dist = Math.abs(pos - peak);
        if (dist < 0.08) {
          retention = Math.max(retention, 0.72 + (0.08 - dist) * 3.2);
        }
      });
      if (highestPeakPos >= 0 && Math.abs(pos - highestPeakPos) < 0.07) {
        retention = Math.min(0.96, retention + 0.22);
      }
      retentionPoints.push({ x: i * barWidth + barWidth / 2, y: canvas.height * (1 - retention * 0.72) });

      const barH = Math.min(canvas.height * 0.65, energy * (canvas.height * 0.60));
      ctx.fillStyle = energy > 0.82 ? '#ec4899' : energy > 0.55 ? '#3b82f6' : '#272d42';
      ctx.fillRect(i * barWidth, midY - barH / 2 + 10, barWidth - 1, barH);
    }

    // Draw YouTube "Most Replayed" Heatmap line overlay (just like YouTube's desktop player)
    if (retentionPoints.length > 1) {
      ctx.beginPath();
      ctx.moveTo(retentionPoints[0].x, retentionPoints[0].y);
      for (let i = 1; i < retentionPoints.length; i++) {
        ctx.lineTo(retentionPoints[i].x, retentionPoints[i].y);
      }
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.85)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Soft gradient under retention curve
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, 'rgba(239, 68, 68, 0.22)');
      grad.addColorStop(1, 'rgba(239, 68, 68, 0.0)');
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // Draw "🔥 YouTube Most Replayed" pin on highest retention peak
    if (highestPeakPos >= 0) {
      const pinX = Math.min(canvas.width - 95, Math.max(95, highestPeakPos * canvas.width));
      const pinY = 16;

      ctx.save();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(pinX - 82, pinY - 12, 164, 21, 5);
      } else {
        ctx.rect(pinX - 82, pinY - 12, 164, 21);
      }
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 9.5px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#fca5a5';
      ctx.textAlign = 'center';
      ctx.fillText('🔥 YouTube #1 Most Replayed', pinX, pinY + 3);

      // Downward pointer arrow
      ctx.beginPath();
      ctx.moveTo(pinX - 4, pinY + 9);
      ctx.lineTo(pinX + 4, pinY + 9);
      ctx.lineTo(pinX, pinY + 14);
      ctx.closePath();
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      ctx.restore();
    }
  }

  /* ----------------------------------------------------
     8. 9:16 Canvas Render Engine with Real HD Video Source
  ---------------------------------------------------- */
  setupDemoVideoSource() {
    // Load real high-definition MP4 video
    this.sourceVideo.src = 'podcast.mp4';
    this.sourceVideo.playsInline = true;
    this.sourceVideo.muted = true; // Start muted to guarantee browser autoplay
    this.sourceVideo.loop = false; // Looping handled via timeupdate for precise trimmer boundaries

    this.sourceVideo.addEventListener('loadedmetadata', () => {
      if (this.activeSourceType !== 'youtube' && (!this.currentVideoUrl || this.currentVideoUrl.endsWith('podcast.mp4'))) {
        if (isFinite(this.sourceVideo.duration) && this.sourceVideo.duration > 0) {
          this.videoDuration = this.sourceVideo.duration;
          this.recalculateMomentsForDuration();
        }
      }
      this.updateTrimmerUI();
    });

    this.sourceVideo.addEventListener('error', (e) => {
      console.warn('Primary video error, ensuring podcast.mp4 fallback:', e);
      if (!this.sourceVideo.src.endsWith('podcast.mp4')) {
        this.sourceVideo.src = 'podcast.mp4';
        this.sourceVideo.load();
      }
    });

    this.sourceVideo.load();
    this.sourceVideo.play().catch(e => {
      console.log('Autoplay muted handled:', e);
    });
  }

  distributeClipsAcrossDuration(totalDur) {
    if (!this.clipsMoments || !this.clipsMoments.length) return;
    const dur = (totalDur && isFinite(totalDur) && totalDur > 10) ? totalDur : 1200;
    const count = this.clipsMoments.length;

    // Check if current clips fit naturally without any overlaps and all end <= dur
    const lastClip = this.clipsMoments[count - 1];
    let hasCollisionOrOverflow = (!lastClip || lastClip.end > dur);
    
    // Check if any two adjacent clips share the exact same start or end
    for (let i = 0; i < count - 1; i++) {
      if (this.clipsMoments[i].start === this.clipsMoments[i + 1].start || 
          this.clipsMoments[i].end === this.clipsMoments[i + 1].end ||
          this.clipsMoments[i].end > dur) {
        hasCollisionOrOverflow = true;
        break;
      }
    }

    if (hasCollisionOrOverflow) {
      // Calculate intelligent, non-overlapping intervals across the whole video
      const clipSpan = Math.max(30, Math.min(55, Math.floor((dur * 0.85) / count)));
      const usableSpan = Math.max(0, dur - clipSpan);
      const step = count > 1 ? usableSpan / (count - 1) : 0;

      this.clipsMoments.forEach((m, idx) => {
        let start = Math.floor(idx * step);
        let end = Math.min(dur, start + clipSpan);
        if (end <= start) {
          start = Math.max(0, end - 30);
        }
        m.start = parseFloat(start.toFixed(1));
        m.end = parseFloat(end.toFixed(1));
      });
    }
  }

  recalculateMomentsForDuration() {
    const total = this.videoDuration;
    if (total <= 0 || !this.clipsMoments || !this.clipsMoments.length) return;

    // Distribute all 6 reels intelligently so each has a unique, non-overlapping timeline
    this.distributeClipsAcrossDuration(total);

    this.renderSuggestedClipsUI();
    this.renderSubnavPills();

    const activeMoment = this.clipsMoments[this.activeClipIndex || 0];
    if (activeMoment) {
      this.clipStart = activeMoment.start;
      this.clipEnd = activeMoment.end;
    }
    this.updateTrimmerUI();
    this.renderWaveform();
    this.playCardVideo(this.activeClipIndex || 0);
  }

  loadVideoFile(filePath, title, author, img) {
    this.sourceVideo.src = filePath;
    this.sourceVideo.load();
    this.applyVideoMeta(filePath, title, author, img);
    this.sourceVideo.play().catch(console.warn);
  }

  start9x16RenderEngine() {
    const canvas = this.cropCanvas;
    const ctx = this.ctxCrop;

    const render = () => {
      this.gameplayFrame++;
      const cw = canvas.width;
      const ch = canvas.height;

      ctx.save();

      if (this.activeLayout === 'split') {
        // Top 50% Video
        const topH = ch * 0.5;
        if (this.sourceVideo.readyState >= 2 || this.sourceVideo.srcObject) {
          const vw = this.sourceVideo.videoWidth || 1280;
          const vh = this.sourceVideo.videoHeight || 720;
          const cropW = vh * (cw / topH);
          const maxOffset = vw - cropW;
          const cropX = Math.max(0, maxOffset * this.activePan);

          ctx.drawImage(this.sourceVideo, cropX, 0, cropW, vh, 0, 0, cw, topH);
        }

        // Divider
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(0, topH - 3, cw, 6);

        // Bottom 50% Subway Surfers Gameplay
        this.renderSubwayGameplay(ctx, 0, topH, cw, ch - topH);

        if (this.autoHookToggle && this.autoHookToggle.checked) {
          this.renderTopHookBanner(ctx, cw, 30);
        }

        if ((!this.studioCaptionsToggle || this.studioCaptionsToggle.checked) &&
            (!this.captionsToggle || this.captionsToggle.checked)) {
          this.renderCrazyCaptionStyle(ctx, cw, topH * 0.85);
        }

      } else if (this.activeLayout === 'fit') {
        // Fit 9:16: Full 16:9 widescreen video centered with blurred backdrop (Zero text or captions cut off!)
        if (this.sourceVideo.readyState >= 2 || this.sourceVideo.srcObject) {
          const vw = this.sourceVideo.videoWidth || 1280;
          const vh = this.sourceVideo.videoHeight || 720;

          // Blurred Background to fill 9:16 frame
          ctx.save();
          ctx.filter = 'blur(28px) brightness(0.65)';
          ctx.drawImage(this.sourceVideo, 0, 0, vw, vh, -30, -30, cw + 60, ch + 60);
          ctx.restore();

          // Centered 16:9 Video (Guarantees all text and faces fit 100% inside screen)
          const fitH = cw * (vh / vw);
          const fitY = (ch - fitH) / 2;
          ctx.drawImage(this.sourceVideo, 0, 0, vw, vh, 0, fitY, cw, fitH);
        }

        if (this.autoHookToggle && this.autoHookToggle.checked) {
          this.renderTopHookBanner(ctx, cw, 60);
        }

        if ((!this.studioCaptionsToggle || this.studioCaptionsToggle.checked) &&
            (!this.captionsToggle || this.captionsToggle.checked)) {
          this.renderCrazyCaptionStyle(ctx, cw, ch * 0.72);
        }

      } else if (this.activeLayout === 'square') {
        // 1:1 Square centered inside 9:16 frame
        if (this.sourceVideo.readyState >= 2 || this.sourceVideo.srcObject) {
          const vw = this.sourceVideo.videoWidth || 1280;
          const vh = this.sourceVideo.videoHeight || 720;
          const squareSize = vh;
          const maxOffset = vw - squareSize;
          const cropX = Math.max(0, maxOffset * this.activePan);

          // Blurred Background
          ctx.save();
          ctx.filter = 'blur(28px) brightness(0.65)';
          ctx.drawImage(this.sourceVideo, 0, 0, vw, vh, -30, -30, cw + 60, ch + 60);
          ctx.restore();

          const targetY = (ch - cw) / 2;
          ctx.drawImage(this.sourceVideo, cropX, 0, squareSize, squareSize, 0, targetY, cw, cw);
        }

        if (this.autoHookToggle && this.autoHookToggle.checked) {
          this.renderTopHookBanner(ctx, cw, 60);
        }

        if ((!this.studioCaptionsToggle || this.studioCaptionsToggle.checked) &&
            (!this.captionsToggle || this.captionsToggle.checked)) {
          this.renderCrazyCaptionStyle(ctx, cw, ch * 0.74);
        }

      } else {
        // Full 9:16 Video Reframe (Standard Zoom)
        if (this.sourceVideo.readyState >= 2 || this.sourceVideo.srcObject) {
          const vw = this.sourceVideo.videoWidth || 1280;
          const vh = this.sourceVideo.videoHeight || 720;
          const cropW = vh * (9 / 16);
          const maxOffset = vw - cropW;
          const cropX = Math.max(0, maxOffset * this.activePan);

          ctx.drawImage(this.sourceVideo, cropX, 0, cropW, vh, 0, 0, cw, ch);
        }

        if (this.autoHookToggle && this.autoHookToggle.checked) {
          this.renderTopHookBanner(ctx, cw, 60);
        }

        if ((!this.studioCaptionsToggle || this.studioCaptionsToggle.checked) &&
            (!this.captionsToggle || this.captionsToggle.checked)) {
          this.renderCrazyCaptionStyle(ctx, cw, ch * 0.74);
        }
      }

      // Render floating captions & hook on phoneCaptionsOverlayCanvas when in YouTube mode
      if (this.activeSourceType === 'youtube' && this.phoneCaptionsOverlayCanvas && this.ctxPhoneOverlay) {
        const oCtx = this.ctxPhoneOverlay;
        const oCanvas = this.phoneCaptionsOverlayCanvas;
        oCtx.clearRect(0, 0, oCanvas.width, oCanvas.height);

        if (this.autoHookToggle && this.autoHookToggle.checked) {
          this.renderTopHookBanner(oCtx, oCanvas.width, 60);
        }
        if ((!this.studioCaptionsToggle || this.studioCaptionsToggle.checked) &&
            (!this.captionsToggle || this.captionsToggle.checked)) {
          this.renderCrazyCaptionStyle(oCtx, oCanvas.width, oCanvas.height * 0.74);
        }
      }

      ctx.restore();
      requestAnimationFrame(render);
    };

    render();
  }

  renderTopHookBanner(ctx, cw, y) {
    const hookText = (this.hookTextInput.value || 'Wait for the end... 😱').trim();
    if (!hookText) return;

    ctx.save();
    let size = 26;
    ctx.font = `800 ${size}px "Plus Jakarta Sans", sans-serif`;
    ctx.textAlign = 'center';
    const maxW = cw * 0.78;
    let lines = this.wrapCaptionLines(ctx, hookText, maxW);
    while (size > 16 && lines.some(l => ctx.measureText(l).width > maxW)) {
      size -= 2;
      ctx.font = `800 ${size}px "Plus Jakarta Sans", sans-serif`;
      lines = this.wrapCaptionLines(ctx, hookText, maxW);
    }

    const lineH = size * 1.3;
    const totalH = lines.length * lineH + 16;
    let maxLW = 0;
    lines.forEach(l => {
      const w = ctx.measureText(l).width;
      if (w > maxLW) maxLW = w;
    });

    const boxW = Math.min(maxW + 24, maxLW + 36);
    const boxX = (cw - boxW) / 2;
    const boxY = y - 20;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.roundRect(boxX, boxY, boxW, totalH, 20);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    lines.forEach((l, i) => {
      ctx.fillText(l, cw / 2, y + 10 + (i * lineH));
    });
    ctx.restore();
  }

  renderSubwayGameplay(ctx, x, y, w, h) {
    ctx.save();
    ctx.translate(x, y);

    const groundGrad = ctx.createLinearGradient(0, 0, 0, h);
    groundGrad.addColorStop(0, '#1c1917');
    groundGrad.addColorStop(1, '#0c0a09');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, 0, w, h);

    const speed = (this.gameplayFrame * 14) % 120;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    for (let offset = -120; offset < h + 120; offset += 60) {
      const lineY = offset + speed;
      if (lineY >= 0 && lineY <= h) {
        ctx.beginPath();
        ctx.moveTo(w * 0.2, lineY);
        ctx.lineTo(w * 0.8, lineY);
        ctx.stroke();
      }
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(w * 0.35, 0); ctx.lineTo(w * 0.2, h);
    ctx.moveTo(w * 0.65, 0); ctx.lineTo(w * 0.8, h);
    ctx.stroke();

    const coinY = (this.gameplayFrame * 8) % (h + 80);
    ctx.fillStyle = '#facc15';
    ctx.beginPath();
    ctx.arc(w * 0.5, coinY, 18, 0, Math.PI * 2);
    ctx.fill();

    const runnerX = w * 0.5 + Math.sin(this.gameplayFrame * 0.08) * 60;
    const runnerY = h * 0.75;
    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🛹', runnerX, runnerY);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
    ctx.roundRect(20, 20, 180, 40, 8);
    ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`SCORE: ${(this.gameplayFrame * 14).toLocaleString()}`, 30, 46);

    ctx.restore();
  }

  /**
   * Helper to wrap caption text into lines that strictly fit within maxW for 9:16 ratio.
   * If caption fits in 1 line, returns [1 line].
   * If caption does not fit in 1 line, automatically balances into exactly 2 lines so it never overflows.
   */
  wrapCaptionLines(ctx, text, maxW) {
    if (!text) return [];
    const trimmed = text.trim();
    if (!trimmed) return [];

    // 1. If text fits completely on 1 single line inside maxW, keep on 1 line
    if (ctx.measureText(trimmed.toUpperCase()).width <= maxW) {
      return [trimmed];
    }

    // 2. If it does NOT fit on 1 line -> Auto-adjust into 2 balanced lines
    const words = trimmed.split(/\s+/);
    if (words.length <= 1) {
      return [trimmed];
    }

    // Find the most balanced split point for 2 lines
    let bestSplitIdx = Math.ceil(words.length / 2);
    let minDiff = Infinity;
    for (let i = 1; i < words.length; i++) {
      const lineA = words.slice(0, i).join(' ').toUpperCase();
      const lineB = words.slice(i).join(' ').toUpperCase();
      const diff = Math.abs(ctx.measureText(lineA).width - ctx.measureText(lineB).width);
      if (diff < minDiff) {
        minDiff = diff;
        bestSplitIdx = i;
      }
    }

    const line1 = words.slice(0, bestSplitIdx).join(' ');
    const line2 = words.slice(bestSplitIdx).join(' ');
    return [line1, line2];
  }

  /**
   * Renders the 8 Creator Caption Styles on Video Canvas within strict 9:16 safe ratio boundaries
   */
  renderCrazyCaptionStyle(ctx, cw, defaultPosY) {
    if (this.studioCaptionsToggle && !this.studioCaptionsToggle.checked) return;
    if (this.captionsToggle && !this.captionsToggle.checked) return;

    const activeIdx = (this.activeClipIndex !== undefined && this.activeClipIndex >= 0) ? this.activeClipIndex : 0;
    const rawText = ((this.userAppliedCaption && this.userAppliedCaption.trim()) ||
                     (this.clipsMoments && this.clipsMoments[activeIdx] && this.clipsMoments[activeIdx].caption) ||
                     (this.clipsMoments && this.clipsMoments[activeIdx] && this.clipsMoments[activeIdx].subtitles && this.clipsMoments[activeIdx].subtitles[0]) ||
                     '').trim();
    if (!rawText) return;

    ctx.save();
    const ch = ctx.canvas.height;
    const midX = cw / 2;
    const fontSize = this.captionFontSize || 40;
    const maxAllowedWidth = cw * 0.78; // Strictly 78% of 9:16 canvas width (safe zone - never overflows)

    // Calculate dynamic Y based on chosen position: Top, Center, or Bottom in 9:16 safe area
    let posY = defaultPosY;
    if (this.captionPosition === 'top') {
      posY = ch * 0.16;
    } else if (this.captionPosition === 'center') {
      posY = ch * 0.48;
    } else {
      posY = ch * 0.76;
    }

    switch (this.selectedStyleId) {
      case 'classic': // 1. Classic (Alex Hormozi Yellow & White)
        this.renderMultiLineClassic(ctx, midX, posY, rawText, fontSize, maxAllowedWidth);
        break;

      case 'cyan_slide': // 2. Cyan Slide (Electric Cyan with Active Highlight)
        this.renderCyanSlideStyle(ctx, midX, posY, rawText, fontSize, maxAllowedWidth);
        break;

      case 'italic_red': // 3. Italic Red (Slanted Sports Red with Highlight Box)
        this.renderItalicRedStyle(ctx, midX, posY, rawText, fontSize, maxAllowedWidth);
        break;

      case 'cream_blue': // 4. Cream Blue (Soft Luxury Blue Glow)
        this.renderCreamBlueStyle(ctx, midX, posY, rawText, fontSize, maxAllowedWidth);
        break;

      case 'red_spin': // 5. Red Spin (Fiery Red with Black Stroke)
        this.renderRedSpinStyle(ctx, midX, posY, rawText, fontSize, maxAllowedWidth);
        break;

      case 'violet': // 6. Violet (Royal Purple Neon Glow)
        this.renderVioletStyle(ctx, midX, posY, rawText, fontSize, maxAllowedWidth);
        break;

      case 'blue_glow': // 7. Blue Glow (to get STARTED)
        this.renderBlueGlowStyle(ctx, midX, posY, rawText, fontSize, maxAllowedWidth);
        break;

      case 'toxic_green': // 8. Toxic Green (Radioactive Neon Green)
        this.renderToxicGreenStyle(ctx, midX, posY, rawText, fontSize, maxAllowedWidth);
        break;

      default:
        this.renderMultiLineClassic(ctx, midX, posY, rawText, fontSize, maxAllowedWidth);
        break;
    }

    ctx.restore();
  }

  // 1. Classic Style (Alex Hormozi Black Rounded Box & Yellow Punchline - 9:16 safe)
  renderMultiLineClassic(ctx, midX, posY, text, fontSize, maxW) {
    let size = fontSize || 40;
    ctx.font = `900 ${size}px "Plus Jakarta Sans", sans-serif`;

    let lines = this.wrapCaptionLines(ctx, text, maxW);
    while (size > 18 && lines.some(line => ctx.measureText(line.toUpperCase()).width > maxW)) {
      size -= 2;
      ctx.font = `900 ${size}px "Plus Jakarta Sans", sans-serif`;
      lines = this.wrapCaptionLines(ctx, text, maxW);
    }

    const lineHeight = size * 1.25;
    const totalBlockH = lines.length * lineHeight;
    let startY = posY - (totalBlockH / 2) + (size * 0.4);

    let maxLineWidth = 0;
    lines.forEach(line => {
      const lw = ctx.measureText(line.toUpperCase()).width;
      if (lw > maxLineWidth) maxLineWidth = lw;
    });

    const boxW = Math.min(maxW + 20, maxLineWidth + 32);
    const boxH = totalBlockH + 16;
    const boxX = midX - boxW / 2;
    const boxY = startY - size * 0.85;

    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.88)';
    ctx.roundRect(boxX, boxY, boxW, boxH, 12);
    ctx.fill();

    ctx.textAlign = 'center';
    lines.forEach((line, idx) => {
      const isLast = (idx === lines.length - 1);
      ctx.font = `900 ${size}px "Plus Jakarta Sans", sans-serif`;
      ctx.fillStyle = isLast ? '#facc15' : '#ffffff';
      ctx.fillText(line.toUpperCase(), midX, startY + (idx * lineHeight));
    });
    ctx.restore();
  }

  // 2. Cyan Slide Style (Electric Cyan with Active Highlight Pill - 9:16 safe)
  renderCyanSlideStyle(ctx, midX, posY, text, fontSize, maxW) {
    let size = fontSize || 40;
    ctx.font = `900 ${size}px "Plus Jakarta Sans", sans-serif`;

    let lines = this.wrapCaptionLines(ctx, text, maxW);
    while (size > 18 && lines.some(line => ctx.measureText(line.toUpperCase()).width > maxW)) {
      size -= 2;
      ctx.font = `900 ${size}px "Plus Jakarta Sans", sans-serif`;
      lines = this.wrapCaptionLines(ctx, text, maxW);
    }

    const lineHeight = size * 1.3;
    const totalBlockH = lines.length * lineHeight;
    let startY = posY - (totalBlockH / 2) + (size * 0.4);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.shadowColor = '#00f2fe';
    ctx.shadowBlur = 20;

    lines.forEach((line, idx) => {
      const isLast = (idx === lines.length - 1);
      const lineY = startY + (idx * lineHeight);

      if (isLast && lines.length > 1) {
        const lineW = ctx.measureText(line.toUpperCase()).width;
        ctx.save();
        ctx.fillStyle = 'rgba(0, 242, 254, 0.35)';
        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 1.5;
        ctx.roundRect(midX - lineW / 2 - 12, lineY - size * 0.85, lineW + 24, size * 1.25, 8);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = '#ffffff';
        ctx.fillText(line.toUpperCase(), midX, lineY);
      } else {
        ctx.fillStyle = '#00d2ff';
        ctx.fillText(line.toUpperCase(), midX, lineY);
      }
    });
    ctx.restore();
  }

  // 3. Italic Red Style (Slanted Sports Red with Highlight Box - 9:16 safe)
  renderItalicRedStyle(ctx, midX, posY, text, fontSize, maxW) {
    let size = fontSize || 40;
    ctx.font = `italic 900 ${size}px "Plus Jakarta Sans", sans-serif`;

    let lines = this.wrapCaptionLines(ctx, text, maxW);
    while (size > 18 && lines.some(line => ctx.measureText(line.toUpperCase()).width > maxW)) {
      size -= 2;
      ctx.font = `italic 900 ${size}px "Plus Jakarta Sans", sans-serif`;
      lines = this.wrapCaptionLines(ctx, text, maxW);
    }

    const lineHeight = size * 1.3;
    const totalBlockH = lines.length * lineHeight;
    let startY = posY - (totalBlockH / 2) + (size * 0.4);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(255, 42, 42, 0.9)';
    ctx.shadowBlur = 20;

    lines.forEach((line, idx) => {
      const isLast = (idx === lines.length - 1);
      const lineY = startY + (idx * lineHeight);

      if (isLast && lines.length > 1) {
        const lineW = ctx.measureText(line.toUpperCase()).width;
        ctx.save();
        ctx.fillStyle = 'rgba(255, 42, 42, 0.45)';
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.roundRect(midX - lineW / 2 - 12, lineY - size * 0.85, lineW + 24, size * 1.25, 8);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = '#ffffff';
        ctx.fillText(line.toUpperCase(), midX, lineY);
      } else {
        ctx.fillStyle = '#ff2a2a';
        ctx.fillText(line.toUpperCase(), midX, lineY);
      }
    });
    ctx.restore();
  }

  // 4. Cream Blue Style (Soft Luxury Blue Glow - 9:16 safe)
  renderCreamBlueStyle(ctx, midX, posY, text, fontSize, maxW) {
    let size = (fontSize || 40) - 2;
    ctx.font = `800 ${size}px "Plus Jakarta Sans", sans-serif`;

    let lines = this.wrapCaptionLines(ctx, text, maxW);
    while (size > 18 && lines.some(line => ctx.measureText(line.toUpperCase()).width > maxW)) {
      size -= 2;
      ctx.font = `800 ${size}px "Plus Jakarta Sans", sans-serif`;
      lines = this.wrapCaptionLines(ctx, text, maxW);
    }

    const lineHeight = size * 1.25;
    const totalBlockH = lines.length * lineHeight;
    let startY = posY - (totalBlockH / 2) + (size * 0.4);

    ctx.save();
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(79, 117, 255, 0.95)';
    ctx.shadowBlur = 20;

    lines.forEach((line, idx) => {
      const lineY = startY + (idx * lineHeight);
      ctx.strokeStyle = 'rgba(10, 15, 30, 0.85)';
      ctx.lineWidth = 5;
      ctx.strokeText(line.toUpperCase(), midX, lineY);

      ctx.fillStyle = (idx === lines.length - 1) ? '#60a5fa' : '#fef3c7';
      ctx.fillText(line.toUpperCase(), midX, lineY);
    });
    ctx.restore();
  }

  // 5. Red Spin Style (Fiery Red with Black Stroke Outline - 9:16 safe)
  renderRedSpinStyle(ctx, midX, posY, text, fontSize, maxW) {
    let size = fontSize || 40;
    ctx.font = `900 ${size}px "Plus Jakarta Sans", sans-serif`;

    let lines = this.wrapCaptionLines(ctx, text, maxW);
    while (size > 18 && lines.some(line => ctx.measureText(line.toUpperCase()).width > maxW)) {
      size -= 2;
      ctx.font = `900 ${size}px "Plus Jakarta Sans", sans-serif`;
      lines = this.wrapCaptionLines(ctx, text, maxW);
    }

    const lineHeight = size * 1.25;
    const totalBlockH = lines.length * lineHeight;
    let startY = posY - (totalBlockH / 2) + (size * 0.4);

    ctx.save();
    ctx.textAlign = 'center';

    lines.forEach((line, idx) => {
      const lineY = startY + (idx * lineHeight);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 7;
      ctx.lineJoin = 'round';
      ctx.strokeText(line.toUpperCase(), midX, lineY);

      ctx.shadowColor = 'rgba(255, 31, 61, 0.95)';
      ctx.shadowBlur = 22;
      ctx.fillStyle = '#ff1f3d';
      ctx.fillText(line.toUpperCase(), midX, lineY);
    });
    ctx.restore();
  }

  // 6. Violet Style (Royal Electric Violet & Purple Glow - 9:16 safe)
  renderVioletStyle(ctx, midX, posY, text, fontSize, maxW) {
    let size = fontSize || 40;
    ctx.font = `900 ${size}px "Plus Jakarta Sans", sans-serif`;

    let lines = this.wrapCaptionLines(ctx, text, maxW);
    while (size > 18 && lines.some(line => ctx.measureText(line.toUpperCase()).width > maxW)) {
      size -= 2;
      ctx.font = `900 ${size}px "Plus Jakarta Sans", sans-serif`;
      lines = this.wrapCaptionLines(ctx, text, maxW);
    }

    const lineHeight = size * 1.25;
    const totalBlockH = lines.length * lineHeight;
    let startY = posY - (totalBlockH / 2) + (size * 0.4);

    ctx.save();
    ctx.textAlign = 'center';

    lines.forEach((line, idx) => {
      const lineY = startY + (idx * lineHeight);
      ctx.strokeStyle = '#180a2e';
      ctx.lineWidth = 6;
      ctx.strokeText(line.toUpperCase(), midX, lineY);

      ctx.shadowColor = 'rgba(139, 92, 246, 0.95)';
      ctx.shadowBlur = 24;
      ctx.fillStyle = '#c084fc';
      ctx.fillText(line.toUpperCase(), midX, lineY);
    });
    ctx.restore();
  }

  // 7. Blue Glow Style (to get STARTED - 9:16 safe)
  renderBlueGlowStyle(ctx, midX, posY, text, fontSize, maxW) {
    let size = fontSize || 40;
    ctx.font = `900 ${size}px "Plus Jakarta Sans", sans-serif`;

    let lines = this.wrapCaptionLines(ctx, text, maxW);
    while (size > 18 && lines.some(line => ctx.measureText(line.toUpperCase()).width > maxW)) {
      size -= 2;
      ctx.font = `900 ${size}px "Plus Jakarta Sans", sans-serif`;
      lines = this.wrapCaptionLines(ctx, text, maxW);
    }

    const lineHeight = size * 1.25;
    const totalBlockH = lines.length * lineHeight;
    let startY = posY - (totalBlockH / 2) + (size * 0.4);

    ctx.save();
    ctx.textAlign = 'center';

    lines.forEach((line, idx) => {
      const isLast = (idx === lines.length - 1);
      const lineY = startY + (idx * lineHeight);

      if (isLast && lines.length > 1) {
        ctx.font = `900 ${size + 2}px "Plus Jakarta Sans", sans-serif`;
        ctx.shadowColor = '#00a2ff';
        ctx.shadowBlur = 24;
        ctx.fillStyle = '#00a2ff';
        ctx.fillText(line.toUpperCase(), midX, lineY);
      } else {
        ctx.font = `700 ${size - 4}px "Plus Jakarta Sans", sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 10;
        ctx.fillText(line.toLowerCase(), midX, lineY);
      }
    });
    ctx.restore();
  }

  // 8. Toxic Green Style (Radioactive Neon Green - 9:16 safe)
  renderToxicGreenStyle(ctx, midX, posY, text, fontSize, maxW) {
    let size = (fontSize || 40) + 2;
    ctx.font = `900 ${size}px "Plus Jakarta Sans", sans-serif`;

    let lines = this.wrapCaptionLines(ctx, text, maxW);
    while (size > 18 && lines.some(line => ctx.measureText(line.toUpperCase()).width > maxW)) {
      size -= 2;
      ctx.font = `900 ${size}px "Plus Jakarta Sans", sans-serif`;
      lines = this.wrapCaptionLines(ctx, text, maxW);
    }

    const lineHeight = size * 1.25;
    const totalBlockH = lines.length * lineHeight;
    let startY = posY - (totalBlockH / 2) + (size * 0.4);

    ctx.save();
    ctx.textAlign = 'center';

    lines.forEach((line, idx) => {
      const lineY = startY + (idx * lineHeight);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;
      ctx.strokeText(line.toUpperCase(), midX, lineY);

      ctx.shadowColor = 'rgba(0, 255, 102, 0.95)';
      ctx.shadowBlur = 24;
      ctx.fillStyle = '#00ff66';
      ctx.fillText(line.toUpperCase(), midX, lineY);
    });
    ctx.restore();
  }

  renderWordHighlight(ctx, midX, posY, text, baseColor, highlightColor) {
    const words = text.split(' ');

    if (words.length > 1) {
      const hlIdx = Math.floor(words.length / 2);
      let totalWidth = 0;
      words.forEach(w => {
        totalWidth += ctx.measureText(w + ' ').width;
      });

      let curX = midX - totalWidth / 2;
      ctx.textAlign = 'left';

      words.forEach((w, i) => {
        if (i === hlIdx) {
          ctx.fillStyle = highlightColor;
          ctx.fillText(w, curX, posY);
        } else {
          ctx.fillStyle = baseColor;
          ctx.fillText(w, curX, posY);
        }
        curX += ctx.measureText(w + ' ').width;
      });
    } else {
      ctx.fillStyle = baseColor;
      ctx.fillText(text, midX, posY);
    }
  }

  /* ----------------------------------------------------
     9. Free Video Export Download
  ---------------------------------------------------- */
  bindExport() {
    const handleExport = () => {
      if (this.isRecording) return;
      this.isRecording = true;

      this.exportShortBtn.disabled = true;
      this.exportFromStudioBtn.disabled = true;
      this.exportProgressBox.classList.remove('hidden');
      this.showToast(`Rendering 9:16 Short with ${this.selectedStyleName} Captions... ⚡`);

      this.sourceVideo.currentTime = this.clipStart;
      this.sourceVideo.play();

      const canvasStream = this.cropCanvas.captureStream(30);
      let combinedStream = canvasStream;

      try {
        if (this.sourceVideo.captureStream) {
          const audioStream = this.sourceVideo.captureStream();
          const tracks = audioStream.getAudioTracks();
          if (tracks.length > 0) combinedStream.addTrack(tracks[0]);
        }
      } catch (e) {
        console.warn(e);
      }

      const recordedChunks = [];
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';

      const recorder = new MediaRecorder(combinedStream, { mimeType });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) recordedChunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const downloadUrl = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `ScaleReach_Free_${this.selectedStyleId}_${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        this.isRecording = false;
        this.exportShortBtn.disabled = false;
        this.exportFromStudioBtn.disabled = false;
        this.exportProgressBox.classList.add('hidden');
        this.showToast('Free Short Downloaded (No Watermark)! 🎉');
      };

      recorder.start(100);

      const totalDuration = this.clipEnd - this.clipStart;

      const progressInterval = setInterval(() => {
        const elapsed = this.sourceVideo.currentTime - this.clipStart;
        const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

        this.exportFill.style.width = `${progress}%`;
        this.exportPercentText.textContent = `${Math.round(progress)}%`;

        if (this.sourceVideo.currentTime >= this.clipEnd || !this.isRecording) {
          clearInterval(progressInterval);
          recorder.stop();
          this.sourceVideo.pause();
        }
      }, 100);
    };

    this.exportShortBtn.addEventListener('click', handleExport);
    this.exportFromStudioBtn.addEventListener('click', handleExport);
  }

  /* ----------------------------------------------------
     Helpers
  ---------------------------------------------------- */
  showToast(message) {
    this.toast.textContent = message;
    this.toast.classList.remove('hidden');
    setTimeout(() => {
      this.toast.classList.add('hidden');
    }, 2800);
  }

  formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) return '00:00';
    const totalSec = Math.floor(seconds);
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  parseTime(str) {
    if (!str) return 0;
    if (typeof str === 'number') return str;
    const clean = str.toString().trim();
    if (!clean.includes(':')) {
      const val = parseFloat(clean);
      return (!isNaN(val) && isFinite(val) && val >= 0) ? val : 0;
    }
    const parts = clean.split(':').map(p => parseFloat(p));
    if (parts.length === 3 && !parts.some(isNaN)) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    if (parts.length === 2 && !parts.some(isNaN)) {
      return parts[0] * 60 + parts[1];
    }
    return 0;
  }

  parseDurationToSeconds(input) {
    if (!input) return 0;
    if (typeof input === 'number') return input;
    let str = input.toString().trim();

    if (str.includes('•')) {
      const parts = str.split('•');
      for (const p of parts) {
        const trimmed = p.trim();
        if (/\d+:\d+|\d+\s*[hms]/i.test(trimmed)) {
          str = trimmed;
          break;
        }
      }
    }

    const lower = str.toLowerCase();
    if (lower.includes('h') || lower.includes('m') || lower.includes('s')) {
      let total = 0;
      const hMatch = lower.match(/(\d+)\s*h/);
      const mMatch = lower.match(/(\d+)\s*m/);
      const sMatch = lower.match(/(\d+)\s*s/);
      if (hMatch) total += parseInt(hMatch[1], 10) * 3600;
      if (mMatch) total += parseInt(mMatch[1], 10) * 60;
      if (sMatch) total += parseInt(sMatch[1], 10);
      if (total > 0) return total;
    }

    return this.parseTime(str);
  }
}
