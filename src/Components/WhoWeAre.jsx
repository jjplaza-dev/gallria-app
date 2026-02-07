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
  const wordsWrapperRef = useRef(null); 
  
  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const ADJECTIVES = ["INTUITIVE", "REFINED", "EVOCATIVE", "TIMELESS", "ETHEREAL", "CINEMATIC", "VIBRANT"];
  const sortedWords = [...ADJECTIVES].sort((a, b) => a.length - b.length);

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

    // 3. The "Loading Bar" Letter Reveal + COLOR CHANGE
    const chars = wordsWrapperRef.current.querySelectorAll('.reveal-char');
    
    // Create a timeline for better control
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bottomSectionRef.current, // Trigger when the bottom section enters
        start: "top 60%",                  // Start transition when top of section is 60% down viewport
        end: "center center",              // End when centered
        scrub: 1,                          // Smooth scrubbing
        toggleActions: "play reverse play reverse", // Ensures it reverses on scroll up
      }
    });

    // A. Animate Background to White
    tl.to(bottomSectionRef.current, {
        backgroundColor: "#ffffff", 
        duration: 10,
        ease: "power2.inOut"
    }, 0); // Start at time 0

    // B. Animate Text Reveal AND Color Change to Black
    tl.to(chars, {
      color: "#000000", // Turn text black
      opacity: 1,       // Reveal text
      stagger: 0.1,     
      ease: "none", 
    }, 0); // Start at time 0 (sync with background)

  }, { scope: containerRef });

  const content = [
    "We are Gallria.",
    "We compose images that artfully",
    "evoke emotion and arrest time itself.",
    "A visual alchemy designed for",
    "the bold, the modern, and",
    "the extraordinary."
  ];

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-centern">

        <div className='w-full h-[200vh] translate-y-[-50%] flex flex-col items-center justify-center' ref={containerRef}>
            
            {/* Top Section Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[50vw] h-[60vh] rounded-full blur-[100px] pointer-events-none" />

            {/* --- TOP HALF (Dark Theme) --- */}
            <div className="relative h-screen flex flex-col items-center justify-center max-w-4xl px-6 text-center">
                
                {/* Small Label with Icon */}
                <div className="flex flex-col items-center gap-4 mb-12">
                    <div className="p-3 rounded-full border border-white backdrop-blur-md">
                        <Aperture className="text-indigo-400 spinner-icon" size={24} />
                    </div>
                    <span className="text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase">
                        The Studio
                    </span>
                </div>

                {/* Masked Headline Text */}
                <div className="space-y-1 md:space-y-3">
                    {content.map((line, index) => (
                        <div key={index} className="overflow-hidden">
                            <h2 
                            ref={addToRefs} 
                            className="text-3xl md:text-4xl lg:text-6xl font-serif text-black tracking-tight leading-tight origin-top-left font-extrabold"
                            >
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

            {/* --- BOTTOM HALF: Color Transition Section --- */}
            {/* Added explicit bg-transparent so GSAP can animate it from transparent/dark to white */}
            <div ref={bottomSectionRef} className='w-full h-[100vh] relative flex flex-col items-start justify-center overflow-hidden bg-white'>
                
                {/* Words Container */}
                <div ref={wordsWrapperRef} className="flex flex-col items-start gap-2 md:gap-4 z-10 px-2 md:px-6 w-full">
                    {sortedWords.map((word, wordIndex) => (
                        <div key={wordIndex} className="flex w-full">
                            {/* Split word into characters */}
                            {word.split('').map((char, charIndex) => (
                                <span 
                                    key={`${wordIndex}-${charIndex}`} 
                                    // Default text is white with low opacity
                                    className="reveal-char text-4xl md:text-5xl xl:text-8xl font-bold tracking-[0.2em] text-white opacity-20 transition-colors"
                                >
                                    {char}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    </section>
  )
}

export default WhoWeAre