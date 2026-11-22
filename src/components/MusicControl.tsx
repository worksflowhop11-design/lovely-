import React, { useState } from 'react';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';

interface MusicControlProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  audioUnavailable: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
}

export const MusicControl: React.FC<MusicControlProps> = ({
  isPlaying,
  isMuted,
  volume,
  audioUnavailable,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
}) => {
  const [showVolume, setShowVolume] = useState(false);

  if (audioUnavailable) {
    return (
      <div
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-[#162138]/90 backdrop-blur-md border border-white/20 px-3.5 py-2 text-xs font-display font-semibold text-white/75 shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
        role="status"
      >
        <Music className="w-3.5 h-3.5 text-[#FF7597]" aria-hidden="true" />
        <span>Music unavailable</span>
      </div>
    );
  }

  return (
    <div
      data-music-control="true"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 sm:gap-2 rounded-full bg-[#162138]/90 backdrop-blur-md border border-white/25 px-2.5 py-1.5 shadow-[0_10px_28px_rgba(0,0,0,0.45)]"
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
      aria-label="Background music controls"
    >
      {/* Subtle Animated Music Indicator */}
      <div
        className="flex items-end justify-center gap-[2.5px] w-5 h-4 pl-1"
        aria-hidden="true"
      >
        {isPlaying && !isMuted ? (
          <>
            <span className="animate-music-bar-1 w-[3px] h-3.5 rounded-full bg-[#FF4D79]" />
            <span className="animate-music-bar-2 w-[3px] h-4 rounded-full bg-[#FF1744]" />
            <span className="animate-music-bar-3 w-[3px] h-3 rounded-full bg-[#FF7597]" />
          </>
        ) : (
          <Music className="w-4 h-4 text-[#FF8FA3]" />
        )}
      </div>

      {/* Play / Pause Button */}
      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-[#FF4D79] to-[#FF1744] text-white shadow-sm transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        )}
      </button>

      {/* Mute / Unmute Button */}
      <button
        type="button"
        onClick={() => {
          onToggleMute();
          setShowVolume(true);
        }}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        title={isMuted ? 'Unmute' : 'Mute'}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {isMuted || volume === 0 ? (
          <VolumeX className="w-4 h-4 text-[#FFB8CE]" />
        ) : (
          <Volume2 className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Volume Slider (always accessible on focus/hover or compact inline) */}
      <div
        className={`flex items-center overflow-hidden transition-all duration-200 ${
          showVolume ? 'w-20 pr-1.5 opacity-100' : 'w-0 sm:w-16 sm:pr-1.5 opacity-0 sm:opacity-100'
        }`}
      >
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={isMuted ? 0 : volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          aria-label="Music volume"
          className="w-full h-1.5 accent-[#FF4D79] cursor-pointer"
        />
      </div>
    </div>
  );
};
