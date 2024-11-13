"use client"
import {gsap} from "gsap"
import React, { useEffect, useRef , useLayoutEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {horizontalLoop} from "./HorizontalLoop"
import Observer from "gsap/dist/Observer";
import {motion} from "framer-motion"
import IPadHorizontalScroll from "@/components/global/IPadHorizontalScroll";
import ProjectCard from "./ProjectCard";
import PixelTransition from "@/components/PixelTransition/PixelTransition";
import { urlForImage } from "@/sanity/lib/utils";
import dynamic from "next/dynamic";
import useMediaQuery from "@/components/hooks/useMediaQuery";
import type { HomePagePayload } from "@/types";
import ReactLenis from "@studio-freight/react-lenis/types";


GsapHorizontalWrapper.propTypes = {
    
};

gsap.registerPlugin(Observer)

function GsapHorizontalWrapper({data}: {data: HomePagePayload | null}) {
    const {x} = useMediaQuery()
    const contRef = useRef()
    const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

    const modifiedData  = data?.showcaseProjects?.map((item)=>{
        const imgUrl = item.coverImage ? urlForImage(item.coverImage)?.url() : ""
        return {title: item.title, img: item.coverImage, imgUrl: imgUrl }
    })

    function divideArray(nums:any[] | undefined, K, N) {
        if(!nums) return
        let ans: any = [];
        let temp: any = [];
        for (let i = 0; i < N; i++) {
            temp.push(nums[i]);
            if (((i + 1) % K) == 0) {
                ans.push(temp);
                temp = [];
            }
        }
         
        // If last group doesn't have enough 
        // elements then add 0 to it
        if (temp.length != 0) {
            let a = temp.length;
            while (a != K) {
                temp.push(0);
                a++;
            }
            ans.push(temp);
        }
        return ans;
    }





  

   useIsomorphicLayoutEffect(()=>{
   const ctx = gsap.context(()=>{
    let loop = horizontalLoop(".cards section", {repeat: -1, draggable: true,  center: true})

    let slow = gsap.to(loop, {timeScale: 0, duration: 0.5})
    loop.timeScale(0)



    Observer.create({
        target: ".cards",
        type: "pointer,touch,wheel",
        wheelSpeed: -0.3,

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
   , [x])

   const arrayMain : any[][] = divideArray(modifiedData, 2, modifiedData?.length)

   modifiedData?.push(modifiedData[2], modifiedData[3], modifiedData[4])
/* 
   modifiedData?.unshift({title: "Talk", img: modifiedData[2].img, imgUrl: urlForImage(modifiedData[2].img)?.url()}) */

   const [xMov, setXMov] = useState(false)

   useEffect(()=>{
    setXMov(true)
   }, [])

    return (
<div className="">
<div className="w-full hidden sm:block xl:hidden">
    <IPadHorizontalScroll>
    <motion.div /* animate={{x: xMov}} */ className="flex flex-wrap gap-x-4 z-0  gap-y-5">
            {modifiedData && modifiedData.map((i, k)=>{
                let number = k === 0 ? k : k%2 === 0 ? k : k+2
                let altNumber = k%2 === 0 ? number + 1 : number + 1
                const currentObj = modifiedData[k]
                const nextObj =  modifiedData[number + 1]

                console.log(k, currentObj, nextObj)
                return <section key={k} className=" px-[20px]  gap-y-4 ">
                  
                { <ProjectCard media={currentObj.imgUrl} discipline="sdd" name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </motion.div> 
    </IPadHorizontalScroll>
</div>
    <div className="sm:hidden flex flex-col items-center justify-center w-full ">
    <motion.div /* animate={{x: xMov}} */ className="flex flex-col gap-y-[22px]">
            {modifiedData && modifiedData.map((i, k)=>{
                let number = k === 0 ? k : k%2 === 0 ? k : k+2
                let altNumber = k%2 === 0 ? number + 1 : number + 1
                const currentObj = modifiedData[k]
                const nextObj =  modifiedData[number + 1]

                console.log(k, currentObj, nextObj)
                return <section key={k} className="   gap-y-4 ">
                  
                { <ProjectCard media={currentObj.imgUrl} discipline="sd" name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </motion.div> 
    </div>
  {/*  {window &&  <PixelTransition menuIsActive={xMov} dimensions={{width: window.innerWidth, height: window.innerHeight}}></PixelTransition>} */}
<div className="slider-cont hidden xl:block">
    <button className="button bg-blue-500 text-white mb-2" >next</button>
    <motion.div /* animate={{x: xMov}} */ className="grid grid-rows-2 gap-x-4 cont cards z-0 grid-flow-col gap-y-5">
            {modifiedData && modifiedData.map((i, k)=>{
                let number = k === 0 ? k : k%2 === 0 ? k : k+2
                let altNumber = k%2 === 0 ? number + 1 : number + 1
                const currentObj = modifiedData[k]
                const nextObj =  modifiedData[number + 1]

                console.log(k, currentObj, nextObj)
                return <section key={k} className=" px-[20px]  gap-y-4 ">
                  
                { <ProjectCard media={currentObj.imgUrl} discipline="sd" name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </motion.div> 
 {/* <div className="flex gap-x-4 cont cards z-0">
            {modifiedData && modifiedData.map((i, k)=>{
                let number = k === 0 ? k : k%2 === 0 ? k : k+2
                let altNumber = k%2 === 0 ? number + 1 : number + 1
                const currentObj = modifiedData[number]
                const nextObj =  modifiedData[number + 1]

                console.log(k, currentObj, nextObj)
                return <section key={k} className=" px-[20px]  flex flex-col gap-y-4 ">
                   {k}
                {currentObj && <ProjectCard media={currentObj.imgUrl} discipline="sd" name={currentObj.title || ""}></ProjectCard>}
               {nextObj &&  <ProjectCard media={nextObj.imgUrl} discipline="sd" name={nextObj.title || ""}></ProjectCard>}
                   
                </section>
            })}
        </div>  */}
{/*  <div className="flex gap-x-4 cont cards z-0">
            {arrayMain && arrayMain.map((item, k)=>{
                console.log("f", item)
  

                return item.map((it, y)=>{
                    const currentObj = item[0]
                    const nextObj =  item[1]
                    console.log("j",it, currentObj, nextObj)
                    if(y%2 === 0) return null
                     return <section key={y} className=" px-[20px]  flex flex-col gap-y-4 ">
                    {k}
                 {currentObj && <ProjectCard media={currentObj.imgUrl} discipline="sd" name={currentObj.title || ""}></ProjectCard>}
                {nextObj &&  <ProjectCard media={nextObj.imgUrl} discipline="sd" name={nextObj.title || ""}></ProjectCard>}
                    
                 </section>
                })
            })}
        </div>  */}
</div>
</div>
    );
}

export default GsapHorizontalWrapper;