import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const leftBoxesRef = useRef([]);
  const rightBoxesRef = useRef([]);

  // Helper to push refs to array
  const addToLeftRefs = (el) => { if (el && !leftBoxesRef.current.includes(el)) leftBoxesRef.current.push(el); };
  const addToRightRefs = (el) => { if (el && !rightBoxesRef.current.includes(el)) rightBoxesRef.current.push(el); };

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true, // Links animation to scroll progress
      }
    });

    // 1. ANIMATE LEFT SIDE (Slide Right -> Into Center)
    // We reverse the array so we process from Outer -> Inner, 
    // but usually, simpler math is just index-based.
    leftBoxesRef.current.forEach((box, i) => {
        // Calculate distance from center (the last item is closest to center)
        // i = 0 is the furthest left box.
        const distFromCenter = leftBoxesRef.current.length - 1 - i;
        
        gsap.to(box, {
            // Move Right. 40% (2/5) overlap per box distance
            xPercent: 60 * distFromCenter, 
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });
    });

    // 2. ANIMATE RIGHT SIDE (Slide Left <- Into Center)
    rightBoxesRef.current.forEach((box, i) => {
        // i = 0 is the closest to center.
        // i = length-1 is the furthest right.
        const distFromCenter = i;

        gsap.to(box, {
            // Move Left (negative). 
            xPercent: -60 * distFromCenter, 
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true
            }
        });
    });

  }, { scope: sectionRef });

  // Generate Dummy Boxes
  const BOX_COUNT = 6; 
  const boxes = Array.from({ length: BOX_COUNT });

  return (
    <section ref={sectionRef} className='w-full h-[200vh] relative bg-zinc-50'>
        
        {/* STICKY CONTAINER: Keeps the content in view while we scroll/animate */}
        <div className='w-full h-screen sticky top-40 bg-white overflow-hidden flex items-center justify-center'>
            
            {/* MAIN CONTENT WRAPPER */}
            <div className='relative w-full h-[15vh] md:h-[30vh] flex'>
                
                {/* --- LEFT SIDE --- */}
                {/* justify-end pushes items towards the center line */}
                <div className='w-[50%] h-full bg-transparent flex justify-end pr-0'>
                    {boxes.map((_, i) => (
                        <div 
                            key={`left-${i}`}
                            ref={addToLeftRefs}
                            className='h-full aspect-[1.5/2] bg-amber-600 border-[1px] border-white flex-shrink-0'
                            style={{ 
                                // Higher Z-Index for items closer to center (last items in this flex list)
                                // This ensures outer items slide BEHIND inner items
                                zIndex: i,
                                backgroundImage: `url(src/assets/HeroAssets/${i+1}.jpg)`,
                                backgroundSize: 'cover'
                            }}
                        />
                    ))}
                </div>

                {/* --- RIGHT SIDE --- */}
                {/* justify-start pushes items towards the center line */}
                <div className='w-[50%] h-full bg-transparent flex justify-start pl-0'>
                    {boxes.map((_, i) => (
                        <div 
                            key={`right-${i}`}
                            ref={addToRightRefs}
                            className='h-full aspect-[1.5/2] bg-amber-800 border-[1px] border-white flex-shrink-0'
                            style={{ 
                                // Higher Z-Index for items closer to center (first items in this flex list)
                                zIndex: BOX_COUNT - i,
                                backgroundImage: `url(src/assets/HeroAssets/${i+7}.jpg)`,
                                backgroundSize: 'cover'
                            }}
                        />
                    ))}
                </div>

            </div>
        </div>

    </section>
  )
}

export default Hero