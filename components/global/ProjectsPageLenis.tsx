"use client"
import { ReactLenis } from "@studio-freight/react-lenis";


import React, { useState } from 'react';


ProjectsPageLenis.propTypes = {
    
};

function ProjectsPageLenis(props: {children: React.ReactNode}) {
    const [load, setLoad] = useState(false)
    return (
 load ?        <ReactLenis root
 options={{ orientation:  "vertical", gestureOrientation: "both" }}>

{props.children}


 </ReactLenis>: <></>
    );
}

export default ProjectsPageLenis;