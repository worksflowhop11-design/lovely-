import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DatePlanner } from './components/DatePlanner';
import { FloatingHearts } from './components/FloatingHearts';
import { HeartBurst } from './components/HeartBurst';
import { MusicControl } from './components/MusicControl';
import { TeddyIllustration } from './components/TeddyIllustration';

type AppPage = 'confession' | 'planner';
type AppPhase = 'asking' | 'transitioning' | 'celebrating';

interface Offset {
  x: number;
  y: number;
}

interface BoxRect {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

function overlapsBox(x: number, y: number, w: number, h: number, box: BoxRect | null): boolean {
  if (!box) return false;
  return x < box.right && x + w > box.left && y < box.bottom && y + h > box.top;
}

export default function App() {
  const [page, setPage] = useState<AppPage>('confession');
  const [phase, setPhase] = useState<AppPhase>('asking');
  const [replayKey, setReplayKey] = useState<number>(0);
  const [noOffset, setNoOffset] = useState<Offset>({ x: 0, y: 0 });

  // Persistent background music state (never resets across page navigation)
  const audioRef = useRef<HTMLAudioElement>(null);
  const userPausedRef = useRef<boolean>(false);
  const hasStartedOnceRef = useRef<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.35);
  const [audioUnavailable, setAudioUnavailable] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const teddyWrapRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const yesBtnRef = useRef<HTMLButtonElement>(null);
  const offsetRef = useRef<Offset>({ x: 0, y: 0 });
  const lastDodgeTimeRef = useRef<number>(0);

  useEffect(() => {
    offsetRef.current = noOffset;
  }, [noOffset]);

