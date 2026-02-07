import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function NavBar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body, // Track the whole page scroll
        start: "top top",       // Start immediately
        end: "200vh top",       // Finish animation when we've scrolled 2 viewport height
        scrub: 1,               // Smoothly link animation to scrollbar
      }
    });

    // 1. Animate Logo to Upper Left
    tl.to(logoRef.current, {
      top: "0.5rem",   // Matches 'top-3 md:top-5' approx (adjust if needed)
      left: "-0.5rem",    // Matches 'left-3 md:left-5'
      xPercent: 0,     // Remove the -50% centering transform
      yPercent: 0,     // Remove the -50% centering transform
      scale: 0.5,      // Shrink to scale-50
      translateX: "0",
      ease: "power2.in" // Slight ease for natural feel
    }, 0); // The '0' ensures this happens simultaneously with other anims

    // 2. Animate Menu to Top Right
    tl.to(menuRef.current, {
      top: "4vh",    // Align vertically with logo  
      right: "2rem",    // Move to right side
      translateX: "0",
      xPercent: 0,      // Remove center transform
      ease: "power1.in"
    }, 0);

  }, { scope: navRef });

  return (
    // Added 'pointer-events-none' to nav container so it doesn't block clicks 
    // on the page content, then re-enable pointer-events on buttons/text.
    <nav ref={navRef} className="w-full h-full fixed top-0 z-50 pointer-events-none">
      
      {/* Corners (Static Decoration) */}
      <div className='w-[20%] md:w-[12%] lg:w-[8%] xl:w-[5%] aspect-square absolute top-3 md:top-5 right-3 md:right-5 border-t-[5px] border-r-[5px] pointer-events-auto'></div>
      <div className='w-[20%] md:w-[12%] lg:w-[8%] xl:w-[5%] aspect-square absolute top-3 md:top-5 left-3 md:left-5 border-t-[5px] border-l-[5px] pointer-events-auto'></div>
      <div className='w-[20%] md:w-[12%] lg:w-[8%] xl:w-[5%] aspect-square absolute bottom-3 md:bottom-5 left-3 md:left-5 border-b-[5px] border-l-[5px] pointer-events-auto'></div>
      <div className='w-[20%] md:w-[12%] lg:w-[8%] xl:w-[5%] aspect-square absolute bottom-3 md:bottom-5 right-3 md:right-5 border-b-[5px] border-r-[5px] pointer-events-auto'></div>
          
      <div className='w-full h-full relative'>
        {/* MENU BUTTON */}
        {/* Initial State: top-10, left-1/2, -translate-x-1/2 */}
        <button 
            ref={menuRef}
            className='w-fit h-fit px-0 xl:px-4 absolute font-bold tracking-widest top-10 right-1/2 translate-x-1/2 pointer-events-auto hover:text-zinc-500 transition-colors z-50 mix-blend-difference text-black'
        >
            <h3>MENU</h3>
        </button>

        {/* GALLRIA LOGO */}
        {/* Initial State: top-1/2, left-1/2, -translate-x-1/2, -translate-y-1/2 */}
        {/* Added 'origin-top-left' to help the scaling happen naturally if needed, though GSAP handles it well */}
        <h1 
            ref={logoRef}
            className='absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.8] md:scale-[2.4] xl:scale-[3] yesteryear-regular pointer-events-auto mix-blend-difference text-black whitespace-nowrap'
        >
            Gallria
        </h1>
        
      </div>
        
    </nav>
  );
}