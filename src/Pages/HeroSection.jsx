import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera } from 'lucide-react';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Placeholder Data
const PLACEHOLDERS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  text: `GALLRIA_IMG_0${i + 1}`
}));

const HeroSection = () => {
  const containerRef = useRef(null);
  
  // Refs for animation targets
  const topCarouselRef = useRef(null);     // The wrapper (moves vertically)
  const topStripRef = useRef(null);        // The inner strip (moves horizontally infinite)
  
  const bottomCarouselRef = useRef(null);  // The wrapper (moves vertically)
  const bottomStripRef = useRef(null);     // The inner strip (moves horizontally infinite)
  
  const lensRef = useRef(null);

  useGSAP(() => {
    // --- A. BACKGROUND INFINITE SCROLL (Time-based) ---
    // This keeps the "alive" feel of the website even when not scrolling
    gsap.to(topStripRef.current, {
      xPercent: -50,
      ease: 'none',
      duration: 20,
      repeat: -1,
    });

    gsap.fromTo(bottomStripRef.current, 
      { xPercent: -50 },
      {
        xPercent: 0,
        ease: 'none',
        duration: 20,
        repeat: -1,
      }
    );

    // --- B. SCROLL INTERACTION (Scroll-based) ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current, // The 200vh container
        start: "top top",              // Start when container hits top of viewport
        end: "bottom bottom",          // End when bottom of container hits bottom of viewport
        scrub: 1,                      // Smooth 1s delay linking scroll to anim
      }
    });

    // 1. Diverge Carousels
    // Top goes UP and slightly fades out
    tl.to(topCarouselRef.current, {
      yPercent: -200, // Move up 200% of its height
      opacity: 0,
      ease: "power1.in",
    }, 0);

    // Bottom goes DOWN and slightly fades out
    tl.to(bottomCarouselRef.current, {
      yPercent: 200, // Move down 200% of its height
      opacity: 0,
      ease: "power1.in",
    }, 0);

    // 2. Roll the Lens to the Right
    // To look like it's rolling, x and rotation must sync.
    // Moving Right = Clockwise Rotation.
    tl.to(lensRef.current, {
      x: "150vw",      // Move off screen to the right
      rotation: 720,   // Spin 2 full times (clockwise)
      opacity: 0,      // Fade out at the very end
      ease: "power1.in", 
    }, 0);

  }, { scope: containerRef });

  // Helper to render the infinite strip
  const renderStrip = (ref) => (
    <div className="flex h-full w-max" ref={ref}>
      {[...PLACEHOLDERS, ...PLACEHOLDERS].map((item, idx) => (
        <div 
          key={`${item.id}-${idx}`}
          className="h-full w-[40vh] bg-zinc-900 border-r border-zinc-950 flex flex-col items-center justify-center relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-zinc-800/50 group-hover:bg-zinc-800/80 transition-colors duration-500" />
          <span className="relative z-10 font-mono text-xs text-zinc-500 tracking-widest group-hover:text-white transition-colors">
            {item.text}
          </span>
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </div>
  );

  return (
    // MAIN CONTAINER: 200vh height to allow scrolling space
    <div ref={containerRef} className='w-screen h-[200vh] bg-transparent text-white relative z-10'>
        
        {/* STICKY WRAPPER: Keeps content in view while we scroll through the 200vh */}
        <div className='w-screen h-screen sticky top-0 overflow-hidden'>
            
            {/* MID SECTION LAYOUT */}
            <div className='mid-section w-full h-[50%] border-y border-white/5 absolute bottom-0 translate-y-[-50%] flex flex-col justify-center items-center rotate-3'>
            
                {/* TOP CAROUSEL WRAPPER */}
                <div 
                    ref={topCarouselRef}
                    className='carousel w-[120vw] h-[25vh] absolute top-0 translate-y-[-50%] translate-x-[-5%] overflow-hidden bg-zinc-950/50 backdrop-blur-sm border-y border-white/5'
                >
                   {renderStrip(topStripRef)}
                </div>

                {/* CENTER LENS */}
                <div 
                  ref={lensRef}
                  className='h-[75%] aspect-square z-10 rounded-full border border-white/10 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center shadow-2xl shadow-black/50'
                >
                   <div className="w-[85%] h-[85%] rounded-full border border-dashed border-white/10 flex items-center justify-center">
                     <Camera size={64} className="text-white/20" />
                   </div>
                </div>

                {/* BOTTOM CAROUSEL WRAPPER */}
                <div 
                    ref={bottomCarouselRef}
                    className='carousel w-[120vw] h-[25vh] absolute bottom-0 translate-y-[50%] translate-x-[5%] overflow-hidden bg-zinc-950/50 backdrop-blur-sm border-y border-white/5'
                >
                    {renderStrip(bottomStripRef)}
                </div>      
            </div>
            
            {/* Optional: Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent to-black/40" />
        </div>
    </div>
  )
}

export default HeroSection;