  // Sync audio element volume & mute state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  // Sync audio play/pause events accurately (handles OS/lockscreen media controls too)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setAudioUnavailable(true);
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const startMusicOnInteraction = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audioUnavailable || userPausedRef.current) return;
    if (!audio.paused) {
      hasStartedOnceRef.current = true;
      return;
    }

    audio.volume = volume;
    audio.muted = isMuted;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          hasStartedOnceRef.current = true;
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked or not ready yet; will retry on next user gesture or Play click
          setIsPlaying(false);
        });
    }
  }, [audioUnavailable, isMuted, volume]);

  // Start background music on the visitor's very first genuine interaction anywhere on the site
  useEffect(() => {
    const handleFirstInteraction = (e: Event) => {
      if (hasStartedOnceRef.current || userPausedRef.current || audioUnavailable) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-music-control="true"]')) return;
      startMusicOnInteraction();
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [audioUnavailable, startMusicOnInteraction]);

  const handleTogglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audioUnavailable) return;

    if (audio.paused) {
      userPausedRef.current = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasStartedOnceRef.current = true;
            setIsPlaying(true);
          })
          .catch(() => setIsPlaying(false));
      }
    } else {
      userPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    }
  }, [audioUnavailable]);

  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleVolumeChange = useCallback((nextVolume: number) => {
    const clamped = Math.max(0, Math.min(1, nextVolume));
    setVolume(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  // Keep runaway button safely inside card bounds on viewport resize
  useEffect(() => {
    const handleResize = () => {
      setNoOffset({ x: 0, y: 0 });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Transition from heart burst & beating heart to surprise screen
  useEffect(() => {
    if (phase !== 'transitioning') return;
    const timer = window.setTimeout(() => {
      setPhase('celebrating');
    }, 850);
    return () => window.clearTimeout(timer);
  }, [phase, replayKey]);

  const toCardBox = useCallback(
    (el: HTMLElement | null, cardRect: DOMRect, buffer: number): BoxRect | null => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        left: r.left - cardRect.left - buffer,
        right: r.right - cardRect.left + buffer,
        top: r.top - cardRect.top - buffer,
        bottom: r.bottom - cardRect.top + buffer,
      };
    },
    []
  );

  const moveNoButton = useCallback(
    (pointerX?: number, pointerY?: number) => {
      const now = performance.now();
      if (now - lastDodgeTimeRef.current < 100) return;

      const cardEl = cardRef.current;
      const noEl = noBtnRef.current;
      if (!cardEl || !noEl) return;

      const cardRect = cardEl.getBoundingClientRect();
      const noRect = noEl.getBoundingClientRect();
      const currentOffset = offsetRef.current;

      const baseLeft = noRect.left - cardRect.left - currentOffset.x;
      const baseTop = noRect.top - cardRect.top - currentOffset.y;

      const currentCardLeft = noRect.left - cardRect.left;
      const currentCardTop = noRect.top - cardRect.top;

      const pad = 18;
      const minX = pad;
      const maxX = Math.max(pad, cardRect.width - noRect.width - pad);
      const minY = pad;
      const maxY = Math.max(pad, cardRect.height - noRect.height - pad);

      const pX =
        pointerX !== undefined ? pointerX - cardRect.left : currentCardLeft + noRect.width / 2;
      const pY =
        pointerY !== undefined ? pointerY - cardRect.top : currentCardTop + noRect.height / 2;

      const teddyBox = toCardBox(teddyWrapRef.current, cardRect, 10);
      const questionBox = toCardBox(questionRef.current, cardRect, 10);
      const yesBox = toCardBox(yesBtnRef.current, cardRect, 14);

      let bestCandidate: { x: number; y: number; score: number } | null = null;
      let fallbackCandidate: { x: number; y: number; score: number } | null = null;

      for (let i = 0; i < 64; i++) {
        const candX = minX + Math.random() * (maxX - minX);
        const candY = minY + Math.random() * (maxY - minY);

        const candCenterX = candX + noRect.width / 2;
        const candCenterY = candY + noRect.height / 2;

        const distFromPointer = Math.hypot(candCenterX - pX, candCenterY - pY);
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

      const chosen = bestCandidate ?? fallbackCandidate;
      if (chosen) {
        lastDodgeTimeRef.current = now;
        setNoOffset({
          x: chosen.x - baseLeft,
          y: chosen.y - baseTop,
        });
      }
    },
    [toCardBox]
  );

  const handleCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (phase !== 'asking') return;
      const noEl = noBtnRef.current;
      if (!noEl) return;

      const rect = noEl.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const edgeDistance = Math.hypot(dx, dy);
      const centerDistance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      if (edgeDistance < 44 || centerDistance < 78) {
        moveNoButton(e.clientX, e.clientY);
      }
    },
    [moveNoButton, phase]
  );

  const handleYesClick = () => {
    startMusicOnInteraction();
    setReplayKey((k) => k + 1);
    setPhase('transitioning');
  };

  const handleReplaySurprise = () => {
    startMusicOnInteraction();
    setReplayKey((k) => k + 1);
    setPhase('transitioning');
  };

  const handleOpenPlanner = () => {
    startMusicOnInteraction();
    setPage('planner');
  };

  return (
    <>
      {/* Single Persistent Root Audio Element (never unmounts or resets across pages) */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        playsInline
      >
        <source src="/audio/romantic-song.mp3" type="audio/mpeg" />
        <source
          src="/assets/aistudio/AudioTranscriberAI_output_video-cutter-js.com__98b7047a.mp3"
          type="audio/mpeg"
          onError={() => {
            setAudioUnavailable(true);
            setIsPlaying(false);
          }}
        />
      </audio>

      {/* Unobtrusive Corner Music Controls */}
      <MusicControl
        isPlaying={isPlaying}
        isMuted={isMuted}
        volume={volume}
        audioUnavailable={audioUnavailable}
        onTogglePlay={handleTogglePlay}
        onToggleMute={handleToggleMute}
        onVolumeChange={handleVolumeChange}
      />

      {page === 'planner' ? (
        <DatePlanner onBackToHome={() => setPage('confession')} />
      ) : (
        <main className="relative min-h-dvh w-full bg-[#0D1524] flex flex-col items-center justify-center px-4 py-8 pb-20 sm:px-6 sm:py-10 overflow-hidden">
          {/* Ambient Floating Hearts & Sparkles Around the Card */}
          <FloatingHearts
            variant="ambient"
            intensity={phase === 'celebrating' ? 'celebrate' : 'normal'}
          />

          {/* Main Romantic Heading */}
          <h1 className="animate-title-in relative z-10 font-display font-extrabold text-center tracking-tight text-balance mb-6 sm:mb-8 text-[2.05rem] sm:text-[2.95rem] md:text-[3.4rem] leading-tight select-none">
            <span className="text-white">Do You </span>
            <span className="text-[#FF1744] drop-shadow-[0_4px_18px_rgba(255,23,68,0.38)]">
              Like Me..?
            </span>
          </h1>

          {/* Centered Pastel Pink Romantic Card */}
          <section
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            aria-live="polite"
            className="animate-card-in relative z-10 w-full max-w-[900px] min-h-[465px] sm:min-h-[520px] rounded-[28px] bg-[#FFD0DF] border-2 border-white shadow-[0_24px_64px_rgba(0,0,0,0.48),0_0_45px_rgba(255,23,68,0.16)] px-5 py-9 sm:px-12 sm:py-12 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Floating Hearts & Sparkles Inside the Card */}
            <FloatingHearts
              key={`card-hearts-${replayKey}`}
              variant="card"
              intensity={phase === 'celebrating' ? 'celebrate' : 'normal'}
            />

            {/* Heart Burst when YES or Send Love Again is clicked */}
            {replayKey > 0 && <HeartBurst burstKey={replayKey} />}

            {/* Phase 1: Initial Question Screen */}
            {phase === 'asking' && (
              <div className="relative z-10 flex flex-col items-center text-center w-full">
                <div ref={teddyWrapRef} className="inline-block">
                  <TeddyIllustration mode="asking" />
                </div>

                <h2
                  ref={questionRef}
                  className="font-display font-extrabold text-[#111827] text-[1.65rem] sm:text-[2.2rem] mt-6 mb-7 tracking-tight px-2"
                >
                  Do you like me?
                </h2>

                <div className="flex items-center justify-center gap-5 sm:gap-6 flex-wrap">
                  <button
                    ref={yesBtnRef}
                    type="button"
                    onClick={handleYesClick}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 rounded-full bg-gradient-to-r from-[#FF4D79] to-[#FF1744] text-white font-display font-bold text-base sm:text-lg tracking-wide shadow-[0_10px_24px_rgba(255,23,68,0.38)] border border-white/40 transition-all duration-200 hover:scale-105 hover:shadow-[0_14px_32px_rgba(255,23,68,0.52)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF1744] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>YES</span>
                    <span
                      aria-hidden="true"
                      className="inline-block animate-heart-pulse text-lg leading-none"
                    >
                      ❤️
                    </span>
                  </button>

                  <button
                    ref={noBtnRef}
                    type="button"
                    onMouseEnter={(e) => moveNoButton(e.clientX, e.clientY)}
                    onPointerDown={(e) => {
                      if (e.pointerType !== 'mouse') {
                        moveNoButton(e.clientX, e.clientY);
                      }
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      moveNoButton(e.clientX, e.clientY);
                    }}
                    style={{
                      transform: `translate3d(${noOffset.x}px, ${noOffset.y}px, 0)`,
                      transition: 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    className="relative z-20 inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 rounded-full bg-[#FFB8CE] text-[#4A1426] font-display font-bold text-base sm:text-lg tracking-wide shadow-[0_8px_18px_rgba(255,117,151,0.28)] border border-white/80 hover:bg-[#FFA8C2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF4D79] cursor-pointer whitespace-nowrap shrink-0 select-none touch-none will-change-transform"
                  >
                    <span>NO</span>
                    <span aria-hidden="true" className="text-lg leading-none">
                      💔
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Phase 2: Beating Heart Transition */}
            {phase === 'transitioning' && (
              <div className="relative z-10 flex flex-col items-center justify-center py-12">
                <div className="relative flex items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="animate-burst-ring absolute w-24 h-24 rounded-full bg-[#FF1744]/25"
                  />
                  <svg
                    viewBox="0 0 24 24"
                    className="animate-heart-pulse w-20 h-20 sm:w-24 sm:h-24 text-[#FF1744] drop-shadow-[0_10px_28px_rgba(255,23,68,0.45)]"
                    aria-label="Sending love"
                  >
                    <path
                      fill="currentColor"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </div>
              </div>
            )}

            {/* Phase 3: Romantic Surprise Screen */}
            {phase === 'celebrating' && (
              <div
                key={`celebrate-${replayKey}`}
                className="relative z-10 flex flex-col items-center text-center w-full"
              >
                <div
                  className="animate-stagger-in"
                  style={{ ['--stagger-delay' as string]: '0s' }}
                >
                  <TeddyIllustration mode="celebrating" />
                </div>

                <h2
                  className="animate-stagger-in font-display font-extrabold text-[#111827] text-[1.55rem] sm:text-[2.15rem] md:text-[2.35rem] mt-6 mb-2.5 tracking-tight text-balance"
                  style={{ ['--stagger-delay' as string]: '0.18s' }}
                >
                  I Have a Little Crush on You! ❤️
                </h2>

                <p
                  className="animate-stagger-in font-body font-semibold text-[#3F1926] text-base sm:text-lg md:text-xl max-w-lg mb-2"
                  style={{ ['--stagger-delay' as string]: '0.44s' }}
                >
                  You make me smile without even trying.
                </p>

                <p
                  className="animate-stagger-in font-display font-bold text-[#D9043D] text-base sm:text-xl max-w-lg mb-7 drop-shadow-[0_1px_8px_rgba(255,255,255,0.65)]"
                  style={{ ['--stagger-delay' as string]: '0.7s' }}
                >
                  Maybe we could be something special? 💕
                </p>

                <div
                  className="animate-stagger-in flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
                  style={{ ['--stagger-delay' as string]: '0.96s' }}
                >
                  <button
                    type="button"
                    onClick={handleOpenPlanner}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 rounded-full bg-gradient-to-r from-[#FF4D79] to-[#FF1744] text-white font-display font-bold text-base sm:text-lg shadow-[0_10px_24px_rgba(255,23,68,0.42)] border border-white/50 transition-all duration-200 hover:scale-105 hover:shadow-[0_14px_30px_rgba(255,23,68,0.55)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF1744] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Plan Our Date 💗</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReplaySurprise}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-full bg-white/95 text-[#9D174D] font-display font-bold text-base sm:text-lg shadow-[0_8px_20px_rgba(255,23,68,0.16)] border border-white transition-all duration-200 hover:scale-105 hover:bg-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF1744] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Send Love Again</span>
                    <span aria-hidden="true" className="inline-block animate-heart-pulse">
                      ❤️
                    </span>
                  </button>
                </div>
              </div>
            )}
          </section>
        </main>
      )}
    </>
  );
}
