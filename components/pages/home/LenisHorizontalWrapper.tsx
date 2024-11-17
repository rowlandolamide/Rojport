"use client"

import React, { useEffect, useRef, useState } from 'react';
import { ReactLenis } from "@studio-freight/react-lenis";
import { usePathname } from 'next/navigation';
import { useContext } from 'react';
import Lenis from "lenis"
import { cancelFrame, frame , motion} from 'framer-motion';
import { useDragControls } from "framer-motion";


/* import CustomMouse from '@/components/global/CustomMouse'; */
import { ContextMain, MainContextWrapperType } from '@/components/global/ContextWrapper';
interface LenisHorizontalWrapperprops {
    children?: React.ReactNode
    
} 

function LenisHorizontalWrapper(props: LenisHorizontalWrapperprops) {
    const pathname = usePathname()
    const {mouseStates} = useContext(ContextMain) as MainContextWrapperType
    const lenisRef:any = useRef()
    const controls = useDragControls()
    const [majorX, setMajorX] = useState(0)
    useEffect(() => {
 
      function update(time) {
        console.log(time)
        lenisRef.current?.lenis?.raf(time)
      }
      

   /*    frame.update(update, true) */

      const rafId = requestAnimationFrame(update)
  
      return () => cancelAnimationFrame(rafId)
  
      return () => cancelFrame(update)
    }, [])
    return (
     <div>
    <motion.div style={{zIndex:999}} className=" bg-bl h-8 w-8
fixed z-50 hover:bg-blue-700 text-[16px] top-[60px] leading-[16px]" drag={"x"}    dragConstraints={{
right: 200,
  left: 0,

}} onDrag={(e, i)=>{
  const rightValue = ()=>{
 
   return i.offset.x > 200 ? 200:  i.offset.x
  }
  console.log(i.offset.x)
  lenisRef.current?.lenis?.scrollTo(rightValue())

}} dragControls={controls}   >experimental cursor <span className="text-red-500">{Math.abs(majorX)}</span></motion.div>
           <ReactLenis root 
           ref={lenisRef}
           autoRaf={true}


        options={{ orientation: pathname === "/" ? "horizontal": "vertical", gestureOrientation: "both", }}>
   

  {props.children} 
       
        </ReactLenis> 
     </div>
    );
}


export default LenisHorizontalWrapper

/* export default function LenisHorizontalWrapp(props: LenisHorizontalWrapperprops){
    useEffect(()=>{
        const lenis = new Lenis();

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  console.log(e);
});

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
        
    },[])
    return  <div>
{props.children}
    </div>
} */

/*             <div  className={` h-screen  static w-full `} >
           <div  className="h-8 w-8 fixed top-2 left-8 z-50">
            
            <CustomMouse x={mouseStates.x || 0} y={mouseStates.y|| 0}></CustomMouse>
            </div> 

            {props.children} 
            </div> */


     