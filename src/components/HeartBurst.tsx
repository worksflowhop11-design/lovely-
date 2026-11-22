import React, { useMemo } from 'react';

interface BurstItem {
  id: number;
  dx: number;
  dy: number;
  rot: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  isSparkle: boolean;
}

const BURST_COLORS = ['#FF1744', '#FF4D79', '#FF7597', '#FFFFFF', '#E11D48', '#FFB3C6'];

interface HeartBurstProps {
  burstKey: number;
}

export const HeartBurst: React.FC<HeartBurstProps> = ({ burstKey }) => {
  const particles = useMemo<BurstItem[]>(() => {
    const count = 28;
    return Array.from({ length: count }, (_, idx) => {
      const angle = (idx / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
      const distance = 90 + Math.random() * 180;
      return {
        id: idx,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance - 24,
        rot: (Math.random() - 0.5) * 140,
        size: 12 + Math.random() * 14,
        color: BURST_COLORS[idx % BURST_COLORS.length],
        duration: 0.85 + Math.random() * 0.55,
        delay: Math.random() * 0.14,
        isSparkle: idx % 4 === 0,
      };
    });
  }, [burstKey]);

  return (
    <div
      key={burstKey}
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-20"
      aria-hidden="true"
    >
      {particles.map((item) => (
        <svg
          key={item.id}
          viewBox="0 0 24 24"
          className="animate-burst-particle absolute"
          style={{
            width: `${item.size}px`,
            height: `${item.size}px`,
            ['--bx' as string]: `${item.dx}px`,
            ['--by' as string]: `${item.dy}px`,
            ['--brot' as string]: `${item.rot}deg`,
            ['--bdur' as string]: `${item.duration}s`,
            ['--bdelay' as string]: `${item.delay}s`,
          }}
        >
          {item.isSparkle ? (
            <path
              d="M12 2 L14.4 9.6 L22 12 L14.4 14.4 L12 22 L9.6 14.4 L2 12 L9.6 9.6 Z"
              fill={item.color}
            />
          ) : (
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={item.color}
            />
          )}
        </svg>
      ))}
    </div>
  );
};
