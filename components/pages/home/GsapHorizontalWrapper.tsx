"use client"
import {gsap} from "gsap"
import React, { useEffect, useLayoutEffect, useMemo, useRef} from 'react';

import {horizontalLoop} from "./HorizontalLoop"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Observer from "gsap/dist/Observer";
import {motion} from "framer-motion"
import dynamic from "next/dynamic";

import ProjectCard from "./ProjectCard";

const IPadHorizontalScroll = dynamic(()=>import("@/components/global/IPadHorizontalScroll"))
import { urlForImage } from "@/sanity/lib/utils";

import type { HomePagePayload } from "@/types";



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
        const imgUrl = item.coverImage ? urlForImage(item.coverImage)?.url() : ""
        return {title: item.title, img: item.coverImage, imgUrl: imgUrl }
    })




    useIsomorphicLayoutEffect(() => {
        ctx.add(() => {
          const evenLoop = horizontalLoop(".cards section", {
            repeat: -1,
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
           
            },
          });

          const Btn = document.querySelector(".button")
      
          Btn && Btn.addEventListener("click", () => evenLoop.next({duration: 0.4, ease: "power1.inOut",   onComplete: () => {
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

   modifiedData?.push(modifiedData[2], modifiedData[3], modifiedData[4])
/* 
   modifiedData?.unshift({title: "Talk", img: modifiedData[2].img, imgUrl: urlForImage(modifiedData[2].img)?.url()}) */

  
    return (
<motion.div ref={ref}  transition={{duration: 0.6}} animate={{opacity: 1, transition: {delay: 1}}} initial={{opacity: 0}} className="">
<div className="w-full hidden sm:block xl:hidden">
    <IPadHorizontalScroll>
    <div  className="flex flex-wrap gap-x-4 z-0  gap-y-5">
            {modifiedData && modifiedData.map((i, k)=>{
                
                const currentObj = modifiedData[k]
            
                return <section key={k} className=" px-[20px]  gap-y-4 ">
                  
                { <ProjectCard media={currentObj.imgUrl} discipline="sdd" name={currentObj.title || ""}></ProjectCard>}

                   
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
                  
                { <ProjectCard media={currentObj.imgUrl} discipline="sd" name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </div> 
    </div>

<div className="slider-cont hidden xl:block">
    <button className="button bg-blue-500 text-white mb-2" >next</button>
    <motion.div /* animate={{x: xMov}} */ className="grid grid-rows-2 gap-x-4 cont cards z-0 grid-flow-col gap-y-5">
            {modifiedData && modifiedData.map((i, k)=>{
                let number = k === 0 ? k : k%2 === 0 ? k : k+2
               
                const currentObj = modifiedData[k]
                const nextObj =  modifiedData[number + 1]

                console.log(k, currentObj, nextObj)
                return <section key={k} className=" px-[20px]  gap-y-4 ">
                  
                { <ProjectCard media={currentObj.imgUrl} discipline="sd" name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </motion.div> 

</div>
</motion.div>
    );
}

export default GsapHorizontalWrapper;