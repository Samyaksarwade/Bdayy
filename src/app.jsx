import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Lightbulb, Smile, Scissors, Gift, Image, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import memory1 from './assets/photos/memory1.jpg';
import memory2 from './assets/photos/memory2.jpg';
import memory3 from './assets/photos/memory3.jpg';

export default function App() {
  // Navigation States: 'intro' | 'setup' | 'cake' | 'cards' | 'gifts' | 'letter'
  const [stage, setStage] = useState('intro');
  const [introStep, setIntroStep] = useState(0);
  const [setupPhase, setSetupPhase] = useState(0); 
  const [cutProgress, setCutProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Custom layout interactive tracking elements
  const [albumOpen, setAlbumOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [showFinalModal, setShowFinalModal] = useState(false);
  
  // Gift Section opening tracking states
  const [openedGifts, setOpenedGifts] = useState({});

  const introSlides = [
    { text: "It's your special day.", img: "/assets/cute-character.png" },
    { text: "I made a little surprise just for you.", img: "/assets/cute-character.png" },
    { text: "Ready to open it?", img: "/assets/cute-character.png" }
  ];

  const wishes = [
    { id: 1, title: "Sweet Cake", msg: "May your day be filled with laughter, love, and small moments that feel unforgettable.", img: "🎂" },
    { id: 2, title: "Pop Magic", msg: "I hope this year brings calm, confidence, good surprises, and people who cheer for you loudly.", img: "🐼" },
    { id: 3, title: "Soft Hugs", msg: "You deserve good people, beautiful memories, and the kind of happiness that stays.", img: "💖" }
  ];

  // Gift array updated to leverage image paths for both earrings and necklace assets
  const surpriseGifts = [
    { id: 'g1', label: "Box #1", icon: "/assets/earrings.png", isImage: true, animation: "animate-pulse", title: "Cute Earrings", desc: "A sparkling pair to make your day shine brighter!" },
    { id: 'g2', label: "Box #2", icon: "/assets/necklace.png", isImage: true, animation: "animate-bounce", title: "Beautiful Necklace", desc: "An elegant piece crafted just for the birthday star!" },
    { id: 'g3', label: "Box #3", icon: "💖", isImage: false, animation: "animate-ping", title: "Love & Trust", desc: "A bundle of endless joy, warmth, and happy vibes,The Trust that i will never break!" }
  ];

  useEffect(() => {
    if (stage !== 'intro') return;
    const interval = setInterval(() => {
      setIntroStep((prev) => (prev < introSlides.length - 1 ? prev + 1 : prev));
    }, 3200);
    return () => clearInterval(interval);
  }, [stage, introSlides.length]);

  const handleSlicingMove = () => {
    if (!isDragging || cutProgress >= 100) return;
    setCutProgress((p) => Math.min(p + 2.5, 100));
  };

  const handleCardFlip = (id) => {
    setFlippedCards(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      if (Object.keys(updated).length === 3) {
        setTimeout(() => setShowFinalModal(true), 1000);
      }
      return updated;
    });
  };

  const handleGiftOpen = (id) => {
    setOpenedGifts(prev => ({ ...prev, [id]: true }));
  };

  const cloudBalloons = [
    { color: 'bg-rose-400', left: '12%', delay: '0s', size: 'w-10 h-12' },
    { color: 'bg-yellow-400', left: '35%', delay: '0.4s', size: 'w-8 h-10' },
    { color: 'bg-purple-400', left: '60%', delay: '0.2s', size: 'w-12 h-14' },
    { color: 'bg-sky-400', left: '80%', delay: '0.7s', size: 'w-9 h-11' },
    { color: 'bg-pink-400', left: '22%', delay: '1.1s', size: 'w-11 h-13' }
  ];

  return (
    <div className="min-h-screen bg-[#FFE5EC] flex flex-col items-center justify-center p-4 font-sans select-none overflow-hidden">
      <main className="w-full max-w-sm min-h-[580px] bg-white/30 backdrop-blur-md rounded-[2.5rem] border border-white/70 shadow-2xl overflow-hidden relative flex flex-col justify-between p-6">
        
        {/* PANEL 1: STORY CAROUSEL */}
        {stage === 'intro' && (
          <div className="flex-1 flex flex-col justify-between items-center py-4 animate-fade-in">
            <div className="w-full flex justify-between items-center px-2">
              <span className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400"></span><span className="w-3 h-3 rounded-full bg-yellow-400"></span><span className="w-3 h-3 rounded-full bg-green-400"></span></span>
              <span className="text-xs font-mono tracking-wider text-pink-500/70"></span>
              <span className="w-6"></span>
            </div>

            <div className="w-full max-w-[220px] h-52 rounded-2xl bg-white/40 border border-white p-2 shadow-inner mt-4 flex items-center justify-center overflow-hidden">
              <img src={introSlides[introStep].img} alt="Cute Panda" className="max-w-full max-h-full object-contain animate-bounce" style={{ animationDuration: '3s' }} />
            </div>

            <div className="text-center my-4 px-4">
              <p className="text-xs font-semibold text-pink-400 tracking-wide uppercase mb-1">A little note for you</p>
              <h2 className="text-xl font-black text-slate-700 leading-tight">{introSlides[introStep].text}</h2>
            </div>

            {introStep === introSlides.length - 1 ? (
              <div className="w-full flex gap-3 px-2">
                <button onClick={() => setStage('setup')} className="flex-1 py-3.5 bg-[#FF758F] text-white font-bold rounded-2xl shadow-md hover:bg-[#FF5C7A] transition-all active:scale-95">Yes!</button>
                <button onClick={() => setIntroStep(0)} className="flex-1 py-3.5 bg-white/60 text-slate-500 font-bold rounded-2xl border border-white hover:bg-white/80 transition-all">No</button>
              </div>
            ) : (
              <div className="flex gap-1.5 pb-2">
                {introSlides.map((_, idx) => (
                  <div key={idx} className={`h-2 rounded-full transition-all duration-300 ${idx === introStep ? 'w-6 bg-[#FF758F]' : 'w-2 bg-pink-300/40'}`} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* PANEL 2: INTERACTIVE ROOM DECORATION */}
        {stage === 'setup' && (
          <div className="flex-1 flex flex-col justify-between items-center py-2 animate-fade-in relative w-full">
            <div className={`absolute inset-0 rounded-[2rem] transition-all duration-700 pointer-events-none -m-6 z-0 ${setupPhase >= 1 ? 'bg-transparent' : 'bg-slate-950/90'}`} />
            <div className="z-10 w-full flex justify-end px-2 font-mono text-xs text-slate-400"><span>Phase {setupPhase}/4</span></div>

            <div className="z-10 w-full flex-1 flex flex-col justify-center items-center relative min-h-[260px]">
              {setupPhase >= 1 && (
                <div className="absolute top-0 left-0 right-0 flex justify-center gap-2 animate-fade-in">
                  {['✨','💖','✨'].map((emoji, i) => <span key={i} className="text-xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>{emoji}</span>)}
                </div>
              )}
              
              <div className="w-36 h-36 my-2 z-10 flex items-center justify-center relative">
                <img src={setupPhase >= 2 ? "/assets/cupcake-panda.png" : "/assets/cute-character.png"} alt="Panda Guest" className={`max-w-full max-h-full object-contain transition-all duration-500 ${setupPhase >= 1 ? 'opacity-100 scale-100' : 'opacity-20 scale-90 grayscale'}`} />
              </div>

              {setupPhase === 4 && (
                <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden pointer-events-none z-20">
                  {cloudBalloons.map((balloon, i) => (
                    <div key={i} className={`absolute rounded-full shadow-md flex flex-col items-center animate-balloon-rise ${balloon.color} ${balloon.size}`} style={{ left: balloon.left, bottom: '-10%', animationDelay: balloon.delay }}>
                      <div className="w-0.5 h-6 bg-slate-400/60 mt-auto translate-y-full" />
                    </div>
                  ))}
                </div>
              )}
              
              <div className="text-center px-4 max-w-xs z-10 mt-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-pink-500">Celebration Mode</h3>
                <h2 className={`text-2xl font-black mt-1 ${setupPhase >= 1 ? 'text-slate-800' : 'text-white'}`}>
                  {setupPhase === 0 && "It's so dark here..."}
                  {setupPhase === 1 && "Setting the mood..."}
                  {setupPhase === 2 && "Panda is waiting..."}
                  {setupPhase === 3 && "Ready to launch..."}
                  {setupPhase === 4 && "Look at them go! 🎈"}
                </h2>
              </div>
            </div>

            <div className="z-10 w-full px-2">
              {setupPhase === 0 && <button onClick={() => setSetupPhase(1)} className="w-full py-4 bg-yellow-400 text-slate-900 font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"><Lightbulb size={18}/> Turn on the lights</button>}
              {setupPhase === 1 && <button onClick={() => setSetupPhase(2)} className="w-full py-4 bg-purple-400 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"><Sparkles size={18}/> Set the mood</button>}
              {setupPhase === 2 && <button onClick={() => setSetupPhase(3)} className="w-full py-4 bg-pink-400 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"><Smile size={18}/> Invite the guest</button>}
              {setupPhase === 3 && <button onClick={() => setSetupPhase(4)} className="w-full py-4 bg-rose-400 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2">Release the balloons 🎈</button>}
              {setupPhase === 4 && <button onClick={() => setStage('cake')} className="w-full py-4 bg-[#FF758F] text-white font-bold rounded-2xl shadow-lg hover:bg-[#FF5C7A] transition-all">Cut the cake</button>}
            </div>
          </div>
        )}

        {/* PANEL 3: INTERACTIVE CAKE SLICE */}
        {stage === 'cake' && (
          <div className="flex-1 flex flex-col justify-between items-center py-2 animate-fade-in w-full">
            <div className="text-center">
              <h2 className="text-2xl font-black text-slate-800">Cake Time</h2>
              <p className="text-xs text-slate-500 font-medium">Cut the cake and make a wish</p>
            </div>

            <div 
              className="w-full max-w-[280px] h-56 bg-white/40 border border-white/80 rounded-3xl shadow-inner relative flex flex-col items-center justify-center my-4 overflow-hidden cursor-ew-resize"
              onMouseMove={handleSlicingMove}
              onTouchMove={() => isDragging && cutProgress < 100 && setCutProgress(p => Math.min(p + 2.5, 100))}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchEnd={() => setIsDragging(false)}
            >
              {cutProgress < 60 && <div className="absolute top-12 w-3 h-5 bg-orange-400 rounded-full animate-pulse shadow-[0_0_8px_#FB923C]" />}
              <div className="w-1.5 h-6 bg-amber-700 absolute top-16" />
              <div className="w-40 h-24 bg-pink-300 rounded-2xl shadow-md absolute bottom-12 border-b-4 border-pink-400/60 overflow-hidden flex flex-col justify-between">
                <div className="w-full h-5 bg-white/90 rounded-b-xl flex justify-around"><span className="w-4 h-4 rounded-full bg-white -mt-2"></span><span className="w-4 h-4 rounded-full bg-white -mt-2"></span><span className="w-4 h-4 rounded-full bg-white -mt-2"></span></div>
                <div className="w-full h-2 bg-white/60 mb-6" />
              </div>

              {cutProgress < 100 ? (
                <div className="absolute inset-x-0 bottom-20 flex flex-col items-center pointer-events-none">
                  <div className="w-full border-t-2 border-dashed border-rose-500/60 relative">
                    <span className="absolute top-1/2 -translate-y-1/2 p-1.5 bg-rose-500 text-white rounded-full text-xs shadow-md" style={{ left: `${cutProgress}%`, transform: `translate(-50%, -50%)` }}><Scissors size={12} /></span>
                  </div>
                  <span className="text-[10px] font-bold text-rose-500 uppercase mt-4 tracking-wider">Swipe / Drag here to cut</span>
                </div>
              ) : (
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in p-4 text-center">
                  <span className="text-4xl animate-bounce">🎉</span>
                  <h4 className="text-lg font-black text-rose-500 mt-1">Cake Cut!</h4>
                </div>
              )}
            </div>

            <button disabled={cutProgress < 100} onClick={() => setStage('cards')} className={`w-full py-4 font-bold rounded-2xl shadow-lg transition-all ${cutProgress >= 100 ? 'bg-[#FF758F] text-white hover:bg-[#FF5C7A] active:scale-95' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}>I Made My Wish</button>
          </div>
        )}

        {/* PANEL 4: 3D WISH FLIP CARDS + ALBUM */}
        {stage === 'cards' && (
          <div className="flex-1 flex flex-col justify-between items-center py-1 animate-fade-in w-full overflow-y-auto max-h-[500px] pr-1">
            <div className="text-center mb-2 w-full">
              <h2 className="text-xl font-black text-slate-800">Flip these birthday wishes</h2>
              <p className="text-xs text-slate-500">Each card hides a little message.</p>
            </div>

            <div className="w-full flex flex-col gap-3 justify-center my-2">
              {wishes.map((item) => (
                <div key={item.id} onClick={() => handleCardFlip(item.id)} className="w-full h-20 [perspective:1000px] cursor-pointer">
                  <div className={`relative w-full h-full duration-500 [transform-style:preserve-3d] ${flippedCards[item.id] ? '[transform:rotateX(180deg)]' : ''}`}>
                    <div className="absolute inset-0 bg-white/50 border border-white rounded-2xl shadow-sm p-4 flex items-center justify-between backface-hidden">
                      <div className="flex items-center gap-3"><span className="text-2xl">{item.img}</span><span className="font-bold text-slate-700 text-xs">{item.title}</span></div>
                      <span className="text-[9px] font-bold text-pink-500 bg-pink-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">Wish <Sparkles size={8}/></span>
                    </div>
                    <div className="absolute inset-0 bg-white/90 border border-pink-200 rounded-2xl shadow-inner p-3 flex flex-col justify-center items-center text-center [transform:rotateX(180deg)] backface-hidden">
                      <p className="text-[11px] font-medium text-slate-600 leading-relaxed px-1">{item.msg}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full mt-4 border-t border-pink-200/60 pt-3">
              <button onClick={() => setAlbumOpen(!albumOpen)} className="w-full py-3 bg-white/60 hover:bg-white/80 border border-white rounded-xl shadow-sm font-bold text-xs text-pink-500 flex items-center justify-center gap-2 transition-all active:scale-[0.99]">
                <Image size={14} />{albumOpen ? "Hide Special Memories" : "View Special Memories"}{albumOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {albumOpen && (
                <div className="grid grid-cols-1 gap-3 mt-3 animate-fade-in">
                  {[memory1, memory2, memory3].map((src, index) => (
                    <div key={index} className="overflow-hidden rounded-xl border border-white bg-white/40 p-1.5 shadow-sm">
                      <img src={src} alt={`Memory ${index + 1}`} className="w-full h-36 object-cover rounded-lg" onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = `<div class="w-full h-36 bg-pink-100/50 rounded-lg flex items-center justify-center text-xs font-medium text-pink-400">Memory Card ${index + 1} 💖</div>`; }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full text-center py-2 mt-2"><p className="text-[10px] font-mono font-bold text-slate-400">{Object.keys(flippedCards).length} of 3 discovered</p></div>
          </div>
        )}

        {/* PANEL 5: GIFT UNWRAPPING GRID */}
        {stage === 'gifts' && (
          <div className="flex-1 flex flex-col justify-between items-center py-2 animate-fade-in w-full">
            <div className="text-center w-full mb-3">
              <h2 className="text-2xl font-black text-slate-800">Unwrap your gifts!</h2>
              <p className="text-xs text-slate-500">Tap each box to reveal a special surprise</p>
            </div>

            <div className="w-full flex-1 flex flex-col gap-4 justify-center">
              {surpriseGifts.map((gift) => (
                <div 
                  key={gift.id}
                  onClick={() => !openedGifts[gift.id] && handleGiftOpen(gift.id)}
                  className={`w-full p-4 rounded-2xl border transition-all flex items-center gap-4 shadow-sm ${
                    openedGifts[gift.id] 
                      ? 'bg-white/80 border-pink-200' 
                      : 'bg-white/50 border-white hover:bg-white/70 cursor-pointer'
                  }`}
                >
                  {!openedGifts[gift.id] ? (
                    <>
                      <div className="p-3 bg-rose-400 text-white rounded-xl shadow-md animate-gift-shake">
                        <Gift size={24} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-black text-sm text-slate-700">{gift.label}</h4>
                        <p className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Tap to unwrap</p>
                      </div>
                    </>
                  ) : (
                    <>
                      {gift.isImage ? (
                        <div className="p-1 bg-pink-50 rounded-xl w-14 h-14 flex items-center justify-center">
                          <img src={gift.icon} alt={gift.title} className={`max-w-full max-h-full object-contain ${gift.animation}`} />
                        </div>
                      ) : (
                        <div className={`text-4xl p-2 bg-pink-100 rounded-xl ${gift.animation}`}>
                          {gift.icon}
                        </div>
                      )}
                      
                      <div className="text-left animate-pop-reveal flex-1">
                        <h4 className="font-black text-sm text-rose-500 flex items-center gap-1">
                          {gift.title} <Sparkles size={12} className="text-yellow-400" />
                        </h4>
                        <p className="text-[11px] font-medium text-slate-600 leading-tight">{gift.desc}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <button 
              disabled={Object.keys(openedGifts).length < 3}
              onClick={() => setStage('letter')}
              className={`w-full py-4 font-bold rounded-2xl shadow-lg transition-all mt-4 ${
                Object.keys(openedGifts).length === 3 
                  ? 'bg-[#FF758F] text-white hover:bg-[#FF5C7A] active:scale-95' 
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              Read Final Message
            </button>
          </div>
        )}

        {/* POPUP MODAL OVERLAY */}
        {showFinalModal && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white rounded-[2rem] p-6 w-full text-center shadow-2xl border border-white flex flex-col items-center">
              <div className="w-20 h-20 mb-2"><img src="/assets/cupcake-panda.png" alt="Panda" className="w-full h-full object-contain animate-bounce" /></div>
              <h3 className="text-xl font-black text-slate-800">All Wishes Discovered!</h3>
              <p className="text-xs text-slate-500 mt-1">Your special gift boxes are ready for you!</p>
              <button onClick={() => { setShowFinalModal(false); setStage('gifts'); }} className="w-full mt-4 py-3.5 bg-[#FF758F] text-white font-bold rounded-2xl shadow-md hover:bg-[#FF5C7A]">Go to Gift Boxes 🎁</button>
            </div>
          </div>
        )}

        {/* PANEL 6: FINAL LETTER SCROLL */}
        {stage === 'letter' && (
          <div className="flex-1 flex flex-col justify-between items-center py-1 animate-fade-in w-full">
            <div className="w-full flex justify-between items-center px-2 mb-2">
              <span className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400"></span><span className="w-3 h-3 rounded-full bg-yellow-400"></span><span className="w-3 h-3 rounded-full bg-green-400"></span></span>
              <span className="text-xs font-mono text-slate-400"></span>
              <button onClick={() => setStage('intro')} className="text-xs font-bold text-rose-400 hover:text-rose-600">CLOSE</button>
            </div>

            <div className="w-full flex-1 bg-white/70 border border-white rounded-3xl p-5 shadow-inner overflow-y-auto my-2 text-left max-h-[360px]">
              <div className="flex justify-between items-start mb-3 border-b border-pink-100 pb-2">
                <h2 className="text-xl font-black text-rose-500 flex items-center gap-1.5"><Gift size={18}/> Happy Bdayy Shruu👀,</h2>
                <img src="/assets/cupcake-panda.png" alt="Mini Panda" className="w-8 h-8 object-contain" />
              </div>
              <div className="space-y-4 text-xs text-slate-600 font-medium leading-relaxed">
                <p>✨ <strong>Happy Birthday</strong> to someone who makes life feel softer, brighter, and a little more fun.</p>
                <p>I hope this year brings uhh more peace, more confidence, and more moments that remind uhh how loved uhh are.</p>
                <p>Uhh deserve good people, beautiful memories, and the kind of happiness that stays.</p>
                <p>I don't Know about the future,but I will Always be here for uhh ,even if u don't need but I will be there for you always.</p>
              </div>
              <div className="mt-6 border-t border-pink-100 pt-3 text-right"><span className="font-serif italic font-bold text-sm text-rose-500 block mt-0.5">Always cheering for you</span></div>
            </div>

            <button 
              onClick={() => {
                setStage('intro');
                setIntroStep(0);
                setSetupPhase(0);
                setCutProgress(0);
                setFlippedCards({});
                setOpenedGifts({});
                setAlbumOpen(false);
              }}
              className="w-full py-4 bg-slate-800 text-white font-bold rounded-2xl shadow-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <RotateCcw size={16}/> RESTART
            </button>
          </div>
        )}

      </main>
    </div>
  );
}