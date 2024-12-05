"use client"

import React, { ReactNode,  useEffect, } from 'react';
import { ReactLenis ,} from "@studio-freight/react-lenis";
import { usePathname ,  } from 'next/navigation';

import { useContext } from 'react';

import useMediaQuery from '@/components/hooks/useMediaQuery';
import { motion} from 'framer-motion';
import { useDragControls } from "framer-motion";
import useRefWithCallback from "@/components/hooks/useRerenderCallback";

/* import CustomMouse from '@/components/global/CustomMouse'; */
import { ContextMain, MainContextWrapperType } from '@/components/global/ContextWrapper';






export default function LenisHorizontalWrapperAlt(props: {children: ReactNode}){


  /* New callback */
  
  const [lenisRef, setLenisRef] = React.useState<any>()
  const lenisRefCall:any = React.useCallback((node) => {

    if(node){
      setLenisRef(node)
    }
  }, [])
  /* End */

  /* State useRef with useCallbackHook */
const [toggle, refCallback, myRef] = useRefWithCallback<HTMLSpanElement>();
//const lenisRef:any = useRef()
/* End */

  /* Hooks */
  const pathname = usePathname()
  const {x} = useMediaQuery()
  const { setLenisCurrent} = useContext(ContextMain) as MainContextWrapperType
  
  /* End */

  /* Framer motion Draggable init */
  const controls = useDragControls()
  /* End */

  
  /* Global pathname variables */
  const isHome = pathname === "/"
  const isProjects = pathname.includes("projects")
  const isAbout = pathname === "/about"
  const isLaptop = x > 1279
  /* End */


  /* Lenis isHorizontal Variable */
  const isHorizontal = ()=>{
    if(isHome){
      
      return isLaptop
    }
    else if(isProjects){
      return false
    }else if(isAbout){
      return isLaptop
    }else return true
  }
/* End */




/* Set lenisCurrent is Global Context that is Used in GSAPhorizontal wrapper */
useEffect(()=>{
  if(!lenisRef) return

  setLenisCurrent(lenisRef.lenis)
}, [toggle, x, lenisRef,setLenisCurrent ])
/* End */

  
  return  <div  ref={refCallback}>
  <motion.div  animate={{x: 400 }} style={{zIndex:999}}   dragElastic={true}  className=" bg-bl hidden h-8 w-8
fixed z-50 hover:bg-blue-700 text-[16px] top-[60px] leading-[16px]" drag={"x"}    dragConstraints={{
right: 400,
left: 0,

}} onDrag={(e, i)=>{
if(!lenisRef.current) return
const rightValue = ()=>{

 return i.offset.x > 400 ? 400:  i.offset.x
}

lenisRef.current?.lenis?.stop()

lenisRef.current?.lenis?.start()





}} dragControls={controls}   >experimental cursor <span className="text-red-500">{Math.abs(400 )}</span></motion.div>
<div className=''>   <ReactLenis    root
    ref={lenisRefCall}
    



 options={{autoResize: true, orientation:  isHorizontal() ? "horizontal": "vertical", syncTouch: true, gestureOrientation: "both",  lerp: 0.4}}>


{props.children} 

 </ReactLenis> </div>


   </div>

}

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


     