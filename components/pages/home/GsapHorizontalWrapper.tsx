"use client"
import {gsap} from "gsap"
import React, { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import Smile from "../../../app/public/Icons/Smile Icon.svg"
import { ReactLenis , useLenis} from "@studio-freight/react-lenis";
import SunIcon from "../../../app/public/Icons/Sun Icon.svg"
import {horizontalLoop} from "./HorizontalLoop"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDragControls } from "framer-motion";
import Observer from "gsap/dist/Observer";
import {motion} from "framer-motion"
import dynamic from "next/dynamic";
import useMediaQuery from "@/components/hooks/useMediaQuery";
import useRefWithCallback from "@/components/hooks/useRerenderCallback";
import { useCallback } from "react";
import ProjectCard from "./ProjectCard";
import { Draggable } from "gsap/Draggable";
import {ContextMain, MainContextWrapperType} from "@/components/global/ContextWrapper";
const IPadHorizontalScroll = dynamic(()=>import("@/components/global/IPadHorizontalScroll"))
import { urlForImage } from "@/sanity/lib/utils";

import type { HomePagePayload } from "@/types";




GsapHorizontalWrapper.propTypes = {
    
};

gsap.registerPlugin(Observer)
gsap.registerPlugin(ScrollTrigger, Draggable)

const useGsapContext = (scope) => {
    const ctx = useMemo(() => gsap.context(() => {}, scope), [scope]);
    return ctx;
  };

