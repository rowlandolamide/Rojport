"use client"
import { createContext,  useState} from "react";
import useMouse from "@react-hook/mouse-position"
import { useRef } from 'react'
import CustomMouse from "./CustomMouse";
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

    lenisCurrent: any
    setLenisCurrent: (current: any)=> void
}


export const ContextMain = createContext<MainContextWrapperType | null>(null)





function ContextWrapper(props: {children: React.ReactNode}) {
    
    const mouseref = useRef(null)
    const [lenisCurrent, setLenisCurrent] = useState(null)
    const mouse = useMouse(mouseref, { enterDelay: 100, leaveDelay: 100 })

    

    const [overlay, setOverlay] = useState<MainContextWrapperType["overlay"]>({open: false, index: 0, item: ""})
    const handleOverlay = (obj: MainContextWrapperType["overlay"])=>{
        setOverlay(obj)
    }

    const setLenis = (current: any)=>{
        setLenisCurrent(current)
    }


    return (
       <div className="relative" ref={mouseref} >
         <div className="fixed z-50">
<CustomMouse x={mouse.clientX ? mouse.clientX +2 : 0} y={mouse.clientY ? mouse.clientY + 2: 0}></CustomMouse>

</div>
       <ContextMain.Provider value={{x:"Job", lenisCurrent, setLenisCurrent: setLenis, mouseStates: {x: mouse.clientX || 0, y: mouse.clientY || 0}, overlay: overlay, handleOverlay: handleOverlay}}>

{overlay.open &&     <div className="fixed z-50 w-full hidden ">
   <Overlay closeOverlay={()=>{setOverlay(prev => {return {...prev, open: false}})}} setIsVideoFalse={()=>{setOverlay(prev =>{return {...prev, isVideo: false}})}} obj={overlay} ></Overlay>
 </div>}
       {props.children}
 
       </ContextMain.Provider>
  
   </div>
    );
}

export default ContextWrapper;