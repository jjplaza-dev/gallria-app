import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Copyright, Instagram, Twitter, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const containerRef = useRef(null);
  const bigTextRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    // 1. Parallax Effect for the Giant Text
    // It moves slightly slower than the scroll, creating depth
    gsap.fromTo(bigTextRef.current, 
      { yPercent: 50, opacity: 0.5 }, 
      {
        yPercent: 0,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Start when footer hits bottom of viewport
          end: "bottom bottom", // End when footer is fully visible
          scrub: 1,
        }
      }
    );

    // 2. Staggered reveal for the columns
    gsap.from(".footer-col", {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

  }, { scope: containerRef });

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={containerRef} 
      className="relative w-full bg-zinc-950 text-zinc-300 overflow-hidden pt-32 pb-10 px-6 md:px-12 border-t border-white/10"
    >
        
        {/* --- TOP SECTION: CTA & GRID --- */}
        <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-20 md:gap-0 mb-32">
            
            {/* Left: Call to Action */}
            <div className="md:w-1/2 flex flex-col gap-8 footer-col">
                <h3 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                    Have an idea? <br />
                    Let's create <span className="text-indigo-400 italic">history</span>.
                </h3>
                <button className="group flex items-center gap-3 text-lg font-medium text-white w-max hover:text-indigo-400 transition-colors">
                    <span className="border-b border-white/30 group-hover:border-indigo-400 pb-1">Start a Project</span>
                    <ArrowUpRight size={20} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </div>

            {/* Right: Formal Links Grid */}
            <div className="md:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-4">
                
                {/* Column 1: Explore */}
                <div className="flex flex-col gap-4 footer-col">
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">Sitemap</h4>
                    <a href="#" className="hover:text-white transition-colors">Works</a>
                    <a href="#" className="hover:text-white transition-colors">Studio</a>
                    <a href="#" className="hover:text-white transition-colors">News</a>
                    <a href="#" className="hover:text-white transition-colors">Services</a>
                </div>

                {/* Column 2: Socials */}
                <div className="flex flex-col gap-4 footer-col">
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">Socials</h4>
                    <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Instagram size={16}/> Instagram</a>
                    <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Twitter size={16}/> Twitter</a>
                    <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Linkedin size={16}/> LinkedIn</a>
                </div>

                {/* Column 3: Legal/Info */}
                <div className="flex flex-col gap-4 footer-col">
                    <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">Legal</h4>
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
                    <button onClick={handleScrollTop} className="mt-4 text-xs font-mono border border-white/20 rounded-full px-4 py-2 hover:bg-white hover:text-black transition-all text-left w-max">
                        BACK TO TOP ↑
                    </button>
                </div>

            </div>
        </div>

        {/* --- BOTTOM SECTION: MASSIVE BRANDING --- */}
        <div className="relative w-full border-t border-white/10 pt-10 flex flex-col items-center">
            
            {/* Meta Data Row */}
            <div className="w-full max-w-7xl mx-auto flex justify-between items-center text-[10px] md:text-xs font-mono uppercase text-zinc-600 mb-4 md:mb-0 footer-col">
                <div className="flex items-center gap-1">
                    <Copyright size={12} /> 2026 Gallria Studio.
                </div>
            </div>

            {/* THE GIANT TEXT */}
            <div className="overflow-hidden w-full flex justify-center mt-4 md:mt-0">
                <h1 
                    ref={bigTextRef}
                    className="text-[18vw] md:text-[22vw] leading-[0.8] font-serif font-bold text-transparent stroke-text select-none pointer-events-none"
                    style={{ 
                        WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text'
                    }}
                >
                    GALLRIA
                </h1>
            </div>
        </div>

        {/* Optional: Vignette for depth */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/20 pointer-events-none" />
    </footer>
  )
}

export default Footer