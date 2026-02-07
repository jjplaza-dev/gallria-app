import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    { id: 1, title: "Project One", bg: "bg-green-300", text: "text-green-900", url: "src/assets/HeroAssets/1.jpg" },
    { id: 2, title: "Project Two", bg: "bg-blue-300", text: "text-blue-900", url: "src/assets/HeroAssets/2.jpg" },
    { id: 3, title: "Project Three", bg: "bg-purple-300", text: "text-purple-900", url: "src/assets/HeroAssets/3.jpg" },
    { id: 4, title: "Project Four", bg: "bg-red-300", text: "text-red-900", url: "src/assets/HeroAssets/4.jpg" },
];

const ProjectsPreview = () => {
    const parentRef = useRef(null);

    useGSAP(() => {
        // 1. Select all the sticky wrappers (the '.sticky-card' class added below)
        const cards = gsap.utils.toArray('.sticky-card');

        // 2. Loop through each card to assign its own ScrollTrigger
        cards.forEach((card) => {
            // Find the inner container (the colored box) inside this specific card
            const inner = card.querySelector('.project-container');

            gsap.to(inner, {
                scale: 0.90,       
                borderRadius: "8px", 
                ease: "none",      
                scrollTrigger: {
                    trigger: card,     // Each card triggers its own animation
                    start: "top bottom",  // Start when the card hits the top (becomes sticky)
                    end: "+=100%", // End when the card's bottom hits the top (is fully scrolled past)
                    scrub: true,       
                }
            });
        });
    }, { scope: parentRef });

    return (
        <section ref={parentRef} className='w-full relative bg-white'>
            
            {PROJECTS.map((project, index) => (
                <div key={project.id} className='sticky-card w-screen h-screen sticky top-0 flex justify-center items-center overflow-hidden'>

                    <div className={`project-container w-full h-full ${project.bg} overflow-hidden flex flex-col md:flex-row items-center justify-center`}>
                        <div className='image-box w-auto h-full max-sm:w-full max-lg:max-w-[425px] bg-amber-600 aspect-[1/1.5]' style={{backgroundImage: `url(${project.url})`}}></div>
                        <div className='info-box w-full h-full bg-amber-700'>TITLE / INFO</div>                   
                    </div>

                </div>
            ))}

        </section>
    )
}

export default ProjectsPreview