import React from 'react';
import { Heart, Gift } from 'lucide-react';

export default function BirthdayCard() {
  return (
    <section className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-xl relative overflow-hidden transition-all duration-300 hover:bg-white/50">
      <div className="absolute top-2 right-3 text-red-400/20">
        <Heart size={40} fill="currentColor" className="opacity-20 animate-pulse" />
      </div>
      
      <div className="flex items-center gap-2 mb-3">
        <Gift className="text-[#FF758F]" size={20} />
        <h2 className="font-bold text-lg text-[#FF5C7A]">A Special Note</h2>
      </div>
      
      <p className="text-base leading-relaxed text-[#5C5C5C] font-medium">
        To someone incredibly special, may your day be filled with endless laughter, 
        sweet treats, and beautiful memories. Thank you for bringing so much brightness 
        into the world! Keep shining! 💖
      </p>
    </section>
  );
}