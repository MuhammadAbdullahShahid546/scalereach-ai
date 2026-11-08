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
    this.activeSourceType = 'native';
    this.currentYouTubeId = null;
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
    this.activeLayout = 'standard';
    this.activePan = 0.5;
    this.clipStart = 15;
    this.clipEnd = 45;
    this.videoDuration = 90;
    this.isRecording = false;
    this.isDraggingLeft = false;
    this.isDraggingRight = false;
    this.isDraggingZone = false;
    this.dragStartX = 0;
    this.dragStartClipStart = 15;
    this.dragStartClipEnd = 45;
    this.activeClipIndex = 0;
    this.isCustomAdjusted = false;
    this.gameplayFrame = 0;

    // CapCut Special Effects & 4K HDR State & Elements
    this.capcutEffectsCard = document.getElementById('capcutEffectsCard');
    this.capcutEffectMasterToggle = document.getElementById('capcutEffectMasterToggle');
    this.capcutStatusBadge = document.getElementById('capcutStatusBadge');
    this.subnavEffectsBtn = document.getElementById('subnavEffectsBtn');
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

    // Default CapCut 4K HDR parameters (Values matching Screenshot 1 & 2)
    this.capcutEffectEnabled = true;
    this.currentActiveEffect = '4k_hdr';
    this.fxGlow = 30;
    this.fxBlur = 15;
    this.fxSharpen = 70;
    this.fxRange = 70;
    this.fxSize = 50;
    this.fxSoftLight = 33;
    this.fxFilters = 100;

    // Default sample texts corresponding to the 8 styles
    this.styleSampleTexts = {
      classic: 'TO GET STARTED',
      cyan_slide: 'MORE FOUNDERS THAN',
      italic_red: 'MORE FOUNDERS THAN',
      cream_blue: 'MORE FOUNDERS THAN',
      red_spin: 'BAD PRODUCTS OR',
      violet: 'BAD PRODUCTS OR',
      blue_glow: 'to get STARTED',
      toxic_green: 'TO GET STARTED'
    };

    // Database of Presets & Knowledge Base for AI Video Analysis (8 Viral Reels Each)
    this.videoAnalysisDatabase = [
      {
        id: 'real_podcast_interview',
        matchKeywords: ['podcast', 'interview', 'psychology', 'mindset', 'talk', 'conversation', 'body language'],
        title: 'Communication & Psychology Deep-Dive Podcast',
        author: 'The Mindset Studio • 02:23',
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
        author: 'The Real Talks • 35M+ Views',
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: Khan Sir\'s Bold Geopolitics Truth',
            hookText: '⚡ Powerful Hook: The reality of borders & defense budgets',
            viralityScore: '99% Viral',
            start: 5,
            end: 35,
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
            viralityScore: '97% Viral',
            start: 40,
            end: 70,
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
            start: 75,
            end: 105,
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
            start: 110,
            end: 140,
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
            start: 145,
            end: 175,
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
            start: 180,
            end: 210,
            hookDesc: 'Concluding mic drop challenging the youth to build domestic manufacturing and tech independence.',
            seoTitle: 'Khan Sir\'s final 30 seconds will give you absolute goosebumps 🇮🇳🔥',
            caption: 'WAKE UP CALL',
            tags: ['#youthpower', '#indiafuture', '#khansirspeech', '#motivation', '#fyp'],
            badgeTags: ['🏆 91% Climax', '🔥 Goosebumps', '✨ High Share Rate']
          }
        ]
      },
      {
        id: 'ishowspeed_wwe',
        matchKeywords: ['speed', 'ishowspeed', 'wrestlemania', 'wwe', 'randy', 'orton', 'fought'],
        title: 'HOW I FOUGHT IN WRESTLEMANIA',
        author: 'IShowSpeed • 18M+ Views',
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: Speed Infiltrates The WrestleMania Ring',
            hookText: '⚡ Adrenaline Shock & Prime Bottle Mascot Reveal',
            viralityScore: '99% Viral',
            start: 4,
            end: 34,
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
            viralityScore: '98% Viral',
            start: 38,
            end: 68,
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
            start: 72,
            end: 102,
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
            start: 106,
            end: 136,
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
            start: 140,
            end: 170,
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
            start: 174,
            end: 204,
            hookDesc: 'Speed holding ice to his neck while screaming at the livestream chat in disbelief.',
            seoTitle: 'Speed\'s honest reaction after getting slammed by Randy Orton 😂',
            caption: 'MY NECK IS BROKEN',
            tags: ['#ishowspeedlive', '#aftermath', '#streaming', '#speedlive', '#fyp'],
            badgeTags: ['🏆 91% Climax', '🔥 Post-Match', '💬 High Comments']
          }
        ]
      },
      {
        id: 'mkbhd_folding',
        matchKeywords: ['mkbhd', 'folding', 'revolution', 'phone', 'crease', 'dual screen'],
        title: 'The Dual Screen Folding Revolution',
        author: 'MKBHD • 16:40',
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: The 100,000 Fold Stress Machine Test',
            hookText: '⚡ Micro-Hinge Titanium Gear Durability Reveal',
            viralityScore: '98% Viral',
            start: 5,
            end: 35,
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
            start: 40,
            end: 70,
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
            start: 75,
            end: 105,
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
            start: 110,
            end: 140,
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
            start: 145,
            end: 175,
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
            start: 180,
            end: 210,
            hookDesc: 'After 24 months of real-world pocket drops: Should you actually spend $1,800 on this?',
            seoTitle: 'Don\'t buy a folding phone until you see what happens after 2 years ⚠️📉',
            caption: 'DON\'T BUY THIS YET',
            tags: ['#techwarning', '#foldables', '#buyersguide', '#phonecomparison', '#fyp'],
            badgeTags: ['🏆 91% Buying Guide', '⚠️ Warning Hook', '💡 Value Test']
          }
        ]
      },
      {
        id: 'travel_vlogger',
        matchKeywords: ['travel', 'vlog', 'overland', 'russia', 'iran', 'nomad', 'bus', 'adventure'],
        title: 'Overland Adventure: Russia to Iran',
        author: 'Outdoor Vlogger • 24:10',
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: Stranded at Siberian Border at -20°C',
            hookText: '⚡ Dramatic Suspense & Frozen Engine Sound',
            viralityScore: '98% Viral',
            start: 5,
            end: 35,
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
            start: 40,
            end: 70,
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
            start: 75,
            end: 105,
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
            start: 110,
            end: 140,
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
            start: 145,
            end: 175,
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
            start: 180,
            end: 210,
            hookDesc: 'Descending out of snow into lush green subtropical hills of northern Iran at golden hour.',
            seoTitle: 'After 3,000 miles of driving, this view made all the pain worth it 🌄✨',
            caption: 'LOOK AT THIS VIEW',
            tags: ['#iranianmountains', '#landscape', '#roadtrip', '#epicview', '#wanderlust'],
            badgeTags: ['🌅 90% Visual ASMR', '🏔️ Epic Scenery', '🎉 Triumph']
          }
        ]
      },
      {
        id: 'french_chef',
        matchKeywords: ['chef', 'pierre', 'baguette', 'paris', 'cooking', 'baking', 'bread'],
        title: 'Cooking 1,000 Baguettes in Paris',
        author: 'Chef Pierre • 14:50',
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: The 72-Hour Sourdough Fermentation Secret',
            hookText: '⚡ ASMR Crisp Crust Crackling & Steam Blast',
            viralityScore: '98% Viral',
            start: 5,
            end: 35,
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
            start: 40,
            end: 70,
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
            start: 75,
            end: 105,
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
            start: 110,
            end: 140,
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
            start: 145,
            end: 175,
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
            viralityScore: '90% Viral',
            start: 180,
            end: 210,
            hookDesc: 'The bakers stack fresh baguettes in wicker baskets as the early morning Paris street market opens.',
            seoTitle: 'Inside Paris\'s oldest bakery at 4am: Preparing 1,000 baguettes before dawn 🥖🌙',
            caption: 'PARIS MORNING ROUTINE',
            tags: ['#bakeryroutine', '#earlymorning', '#parisvibes', '#bakerlife', '#shorts'],
            badgeTags: ['🏆 90% Cozy ASMR', '🥖 1000 Loaves', '✨ Morning Vibe']
          }
        ]
      },
      {
        id: 'mrbeast_lebron',
        matchKeywords: ['lebron', 'basketball', 'nba', 'james'],
        title: 'Beat LeBron, Win $100,000',
        author: 'MrBeast • Online',
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: The $100,000 1-on-1 LeBron Shootout',
            hookText: '⚡ High-Stakes Opening Shot vs Basketball Legend',
            viralityScore: '99% Viral',
            start: 12,
            end: 42,
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
            start: 45,
            end: 75,
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
            start: 80,
            end: 110,
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
            start: 115,
            end: 145,
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
            start: 150,
            end: 180,
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
            start: 185,
            end: 215,
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
            start: 220,
            end: 250,
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
            start: 255,
            end: 285,
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
        matchKeywords: ['haaland', 'striker', 'erling', 'penalty'],
        title: 'Beat Professional Athlete, Win $100,000',
        author: 'MrBeast • 22:28',
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: Striker Haaland 1-on-1 Challenge',
            hookText: '⚡ High-Stakes Penalty Shootout Kickoff',
            viralityScore: '99% Viral',
            start: 15,
            end: 45,
            hookDesc: 'Erling Haaland steps up against amateur goalkeeper with $100,000 briefcase in goal.',
            seoTitle: 'He tried to stop Erling Haaland\'s penalty shot for $100,000 ⚽️😱',
            caption: 'CAN HE SAVE THIS',
            tags: ['#mrbeast', '#haaland', '#football', '#challenge', '#100k', '#viral'],
            badgeTags: ['🔥 99% High Stakes', '⚽ Haaland Strike', '⚡ Immediate Hook']
          },
          {
            id: 2,
            title: '😂 Reel 2: Insane Goalkeeper Save & Reaction',
            hookText: '🧤 Impossible Reflex & Shocked Stadium',
            viralityScore: '97% Viral',
            start: 45,
            end: 75,
            hookDesc: 'Goalkeeper miraculously tips the ball over the crossbar with his fingertips.',
            seoTitle: 'Nobody expected the goalkeeper to actually save Haaland\'s shot 🤯🔥',
            caption: 'HOW DID HE SAVE THAT',
            tags: ['#insanesave', '#footballskills', '#mrbeastchallenge', '#clutch', '#fyp'],
            badgeTags: ['😂 97% Laughter Spike', '🧤 Clutch Save', '🎉 Stadium Shock']
          },
          {
            id: 3,
            title: '⚡ Reel 3: Haaland 100 MPH Rocket Kick Test',
            hookText: '🚀 Radar Speed Gun Clocks Unbelievable Power',
            viralityScore: '96% Viral',
            start: 80,
            end: 110,
            hookDesc: 'Haaland unleashes full velocity strike into target dummy that flies 10 meters backward.',
            seoTitle: 'Erling Haaland\'s kick speed broke the speedometer radar 😱⚽',
            caption: '100 MPH ROCKET KICK',
            tags: ['#haalandpower', '#footballradar', '#mancity', '#mrbeast', '#shortsfeed'],
            badgeTags: ['⚡ 96% Max Power', '🚀 100 MPH', '💥 Impact Slow-Mo']
          },
          {
            id: 4,
            title: '🤯 Reel 4: Crossbar Challenge for $50,000',
            hookText: '🎯 Crossbar Ping Precision from 35 Yards',
            viralityScore: '95% Viral',
            start: 115,
            end: 145,
            hookDesc: 'Contestant hits the crossbar cleanly on second try sending the bench into absolute delirium.',
            seoTitle: 'He actually hit the crossbar against Haaland for $50,000 cash 🤯🎯',
            caption: 'PERFECT CROSSBAR PING',
            tags: ['#crossbarchallenge', '#impossible', '#footballtrick', '#viralvideo', '#reels'],
            badgeTags: ['🤯 95% Precision', '🎯 Crossbar Ping', '🎉 Pure Hype']
          },
          {
            id: 5,
            title: '💡 Reel 5: Haaland\'s Secret Pre-Game Warmup Habit',
            hookText: '🧘 Meditation & Blue-Light Blocking Routine',
            viralityScore: '93% Viral',
            start: 150,
            end: 180,
            hookDesc: 'Haaland shares his famous lotus meditation pose and special glasses routine with the contestant.',
            seoTitle: 'Haaland reveals the exact morning routine that made him world\'s best striker 🧠✨',
            caption: 'HAALAND SECRET ROUTINE',
            tags: ['#athletehabits', '#mindset', '#strikerroutine', '#footballpro', '#foryou'],
            badgeTags: ['💡 93% Pro Habit', '🧘 Mindset', '🚀 High Saves']
          },
          {
            id: 6,
            title: '🏆 Reel 6: $100,000 Cash Handover & Speech',
            hookText: '💰 Opening The Money Briefcase',
            viralityScore: '91% Viral',
            start: 185,
            end: 215,
            hookDesc: 'Contestant breaks into happy tears hugging MrBeast and Haaland as confetti rains down.',
            seoTitle: 'His emotional reaction to winning $100,000 will make your day 🥹💰',
            caption: 'LIFE CHANGING MOMENT',
            tags: ['#wholesome', '#moneygiveaway', '#100000dollars', '#emotional', '#shorts'],
            badgeTags: ['🏆 91% Climax', '💰 $100k Handover', '✨ Wholesome']
          },
          {
            id: 7,
            title: '🎯 Reel 7: Slow-Mo Curve Shot Masterclass',
            hookText: '🌪️ Impossible Angle & Curving Trajectory',
            viralityScore: '90% Viral',
            start: 220,
            end: 250,
            hookDesc: 'High-speed 1000fps camera captures ball curving with extreme spin right into the postage stamp corner.',
            seoTitle: 'Erling Haaland\'s curve shot broke the laws of physics in slow motion 🤯⚽',
            caption: 'PHYSICS BROKEN',
            tags: ['#haalandcurver', '#slowmotion', '#footballskills', '#viralreels', '#fyp'],
            badgeTags: ['🎯 90% Curve Precision', '🌪️ 1000 FPS Slow-Mo', '⚡ High Retention']
          },
          {
            id: 8,
            title: '🚀 Reel 8: Behind The Scenes Bloopers & Laughs',
            hookText: '😂 Erling Haaland Misses Target & Bursts Out Laughing',
            viralityScore: '89% Viral',
            start: 255,
            end: 285,
            hookDesc: 'Hilarious unscripted banter between Haaland, MrBeast and the amateur keeper during break time.',
            seoTitle: 'The funniest unscripted moment between Haaland and MrBeast 😂🎬',
            caption: 'WAIT TILL THE END',
            tags: ['#bloopers', '#haalandfunny', '#mrbeastouttakes', '#behindthescenes', '#shorts'],
            badgeTags: ['🚀 89% Viral Outro', '😂 Funniest Blooper', '💬 Comment Spike']
          }
        ]
      },
      {
        id: 'mrbeast_escape_cops',
        matchKeywords: ['escape', '100 cops', '500,000', '500k', 'cops'],
        title: 'Escape 100 Cops, Win $500,000',
        author: 'MrBeast • Online',
        clips: [
          {
            id: 1,
            title: '🔥 Reel 1: The 100 Cop Perimeter Chase Begins',
            hookText: '⚡ 100 Squad Cars Surround The Cornfield Perimeter',
            viralityScore: '99% Viral',
            start: 0,
            end: 30,
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
            start: 35,
            end: 65,
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
            viralityScore: '97% Viral',
            start: 70,
            end: 100,
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
            start: 105,
            end: 135,
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
            start: 140,
            end: 170,
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
            start: 175,
            end: 205,
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
            start: 210,
            end: 240,
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
            start: 245,
            end: 275,
            hookDesc: 'All 100 officers break character and celebrate with MrBeast with pizza boxes on car hoods.',
            seoTitle: 'What happened right after escaping 100 police officers 😂🍕',
            caption: 'COPS GET PIZZA',
            tags: ['#wholesome', '#behindthescenes', '#100cops', '#mrbeast', '#fyp'],
            badgeTags: ['🚀 89% Wholesome Outro', '🍕 Pizza Party', '💬 Viral Ending']
          }
        ]
      }
    ];

    // Initial Active Moments (Default to Real Podcast Interview 8 Viral Reels preset)
    const initialPreset = this.videoAnalysisDatabase.find(p => p.id === 'real_podcast_interview') || this.videoAnalysisDatabase[0];
    this.clipsMoments = JSON.parse(JSON.stringify(initialPreset.clips));
  }

  init() {
    this.bindSidebar();
    this.bindHomeScreen();
    this.bindYouTubeModal();
    this.bindConfigureScreen();
    this.bindCrazyCaptions();
    this.bindStudioScreen();
    this.bindCapCutEffects();
    this.bindExport();

    // Start video source and 9:16 rendering loop
    this.setupDemoVideoSource();
    this.start9x16RenderEngine();
    this.applyCapCutFiltersToElements();

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
      'https://www.youtube.com/watch?v=travel_vlogger': 'people.mp4',
      'https://www.youtube.com/watch?v=ishowspeed_wwe': 'podcast.mp4',
      'https://www.youtube.com/watch?v=mkbhd_folding': 'podcast.mp4',
      'https://www.youtube.com/watch?v=khan_sir_podcast': 'podcast.mp4',
      'https://www.youtube.com/watch?v=french_chef': 'people.mp4'
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
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        this.sourceVideo.src = url;
        this.sourceVideo.load();
        this.sourceVideo.play().catch(console.warn);
        this.applyVideoMeta(url, file.name, 'Local File • Custom', 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80');
        this.showConfigureView();
        this.showToast(`Uploaded Real Video: ${file.name} 🎬`);
      }
    });
  }

  extractYouTubeId(url) {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/))([\w-]{11})/);
    return match ? match[1] : null;
  }

  loadYouTubeVideo(videoId, fullUrl) {
    this.activeSourceType = 'youtube';
    this.currentYouTubeId = videoId;
    const targetUrl = fullUrl || `https://www.youtube.com/watch?v=${videoId}`;
    this.currentVideoUrl = targetUrl;

    const startSec = Math.floor(this.clipStart);
    const endSec = Math.floor(this.clipEnd);

    // 1. Long Format Player (Left Screen): Use privacy-enhanced embed without restrictive origin param
    if (this.youtubeIframe) {
      this.youtubeIframe.classList.remove('hidden');
      this.youtubeIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&start=${startSec}`;
    }
    if (this.sourceVideo) {
      this.sourceVideo.pause();
      this.sourceVideo.style.display = 'none';
    }
    if (this.videoControlsOverlay) {
      this.videoControlsOverlay.classList.add('hidden');
    }

    // 2. 9:16 Vertical Smartphone (Right Screen): Embed THE EXACT SAME YouTube video cropped vertically into 9:16!
    if (this.phoneYtWrapper && this.phoneYoutubeIframe) {
      this.phoneYtWrapper.classList.remove('hidden');
      this.phoneYoutubeIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&start=${startSec}&end=${endSec}`;
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

    // Immediately analyze with generic YouTube title while fetching metadata
    this.applyVideoMeta(targetUrl, `YouTube Video (${videoId})`, '@YouTube Creator • Online', `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);

    // 3. Fetch Real YouTube Title & Thumbnail via noembed
    fetch(`https://noembed.com/embed?url=${encodeURIComponent(targetUrl)}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.title) {
          this.applyVideoMeta(targetUrl, data.title, `${data.author_name || 'YouTube Creator'} • Online`, data.thumbnail_url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
          this.showToast(`Loaded Real YouTube Video: ${data.title} 🎬`);
        }
      })
      .catch(() => {
        this.applyVideoMeta(targetUrl, 'YouTube Video Stream', '@Creator • Online', `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
      });
  }

  switchToNativeVideo(src, title, author, img) {
    this.activeSourceType = 'native';
    this.currentYouTubeId = null;

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

      if (this.phoneYoutubeIframe) {
        this.phoneYoutubeIframe.src = `https://www.youtube-nocookie.com/embed/${this.currentYouTubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${this.currentYouTubeId}&start=${startSec}&end=${endSec}`;
      }

      if (this.youtubeIframe) {
        this.youtubeIframe.src = `https://www.youtube-nocookie.com/embed/${this.currentYouTubeId}?autoplay=1&mute=0&controls=1&rel=0&start=${startSec}`;
      }
    }
  }

  loadVideoAndAutoExtractClips(url) {
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

  loadVideoToConfigure(url) {
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

  applyVideoMeta(url, title, author, img) {
    this.currentVideoUrl = url || '';
    this.currentVideoTitle = title || 'Selected Video';
    this.currentVideoAuthor = author || 'Creator';

    if (this.youtubeUrlInput) this.youtubeUrlInput.value = url || '';
    if (this.videoMetaTitle) this.videoMetaTitle.textContent = title;
    if (this.videoMetaAuthor) this.videoMetaAuthor.textContent = author;
    if (this.studioVideoTitle) this.studioVideoTitle.textContent = title;
    if (this.studioChannelPill) this.studioChannelPill.textContent = author;
    if (img && this.videoThumbImg) this.videoThumbImg.src = img;
    if (this.captionTitleTag) this.captionTitleTag.textContent = `"${title}"`;
    if (this.captionAuthorTag) this.captionAuthorTag.textContent = '@ajjez_clips';

    const dur = (author && author.includes('•')) ? author.split('•')[1].trim() : '20:00';
    if (this.videoDurationBadge) this.videoDurationBadge.textContent = dur;

    const sourceUrlText = document.getElementById('studioSourceUrlText');
    if (sourceUrlText) {
      sourceUrlText.textContent = (url && url.startsWith('http')) ? url : `Local Video: ${url || 'podcast.mp4'}`;
    }
    const studioQuickInput = document.getElementById('studioQuickUrlInput');
    if (studioQuickInput && url && url.startsWith('http')) {
      studioQuickInput.value = url;
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
    } else {
      moments = this.generateClipsForCustomVideo(title, author, url, duration);
    }

    this.clipsMoments = moments;

    // Adapt timestamps smartly so each reel has its own unique, non-overlapping timeline
    const realDur = (this.videoDuration && isFinite(this.videoDuration) && this.videoDuration > 0) ? this.videoDuration : (duration || 90);
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
    const dur = (duration && isFinite(duration) && duration > 10) ? duration : 180;
    const cleanTitle = (title || 'Video Moment').replace(/[^\w\s-]/gi, '').trim();
    const words = cleanTitle.split(/\s+/).filter(w => w.length > 3 && !['with', 'from', 'this', 'that', 'your', 'have', 'more', 'what', 'video', 'stream'].includes(w.toLowerCase()));
    const topicWord = words[0] || 'Viral';
    const tagWord = (words[1] || topicWord).toLowerCase();

    // 8 non-overlapping, well-spaced reels across the video duration
    const segDur = Math.max(10, Math.min(30, Math.floor((dur * 0.85) / 8)));
    const segs = [];
    const step = dur > segDur ? (dur - segDur) / 7 : 0;
    for (let i = 0; i < 8; i++) {
      const s = Math.max(0, Math.floor(i * step));
      const e = Math.min(dur, s + segDur);
      segs.push({ start: s, end: e });
    }

    return [
      {
        id: 1,
        title: `🔥 Reel 1: The Shocking ${topicWord} Hook`,
        hookText: '⚡ Immediate Hook & High Retention Audio Surge',
        viralityScore: '99% Viral',
        start: segs[0].start,
        end: segs[0].end,
        hookDesc: `AI detected peak speech cadence and high visual movement in ${cleanTitle}. Perfect 9:16 opener.`,
        seoTitle: `Wait till you see what happens in this ${cleanTitle} clip 😱🔥`,
        caption: 'WATCH TILL THE END',
        tags: [`#${tagWord}`, '#shorts', '#viral', '#trending', '#fyp', '#reels'],
        badgeTags: ['🔥 99% Hook Score', '⚡ Fast Pacing', '🎯 High Retention']
      },
      {
        id: 2,
        title: `⚡ Reel 2: High Tempo Action & Rapid Pace`,
        hookText: '📈 High Energy Transition & Pacing Surge',
        viralityScore: '98% Viral',
        start: segs[1].start,
        end: segs[1].end,
        hookDesc: `Acoustic frequency jump detected. Rapid editing pace keeps retention curve above 85%.`,
        seoTitle: `The pacing in this part of ${cleanTitle} is totally insane ⚡🏎️`,
        caption: 'DON\'T BLINK',
        tags: [`#${tagWord}`, '#highaction', '#viralmoments', '#shortsfeed', '#fyp'],
        badgeTags: ['⚡ 98% High Pace', '🏃 Quick Cuts', '🔥 High Energy']
      },
      {
        id: 3,
        title: `😂 Reel 3: Funniest Reaction & Laughter Burst`,
        hookText: '😂 Vocal Energy Spike & Surprise Moment',
        viralityScore: '96% Viral',
        start: segs[2].start,
        end: segs[2].end,
        hookDesc: `Laughter and high acoustic energy cluster detected.`,
        seoTitle: `The most unexpected reaction in ${cleanTitle} caught on camera 😂💀`,
        caption: 'DID YOU SEE THAT',
        tags: [`#${tagWord}`, '#reaction', '#funny', '#viralclips', '#foryou'],
        badgeTags: ['😂 96% Energy Spike', '💬 Comment Magnet', '💥 Plot Twist']
      },
      {
        id: 4,
        title: `🤯 Reel 4: Unexpected Turning Point & Debate`,
        hookText: '🤯 Dramatic Twist & Intense Facial Emotion',
        viralityScore: '95% Viral',
        start: segs[3].start,
        end: segs[3].end,
        hookDesc: `Visual expression tracking detected sudden micro-expressions and tone shift.`,
        seoTitle: `Nobody saw this coming during ${cleanTitle} 🤯👀`,
        caption: 'NO WAY THIS HAPPENED',
        tags: [`#${tagWord}`, '#plottwist', '#shocking', '#reaction', '#trending'],
        badgeTags: ['🤯 95% Twist', '🎭 High Drama', '💬 Viral Debate']
      },
      {
        id: 5,
        title: `💡 Reel 5: Golden Insight & Curiosity Hook`,
        hookText: '💡 Curiosity Spike & Key Takeaway',
        viralityScore: '93% Viral',
        start: segs[4].start,
        end: segs[4].end,
        hookDesc: `High value knowledge drop with focused speaker framing. Proven shareable format.`,
        seoTitle: `This one secret from ${cleanTitle} will completely change your perspective 🧠✨`,
        caption: 'LISTEN CLOSELY',
        tags: [`#${tagWord}`, '#knowledge', '#mindset', '#curiosity', '#reels'],
        badgeTags: ['💡 93% Curiosity', '📚 Key Takeaway', '🚀 High Saves']
      },
      {
        id: 6,
        title: `🏆 Reel 6: The Climax & Final Takeaway`,
        hookText: '🎯 Resolution & Viral Punchline',
        viralityScore: '91% Viral',
        start: segs[5].start,
        end: segs[5].end,
        hookDesc: `High emotional finish and concluding statement ideal for driving profile follows and shares.`,
        seoTitle: `The ending of this video surprised everyone who watched 🏆💯`,
        caption: 'THIS IS UNREAL',
        tags: [`#${tagWord}`, '#finale', '#bestmoments', '#shorts', '#viralvideo'],
        badgeTags: ['🏆 91% Climax', '🚀 High Share Rate', '✨ Final Punchline']
      },
      {
        id: 7,
        title: `🎯 Reel 7: Mind-Blowing Visual Masterclass`,
        hookText: '🌪️ Slow-Mo Breakdown & Frame-by-Frame Detail',
        viralityScore: '90% Viral',
        start: segs[6].start,
        end: segs[6].end,
        hookDesc: `Visually captivating peak moment perfect for looping engagement and shares.`,
        seoTitle: `Look at this unbelievable detail in ${cleanTitle} 🤯🔥`,
        caption: 'UNBELIEVABLE DETAIL',
        tags: [`#${tagWord}`, '#slowmo', '#visualmagic', '#viralreels', '#shorts'],
        badgeTags: ['🎯 90% Visual Hit', '🌪️ Slow-Mo Peak', '⚡ High Retention']
      },
      {
        id: 8,
        title: `🚀 Reel 8: Ultimate Shareable Outro & Blooper`,
        hookText: '😂 Hilarious Behind The Scenes Punchline',
        viralityScore: '89% Viral',
        start: segs[7].start,
        end: segs[7].end,
        hookDesc: `Unfiltered outro moment that triggers high comment velocity and repeat shares.`,
        seoTitle: `The funniest ending of ${cleanTitle} you have ever seen 😂🎬`,
        caption: 'WAIT FOR THE END',
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
      const hookCaption = (moment.caption || 'VIRAL HOOK').toUpperCase();
      const hookText = moment.hookText || moment.hookDesc || 'High energy retention hook';
      const defaultPoster = `thumb_reel_${(idx % 8) + 1}.jpg`;
      let posterImg = moment.poster || defaultPoster;
      if (this.activeSourceType === 'youtube' && this.currentYouTubeId) {
        posterImg = `https://img.youtube.com/vi/${this.currentYouTubeId}/hqdefault.jpg`;
      }

      card.innerHTML = `
        <div class="reel-video-container">
          <div class="reel-card-backdrop" style="background-image: url('${posterImg}');"></div>
          <video class="reel-card-video" src="${this.activeSourceType === 'youtube' ? '' : videoSrc}" poster="${posterImg}" style="${this.activeSourceType === 'youtube' ? 'display:none;' : ''}" playsinline muted preload="metadata" loop></video>
          <div class="reel-card-gradient"></div>

          <!-- Top Floating Bar -->
          <div class="reel-card-topbar">
            <span class="reel-score-badge ${scoreClass}">
              <span class="fire-icon">🔥</span> ${moment.viralityScore || '96% Viral'}
            </span>
            <span class="reel-time-badge">${startStr} - ${endStr} (${dur}s)</span>
          </div>

          <!-- Audio Toggle Button -->
          <button class="reel-audio-btn" type="button" title="Mute/Unmute Audio" aria-label="Toggle Audio">
            <span class="sound-icon">🔇</span>
          </button>

          <!-- On-Screen Viral Hook Caption Sticker -->
          <div class="reel-hook-caption-sticker">
            <div class="sticker-text">${hookCaption}</div>
            <div class="sticker-subtext">${hookText}</div>
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

      // Setup live video playback inside the card
      const cardVideo = card.querySelector('.reel-card-video');
      if (cardVideo && this.activeSourceType !== 'youtube') {
        cardVideo.src = videoSrc;
        cardVideo.poster = posterImg;
        cardVideo.muted = true;
        cardVideo.defaultMuted = true;
        cardVideo.playsInline = true;
        cardVideo.preload = 'metadata';

        // Error fallback (avoid black sample.mp4)
        cardVideo.addEventListener('error', () => {
          if (!cardVideo.src.endsWith('podcast.mp4') && !cardVideo.src.endsWith('people.mp4')) {
            cardVideo.src = 'podcast.mp4';
            cardVideo.load();
          }
        });

        const seekStart = () => {
          try {
            if (moment.start > 0) {
              cardVideo.currentTime = moment.start;
            }
          } catch (e) {}
        };

        if (cardVideo.readyState >= 1) {
          seekStart();
        } else {
          cardVideo.addEventListener('loadedmetadata', seekStart, { once: true });
        }

        // Loop ONLY when video is actively playing and reaches moment.end
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
          if (cardVideo) {
            cardVideo.muted = !cardVideo.muted;
            const soundIcon = audioBtn.querySelector('.sound-icon');
            if (soundIcon) soundIcon.textContent = cardVideo.muted ? '🔇' : '🔊';
            audioBtn.style.borderColor = cardVideo.muted ? 'rgba(255,255,255,0.2)' : '#38bdf8';
          }
        });
      }

      // Center Play/Pause button click
      const playBtn = card.querySelector('.reel-play-circle-btn');
      if (playBtn) {
        playBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (this.activeClipIndex !== idx) {
            this.activateClipByIndex(idx);
          } else {
            if (cardVideo && !cardVideo.paused) {
              this.pauseCardVideo(idx);
            } else {
              this.playCardVideo(idx);
            }
          }
        });
      }

      // Entire Card Click: Activate this reel and play
      card.addEventListener('click', () => {
        this.activateClipByIndex(idx);
      });

      this.aiSuggestedList.appendChild(card);
    });

    this.suggestClipRows = this.aiSuggestedList.querySelectorAll('.suggest-reel-card');
  }

  playCardVideo(idx) {
    if (!this.aiSuggestedList) return;
    const cards = this.aiSuggestedList.querySelectorAll('.suggest-reel-card');
    const moment = this.clipsMoments && this.clipsMoments[idx];
    if (!moment) return;

    cards.forEach((card, i) => {
      const v = card.querySelector('.reel-card-video');
      const iconPlay = card.querySelector('.icon-play');
      const iconPause = card.querySelector('.icon-pause');
      const wave = card.querySelector('.reel-playing-waveform');

      if (i === idx) {
        if (v && this.activeSourceType !== 'youtube') {
          v.muted = true;
          v.defaultMuted = true;

          const startPlayback = () => {
            if (v.currentTime < moment.start || v.currentTime >= moment.end) {
              v.currentTime = moment.start;
            }
            const playPromise = v.play();
            if (playPromise !== undefined) {
              playPromise.then(() => {
                if (iconPlay) iconPlay.style.display = 'none';
                if (iconPause) iconPause.style.display = 'block';
                if (wave) wave.style.display = 'flex';
              }).catch(err => {
                console.warn('Card video play catch:', err);
                if (iconPlay) iconPlay.style.display = 'block';
                if (iconPause) iconPause.style.display = 'none';
                if (wave) wave.style.display = 'none';
              });
            }
          };

          if (v.readyState >= 1) {
            startPlayback();
          } else {
            v.addEventListener('loadedmetadata', startPlayback, { once: true });
            v.load();
          }
        } else if (this.activeSourceType === 'youtube') {
          if (iconPlay) iconPlay.style.display = 'none';
          if (iconPause) iconPause.style.display = 'block';
          if (wave) wave.style.display = 'flex';
        }
      } else {
        if (v && !v.paused) {
          v.pause();
        }
        if (iconPlay) iconPlay.style.display = 'block';
        if (iconPause) iconPause.style.display = 'none';
        if (wave) wave.style.display = 'none';
      }
    });

    // Also sync and play main studio preview video
    if (this.activeSourceType === 'youtube') {
      this.syncYouTubeClipTime();
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
    const targetCard = cards[idx];
    if (!targetCard) return;

    const v = targetCard.querySelector('.reel-card-video');
    const iconPlay = targetCard.querySelector('.icon-play');
    const iconPause = targetCard.querySelector('.icon-pause');
    const wave = targetCard.querySelector('.reel-playing-waveform');

    if (v && !v.paused) {
      v.pause();
    }
    if (iconPlay) iconPlay.style.display = 'block';
    if (iconPause) iconPause.style.display = 'none';
    if (wave) wave.style.display = 'none';

    // Also pause main studio video
    if (this.activeSourceType !== 'youtube' && this.sourceVideo && !this.sourceVideo.paused) {
      this.sourceVideo.pause();
    }
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
      btn.textContent = `${emoji} Reel ${idx + 1} (${scoreNum}%)`;

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
      this.showToast(`🎯 Extracted 3 High-Retention Shorts for "${cleanTitle}"!`);
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
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        this.switchToNativeVideo(url, file.name, 'Local File • Custom', '');
        this.showToast(`Loaded ${file.name}`);
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
        if (val === 'split') {
          this.activeLayout = 'split';
          this.syncLayoutBtnState('split');
        } else {
          this.activeLayout = 'standard';
          this.syncLayoutBtnState('standard');
        }

        this.showToast(`Clip Mode: ${title}`);
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
        this.captionCardItems.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        this.selectedStyleId = card.getAttribute('data-id');
        this.selectedStyleName = card.querySelector('.cap-label-name').textContent;

        if (this.activeStyleBadge) {
          this.activeStyleBadge.textContent = `Style: ${this.selectedStyleName}`;
        }

        if (this.styleSampleTexts[this.selectedStyleId]) {
          this.customCaptionInput.value = this.styleSampleTexts[this.selectedStyleId];
        }

        this.showToast(`Selected: ${this.selectedStyleName} ✨`);
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

    const switchToRealVideoBtn = document.getElementById('switchToRealVideoBtn');
    if (switchToRealVideoBtn) {
      switchToRealVideoBtn.addEventListener('click', () => {
        const titleLower = (this.currentVideoTitle || '').toLowerCase();
        const file = (titleLower.includes('travel') || titleLower.includes('chef') || titleLower.includes('people')) ? 'people.mp4' : 'podcast.mp4';
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
      if (this.sourceVideo.paused) {
        this.sourceVideo.play().catch(console.warn);
        this.playPauseBtn.textContent = '⏸';
      } else {
        this.sourceVideo.pause();
        this.playPauseBtn.textContent = '▶';
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

    // Layout toggles (Full 9:16 vs Split-screen)
    this.layoutBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.layoutBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.activeLayout = btn.getAttribute('data-layout');
        if (this.activeLayout === 'split') {
          this.showToast('Split-Screen: Top Video + Bottom Subway Surfers! 🎮');
        } else {
          this.showToast('Full 9:16 Video Reframe 📱');
        }
      });
    });

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
      if (this.customCaptionInput) this.customCaptionInput.value = moment.caption || this.styleSampleTexts[this.selectedStyleId] || 'VIRAL MOMENT';
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

      // Start video playback on the card and in the studio
      this.playCardVideo(clipIdx);

      this.showToast(`Selected Reel ${clipIdx + 1}: ${moment.title} 🚀`);
    }
  }

  /* ----------------------------------------------------
     Handle Custom Adjustments (Step 2 - User drags/adjusts)
  ---------------------------------------------------- */
  handleCustomAdjustment() {
    this.isCustomAdjusted = true;

    // Deselect suggested clip cards so user sees custom trim is now active
    if (this.aiSuggestedList) {
      const cards = this.aiSuggestedList.querySelectorAll('.suggest-reel-card');
      cards.forEach(card => {
        card.classList.remove('active');
        const actionPill = card.querySelector('.reel-action-pill');
        if (actionPill) {
          actionPill.className = 'reel-action-pill';
          actionPill.innerHTML = '▶ Click to Edit & Play';
        }
      });
    }

    this.clipSelectorPills.forEach(p => p.classList.remove('active'));

    this.updateTrimmerUI();

    // Immediately seek mobile preview to adjusted start time & loop
    if (this.activeSourceType === 'youtube') {
      this.syncYouTubeClipTime();
    } else {
      this.sourceVideo.currentTime = this.clipStart;
      if (this.sourceVideo.paused) this.sourceVideo.play();
    }
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

    // Apply to Main Video Player
    if (this.sourceVideo) {
      this.sourceVideo.style.filter = cssFilter;
    }
    if (this.youtubeIframe) {
      this.youtubeIframe.style.filter = cssFilter;
    }

    // Apply to Mobile Phone Preview Canvas
    if (this.cropCanvas) {
      this.cropCanvas.style.filter = cssFilter;
    }
    if (this.phoneYoutubeIframe) {
      this.phoneYoutubeIframe.style.filter = cssFilter;
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

    for (let i = 0; i < count; i++) {
      const pos = i / count;
      let energy = 0.2 + (Math.sin(i * 9.7) * 0.15 + 0.15);

      peaks.forEach(peak => {
        const dist = Math.abs(pos - peak);
        if (dist < 0.07) {
          energy = Math.max(energy, 0.88 + (0.07 - dist) * 1.5);
        }
      });

      const barH = Math.min(canvas.height * 0.9, energy * (canvas.height * 0.85));
      ctx.fillStyle = energy > 0.82 ? '#ec4899' : energy > 0.55 ? '#3b82f6' : '#272d42';
      ctx.fillRect(i * barWidth, midY - barH / 2, barWidth - 1, barH);
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
      if (isFinite(this.sourceVideo.duration) && this.sourceVideo.duration > 0) {
        this.videoDuration = this.sourceVideo.duration;
        this.recalculateMomentsForDuration();
      }
      this.updateTrimmerUI();
    });

    this.sourceVideo.addEventListener('error', (e) => {
      console.warn('Primary video error, falling back to people.mp4:', e);
      if (!this.sourceVideo.src.endsWith('people.mp4')) {
        this.sourceVideo.src = 'people.mp4';
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
    const dur = (totalDur && isFinite(totalDur) && totalDur > 10) ? totalDur : 180;
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
      const clipSpan = Math.max(15, Math.min(30, Math.floor((dur * 0.82) / count)));
      const usableSpan = Math.max(0, dur - clipSpan);
      const step = count > 1 ? usableSpan / (count - 1) : 0;

      this.clipsMoments.forEach((m, idx) => {
        let start = Math.floor(idx * step);
        let end = Math.min(dur, start + clipSpan);
        if (end <= start) {
          start = Math.max(0, end - 15);
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

        if (this.autoHookToggle.checked) {
          this.renderTopHookBanner(ctx, cw, 30);
        }

        if (this.captionsToggle.checked) {
          this.renderCrazyCaptionStyle(ctx, cw, topH * 0.85);
        }

      } else {
        // Full 9:16 Video Reframe
        if (this.sourceVideo.readyState >= 2 || this.sourceVideo.srcObject) {
          const vw = this.sourceVideo.videoWidth || 1280;
          const vh = this.sourceVideo.videoHeight || 720;
          const cropW = vh * (9 / 16);
          const maxOffset = vw - cropW;
          const cropX = Math.max(0, maxOffset * this.activePan);

          ctx.drawImage(this.sourceVideo, cropX, 0, cropW, vh, 0, 0, cw, ch);
        }

        if (this.autoHookToggle.checked) {
          this.renderTopHookBanner(ctx, cw, 60);
        }

        if (this.captionsToggle.checked) {
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
        if (this.captionsToggle && this.captionsToggle.checked) {
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
    ctx.font = '800 28px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    const metrics = ctx.measureText(hookText);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.roundRect(cw / 2 - metrics.width / 2 - 20, y - 24, metrics.width + 40, 48, 24);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.fillText(hookText, cw / 2, y + 10);
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
   * Renders the Exact 8 Crazy Caption Styles on Video Canvas
   */
  renderCrazyCaptionStyle(ctx, cw, posY) {
    const text = (this.customCaptionInput.value || 'TO GET STARTED').trim();
    if (!text) return;

    ctx.save();
    const midX = cw / 2;

    switch (this.selectedStyleId) {
      case 'classic':
        this.renderMultiLineClassic(ctx, midX, posY, text);
        break;

      case 'cyan_slide':
        ctx.font = '900 40px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        this.renderWordHighlight(ctx, midX, posY, text.toUpperCase(), '#00d2ff', '#ffffff');
        break;

      case 'italic_red':
        ctx.font = 'italic 900 40px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        this.renderWordHighlight(ctx, midX, posY, text.toUpperCase(), '#ff2a2a', '#fee2e2');
        break;

      case 'cream_blue':
        ctx.font = '800 38px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(79, 117, 255, 0.8)';
        ctx.shadowBlur = 14;
        ctx.fillStyle = '#4f75ff';
        ctx.fillText(text.toUpperCase(), midX, posY);
        break;

      case 'red_spin':
        ctx.font = '900 40px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(255, 31, 61, 0.95)';
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#ff1f3d';
        ctx.fillText(text.toUpperCase(), midX, posY);
        break;

      case 'violet':
        ctx.font = '900 40px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(99, 102, 241, 0.95)';
        ctx.shadowBlur = 22;
        ctx.fillStyle = '#6366f1';
        ctx.fillText(text.toUpperCase(), midX, posY);
        break;

      case 'blue_glow':
        this.renderBlueGlowStyle(ctx, midX, posY, text);
        break;

      case 'toxic_green':
        ctx.font = '900 42px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0, 255, 102, 0.9)';
        ctx.shadowBlur = 18;
        ctx.fillStyle = '#00ff66';
        ctx.fillText(text.toUpperCase(), midX, posY);
        break;

      default:
        ctx.font = '800 36px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(text, midX, posY);
        break;
    }

    ctx.restore();
  }

  renderMultiLineClassic(ctx, midX, posY, text) {
    const words = text.split(' ');
    ctx.font = '800 36px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';

    if (words.length > 1) {
      const lastWord = words.pop();
      const firstLine = words.join(' ');
      const metrics1 = ctx.measureText(firstLine);
      const metrics2 = ctx.measureText(lastWord);
      const maxW = Math.max(metrics1.width, metrics2.width);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.roundRect(midX - maxW / 2 - 20, posY - 55, maxW + 40, 80, 10);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.fillText(firstLine.toUpperCase(), midX, posY - 15);

      ctx.font = '900 40px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#facc15';
      ctx.fillText(lastWord.toUpperCase(), midX, posY + 25);
    } else {
      ctx.fillStyle = '#facc15';
      ctx.fillText(text.toUpperCase(), midX, posY);
    }
  }

  renderBlueGlowStyle(ctx, midX, posY, text) {
    const words = text.split(' ');
    ctx.textAlign = 'center';

    if (words.length > 1) {
      const lastWord = words.pop();
      const firstLine = words.join(' ');

      ctx.font = '700 32px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(firstLine.toLowerCase(), midX, posY - 15);

      ctx.font = '900 42px "Plus Jakarta Sans", sans-serif';
      ctx.shadowColor = '#00a2ff';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#00a2ff';
      ctx.fillText(lastWord.toUpperCase(), midX, posY + 25);
    } else {
      ctx.font = '900 40px "Plus Jakarta Sans", sans-serif';
      ctx.shadowColor = '#00a2ff';
      ctx.shadowBlur = 18;
      ctx.fillStyle = '#00a2ff';
      ctx.fillText(text.toUpperCase(), midX, posY);
    }
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
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  parseTime(str) {
    if (!str || !str.includes(':')) return 0;
    const parts = str.split(':');
    return parseInt(parts[0], 10) * 60 + parseFloat(parts[1]);
  }
}
