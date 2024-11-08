"use client"
import { createContext, useState, useContext } from "react";
import useMouse from "@react-hook/mouse-position"
import { useRef } from 'react'
import CustomMouse from '@/components/global/CustomMouse'
import { usePathname } from "next/navigation";
import React from 'react';
import { Suspense } from "react";
import Overlay from "./Overlay";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface MainContextWrapperType{
    x: string
    overlay: {
        open: boolean,
        index: number;
        item: string
    }
    handleOverlay: (obj: MainContextWrapperType["overlay"] )=>void

    mouseStates:{
        x: number,
        y: number
    }
}


export const ContextMain = createContext<MainContextWrapperType | null>(null)


function FrozenRouter(props: { children: React.ReactNode }) {
    const context = useContext(LayoutRouterContext ?? {});
    const frozen = useRef(context).current;
    if (!frozen) {
        return <>{props.children}</>;
      }
    return (
      <LayoutRouterContext.Provider value={frozen}>
        {props.children}
      </LayoutRouterContext.Provider>
    );
  }
  


function ContextWrapper(props: {children: React.ReactNode}) {
    const ref = useRef(null)
    const mouse = useMouse(ref, { enterDelay: 100, leaveDelay: 100 })
    const [mouseStates, setMouseStates] = useState({x: 0, y: 0})
    const [overlay, setOverlay] = useState<MainContextWrapperType["overlay"]>({open: false, index: 0, item: ""})
    const handleOverlay = (obj: MainContextWrapperType["overlay"])=>{
        setOverlay(obj)
    }



    const key = usePathname();

    const variants = {
        hidden: { opacity: 0, x: -200, y: 100 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -100 },
      };
      

    return (
        <div ref={ref} >
            <ContextMain.Provider value={{x:"Job", mouseStates: {x: mouse.clientX || 0, y: mouse.clientY || 0}, overlay: overlay, handleOverlay: handleOverlay}}>
{/* <AnimatePresence  mode="popLayout" >
<motion.div   
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants} transition={{type: "linear"}}  key={key}>
            
<FrozenRouter>
{overlay.open &&     <div className="fixed z-30 w-full">
        <Overlay obj={overlay} ></Overlay>
      </div>}
            {props.children}
</FrozenRouter>
</motion.div>
</AnimatePresence> */}

{overlay.open &&     <div className="fixed z-30 w-full">
        <Overlay obj={overlay} ></Overlay>
      </div>}
            {props.children}
            </ContextMain.Provider>
       
        </div>
    );
}

export default ContextWrapper;