import React, { useEffect, useState } from 'react';

interface HeartParticle {
  id: number;
  left: number;
  bottom: number;
  size: number;
  duration: number;
  driftX: number;
  riseY: number;
  rotStart: number;
  rotEnd: number;
  color: string;
  maxOpacity: number;
}

interface SparkleSpec {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  color: string;
}

const HEART_COLORS = ['#FF1744', '#FF4D79', '#FF7597', '#E11D48', '#FF8FA3'];

const CARD_SPARKLES: SparkleSpec[] = [
  { id: 1, left: '7%', top: '16%', size: 14, delay: '0s', duration: '2.6s', color: '#FFFFFF' },
  { id: 2, left: '15%', top: '78%', size: 11, delay: '0.7s', duration: '3.1s', color: '#FF4D79' },
  { id: 3, left: '85%', top: '18%', size: 15, delay: '0.4s', duration: '2.9s', color: '#FFFFFF' },
  { id: 4, left: '91%', top: '74%', size: 12, delay: '1.1s', duration: '2.5s', color: '#FF1744' },
  { id: 5, left: '24%', top: '11%', size: 10, delay: '1.5s', duration: '3.2s', color: '#FF7597' },
  { id: 6, left: '76%', top: '85%', size: 13, delay: '0.9s', duration: '2.8s', color: '#FFFFFF' },
];

const AMBIENT_SPARKLES: SparkleSpec[] = [
  { id: 1, left: '6%', top: '14%', size: 12, delay: '0.2s', duration: '3.4s', color: '#FF7597' },
  { id: 2, left: '92%', top: '12%', size: 14, delay: '0.9s', duration: '2.9s', color: '#FF4D79' },
  { id: 3, left: '8%', top: '82%', size: 13, delay: '1.4s', duration: '3.2s', color: '#FFFFFF' },
  { id: 4, left: '93%', top: '78%', size: 11, delay: '0.5s', duration: '3.6s', color: '#FF1744' },
];

interface FloatingHeartsProps {
  intensity?: 'normal' | 'celebrate';
  variant?: 'card' | 'ambient';
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({
  intensity = 'normal',
  variant = 'card',
}) => {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    let nextId = 1;

    const createHeart = (initial = false): HeartParticle => {
      const id = nextId++;
      const isAmbient = variant === 'ambient';
      const duration =
        intensity === 'celebrate'
          ? 3.1 + Math.random() * 2.1
          : isAmbient
            ? 5.8 + Math.random() * 3.2
            : 4.2 + Math.random() * 2.6;

      // For ambient hearts, concentrate near the left/right/outer areas around the card
      const left = isAmbient
        ? Math.random() < 0.5
          ? 2 + Math.random() * 14
          : 84 + Math.random() * 14
        : 6 + Math.random() * 88;

      return {
        id,
        left,
        bottom: initial ? 6 + Math.random() * 58 : 2 + Math.random() * 12,
        size:
          intensity === 'celebrate'
            ? 14 + Math.random() * 16
            : isAmbient
              ? 13 + Math.random() * 13
              : 12 + Math.random() * 12,
        duration,
        driftX: (Math.random() - 0.5) * 68,
        riseY: isAmbient ? -460 : -340,
        rotStart: (Math.random() - 0.5) * 28,
        rotEnd: (Math.random() - 0.5) * 44,
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
        maxOpacity: intensity === 'celebrate' ? 0.92 : isAmbient ? 0.55 : 0.78,
      };
    };

    const seedCount = variant === 'ambient' ? 6 : intensity === 'celebrate' ? 14 : 7;
    const initialHearts = Array.from({ length: seedCount }, () => createHeart(true));
    setHearts(initialHearts);

    const intervalMs = variant === 'ambient' ? 950 : intensity === 'celebrate' ? 260 : 600;
    const timer = window.setInterval(() => {
      setHearts((prev) => {
        const cap = variant === 'ambient' ? 12 : intensity === 'celebrate' ? 30 : 16;
        const trimmed = prev.length >= cap ? prev.slice(prev.length - cap + 1) : prev;
        return [...trimmed, createHeart(false)];
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intensity, variant]);

  const sparkles = variant === 'ambient' ? AMBIENT_SPARKLES : CARD_SPARKLES;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <svg
          key={sparkle.id}
          viewBox="0 0 24 24"
          className="animate-sparkle absolute"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: sparkle.delay,
            ['--sparkle-dur' as string]: sparkle.duration,
          }}
        >
          <path
            d="M12 2 L14.4 9.6 L22 12 L14.4 14.4 L12 22 L9.6 14.4 L2 12 L9.6 9.6 Z"
            fill={sparkle.color}
          />
        </svg>
      ))}

      {hearts.map((heart) => (
        <svg
          key={heart.id}
          viewBox="0 0 24 24"
          className="animate-float-heart absolute"
          style={{
            left: `${heart.left}%`,
            bottom: `${heart.bottom}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            ['--duration' as string]: `${heart.duration}s`,
            ['--drift-x' as string]: `${heart.driftX}px`,
            ['--rise-y' as string]: `${heart.riseY}px`,
            ['--rot-start' as string]: `${heart.rotStart}deg`,
            ['--rot-end' as string]: `${heart.rotEnd}deg`,
            ['--max-opacity' as string]: `${heart.maxOpacity}`,
          }}
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={heart.color}
          />
        </svg>
      ))}
    </div>
  );
};
