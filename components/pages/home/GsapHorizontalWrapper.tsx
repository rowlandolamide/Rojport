"use client"
import {gsap} from "gsap"
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import Smile from "../../../app/public/Icons/Smile Icon.svg"
import Rook from "../../../app/public/Icons/Rook.svg"
import SunIcon from "../../../app/public/Icons/Sun Icon.svg"
import {horizontalLoop} from "./HorizontalLoop"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDragControls } from "framer-motion";
import Observer from "gsap/dist/Observer";
import {motion} from "framer-motion"
import dynamic from "next/dynamic";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import ProjectCard from "./ProjectCard";
import Draggable from "gsap-trial/Draggable";

const IPadHorizontalScroll = dynamic(()=>import("@/components/global/IPadHorizontalScroll"))
import { urlForImage } from "@/sanity/lib/utils";

import type { HomePagePayload } from "@/types";
import ProjectsPageLenis from "@/components/global/ProjectsPageLenis";



GsapHorizontalWrapper.propTypes = {
    
};

gsap.registerPlugin(Observer)
gsap.registerPlugin(ScrollTrigger)

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
        return {title: item.title, img: item.coverImage, imgUrl: imgUrl,  isProject: true}
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
  <div className="dr w-8 h-8 bg-green-500 absolute"></div>
<motion.div className=" bg-bl h-8 w-8
fixed z-50 hover:bg-red-500" drag={"x"}    dragConstraints={{
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
                  
                { <ProjectCard isProject={currentObj.isProject} media={currentObj.imgUrl} discipline="sdd" name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </div> 
    </IPadHorizontalScroll>
</div>
    <div className="sm:hidden flex flex-col items-center justify-center w-full ">
    <div className="flex flex-col gap-y-[22px]">
            {modifiedData && modifiedData.map((i, k)=>{
                
                const currentObj = modifiedData[k]
            

               
                return <section key={k} className="   gap-y-4 ">
                  
                { <ProjectCard isProject={currentObj.isProject} media={currentObj.imgUrl} discipline="sd" name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </div> 
    </div>
    

<div className="slider-cont hidden xl:block ">
  <div className="flex mx-4 justify-center"> <button className="button-back bg-bl text-white  mb-2  z-30 text-[10px] font-PP w-8 h-8 " >{"<"}</button> <button className="button bg-bl text-white  mb-2  z-30 text-[10px] font-PP w-8 h-8 " >{">"}</button></div>
    <motion.div animate={{x: majorX * 10, transition:{ease: "linear",  duration: 0.3}}} className="grid grid-rows-2 gap-x-4 cont cards z-0 grid-flow-col gap-y-5 ">
            {modifiedData && modifiedData.map((i, k)=>{
                let number = k === 0 ? k : k%2 === 0 ? k : k+2
               
                const currentObj = modifiedData[k]
                const nextObj =  modifiedData[number + 1]

                console.log(k, currentObj, nextObj)
                return <section unselectable="on" draggable={false} key={k} className=" px-[20px]  gap-y-4 relative ">
                  
                { <ProjectCard isProject={currentObj.isProject} media={currentObj.imgUrl} discipline="sd" name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </motion.div> 

</div>



</motion.div>
    );
}

/*  export default GsapHorizontalWrapper; */


export default function GsapAlt({data}: {data: HomePagePayload | null}){
  const modifiedData  = data?.showcaseProjects?.map((item)=>{
    const imgUrl = item.coverImage ? urlForImage(item.coverImage)?.quality(50)?.format("webp")?.url() : ""
    return {title: item.title, img: item.coverImage, imgUrl: imgUrl,  isProject: true}
})
modifiedData?.push({...modifiedData[2], imgUrl: SunIcon.src, isProject: false}, modifiedData[3])
modifiedData?.splice(3,0, {...modifiedData[4], imgUrl: Smile.src, isProject: false})
const controls = useDragControls()
const [majorX, setMajorX] = useState(0)

  return <div className="flex flex-col">
    <motion.div className=" bg-bl h-8 w-8
fixed z-50 hover:bg-red-500" drag={"x"}    dragConstraints={{
right: 200,
  left: 0,

}} onDrag={(e, i)=>{
  setMajorX(i.point.x)
}} dragControls={controls}   />
<motion.div animate={{x: majorX * 10, transition:{ease: "linear",  duration: 0.3}}} className="w-8 h-8 bg-red-500">{majorX}</motion.div>
  <motion.div   animate={{x: -majorX * 3, transition:{ease: "linear",  duration: 0.3}}}  className="grid border  grid-rows-2 gap-x-4 z-0 grid-flow-col gap-y-5 ">
  
  {modifiedData && modifiedData.map((i, k)=>{
      let number = k === 0 ? k : k%2 === 0 ? k : k+2
     
      const currentObj = modifiedData[k]
      const nextObj =  modifiedData[number + 1]

      console.log(k, currentObj, nextObj)
      return <section unselectable="on" draggable={false} key={k} className=" px-[20px]  gap-y-4 relative ">
        
      { <ProjectCard isProject={currentObj.isProject} media={currentObj.imgUrl} discipline="sd" name={currentObj.title || ""}></ProjectCard>}

         
      </section>
  })}
</motion.div> </div>
}