function GsapHorizontalWrapper({data}: {data: HomePagePayload | null}) {
    const ref = useRef(null);
    const ctx = useGsapContext(ref);
   
    const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

    const modifiedData  = data?.showcaseProjects?.map((item)=>{
        const imgUrl = item.coverImage ? urlForImage(item.coverImage)?.quality(50)?.format("webp")?.url() : ""
        return {title: item.title, img: item.coverImage, imgUrl: imgUrl,  isProject: true, slug: item.slug}
    })




    useIsomorphicLayoutEffect(() => {
        ctx.add(() => {
          const evenLoop = horizontalLoop(".cards section", {
            repeat: -1,
            
  draggable: false, // make it draggable
  center: true,
  
          });


          let evenSlow = gsap.to(evenLoop, { timeScale: 0 });
      
          evenLoop.timeScale(0);
        
    
          ScrollTrigger.clearScrollMemory();
          window.history.scrollRestoration = 'manual';
    
          ScrollTrigger.observe({
            wheelSpeed: 0.2,
            type: 'pointer,touch,wheel,scroll',
            onChange: (self) => {
              ScrollTrigger.clearScrollMemory();
    
              evenLoop.timeScale(
                Math.abs(self.deltaX) > Math.abs(self.deltaY)
                  ? self.deltaX
                  : self.deltaY
              );
        
              evenSlow.invalidate().restart();
           
          ScrollTrigger.clearScrollMemory();
            },
          });

          const Btn = document.querySelector(".button")
          const BtnBack = document.querySelector(".button-back")
      
          Btn && Btn.addEventListener("click", () => evenLoop.next({duration: 0.4, ease: "power1.inOut",   onComplete: () => {
             evenLoop.timeScale(0).resume();
         }}));
    
          BtnBack && BtnBack.addEventListener("click", () => evenLoop.previous({duration: 0.4, ease: "power1.inOut",   onComplete: () => {
             evenLoop.timeScale(0).resume();
         }}));
    
          return () => ctx.revert();
        });
      }, []);
  

  /*  useIsomorphicLayoutEffect(()=>{


  
   const ctx = gsap.context(()=>{
    let loop = horizontalLoop(".cards section", {repeat: -1, draggable: true,  center: true})

    let slow = gsap.to(loop, {timeScale: 0})
    loop.timeScale(0)



    Observer.create({
        target: ".cards",
        type: "pointer,touch,wheel",
        wheelSpeed: 0.1,

        onChange: self => {
            
          loop.timeScale(Math.abs(self.deltaX) > Math.abs(self.deltaY) ? -self.deltaX : -self.deltaY); // whichever direction is bigger
          slow.invalidate().restart(); // now decelerate
        }
      });

      const Btn = document.querySelector(".button")
      
     Btn && Btn.addEventListener("click", () => loop.next({duration: 0.4, ease: "power1.inOut",   onComplete: () => {
        loop.timeScale(0).resume();
    }}));


      

   })
   return ()=> ctx.revert()
   }
   , []) */

   modifiedData?.push({...modifiedData[2], imgUrl: SunIcon.src, isProject: false}, modifiedData[3])
   modifiedData?.splice(3,0, {...modifiedData[4], imgUrl: Smile.src, isProject: false})

   
   
/* 
   modifiedData?.unshift({title: "Talk", img: modifiedData[2].img, imgUrl: urlForImage(modifiedData[2].img)?.url()}) */
const controls = useDragControls()
const [majorX, setMajorX] = useState(0)
  
    return (
<motion.div ref={ref}  transition={{duration: 0.6}} animate={{opacity: 1, transition: {delay: 1}}} initial={{opacity: 0}} className="relative">
  <div className="dr w-8 h-8 bg-bl absolute"></div>
<motion.div className=" bg-bl h-8 w-8
fixed z-50 " drag={"x"}    dragConstraints={{
right: 200,
  left: 0,

}} onDrag={(e, i)=>{
  setMajorX(i.delta.x)
}} dragControls={controls}   />
<div className="w-full hidden sm:block xl:hidden">
    <IPadHorizontalScroll>
    <div  className="flex flex-wrap gap-x-4 z-0  gap-y-5">
            {modifiedData && modifiedData.map((i, k)=>{
                
                const currentObj = modifiedData[k]
            
                return <section key={k} className=" px-[20px]  gap-y-4 ">
                  
                { <ProjectCard slug={i.slug || "/"}  isProject={currentObj.isProject} media={currentObj.imgUrl} discipline="sdd" name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </div> 
    </IPadHorizontalScroll>
</div>
{/* Mobile View */}
    <div className="sm:hidden flex flex-col items-center justify-center w-full ">
    <div className="flex flex-col gap-y-[22px]">
            {modifiedData && modifiedData.map((i, k)=>{
                
                const currentObj = modifiedData[k]
            

               
                return <section key={k} className="   gap-y-4 ">
                  
                { <ProjectCard slug={i.slug || "/"}  isProject={currentObj.isProject} media={currentObj.imgUrl} discipline="sd" name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </div> 
    </div>
  {/* End */}
    

{/* Laptop View */}
<div className="slider-cont hidden xl:block ">
  <div className="flex mx-4 justify-center"> <button className="button-back bg-bl text-white  mb-2  z-30 text-[10px] font-PP w-8 h-8 " >{"<"}</button> <button className="button bg-bl text-white  mb-2  z-30 text-[10px] font-PP w-8 h-8 " >{">"}</button></div>
    <motion.div animate={{x: majorX * 10, transition:{ease: "linear",  duration: 0.3}}} className="grid grid-rows-2 gap-x-4 cont cards z-0 grid-flow-col gap-y-5 ">
            {modifiedData && modifiedData.map((i, k)=>{
                let number = k === 0 ? k : k%2 === 0 ? k : k+2
               
                const currentObj = modifiedData[k]
                const nextObj =  modifiedData[number + 1]


                return <section unselectable="on" draggable={false} key={k} className=" px-[20px]  gap-y-4 relative ">
                  
                { <ProjectCard slug={i.slug || "/"}   isProject={currentObj.isProject} media={currentObj.imgUrl} discipline="sd" name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </motion.div> 

</div>
{/* End */}


</motion.div>
    );
}




export default function GsapAlt({data}: {data: HomePagePayload | null}){

  const {lenisCurrent} = useContext(ContextMain) as MainContextWrapperType


  const modifiedData  = data?.showcaseProjects?.map((item)=>{
    const imgUrl = item.coverImage ? urlForImage(item.coverImage)?.quality(100)?.format("webp")?.url() : ""
    return {title: item.title, slug: item.slug, img: item.coverImage, imgUrl: imgUrl,  isProject: true}
})
const modifiedDataTwo  = data?.showcaseProjects?.map((item)=>{
  
  const imgUrl = item.coverImage ? urlForImage(item.coverImage)?.quality(100)?.format("webp")?.url() : ""
  return {title: item.title, slug: item.slug, img: item.coverImage, imgUrl: imgUrl,  isProject: true}
})
modifiedData?.splice(modifiedData.length, 0,{...modifiedData[2], imgUrl: SunIcon.src, isProject: false}, modifiedData[3])
modifiedData?.splice(3,0, {...modifiedData[4], imgUrl: Smile.src, isProject: false})
const controls = useDragControls()
const [majorX, setMajorX] = useState(0)


/* Use Callback */
const [toggle, refCallback, myRef] = useRefWithCallback<HTMLSpanElement>();

const ref:any = useRef(null)
const gsapDragRef = myRef
const dragInstance:any = useRef(null);

/* Desktop Draggable */
const dragInstanceDesktop:any = useRef(null)


/* Media Query */
const {x} = useMediaQuery()


/* New Events for draggable */
const [down, setDown] = useState({status: false, position: 0})

const onMouseDown = useCallback((e) => {
  setDown({status: true, position: e.pageX})
},[])

const onMouseLeave = useCallback((e) => {
  setDown(prev => ({ ...prev, status: false}))
},[])

const onMouseUp = useCallback((e)=>{
  setDown(prev => ({...prev, status: false}))
}, [])

const onMouseMove =  useCallback((e) =>{
  if(lenisCurrent && lenisCurrent.scrollTo && down.status === true ) {
      const p = down.position - e.pageX
      lenisCurrent.scrollTo(lenisCurrent.scroll + p)
  }
},[down, lenisCurrent])
/* End */





/* Use Effect to initialize gsap drag for Horizontal wrapper for desktop screen */
useEffect(()=>{
  if(!lenisCurrent) return
  
  /* Draggable instance for Desktop */
/*   dragInstanceDesktop.current = Draggable.create(ref.current, {
    type: "x",
    bounds: {minX: -((ref.current.getBoundingClientRect().width - x)), maxX: 0, minY: 50, maxY: 500},
   inertia: true,
    onDrag: ()=>{
      const percentageReal = dragInstanceDesktop.current[0].x /(ref.current.getBoundingClientRect().width - window.innerWidth)
      console.log("counting",  dragInstanceDesktop.current[0].x, dragInstanceDesktop.current[0], dragInstanceDesktop.current[0].x /(ref.current.getBoundingClientRect().width - window.innerWidth), ref.current.getBoundingClientRect().width , window.innerWidth )
      lenisCurrent.scrollTo( dragInstanceDesktop.current[0].x)
    },
    onDragEnd: ()=>{
      lenisCurrent.scrollTo( dragInstanceDesktop.current[0].x)
      console.log(lenisCurrent)
    }
  }) */
  /* End */

  dragInstance.current = Draggable.create(gsapDragRef.current, {
    type: "x",
    bounds: {minX: 10, maxX: ref.current.getBoundingClientRect().width - window.innerWidth, minY: 50, maxY: 500},
    inertia: true,
    onDrag: ()=>{
      console.log("counting",dragInstance[0])
      lenisCurrent.scrollTo(dragInstance.current[0].x)
      
    }
  })
  gsap.to(".tab-display", { y: 1000 * lenisCurrent.progress, duration: 1 , scrollTrigger: {scrub: 1, trigger: "top"}});
}, [toggle, lenisCurrent, gsapDragRef,x])


  return <div className="xl:h-[100vh] xl:absolute top-0  xl:flex items-center xl:justify-center">

    {/* Mobile View */}
    <div className="Js-lenis sm:hidden flex flex-col items-center justify-center w-full tab-display data-lenis-prevent">
    <div className="flex flex-col gap-y-[22px]">
            {modifiedDataTwo && modifiedDataTwo.map((i, k)=>{
                
                const currentObj = modifiedDataTwo[k]
            

               
                return <section key={k} className="   gap-y-4 ">
                  
                { <ProjectCard slug={i.slug || "/"} isProject={currentObj.isProject} media={currentObj.imgUrl} discipline="sd" name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </div> 
    </div>
    {/* End */}


    {/* Tab View */}
  <div className="w-full hidden sm:block xl:hidden data-lenis-prevent Js-lenis">
    <IPadHorizontalScroll>
    <div  className="flex flex-wrap gap-x-4 z-0  gap-y-5 justify-center items-center">
            {modifiedDataTwo && modifiedDataTwo.map((i, k)=>{
                
                const currentObj = modifiedDataTwo[k]
            
                return <section key={k} className=" px-[20px]  gap-y-4 ">
                  
                { <ProjectCard slug={i.slug || "/"}  isProject={currentObj.isProject} media={currentObj.imgUrl} discipline="sdd" name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </div> 
    </IPadHorizontalScroll>
</div>
{/* End */}


    {/* Laptop View */}
<div className="xl:flex hidden flex-col  h-fit py-auto w-fit ">
<div ref={refCallback} className="w-8 h-8 bg-blue-500 shadow-lg line fixed   z-50 rounded-sm"></div>
  <motion.div ref={ref} onMouseUp={onMouseUp} onMouseDown={onMouseDown} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}   className="grid h-full  w-fit   grid-rows-2 gap-x-4 z-0 grid-flow-col gap-y-2 ">
  
  {modifiedData && modifiedData.map((i, k)=>{
      let number = k === 0 ? k : k%2 === 0 ? k : k+2
     
      const currentObj = modifiedData[k]
      const nextObj =  modifiedData[number + 1]

     
      return <section onDrag={(e)=>{
        e.stopPropagation()
      }} unselectable="on" draggable={false} key={k} className=" px-[20px]  h-full relative ">
        
      { <ProjectCard slug={i.slug || "/"} animate={k === modifiedData.length - 1} isProject={currentObj.isProject} media={currentObj.imgUrl} discipline="sd" name={currentObj.title || ""}></ProjectCard>}

         
      </section>
  })}
</motion.div> </div>
{/* End */}
</div>
}