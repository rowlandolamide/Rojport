"use client"
import {gsap} from "gsap"
import React, { useContext, useEffect, useMemo, useRef, useState} from 'react';
import Smile from "../../../app/public/Icons/Smile Icon.svg"

import SunIcon from "../../../app/public/Icons/Sun Icon.svg"

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Observer from "gsap/dist/Observer";
import {motion} from "framer-motion"
import Image from "next/image";
import useMediaQuery from "@/components/hooks/useMediaQuery";
import useRefWithCallback from "@/components/hooks/useRerenderCallback";
import { useCallback } from "react";
import ProjectCard from "./ProjectCard";
import { Draggable } from "gsap/Draggable";
import {ContextMain, MainContextWrapperType} from "@/components/global/ContextWrapper";
import ScrollBarIcon from "../../../app/public/Icons/Cursor.svg"

import { urlForImage } from "@/sanity/lib/utils";

import type { HomePagePayload } from "@/types";






gsap.registerPlugin(Observer)
gsap.registerPlugin(ScrollTrigger, Draggable)






export default function GsapAlt({data}: {data: HomePagePayload | null}){

  const {lenisCurrent} = useContext(ContextMain) as MainContextWrapperType


  /* Media Query */
const {x, y} = useMediaQuery()
/* End */

  /* Laptop Contaier Ref */
  const laptopContRef:any = useRef(null)

  const laptopContainerPositionFromTop = laptopContRef.current ? laptopContRef.current.getBoundingClientRect().top : 40
  /* End */


  /* ScrollBar Lenght */

  const scrollBarLength = useMemo(()=>{
 return y * 30/100
  }, [y, x])

  

  /* End */
  


  const modifiedData  = data?.showcaseProjects?.map((item)=>{
   
    const imgUrl = item.coverImage ? urlForImage(item.coverImage)?.quality(100)?.format("webp")?.url() : ""
    return {title: item.title, slug: item.slug, img: item.coverImage, imgUrl: imgUrl,  isProject: true}
})
const modifiedDataTwo  = data?.showcaseProjects?.map((item)=>{
  
  const imgUrl = item.coverImage ? urlForImage(item.coverImage)?.quality(100)?.format("webp")?.url() : ""
  return {title: item.title, slug: item.slug, img: item.coverImage, imgUrl: imgUrl,  isProject: true, discipline: item.disci}
})





modifiedData?.splice(modifiedData.length, 0,{...modifiedData[2], imgUrl: SunIcon.src, isProject: false}, modifiedData[3])
modifiedData?.splice(3,0, {...modifiedData[4], imgUrl: Smile.src, isProject: false})



/* Use Callback */
const [toggle, refCallback, myRef] = useRefWithCallback<HTMLSpanElement>();

const ref:any = useRef(null)
const gsapDragRef = myRef

const dragInstance:any = useRef(null);

/* End */







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





const gsapTime =  gsap.timeline({})


/* Y setter */
const ySetter = gsap.quickSetter(gsapDragRef.current, "y", "px")
/* End */

useEffect(()=>{
  
  if(lenisCurrent && gsapDragRef.current){
    

 

  lenisCurrent.on('scroll', ()=>{
    if(dragInstance.current[0].isDragging){
gsapTime.pause()
return
    }
    if(lenisCurrent.isScrolling == false) return

   
   
  
  if(dragInstance.current[0].isDragging) return
 
   ySetter(scrollBarLength * lenisCurrent.progress)

  })

  }
}, [lenisCurrent, gsapDragRef,gsapTime ])




/* Use Effect to initialize gsap drag for Horizontal wrapper for desktop screen */
useEffect(()=>{
  if(!lenisCurrent) return

  dragInstance.current = Draggable.create(gsapDragRef.current, {
    type: "y",
    bounds: {minY: 0, maxY: scrollBarLength},
    inertia: false,


    onDrag: ()=>{
   
     
      const proportionalMovement = (ref.current.getBoundingClientRect().width - window.innerWidth)/scrollBarLength
      lenisCurrent.scrollTo(dragInstance.current[0].y * proportionalMovement)
      dragInstance.current[0].update()
     
    },
    onDragEnd: ()=>{
      dragInstance.current[0].update()
      
    },
    onPress: ()=>{
      dragInstance.current[0].enable()
      dragInstance.current[0].update()
    },
    onRelease: ()=>{
  
      dragInstance.current[0].update()
    },
    onLockAxis: ()=>{
      dragInstance.current[0].disable()
    },
    onThrowUpdate: ()=>{
      dragInstance.current[0].update()
    },
    onThrowComplete: ()=>{
      dragInstance.current[0].update()
    }
   
  
  

    
  })
 
 



}, [toggle, lenisCurrent, gsapDragRef,x, dragInstance])

if(modifiedDataTwo){
  let number = 0
  const firstCount = modifiedDataTwo.length
  const count = 8 - modifiedDataTwo?.length
  if(number === count) return
  for(let i=0; i < count; i++){
   
    for(let l=0; l < firstCount; l++){
      modifiedDataTwo.push(modifiedDataTwo[l])
      number = number + 1
    }
  }

}


 

  return <div  className="xl:h-[100vh] xl:absolute top-0  xl:flex items-center xl:justify-center">
   <div className="fixed relative right-[28px] xl:block hidden ">
   <div style={{top: laptopContainerPositionFromTop}}  ref={refCallback} className={` w-fit z-20 shadow-lg line fixed top-[${Math.floor(laptopContainerPositionFromTop)}px] right-[25px] z-50 rounded-sm`}>
<Image src={ScrollBarIcon.src} width={26} height={100} className="h-fit" alt="Scrollbar"></Image>
</div>
    <div  style={{top: laptopContainerPositionFromTop, height: scrollBarLength + 50}} className={` w-[20px] bg-bl/[0.11] right-[28px] top-[${Math.floor(laptopContainerPositionFromTop)}px] z-10 fixed`}>


    </div>
   </div>

    {/* Mobile View */}
    <div className="Js-lenis sm:hidden flex flex-col items-center justify-center w-full tab-display data-lenis-prevent">
    <div className="flex flex-col gap-y-[22px]">
            {modifiedDataTwo && modifiedDataTwo.map((i, k)=>{
                
                const currentObj = modifiedDataTwo[k]
            

               
                return <section key={k} className="   gap-y-4 ">
                  
                { <ProjectCard slug={i.slug || "/"} isProject={currentObj.isProject} media={currentObj.imgUrl} discipline={currentObj.discipline} name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </div> 
    </div>
    {/* End */}


    {/* Tab View */}
  <div className="w-full hidden sm:block xl:hidden data-lenis-prevent Js-lenis">
  <div  className="flex flex-wrap gap-x-4 z-0  gap-y-5 justify-center items-center">
            {modifiedDataTwo && modifiedDataTwo.map((i, k)=>{
                
                const currentObj = modifiedDataTwo[k]
              
                return <section key={k} className=" px-[20px]  gap-y-4 ">
                  
                { <ProjectCard slug={i.slug || "/"}  isProject={currentObj.isProject} media={currentObj.imgUrl} discipline={currentObj.discipline} name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </div> 
</div>
{/* End */}


    {/* Laptop View */}
<div ref={laptopContRef} className="xl:flex hidden flex-col  h-fit py-auto w-fit ">


  <motion.div ref={ref} onMouseUp={onMouseUp} onMouseDown={onMouseDown} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}   className="grid h-full  w-fit  px-4 grid-rows-2 z-0 grid-flow-col gap-6 3xl:gap-8">
  
  {modifiedDataTwo && modifiedDataTwo.map((i, k)=>{
      let number = k === 0 ? k : k%2 === 0 ? k : k+2
     
      const currentObj = modifiedDataTwo[k]
      const nextObj =  modifiedDataTwo[number + 1]

     
      return <section onDrag={(e)=>{
        e.stopPropagation()
      }} unselectable="on" draggable={false} key={k} className=" h-full relative ">
        
      { <ProjectCard slug={i.slug || "/"} animate={k === modifiedDataTwo.length - 1} isProject={currentObj.isProject} media={currentObj.imgUrl} discipline={currentObj.discipline} name={currentObj.title || ""}></ProjectCard>}

         
      </section>
  })}
</motion.div> </div>
{/* End */}
</div>
}