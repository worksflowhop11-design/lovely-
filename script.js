(() => {
  'use strict';

  const OWNER_WHATSAPP_NUMBER = '918866377514';
  const HEART_COLORS = ['#FF1744', '#FF4D79', '#FF7597', '#E11D48', '#FF8FA3'];
  const BURST_COLORS = ['#FF1744', '#FF4D79', '#FF7597', '#FFFFFF', '#E11D48', '#FFB3C6'];

  const TIME_SLOTS = [
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
  ];

  const FOOD_OPTIONS = [
    { id: 'pizza', label: 'Pizza 🍕', img: 'assets/food/pizza.png' },
    { id: 'burger', label: 'Burger 🍔', img: 'assets/food/burger.png' },
    { id: 'pasta', label: 'Pasta 🍝', img: 'assets/food/pasta.png' },
    { id: 'ice-cream', label: 'Ice Cream 🍦', img: 'assets/food/icecream.png' },
    {
      id: 'coffee-dessert',
      label: 'Coffee & Dessert ☕',
      svg: '<svg viewBox="0 0 64 64" class="food-svg" aria-hidden="true"><path d="M24 18 Q21 12 26 8" fill="none" stroke="#FF7597" stroke-width="2.4" stroke-linecap="round"/><path d="M33 18 Q30 12 35 8" fill="none" stroke="#FF7597" stroke-width="2.4" stroke-linecap="round"/><path d="M14 25 H42 V39 C42 46, 36 50, 28 50 C20 50, 14 46, 14 39 Z" fill="#FFFFFF" stroke="#3B2828" stroke-width="2.6"/><path d="M42 29 C49 29, 49 41, 42 41" fill="none" stroke="#3B2828" stroke-width="2.6" stroke-linecap="round"/><path d="M28 33 C26.5 30, 22 30, 22 34 C22 37.5, 28 41, 28 41 C28 41, 34 37.5, 34 34 C34 30, 29.5 30, 28 33 Z" fill="#FF4D79"/><path d="M10 53 H48" stroke="#3B2828" stroke-width="2.6" stroke-linecap="round"/></svg>',
    },
    {
      id: 'chinese',
      label: 'Chinese Food 🍜',
      svg: '<svg viewBox="0 0 64 64" class="food-svg" aria-hidden="true"><path d="M12 32 H52 C52 46, 43 54, 32 54 C21 54, 12 46, 12 32 Z" fill="#FF7597" stroke="#3B2828" stroke-width="2.6"/><path d="M18 32 Q24 22 32 24 T46 32" fill="#FFF3B0" stroke="#3B2828" stroke-width="2.2"/><path d="M22 14 L34 27" stroke="#3B2828" stroke-width="2.6" stroke-linecap="round"/><path d="M30 11 L38 27" stroke="#3B2828" stroke-width="2.6" stroke-linecap="round"/></svg>',
    },
    {
      id: 'something-else',
      label: 'Something Else ❤️',
      svg: '<svg viewBox="0 0 64 64" class="food-svg" aria-hidden="true"><circle cx="32" cy="32" r="21" fill="#FFE5EC" stroke="#3B2828" stroke-width="2.4"/><path d="M32 25 C29 19, 20 19, 20 27 C20 35, 32 44, 32 44 C32 44, 44 35, 44 27 C44 19, 35 19, 32 25 Z" fill="#FF1744"/><path d="M47 14 L49 18 L53 19 L49 20 L47 24 L45 20 L41 19 L45 18 Z" fill="#FF7597"/></svg>',
    },
  ];

  const PLACE_OPTIONS = [
    { id: 'cafe', label: 'Cute Café ☕', subtitle: 'Cozy drinks & sweet talks' },
    { id: 'pizza-place', label: 'Pizza Restaurant 🍕', subtitle: 'Warm slices & laughs' },
    { id: 'movie-dinner', label: 'Movie + Dinner 🎬', subtitle: 'Popcorn & evening stroll' },
    { id: 'your-choice', label: 'Your Choice 💕', subtitle: 'Surprise me anytime' },
  ];

  const CHECK_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

  // ==================== STATE ====================
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const state = {
    page: 'confession', // 'confession' | 'planner'
    phase: 'asking', // 'asking' | 'transitioning' | 'celebrating'
    plannerStep: 'form', // 'form' | 'confirmed'
    noOffset: { x: 0, y: 0 },
    lastDodgeTime: 0,
    viewYear: today.getFullYear(),
    viewMonth: today.getMonth(),
    selectedDate: null,
    selectedTime: '',
    selectedFoods: [],
    customFoodNote: '',
    selectedPlace: '',
    personalMessage: '',
    transitionTimer: null,
  };

  // ==================== DOM REFS ====================
  const pageConfession = document.getElementById('page-confession');
  const pagePlanner = document.getElementById('page-planner');
  const confessionCard = document.getElementById('confession-card');
  const phaseAsking = document.getElementById('phase-asking');
  const phaseTransition = document.getElementById('phase-transition');
  const phaseCelebrating = document.getElementById('phase-celebrating');
  const teddyWrap = document.getElementById('teddy-wrap');
  const questionText = document.getElementById('question-text');
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const btnPlanDate = document.getElementById('btn-plan-date');
  const btnSendAgain = document.getElementById('btn-send-again');
  const confessionBurst = document.getElementById('confession-burst');
  const plannerBurst = document.getElementById('planner-burst');

  // Planner refs
  const btnPlannerBack = document.getElementById('btn-planner-back');
  const backBtnLabel = document.getElementById('back-btn-label');
  const plannerStepForm = document.getElementById('planner-step-form');
  const plannerStepConfirmed = document.getElementById('planner-step-confirmed');
  const calPrev = document.getElementById('cal-prev');
  const calNext = document.getElementById('cal-next');
  const calMonthLabel = document.getElementById('cal-month-label');
  const calGrid = document.getElementById('cal-grid');
  const calReadout = document.getElementById('cal-selected-readout');
  const timeGrid = document.getElementById('time-grid');
  const foodGrid = document.getElementById('food-grid');
  const customFoodWrap = document.getElementById('custom-food-wrap');
  const customFoodInput = document.getElementById('custom-food-input');
  const placeGrid = document.getElementById('place-grid');
  const personalMessageInput = document.getElementById('personal-message');
  const validationAlert = document.getElementById('validation-alert');
  const btnConfirmDate = document.getElementById('btn-confirm-date');

  // Summary refs
  const sumDate = document.getElementById('sum-date');
  const sumTime = document.getElementById('sum-time');
  const sumFood = document.getElementById('sum-food');
  const sumPlace = document.getElementById('sum-place');
  const sumMsgRow = document.getElementById('sum-msg-row');
  const sumMsg = document.getElementById('sum-msg');

  // Confirmed refs
  const confDate = document.getElementById('conf-date');
  const confDay = document.getElementById('conf-day');
  const confTime = document.getElementById('conf-time');
  const confFood = document.getElementById('conf-food');
  const confPlace = document.getElementById('conf-place');
  const confMsg = document.getElementById('conf-msg');
  const whatsappHint = document.getElementById('whatsapp-hint');
  const btnWhatsappSend = document.getElementById('btn-whatsapp-send');
  const btnEditChoices = document.getElementById('btn-edit-choices');
  const btnCopyMessage = document.getElementById('btn-copy-message');
  const copyBtnLabel = document.getElementById('copy-btn-label');

  // ==================== BACKGROUND MUSIC ====================
  const bgMusic = document.getElementById('bg-music');
  const musicControl = document.getElementById('music-control');
  const musicPlayBtn = document.getElementById('music-play-btn');
  const iconPlay = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  const musicMuteBtn = document.getElementById('music-mute-btn');
  const iconVolOn = document.getElementById('icon-vol-on');
  const iconVolOff = document.getElementById('icon-vol-off');
  const musicVolume = document.getElementById('music-volume');
  const musicUnavailable = document.getElementById('music-unavailable');

  let userPaused = false;
  let hasStartedMusic = false;
  let audioFailed = false;
  let currentVolume = 0.35;
  let isMuted = false;

  bgMusic.volume = currentVolume;

  function syncMusicUI() {
    const playing = !bgMusic.paused && !audioFailed;
    musicControl.classList.toggle('is-playing', playing);
    iconPlay.classList.toggle('hidden', playing);
    iconPause.classList.toggle('hidden', !playing);
    musicPlayBtn.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');

    const mutedEffective = isMuted || currentVolume === 0;
    iconVolOn.classList.toggle('hidden', mutedEffective);
    iconVolOff.classList.toggle('hidden', !mutedEffective);
    musicMuteBtn.setAttribute('aria-label', isMuted ? 'Unmute music' : 'Mute music');
    musicVolume.value = isMuted ? '0' : String(currentVolume);
  }

  function startMusicOnInteraction() {
    if (audioFailed || userPaused) return;
    if (!bgMusic.paused) {
      hasStartedMusic = true;
      syncMusicUI();
      return;
    }

    bgMusic.volume = currentVolume;
    bgMusic.muted = isMuted;
    const promise = bgMusic.play();
    if (promise && typeof promise.then === 'function') {
      promise
        .then(() => {
          hasStartedMusic = true;
          syncMusicUI();
        })
        .catch(() => {
          syncMusicUI();
        });
    }
  }

  function handleFirstInteraction(e) {
    if (hasStartedMusic || userPaused || audioFailed) return;
    if (e.target && e.target.closest && e.target.closest('[data-music-control="true"]')) return;
    startMusicOnInteraction();
  }

  window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
  window.addEventListener('click', handleFirstInteraction, { passive: true });
  window.addEventListener('keydown', handleFirstInteraction, { passive: true });

  bgMusic.addEventListener('play', syncMusicUI);
  bgMusic.addEventListener('pause', syncMusicUI);
  bgMusic.addEventListener('error', () => {
    audioFailed = true;
    musicPlayBtn.classList.add('hidden');
    musicMuteBtn.classList.add('hidden');
    musicVolume.parentElement.classList.add('hidden');
    musicUnavailable.classList.remove('hidden');
    syncMusicUI();
  });

  const audioSource = bgMusic.querySelector('source');
  if (audioSource) {
    audioSource.addEventListener('error', () => {
      audioFailed = true;
      musicPlayBtn.classList.add('hidden');
      musicMuteBtn.classList.add('hidden');
      musicVolume.parentElement.classList.add('hidden');
      musicUnavailable.classList.remove('hidden');
      syncMusicUI();
    });
  }

  musicPlayBtn.addEventListener('click', () => {
    if (audioFailed) return;
    if (bgMusic.paused) {
      userPaused = false;
      const promise = bgMusic.play();
      if (promise && typeof promise.then === 'function') {
        promise
          .then(() => {
            hasStartedMusic = true;
            syncMusicUI();
          })
          .catch(() => syncMusicUI());
      }
    } else {
      userPaused = true;
      bgMusic.pause();
      syncMusicUI();
    }
  });

  musicMuteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    syncMusicUI();
  });

  musicVolume.addEventListener('input', (e) => {
    const val = Math.max(0, Math.min(1, parseFloat(e.target.value)));
    currentVolume = val;
    bgMusic.volume = val;
    if (val > 0 && isMuted) {
      isMuted = false;
      bgMusic.muted = false;
    }
    syncMusicUI();
  });

  syncMusicUI();

  // ==================== FLOATING HEARTS & SPARKLES ====================
  function createSvgEl(tag, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));
    return el;
  }

  function addSparkles(container, specs) {
    specs.forEach((s) => {
      const svg = createSvgEl('svg', { viewBox: '0 0 24 24', class: 'sparkle-svg' });
      svg.style.left = s.left;
      svg.style.top = s.top;
      svg.style.width = `${s.size}px`;
      svg.style.height = `${s.size}px`;
      svg.style.animationDelay = s.delay;
      svg.style.setProperty('--sparkle-dur', s.dur);
      svg.appendChild(
        createSvgEl('path', {
          d: 'M12 2 L14.4 9.6 L22 12 L14.4 14.4 L12 22 L9.6 14.4 L2 12 L9.6 9.6 Z',
          fill: s.color,
        })
      );
      container.appendChild(svg);
    });
  }

  function spawnFloatingHeart(container, options) {
    const isAmbient = options.ambient;
    const isCelebrate = options.isCelebrate();
    const duration = isCelebrate
      ? 3.1 + Math.random() * 2.1
      : isAmbient
        ? 5.8 + Math.random() * 3.2
        : 4.2 + Math.random() * 2.6;

    const left = isAmbient
      ? Math.random() < 0.5
        ? 2 + Math.random() * 14
        : 84 + Math.random() * 14
      : 6 + Math.random() * 88;

    const bottom = options.initial ? 6 + Math.random() * 56 : 2 + Math.random() * 12;
    const size = isCelebrate
      ? 14 + Math.random() * 16
      : isAmbient
        ? 13 + Math.random() * 13
        : 12 + Math.random() * 12;

    const svg = createSvgEl('svg', { viewBox: '0 0 24 24', class: 'floating-heart' });
    svg.style.left = `${left}%`;
    svg.style.bottom = `${bottom}%`;
    svg.style.width = `${size}px`;
    svg.style.height = `${size}px`;
    svg.style.setProperty('--duration', `${duration}s`);
    svg.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 68}px`);
    svg.style.setProperty('--rise-y', `${isAmbient ? -460 : -340}px`);
    svg.style.setProperty('--rot-start', `${(Math.random() - 0.5) * 28}deg`);
    svg.style.setProperty('--rot-end', `${(Math.random() - 0.5) * 44}deg`);
    svg.style.setProperty('--max-opacity', String(isCelebrate ? 0.92 : isAmbient ? 0.55 : 0.78));

    svg.appendChild(
      createSvgEl('path', {
        d: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
        fill: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      })
    );

    container.appendChild(svg);
    window.setTimeout(() => {
      if (svg.parentNode === container) container.removeChild(svg);
    }, duration * 1000 + 200);
  }

  function setupHeartsLayer(containerId, ambient, celebrateFn) {
    const container = document.getElementById(containerId);
    const sparkles = ambient
      ? [
          { left: '6%', top: '14%', size: 12, delay: '0.2s', dur: '3.4s', color: '#FF7597' },
          { left: '92%', top: '12%', size: 14, delay: '0.9s', dur: '2.9s', color: '#FF4D79' },
          { left: '8%', top: '82%', size: 13, delay: '1.4s', dur: '3.2s', color: '#FFFFFF' },
          { left: '93%', top: '78%', size: 11, delay: '0.5s', dur: '3.6s', color: '#FF1744' },
        ]
      : [
          { left: '7%', top: '16%', size: 14, delay: '0s', dur: '2.6s', color: '#FFFFFF' },
          { left: '15%', top: '78%', size: 11, delay: '0.7s', dur: '3.1s', color: '#FF4D79' },
          { left: '85%', top: '18%', size: 15, delay: '0.4s', dur: '2.9s', color: '#FFFFFF' },
          { left: '91%', top: '74%', size: 12, delay: '1.1s', dur: '2.5s', color: '#FF1744' },
          { left: '24%', top: '11%', size: 10, delay: '1.5s', dur: '3.2s', color: '#FF7597' },
          { left: '76%', top: '85%', size: 13, delay: '0.9s', dur: '2.8s', color: '#FFFFFF' },
        ];

    addSparkles(container, sparkles);
    const seed = ambient ? 5 : 7;
    for (let i = 0; i < seed; i++) {
      spawnFloatingHeart(container, { ambient, initial: true, isCelebrate: celebrateFn });
    }

    window.setInterval(() => {
      spawnFloatingHeart(container, { ambient, initial: false, isCelebrate: celebrateFn });
    }, ambient ? 950 : 480);
  }

  setupHeartsLayer('ambient-hearts', true, () => state.phase === 'celebrating' || state.plannerStep === 'confirmed');
  setupHeartsLayer('confession-hearts', false, () => state.phase === 'celebrating');
  setupHeartsLayer('planner-hearts', false, () => state.plannerStep === 'confirmed');

  function triggerBurst(container) {
    container.innerHTML = '';
    const count = 28;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
      const dist = 90 + Math.random() * 180;
      const size = 12 + Math.random() * 14;
      const svg = createSvgEl('svg', { viewBox: '0 0 24 24', class: 'burst-particle' });
      svg.style.width = `${size}px`;
      svg.style.height = `${size}px`;
      svg.style.setProperty('--bx', `${Math.cos(angle) * dist}px`);
      svg.style.setProperty('--by', `${Math.sin(angle) * dist - 24}px`);
      svg.style.setProperty('--brot', `${(Math.random() - 0.5) * 140}deg`);
      svg.style.setProperty('--bdur', `${0.85 + Math.random() * 0.55}s`);
      svg.style.setProperty('--bdelay', `${Math.random() * 0.14}s`);

      const isSparkle = i % 4 === 0;
      svg.appendChild(
        createSvgEl('path', {
          d: isSparkle
            ? 'M12 2 L14.4 9.6 L22 12 L14.4 14.4 L12 22 L9.6 14.4 L2 12 L9.6 9.6 Z'
            : 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
          fill: BURST_COLORS[i % BURST_COLORS.length],
        })
      );
      container.appendChild(svg);
    }
  }

  // ==================== PAGE 1: NO BUTTON EVASION ====================
  function toCardBox(el, cardRect, buffer) {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      left: r.left - cardRect.left - buffer,
      right: r.right - cardRect.left + buffer,
      top: r.top - cardRect.top - buffer,
      bottom: r.bottom - cardRect.top + buffer,
    };
  }

  function overlapsBox(x, y, w, h, box) {
    if (!box) return false;
    return x < box.right && x + w > box.left && y < box.bottom && y + h > box.top;
  }

  function moveNoButton(pointerX, pointerY) {
    const now = performance.now();
    if (now - state.lastDodgeTime < 100) return;
    if (state.phase !== 'asking') return;

    const cardRect = confessionCard.getBoundingClientRect();
    const noRect = btnNo.getBoundingClientRect();

    const baseLeft = noRect.left - cardRect.left - state.noOffset.x;
    const baseTop = noRect.top - cardRect.top - state.noOffset.y;
    const currentCardLeft = noRect.left - cardRect.left;
    const currentCardTop = noRect.top - cardRect.top;

    const pad = 18;
    const minX = pad;
    const maxX = Math.max(pad, cardRect.width - noRect.width - pad);
    const minY = pad;
    const maxY = Math.max(pad, cardRect.height - noRect.height - pad);

    const pX = pointerX !== undefined ? pointerX - cardRect.left : currentCardLeft + noRect.width / 2;
    const pY = pointerY !== undefined ? pointerY - cardRect.top : currentCardTop + noRect.height / 2;

    const teddyBox = toCardBox(teddyWrap, cardRect, 10);
    const questionBox = toCardBox(questionText, cardRect, 10);
    const yesBox = toCardBox(btnYes, cardRect, 14);

    let bestCandidate = null;
    let fallbackCandidate = null;

    for (let i = 0; i < 64; i++) {
      const candX = minX + Math.random() * (maxX - minX);
      const candY = minY + Math.random() * (maxY - minY);
      const distFromPointer = Math.hypot(candX + noRect.width / 2 - pX, candY + noRect.height / 2 - pY);
      const distFromCurrent = Math.hypot(candX - currentCardLeft, candY - currentCardTop);

      const hitsProtected =
        overlapsBox(candX, candY, noRect.width, noRect.height, teddyBox) ||
        overlapsBox(candX, candY, noRect.width, noRect.height, questionBox) ||
        overlapsBox(candX, candY, noRect.width, noRect.height, yesBox);

      let score = distFromPointer + Math.min(distFromCurrent, 170) * 0.65;
      if (distFromPointer < 105) score -= 240;
      if (distFromCurrent < 70) score -= 180;

      if (!hitsProtected) {
        if (!bestCandidate || score > bestCandidate.score) {
          bestCandidate = { x: candX, y: candY, score };
        }
      } else if (!overlapsBox(candX, candY, noRect.width, noRect.height, yesBox)) {
        if (!fallbackCandidate || score > fallbackCandidate.score) {
          fallbackCandidate = { x: candX, y: candY, score };
        }
      }
    }

    const chosen = bestCandidate || fallbackCandidate;
    if (chosen) {
      state.lastDodgeTime = now;
      state.noOffset = { x: chosen.x - baseLeft, y: chosen.y - baseTop };
      btnNo.style.transform = `translate3d(${state.noOffset.x}px, ${state.noOffset.y}px, 0)`;
    }
  }

  confessionCard.addEventListener('mousemove', (e) => {
    if (state.phase !== 'asking') return;
    const rect = btnNo.getBoundingClientRect();
    const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
    const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
    const edgeDist = Math.hypot(dx, dy);
    const centerDist = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
    if (edgeDist < 44 || centerDist < 78) {
      moveNoButton(e.clientX, e.clientY);
    }
  });

  btnNo.addEventListener('mouseenter', (e) => moveNoButton(e.clientX, e.clientY));
  btnNo.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') moveNoButton(e.clientX, e.clientY);
  });
  btnNo.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton(e.clientX, e.clientY);
  });

  window.addEventListener('resize', () => {
    state.noOffset = { x: 0, y: 0 };
    btnNo.style.transform = 'translate3d(0px, 0px, 0)';
  });

  // ==================== PAGE 1 PHASE SWITCHING ====================
  function setPhase(nextPhase) {
    state.phase = nextPhase;
    phaseAsking.classList.toggle('hidden', nextPhase !== 'asking');
    phaseTransition.classList.toggle('hidden', nextPhase !== 'transitioning');
    phaseCelebrating.classList.toggle('hidden', nextPhase !== 'celebrating');

    if (nextPhase === 'celebrating') {
      // Re-trigger staggered text animations cleanly
      phaseCelebrating.querySelectorAll('.stagger-item').forEach((el) => {
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = '';
      });
    }
  }

  function startSurpriseTransition() {
    startMusicOnInteraction();
    if (state.transitionTimer) window.clearTimeout(state.transitionTimer);
    triggerBurst(confessionBurst);
    setPhase('transitioning');
    state.transitionTimer = window.setTimeout(() => {
      setPhase('celebrating');
    }, 850);
  }

  btnYes.addEventListener('click', startSurpriseTransition);
  btnSendAgain.addEventListener('click', startSurpriseTransition);

  // ==================== PAGE NAVIGATION ====================
  function showPage(targetPage) {
    state.page = targetPage;
    pageConfession.classList.toggle('hidden', targetPage !== 'confession');
    pagePlanner.classList.toggle('hidden', targetPage !== 'planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  btnPlanDate.addEventListener('click', () => {
    startMusicOnInteraction();
    showPage('planner');
  });

  btnPlannerBack.addEventListener('click', () => {
    if (state.plannerStep === 'confirmed') {
      setPlannerStep('form');
    } else {
      showPage('confession');
    }
  });

  // ==================== PAGE 2: CALENDAR ====================
  function isSameDay(a, b) {
    return (
      a &&
      b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function renderCalendar() {
    const { viewYear, viewMonth, selectedDate } = state;
    const isAtCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();
    calPrev.disabled = isAtCurrentMonth;

    calMonthLabel.textContent = new Date(viewYear, viewMonth, 1).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });

    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const leadingBlanks = (firstOfMonth.getDay() + 6) % 7;

    calGrid.innerHTML = '';

    for (let i = 0; i < leadingBlanks; i++) {
      const blank = document.createElement('div');
      blank.className = 'cal-day-empty';
      blank.setAttribute('aria-hidden', 'true');
      calGrid.appendChild(blank);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(viewYear, viewMonth, day);
      const isPast = cellDate.getTime() < today.getTime();
      const isToday = isSameDay(today, cellDate);
      const isSelected = isSameDay(selectedDate, cellDate);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-day-btn';
      if (isToday) btn.classList.add('is-today');
      if (isSelected) btn.classList.add('is-selected');
      btn.disabled = isPast;
      btn.textContent = String(day);
      btn.setAttribute('aria-pressed', String(isSelected));
      btn.setAttribute(
        'aria-label',
        cellDate.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      );

      btn.addEventListener('click', () => {
        state.selectedDate = cellDate;
        validationAlert.classList.add('hidden');
        renderCalendar();
        updateLiveSummary();
      });

      calGrid.appendChild(btn);
    }

    if (selectedDate) {
      const formatted = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
      calReadout.innerHTML = `Selected Date: <strong>${formatted}</strong>`;
    } else {
      calReadout.textContent = 'Tap any available future date above to pick our day';
    }
  }

  calPrev.addEventListener('click', () => {
    if (state.viewYear === today.getFullYear() && state.viewMonth === today.getMonth()) return;
    if (state.viewMonth === 0) {
      state.viewYear -= 1;
      state.viewMonth = 11;
    } else {
      state.viewMonth -= 1;
    }
    renderCalendar();
  });

  calNext.addEventListener('click', () => {
    if (state.viewMonth === 11) {
      state.viewYear += 1;
      state.viewMonth = 0;
    } else {
      state.viewMonth += 1;
    }
    renderCalendar();
  });

  // ==================== PAGE 2: TIME, FOOD, PLACE ====================
  function renderTimes() {
    timeGrid.innerHTML = '';
    TIME_SLOTS.forEach((slot) => {
      const isSelected = state.selectedTime === slot;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `time-btn${isSelected ? ' is-selected' : ''}`;
      btn.textContent = slot;
      btn.setAttribute('aria-pressed', String(isSelected));
      btn.addEventListener('click', () => {
        state.selectedTime = slot;
        validationAlert.classList.add('hidden');
        renderTimes();
        updateLiveSummary();
      });
      timeGrid.appendChild(btn);
    });
  }

  function renderFoods() {
    foodGrid.innerHTML = '';
    FOOD_OPTIONS.forEach((food) => {
      const isSelected = state.selectedFoods.includes(food.label);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `food-card${isSelected ? ' is-selected' : ''}`;
      btn.setAttribute('aria-pressed', String(isSelected));

      const checkHtml = isSelected ? `<span class="check-badge">${CHECK_SVG}</span>` : '';
      const mediaHtml = food.img
        ? `<img src="${food.img}" alt="${food.label}" class="food-img" />`
        : food.svg;

      btn.innerHTML = `
        ${checkHtml}
        <div class="food-img-wrap">${mediaHtml}</div>
        <span class="food-label">${food.label}</span>
      `;

      btn.addEventListener('click', () => {
        const idx = state.selectedFoods.indexOf(food.label);
        if (idx >= 0) {
          state.selectedFoods.splice(idx, 1);
        } else {
          state.selectedFoods.push(food.label);
        }
        validationAlert.classList.add('hidden');
        customFoodWrap.classList.toggle('hidden', !state.selectedFoods.includes('Something Else ❤️'));
        renderFoods();
        updateLiveSummary();
      });

      foodGrid.appendChild(btn);
    });
  }

  function renderPlaces() {
    placeGrid.innerHTML = '';
    PLACE_OPTIONS.forEach((place) => {
      const isSelected = state.selectedPlace === place.label;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `place-card${isSelected ? ' is-selected' : ''}`;
      btn.setAttribute('aria-pressed', String(isSelected));
      btn.innerHTML = `
        <div>
          <div class="place-name">${place.label}</div>
          <div class="place-sub">${place.subtitle}</div>
        </div>
        ${isSelected ? `<span class="place-check">${CHECK_SVG}</span>` : ''}
      `;
      btn.addEventListener('click', () => {
        state.selectedPlace = place.label;
        renderPlaces();
        updateLiveSummary();
      });
      placeGrid.appendChild(btn);
    });
  }

  customFoodInput.addEventListener('input', (e) => {
    state.customFoodNote = e.target.value;
    updateLiveSummary();
  });

  personalMessageInput.addEventListener('input', (e) => {
    state.personalMessage = e.target.value;
    updateLiveSummary();
  });

  function getResolvedDetails() {
    const dateStr = state.selectedDate
      ? state.selectedDate.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : '';
    const dayStr = state.selectedDate
      ? state.selectedDate.toLocaleDateString('en-US', { weekday: 'long' })
      : '';
    const foodStr = state.selectedFoods
      .map((f) =>
        f === 'Something Else ❤️' && state.customFoodNote.trim()
          ? `Something Else (${state.customFoodNote.trim()}) ❤️`
          : f
      )
      .join(', ');
    const placeStr = state.selectedPlace || 'Your Choice 💕';
    const msgStr = state.personalMessage.trim() || 'No extra note — just excited to see you!';

    return { dateStr, dayStr, foodStr, placeStr, msgStr };
  }

  function updateLiveSummary() {
    const { dateStr, dayStr, foodStr, placeStr } = getResolvedDetails();
    sumDate.textContent = state.selectedDate ? `${dayStr}, ${dateStr}` : 'Not selected yet';
    sumTime.textContent = state.selectedTime || 'Not selected yet';
    sumFood.textContent = state.selectedFoods.length > 0 ? foodStr : 'Not selected yet';
    sumPlace.textContent = placeStr;

    const trimmedMsg = state.personalMessage.trim();
    sumMsgRow.classList.toggle('hidden', !trimmedMsg);
    sumMsg.textContent = trimmedMsg;
  }

  // ==================== CONFIRMATION & WHATSAPP ====================
  function buildWhatsAppMessage() {
    const { dateStr, dayStr, foodStr, placeStr, msgStr } = getResolvedDetails();
    return [
      '💕 OUR DATE PLAN 💕',
      '',
      "Hey! I've planned our date! ❤️",
      '',
      `📅 Date: ${dateStr}`,
      `📆 Day: ${dayStr}`,
      `⏰ Time: ${state.selectedTime}`,
      `🍕 Food: ${foodStr}`,
      `📍 Place: ${placeStr}`,
      '',
      '💌 Personal Message:',
      msgStr,
      '',
      "Can't wait to spend some lovely time together! ❤️",
    ].join('\n');
  }

  function setPlannerStep(step) {
    state.plannerStep = step;
    const isConfirmed = step === 'confirmed';
    plannerStepForm.classList.toggle('hidden', isConfirmed);
    plannerStepConfirmed.classList.toggle('hidden', !isConfirmed);
    backBtnLabel.textContent = isConfirmed ? 'Edit My Choices' : 'Back';

    if (isConfirmed) {
      const { dateStr, dayStr, foodStr, placeStr, msgStr } = getResolvedDetails();
      confDate.textContent = dateStr;
      confDay.textContent = dayStr;
      confTime.textContent = state.selectedTime;
      confFood.textContent = foodStr;
      confPlace.textContent = placeStr;
      confMsg.textContent = msgStr;

      const message = buildWhatsAppMessage();
      btnWhatsappSend.href = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      whatsappHint.textContent =
        'Clicking below opens WhatsApp with your message pre-filled so you can review and press Send.';
      copyBtnLabel.textContent = 'Copy Message (WhatsApp Fallback)';

      triggerBurst(plannerBurst);
      plannerStepConfirmed.querySelectorAll('.stagger-item').forEach((el) => {
        el.style.animation = 'none';
        void el.offsetWidth;
        el.style.animation = '';
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  btnConfirmDate.addEventListener('click', () => {
    const missing = [];
    if (!state.selectedDate) missing.push('a date');
    if (!state.selectedTime) missing.push('a time');
    if (state.selectedFoods.length === 0) missing.push('at least one food option');

    if (missing.length > 0) {
      validationAlert.textContent = `Please choose ${missing.join(', ')} before confirming our date.`;
      validationAlert.classList.remove('hidden');
      const targetEl = !state.selectedDate
        ? document.getElementById('sec-date')
        : !state.selectedTime
          ? document.getElementById('sec-time')
          : document.getElementById('sec-food');
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    validationAlert.classList.add('hidden');
    setPlannerStep('confirmed');
  });

  btnEditChoices.addEventListener('click', () => {
    setPlannerStep('form');
  });

  btnWhatsappSend.addEventListener('click', () => {
    whatsappHint.textContent =
      'WhatsApp opened with your date plan! Review your message there and tap Send — or copy it below.';
  });

  btnCopyMessage.addEventListener('click', async () => {
    const message = buildWhatsAppMessage();
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = message;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    copyBtnLabel.textContent = 'Message Copied!';
    window.setTimeout(() => {
      copyBtnLabel.textContent = 'Copy Message (WhatsApp Fallback)';
    }, 2600);
  });

  // Initial Render
  renderCalendar();
  renderTimes();
  renderFoods();
  renderPlaces();
  updateLiveSummary();
})();
