"use client"
import { ReactLenis } from "@studio-freight/react-lenis";


import React, { useEffect, useState } from 'react';


ProjectsPageLenis.propTypes = {
    
};

function ProjectsPageLenis(props: {children: React.ReactNode}) {
    const lenisOptions = {
        lerp: 0.1,         // Controls how smooth the scrolling is
        duration: 1.5,     // Slows down or speeds up the scrolling
        smoothTouch: false, // Disable smooth scroll on touch devices
        smooth: true,      // Smooth scroll for desktop (obviously)
      };
    const [load, setLoad] = useState(false)
    useEffect(()=>{
        setLoad(true)
    }, [])
    return (
      <ReactLenis 
 options={lenisOptions}>

{props.children}


 </ReactLenis>
    );
}

export default ProjectsPageLenis;