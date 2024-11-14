"use client"
import { createContext, useEffect, useState} from "react";
import useMouse from "@react-hook/mouse-position"
import { useRef } from 'react'

import React from 'react';

import Overlay from "./Overlay";


export interface MainContextWrapperType{
    x: string
    overlay: {
        open: boolean,
        index: number;
        item: string
        isVideo?: boolean;
   
    }
    handleOverlay: (obj: MainContextWrapperType["overlay"] , isVideo?: boolean)=>void

    mouseStates:{
        x: number,
        y: number
    }
}


export const ContextMain = createContext<MainContextWrapperType | null>(null)





function ContextWrapper(props: {children: React.ReactNode}) {
 
    const mouseref = useRef(null)
    const mouse = useMouse(mouseref, { enterDelay: 100, leaveDelay: 100 })

    const [overlay, setOverlay] = useState<MainContextWrapperType["overlay"]>({open: false, index: 0, item: ""})
    const handleOverlay = (obj: MainContextWrapperType["overlay"])=>{
        setOverlay(obj)
    }



    return (
       <div className="" ref={mouseref} >
       <ContextMain.Provider value={{x:"Job", mouseStates: {x: mouse.clientX || 0, y: mouse.clientY || 0}, overlay: overlay, handleOverlay: handleOverlay}}>


{overlay.open &&     <div className="fixed z-30 w-full">
   <Overlay closeOverlay={()=>{setOverlay(prev => {return {...prev, open: false}})}} setIsVideoFalse={()=>{setOverlay(prev =>{return {...prev, isVideo: false}})}} obj={overlay} ></Overlay>
 </div>}
       {props.children}
       </ContextMain.Provider>
  
   </div>
    );
}

export default ContextWrapper;