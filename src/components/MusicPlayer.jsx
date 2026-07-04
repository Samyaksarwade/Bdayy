import React from 'react';
import { Play, Pause, Music } from 'lucide-react';

export default function MusicPlayer({ isPlaying, onToggle }) {
  return (
    <section className="bg-white/50 backdrop-blur-md border border-white/70 rounded-2xl p-4 shadow-lg flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-full bg-[#FFB3C1] text-white ${isPlaying ? 'animate-slow-spin' : ''}`}>
          <Music size={20} />
        </div>
        <div>
          <p className="text-sm font-bold text-[#FF5C7A]">Sweet Background Music</p>
          <p className="text-xs text-[#8A8A8A] font-medium">{isPlaying ? 'Playing...' : 'Paused'}</p>
        </div>
      </div>
      
      <button 
        onClick={onToggle}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FF758F] hover:bg-[#FF5C7A] text-white shadow-md active:scale-95 transition-all focus:outline-none"
      >
        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
      </button>
    </section>
  );
}