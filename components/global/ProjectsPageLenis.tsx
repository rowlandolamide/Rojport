"use client"
import { ReactLenis } from "@studio-freight/react-lenis";


import React, { useEffect, useState } from 'react';


ProjectsPageLenis.propTypes = {
    
};

function ProjectsPageLenis(props: {children: React.ReactNode}) {
  
    const [load, setLoad] = useState(false)
    useEffect(()=>{
        setLoad(true)
    }, [])
    return (
 load ?        <ReactLenis root
 options={{ orientation:  "horizontal", gestureOrientation: "both" }}>

{props.children}


 </ReactLenis>: <>{props.children}</>
    );
}

export default ProjectsPageLenis;