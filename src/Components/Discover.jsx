import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Discover = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imagesRef = useRef([]);

  // Push refs into array
  const addToRefs = (el) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el);
    }
  };

  useGSAP(() => {
    // Parallax Effect for Images
    imagesRef.current.forEach((img, i) => {
        // Random speed for natural "floating" feel
        const speed = -15 - Math.random() * 25; 
        
        gsap.to(img, {
            yPercent: speed * 8, // Increased multiplier for the longer container
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            }
        });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className='relative w-full h-[150vh] lg:h-[300vh] bg-white overflow-hidden'>
        
        {/* 1. STICKY TEXT CONTAINER */}
        <div className="sticky top-[25%] left-0 w-full h-screen flex items-center justify-center z-40 pointer-events-none">
            <p 
                ref={textRef}
                className="text-[10vw] leading-[0.85] font-serif font-bold text-center text-black mix-blend-difference uppercase tracking-tighter"
            >
                Refined<br/>
                Storytelling<br/>
                With An<br/>
                Editorial Edge
            </p>
        </div>

        {/* 2. IMAGES CONTAINER */}
        <div className="absolute inset-0 w-full h-full z-10">
            
            {/* --- UPPER GROUP (4 Images) --- */}
            
            {/* 1. Top Left (Floating off edge) */}
            <div 
                ref={addToRefs}
                className="absolute top-[20%] left-[-5%] w-[40vw] md:w-[25vw] aspect-[2/3] bg-zinc-300 opacity-90"
            />
            
            {/* 2. Top Right (High up) */}
            <div 
                ref={addToRefs}
                className="absolute top-[15%] right-[2%] w-[35vw] md:w-[22vw] aspect-[2/3] bg-zinc-400 opacity-80"
            />

            {/* 3. Upper Mid Left (Spaced down) */}
            <div 
                className="absolute top-[20%] left-[15%] w-[30vw] md:w-[20vw] aspect-[2/3] bg-zinc-600 opacity-90"
            />

            {/* 4. Upper Mid Right (Spaced down & pushed center) */}
            <div 
                ref={addToRefs}
                className="absolute top-[28%] right-[15%] w-[38vw] md:w-[28vw] aspect-[2/3] bg-zinc-300 opacity-85"
            />


            {/* --- LOWER GROUP (3 Images) --- */}

            {/* 5. Lower Left (Wide gap from top group) */}
            <div 
                ref={addToRefs}
                className="absolute top-[55%] left-[5%] w-[35vw] md:w-[24vw] aspect-[2/3] bg-zinc-400 opacity-90"
            />

            {/* 6. Lower Center/Right (The new 7th image) */}
            <div 
                ref={addToRefs}
                className="absolute top-[65%] left-[45%] w-[28vw] md:w-[20vw] aspect-[2/3] bg-zinc-300 opacity-85 z-20"
            />

            {/* 7. Bottom Right (Anchor) */}
            <div 
                className="absolute top-[50%] right-[5%] w-[40vw] md:w-[26vw] aspect-[2/3] bg-zinc-500 opacity-80"
            />
            <div 
                ref={addToRefs}
                className="absolute bottom-[0%] left-[60%] w-[40vw] md:w-[24vw] aspect-[2/3] bg-zinc-200 opacity-80"
            />
            <div 
                ref={addToRefs}
                className="absolute bottom-[5%] left-[5%] w-[40vw] md:w-[20vw] aspect-[2/3] bg-zinc-200 opacity-80"
            />
            <div 
                ref={addToRefs}
                className="absolute bottom-[0%] left-[30%] w-[40vw] md:w-[20vw] aspect-[2/3] bg-zinc-200 opacity-80"
            />

        </div>
    </section>
  )
}

export default Discover