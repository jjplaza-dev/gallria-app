import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Aperture } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
  const containerRef = useRef(null);
  const textRefs = useRef([]); 
  const bottomSectionRef = useRef(null);
  
  // Refs for the text rows
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  // Refs for the Parallax Images
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);

  // Function to add refs to the array
  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  useGSAP(() => {
    // 1. Text Reveal Animation (Top Section)
    gsap.fromTo(textRefs.current, 
      { yPercent: 100, opacity: 0, rotateX: -20 },
      { 
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 40%", 
          toggleActions: "play none none reverse"
        }
      }
    );

    // 2. Icon Rotation
    gsap.to(".spinner-icon", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // 3. Adjectives Scroll Animation
    const scrollConfig = {
        trigger: bottomSectionRef.current,
        start: "top bottom", 
        end: "bottom top",   
        scrub: 1,            
    };

    gsap.to(row1Ref.current, {
        xPercent: -2, 
        ease: "none",
        scrollTrigger: scrollConfig
    });

    gsap.to(row2Ref.current, {
        xPercent: -1, 
        ease: "none",
        scrollTrigger: scrollConfig
    });

    // 4. Parallax Image Effects (Move Upwards on Scroll)
    // Image 1: Moves moderately
    gsap.to(img1Ref.current, {
        yPercent: -30, 
        ease: "none",
        scrollTrigger: scrollConfig
    });

    // Image 2: Moves faster (creates depth)
    gsap.to(img2Ref.current, {
        yPercent: -50, 
        ease: "none",
        scrollTrigger: scrollConfig
    });

    // Image 3: Moves slowly
    gsap.to(img3Ref.current, {
        yPercent: -20, 
        ease: "none",
        scrollTrigger: scrollConfig
    });

  }, { scope: containerRef });

  const content = [
    "We are Gallria.",
    "We compose images that artfully",
    "evoke emotion and arrest time itself.",
    "A visual alchemy designed for",
    "the bold, the modern, and",
    "the extraordinary."
  ];

  const ADJECTIVES = "UNAPOLOGETIC • TIMELESS • RAW • CINEMATIC • ETHEREAL • HONEST • ";

  return (
    <section 
     
      className="relative w-full h-screen flex flex-col items-center justify-centern"
    >

        <div className='w-full h-[200vh] translate-y-[-50%] flex flex-col items-center justify-center' ref={containerRef}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative h-screen flex flex-col items-center justify-center max-w-4xl px-6 text-center">
                
                {/* Small Label with Icon */}
                <div className="flex flex-col items-center gap-4 mb-12">
                    <div className="p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                        <Aperture className="text-indigo-400 spinner-icon" size={24} />
                    </div>
                    <span className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase">
                        The Studio
                    </span>
                </div>

                {/* Masked Headline Text */}
                <div className="space-y-1 md:space-y-3">
                    {content.map((line, index) => (
                        // The 'overflow-hidden' wrapper is crucial for the "slide up" effect
                        <div key={index} className="overflow-hidden">
                            <h2 
                            ref={addToRefs} 
                            className="text-3xl md:text-4xl lg:text-6xl font-serif text-zinc-100 tracking-tight leading-tight origin-top-left"
                            >
                            {/* Highlight keywords elegantly */}
                            {line.includes("Gallria") ? (
                                <span className="text-indigo-400">{line}</span>
                            ) : (
                                line
                            )}
                            </h2>
                        </div>
                    ))}
                </div>               
            </div>

            {/* --- BOTTOM HALF: Modified Section --- */}
            <div ref={bottomSectionRef} className='w-full h-[100vh] relative flex flex-col overflow-hidden'>
                
                {/* A. TOP: Adjective Carousels */}
                <div className="flex flex-col gap-2 pt-20 opacity-40 select-none pointer-events-none mix-blend-overlay z-0 rotate-[-2deg]">
                    <div ref={row1Ref} className="whitespace-nowrap text-[8vw] md:text-[6vw] font-bold tracking-tighter leading-none text-white w-max">
                        {ADJECTIVES.repeat(6)}
                    </div>
                    <div ref={row2Ref} className="whitespace-nowrap text-[8vw] md:text-[6vw] font-bold tracking-tighter leading-none text-transparent stroke-white stroke-2 w-max" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>
                        {ADJECTIVES.repeat(6)}
                    </div>
                </div>

                {/* B. BOTTOM: Scattered Images (Absolute Positioned) */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
                     
                     {/* Image 1: Bottom Left, Overlaps slightly */}
                    {/* Image 1: Top Left (High on mobile, precise on desktop) */}
                     <div 
                        ref={img1Ref}
                        className="absolute top-[60%] left-[5%] w-[35vw] aspect-[2/3] md:top-[55%] md:left-[10%] md:w-[25vw] lg:w-[15vw] border border-white/20 bg-white/5 backdrop-blur-sm rounded-sm z-10"
                     >
                        <div className="absolute top-2 left-2 w-full h-full border border-white/5" />
                        <span className="absolute -top-6 left-0 text-[10px] font-mono text-zinc-600">FIG. 01</span>
                     </div>

                     {/* Image 2: Center (Middle-Right on mobile, Center-Left on desktop) */}
                     <div 
                        ref={img2Ref}
                        className="absolute top-[35%] right-[15%] w-[55vw] aspect-video md:top-auto md:bottom-[50%] lg:bottom-[30%] md:right-auto md:left-[35%] md:w-[35vw] lg:w-[25vw] border border-white/20 bg-white/5 backdrop-blur-md rounded-sm z-20 shadow-2xl shadow-black/50"
                     >
                        <div className="absolute top-2 left-2 w-full h-full border border-white/5" />
                        <span className="absolute -top-6 left-0 text-[10px] font-mono text-zinc-600">FIG. 02</span>
                     </div>

                     {/* Image 3: Bottom (Bottom-Left on mobile, Bottom-Right on desktop) */}
                     <div 
                        ref={img3Ref}
                        className="absolute bottom-[15%] left-[50%] w-[30vw] aspect-[2/3] md:bottom-[15%] lg:bottom-[15%] md:left-auto md:right-[25%] lg:right-[15%] md:w-[20vw] lg:w-[15vw] border border-white/20 bg-white/5 backdrop-blur-sm rounded-sm z-10"
                     >
                        <div className="absolute top-2 left-2 w-full h-full border border-white/5" />
                        <span className="absolute -top-6 right-0 text-[10px] font-mono text-zinc-600">FIG. 03</span>
                     </div>

                </div>

            </div>
        </div>
    </section>
  )
}

export default WhoWeAre