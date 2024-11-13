"use client"
import { ReactLenis } from "@studio-freight/react-lenis";


import React from 'react';


ProjectsPageLenis.propTypes = {
    
};

function ProjectsPageLenis(props: {children: React.ReactNode}) {
    return (
        <ReactLenis root
        options={{ orientation:  "vertical", gestureOrientation: "both" }}>
   
{props.children}

       
        </ReactLenis>
    );
}

export default ProjectsPageLenis;