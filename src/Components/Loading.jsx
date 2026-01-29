import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Loading = ({ onComplete }) => {
  const containerRef = useRef(null);
  
  // Animation Targets
  const topBarFillRef = useRef(null);
  const bottomBarFillRef = useRef(null);
  const topContainerRef = useRef(null);
  const bottomContainerRef = useRef(null);
  const centerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      // When the entire sequence finishes, trigger the callback
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // --- PHASE 1: LOADING (0s to 2s) ---
    // Synchronize filling bars and rotating center
    tl.to(topBarFillRef.current, {
      width: "100%",
      duration: 2,
      ease: "power2.inOut",
    }, 0) // The '0' forces this to start at time 0
    
    .to(bottomBarFillRef.current, {
      width: "100%",
      duration: 2,
      ease: "power2.inOut",
    }, 0)

    .to(centerRef.current, {
      rotation: -360,
      duration: 2,
      ease: "power2.inOut",
    }, 0);


    // --- PHASE 2: EXIT / DIVERGE (2s to 3s) ---
    // 1. Top Bar moves UP
    tl.to(topContainerRef.current, {
      yPercent: -200, // Move far up
      autoAlpha: 0,   // Fade out slightly
      duration: 1,
      ease: "power3.in",
    }, 2) // Start exactly at 2 seconds

    // 2. Bottom Bar moves DOWN
    .to(bottomContainerRef.current, {
      yPercent: 200,  // Move far down
      autoAlpha: 0,
      duration: 1,
      ease: "power3.in",
    }, 2)

    // 3. Center Scales to 0
    .to(centerRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.6, // Slightly faster for a "pop" vanish effect
      ease: "back.in(1.7)", // Retracts slightly before shrinking
    }, 2);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className='w-screen h-screen bg-zinc-950 text-white relative overflow-hidden flex items-center justify-center z-[999]'>
        
        {/* Mid Section Container */}
        <div className='mid-section w-full h-[50%] border-y border-transparent absolute bottom-0 translate-y-[-50%] flex flex-col justify-center items-center rotate-3'>
            
            {/* TOP LOADING CONTAINER */}
            <div 
                ref={topContainerRef}
                className='w-[120vw] h-[25vh] absolute top-0 translate-y-[-50%] translate-x-[-5%] bg-zinc-950/50 backdrop-blur-sm border-y border-white/5 flex justify-end overflow-hidden'
            >
                {/* The Bar Fill */}
                <div 
                  ref={topBarFillRef} 
                  className='h-full bg-zinc-100 w-0 shadow-[0_0_50px_rgba(255,255,255,0.2)]' 
                />
            </div>

            {/* CENTER ELEMENT (Lens + Text) */}
            <div 
                ref={centerRef}
                className='relative h-[75%] aspect-square z-10 flex items-center justify-center origin-center'
            >
                {/* The Rotating Ring Visuals */}
                <div className='absolute inset-0 rounded-full border border-white/10 border-t-white/40 bg-zinc-950/80 backdrop-blur-md shadow-2xl shadow-black/50'>
                   <div className="absolute inset-4 rounded-full border border-dashed border-white/10" />
                </div>

                {/* Text (Rotates with the parent now) */}
                <span className="relative z-20 font-sans font-bold tracking-[0.25em] text-2xl text-white mix-blend-overlay">
                  GALLRIA
                </span>
            </div>

            {/* BOTTOM LOADING CONTAINER */}
            <div 
                ref={bottomContainerRef}
                className='w-[120vw] h-[25vh] absolute bottom-0 translate-y-[50%] translate-x-[-5%] bg-zinc-950/50 backdrop-blur-sm border-y border-white/5 flex justify-start overflow-hidden'
            >
                {/* The Bar Fill */}
                <div 
                  ref={bottomBarFillRef} 
                  className='h-full bg-zinc-100 w-0 shadow-[0_0_50px_rgba(255,255,255,0.2)]' 
                />
            </div>      
        </div>
    </div>
  )
}

export default Loading