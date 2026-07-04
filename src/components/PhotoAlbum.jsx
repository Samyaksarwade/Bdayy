import React from 'react';
import { Image } from 'lucide-react';

export default function PhotoAlbum({ isOpen, onToggle }) {
  // Safe high-quality placeholder images for the album
  const photos = [
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1464349172961-4045f9e29a98?w=500&auto=format&fit=crop&q=60"
  ];

  return (
    <section className="flex flex-col gap-4">
      <button 
        onClick={onToggle}
        className="w-full py-4 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl font-bold text-[#FF758F] shadow-md hover:bg-white/80 transition-all flex items-center justify-center gap-2 active:scale-[0.99] focus:outline-none"
      >
        <Image size={20} />
        {isOpen ? "Hide Photo Album" : "Open Photo Album"}
      </button>

      {isOpen && (
        <div className="grid grid-cols-1 gap-4 bg-white/30 backdrop-blur-sm p-4 rounded-3xl border border-white/40 animate-fade-in">
          {photos.map((url, index) => (
            <div key={index} className="overflow-hidden rounded-2xl shadow-md border-2 border-white/60 bg-white/40 p-2 transform transition-transform duration-300 hover:rotate-1">
              <img 
                src={url} 
                alt={`Memory ${index + 1}`} 
                className="w-full h-48 object-cover rounded-xl hover:scale-105 transition-transform duration-500 ease-out"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}