"use client"
import { createContext,  useState} from "react";
import useMouse from "@react-hook/mouse-position"
import { useRef } from 'react'
import { useCallback } from "react";
import React from 'react';

import Overlay from "./Overlay";


export interface MainContextWrapperType{
    x: string
    overlay: {
        open: boolean,
        index: number;
        item: string
        isVideo?: boolean;
        videoTitle: string
   
    }
    handleOverlay: (obj: MainContextWrapperType["overlay"] , isVideo?: boolean)=>void,
    closeOverlay: ()=> void,
    setVideoTitle: (videoTitle: string)=>void,

    mouseStates:{
        x: number,
        y: number
    }

    lenisCurrent: any
    setLenisCurrent: (current: any)=> void
}


export const ContextMain = createContext<MainContextWrapperType | null>(null)

function ContextWrapper({children}: {children: React.ReactNode}) {
    
    const mouseref = useRef(null)
    const [lenisCurrent, setLenisCurrent] = useState(null)
    const mouse = useMouse(mouseref, { enterDelay: 100, leaveDelay: 100 })

    

    const [overlay, setOverlay] = useState<MainContextWrapperType["overlay"]>({open: false, index: 0, item: "", videoTitle: ""})
    const handleOverlay = useCallback((obj: MainContextWrapperType["overlay"])=>{
        setOverlay(obj)
    }, [])

    const setVideoTitle = useCallback((videoTitle: string)=>{
        setOverlay(prev => ({...prev, videoTitle}))
    }, [])

    const setLenis = useCallback((current: any)=>{
        setLenisCurrent(current)
    }, [])

    const closeOverlay = useCallback(()=>{
        setOverlay(prev => ({...prev, open: false}))
    }, [])


    return (
       <div className="relative" ref={mouseref} >
         <div style={{zIndex: 1000}} className="fixed z-50">

</div>
       <ContextMain.Provider value={{x:"Job", setVideoTitle: setVideoTitle, closeOverlay, lenisCurrent, setLenisCurrent: setLenis, mouseStates: {x: mouse.clientX || 0, y: mouse.clientY || 0}, overlay: overlay, handleOverlay: handleOverlay}}>

{overlay.open &&     <div style={{zIndex: 99}} className="fixed z-30 w-full ">
   <Overlay closeOverlay={()=>{setOverlay(prev => {return {...prev, open: false}})}} setIsVideoFalse={()=>{setOverlay(prev =>{return {...prev, isVideo: false}})}} obj={overlay} ></Overlay>
 </div>}
       {children}
 
       </ContextMain.Provider>
  
   </div>
    );
}

export default ContextWrapper;