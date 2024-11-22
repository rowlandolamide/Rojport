"use client"

import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ReactLenis , useLenis} from "@studio-freight/react-lenis";
import { usePathname , useRouter, } from 'next/navigation';

import { useContext } from 'react';
import Lenis from "lenis"
import useMediaQuery from '@/components/hooks/useMediaQuery';
import { cancelFrame, frame , motion} from 'framer-motion';
import { useDragControls } from "framer-motion";
import useRefWithCallback from "@/components/hooks/useRerenderCallback";

/* import CustomMouse from '@/components/global/CustomMouse'; */
import { ContextMain, MainContextWrapperType } from '@/components/global/ContextWrapper';
interface LenisHorizontalWrapperprops {
    children?: React.ReactNode
    
} 

const ReturnDisplay = (props: {children: ReactNode, isVertical: boolean, ref: any})=>{

  return     <ReactLenis root 
  ref={props.ref}



options={{ orientation: !props.isVertical ? "horizontal": "vertical", gestureOrientation: "both", }}>


{props.children} 

</ReactLenis> 

}

function LenisHorizontalWrapper(props: LenisHorizontalWrapperprops) {
    const pathname = usePathname()
    const { setLenisCurrent} = useContext(ContextMain) as MainContextWrapperType
    const lenisRef:any = useRef()
   
    const controls = useDragControls()
    const [majorX, setMajorX] = useState(0)
    const {x, otherStuff} = useMediaQuery()
    const router = useRouter()
   
    
  

    const isHome = pathname === "/"
    const isProjects = pathname.includes("projects")
    const isAbout = pathname === "/about"
    const isLaptop = x > 1279

    

    const isHorizontal = ()=>{
      if(isHome){
        console.log("ran home")
        return isLaptop
      }
      else if(isProjects){
        return false
      }else if(isAbout){
        return isLaptop
      }else return true
    }


    const ReturnDisplayForPage = (props: {children: ReactNode}, i)=>{
      if(isProjects){
        
          return <ReturnDisplay key={i} ref={lenisRef} children={props.children} isVertical={false}></ReturnDisplay>}
      else return <>{props.children}</>
    }

  
  


const [, updateState] = React.useState<any>();
const [run, setRun] = useState(false)
const forceUpdate = React.useCallback(() => {updateState({})}, []);





/* Lenis Raw Js */
const lenis = new Lenis({prevent: (node)=>node.classList.contains('Js-lenis')})
useEffect(()=>{


lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
}, [])

/* End */


useEffect(()=>{
 
  
  setRun(prev => true)
  setTimeout(()=> forceUpdate(), 300)
  setTimeout(()=> {
    console.log("ran force update")
    forceUpdate()
  }, 3000)
  
  router.refresh()

  lenisRef.current?.lenis?.stop()
lenisRef.current?.lenis?.start() 

}, [pathname , router, isHorizontal(), run, x, otherStuff])

useEffect(()=>
  {
    console.log("x")
    forceUpdate()}, [x, pathname, lenisRef.current, isHorizontal(), isAbout])
    useEffect(() => {
      if(!lenisRef.current) return
 
      function update(time) {
        console.log(time)
        lenisRef.current?.lenis?.raf(time)
      }
      
    setLenisCurrent(lenisRef.current?.lenis)

   /*    frame.update(update, true) */

      const rafId = requestAnimationFrame(update)
  
      return () => cancelAnimationFrame(rafId)
  
      return () => cancelFrame(update)
    }, [])

    
    return (
     <div >
    <motion.div animate={{x: 400 }} style={{zIndex:999}}   dragElastic={run ? false: true}  className=" bg-bl h-8 w-8
fixed z-50 hover:bg-blue-700 text-[16px] top-[60px] leading-[16px]" drag={"x"}    dragConstraints={{
right: 400,
  left: 0,

}} onDrag={(e, i)=>{
  if(!lenisRef.current) return
  const rightValue = ()=>{
 
   return i.offset.x > 400 ? 400:  i.offset.x
  }
  console.log(i.offset.x)
  
lenisRef.current?.lenis?.stop()
setMajorX(rightValue())
lenisRef.current?.lenis?.start()





}} dragControls={controls}   >experimental cursor <span className="text-red-500">{Math.abs(400 )}</span></motion.div>
  <div className=''>   <ReactLenis  root
      ref={lenisRef}



   options={{ orientation:  isHorizontal() ? "horizontal": "vertical", gestureOrientation: "both",  }}>


{props.children} 
  
   </ReactLenis> </div>
  

     </div>
    );
}

/* 
export default LenisHorizontalWrapper */


export default function LenisHorizontalWrapperAlt(props: {children: ReactNode}){


  /* State useRef with useCallbackHook */
const [toggle, refCallback, myRef] = useRefWithCallback<HTMLSpanElement>();
const lenisRef:any = useRef()
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
      console.log("ran home")
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
  
  if(!lenisRef.current) return
  console.log("sd",lenisRef.current)
  setLenisCurrent(lenisRef.current?.lenis)
}, [lenisRef.current])
/* End */

  
  return  <div >
  <motion.div animate={{x: 400 }} style={{zIndex:999}}   dragElastic={true}  className=" bg-bl hidden h-8 w-8
fixed z-50 hover:bg-blue-700 text-[16px] top-[60px] leading-[16px]" drag={"x"}    dragConstraints={{
right: 400,
left: 0,

}} onDrag={(e, i)=>{
if(!lenisRef.current) return
const rightValue = ()=>{

 return i.offset.x > 400 ? 400:  i.offset.x
}
console.log(i.offset.x)

lenisRef.current?.lenis?.stop()

lenisRef.current?.lenis?.start()





}} dragControls={controls}   >experimental cursor <span className="text-red-500">{Math.abs(400 )}</span></motion.div>
<div className=''>   <ReactLenis  root
    ref={lenisRef}



 options={{ orientation:  isHorizontal() ? "horizontal": "vertical", gestureOrientation: "both",  }}>


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


     