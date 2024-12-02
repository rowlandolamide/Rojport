"use client"
import {gsap} from "gsap"
import React, { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import Smile from "../../../app/public/Icons/Smile Icon.svg"

import SunIcon from "../../../app/public/Icons/Sun Icon.svg"

import { ScrollTrigger } from 'gsap/ScrollTrigger';

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






gsap.registerPlugin(Observer)
gsap.registerPlugin(ScrollTrigger, Draggable)






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

modifiedData?.splice(modifiedData.length, 0,{...modifiedData[2], imgUrl: SunIcon.src, isProject: false}, modifiedData[3])
modifiedData?.splice(3,0, {...modifiedData[4], imgUrl: Smile.src, isProject: false})



/* Use Callback */
const [toggle, refCallback, myRef] = useRefWithCallback<HTMLSpanElement>();

const ref:any = useRef(null)
const gsapDragRef = myRef

const dragInstance:any = useRef(null);




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


/* New Events for Draggable Scrollbar */
const [scrollBarDown, setisScrollBarDown] = useState({status: false, position: 0, animatedPosition: 0})

const onScrollBarMouseDown = (e) => {
  e.preventDefault()
 
  setisScrollBarDown(prev => ({...prev, status: true, animatedPosition: e.clientY, position: e.pageY }))
  console.log(scrollBarDown)
}

const onScrollBarMouseLeave = (e) => {
  e.preventDefault()
  setisScrollBarDown(prev => ({ ...prev, status: false}))
}

const onScrollBarMouseUp = (e)=>{
  e.preventDefault()
  setisScrollBarDown(prev => ({...prev, status: false}))
}

const onScrollBarMouseMove =  useCallback((e) =>{
  e.preventDefault()
 
  console.log("something moved", e)
  if(!scrollBarDown.status) return
  

 setisScrollBarDown(prev => {
  const isUp = e.movementY >= 0 
  const mainDifference = e.movementY >= 0 ? e.clientY :   prev.position - e.clientY
  console.log(e.movementY, mainDifference, e.pageY, e.clientY)
  const otherMainDifference = prev.position - e.clientY

  return {...prev, position: isUp ? mainDifference : prev.position + mainDifference , animatedPosition: scrollBarDown.status ? e.clientY: prev.animatedPosition}
 })
  const proportionalMovement = (ref.current.getBoundingClientRect().width - window.innerWidth)/300
  const actualMovement = proportionalMovement * scrollBarDown.position
  if(lenisCurrent && lenisCurrent.scrollTo && scrollBarDown.status === true ) {
  
      lenisCurrent.scrollTo(lenisCurrent.scroll + actualMovement)
  }
}, [scrollBarDown.status, lenisCurrent])

/* End */


/* check if its dragging */
const [isDragging, setIsDragging] = useState(false)
/* End */
const gsapTime =  gsap.timeline({})

useEffect(()=>{
  
  if(lenisCurrent && gsapDragRef.current){
    
    console.log("ss",lenisCurrent.isScrolling)
 

  lenisCurrent.on('scroll', ()=>{
    if(dragInstance.current[0].isDragging){
gsapTime.pause()
return
    }
    if(lenisCurrent.isScrolling == false) return
   
  /*  ySetter(300 * lenisCurrent.progress) */
  if(dragInstance.current[0].isDragging) return
 
   gsapTime.to(gsapDragRef.current, {parseTransform:true,y: 300 * lenisCurrent.progress, duration: 0, })
   dragInstance.current[0].update()
  })
  /* gsap.timeline({}).to(gsapDragRef.current, {y: 300 * lenisCurrent.progress, duration: 0.1}) */
  }
}, [lenisCurrent, gsapDragRef, ])




/* Use Effect to initialize gsap drag for Horizontal wrapper for desktop screen */
useEffect(()=>{
  if(!lenisCurrent) return

  dragInstance.current = Draggable.create(gsapDragRef.current, {
    type: "y",
    bounds: {minY: 0, maxY: 300},
    inertia: false,
    onDragStart: ()=>{
      gsapTime.pause()
    },

    onDrag: ()=>{
   
      console.log(lenisCurrent.progress)
      const proportionalMovement = (ref.current.getBoundingClientRect().width - window.innerWidth)/300
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
      gsapTime.play()
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
 
  /*  Quick Setter */
  
  /* End */


  /* gsap.to(".tab-display", { y: 1000 * lenisCurrent.progress, duration: 1 , scrollTrigger: {scrub: 1, trigger: "top"}}); */
}, [toggle, lenisCurrent, gsapDragRef,x, dragInstance])


 

  return <div  className="xl:h-[100vh] xl:absolute top-0  xl:flex items-center xl:justify-center">
    <div className="fixed h-[320px] w-4 bg-red-500 left-[28px] top-[60px] z-10"></div>

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
  <div  className="flex flex-wrap gap-x-4 z-0  gap-y-5 justify-center items-center">
            {modifiedDataTwo && modifiedDataTwo.map((i, k)=>{
                
                const currentObj = modifiedDataTwo[k]
            
                return <section key={k} className=" px-[20px]  gap-y-4 ">
                  
                { <ProjectCard slug={i.slug || "/"}  isProject={currentObj.isProject} media={currentObj.imgUrl} discipline="sdd" name={currentObj.title || ""}></ProjectCard>}

                   
                </section>
            })}
        </div> 
</div>
{/* End */}


    {/* Laptop View */}
<div className="xl:flex hidden flex-col  h-fit py-auto w-fit ">
{/* <motion.div style={{y: scrollBarDown.position}}  onMouseDown={onScrollBarMouseDown} onMouseLeave={onScrollBarMouseLeave}  onMouseMove={onScrollBarMouseMove} onMouseUp={onScrollBarMouseUp}  className={`hidden w-8 h-8 bg-red-500 shadow-lg line fixed top-0    z-50 rounded-sm`}>{scrollBarDown.position}</motion.div> */}
<div  ref={refCallback} className={` w-8 h-8 bg-red-500 z-20 shadow-lg line fixed  z-50 rounded-sm`}>

</div>

  <motion.div ref={ref} onMouseUp={onMouseUp} onMouseDown={onMouseDown} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}   className="grid h-full  w-fit   grid-rows-2 z-0 grid-flow-col gap-6 3xl:gap-8">
  
  {modifiedDataTwo && modifiedDataTwo.map((i, k)=>{
      let number = k === 0 ? k : k%2 === 0 ? k : k+2
     
      const currentObj = modifiedDataTwo[k]
      const nextObj =  modifiedDataTwo[number + 1]

     
      return <section onDrag={(e)=>{
        e.stopPropagation()
      }} unselectable="on" draggable={false} key={k} className=" h-full relative ">
        
      { <ProjectCard slug={i.slug || "/"} animate={k === modifiedDataTwo.length - 1} isProject={currentObj.isProject} media={currentObj.imgUrl} discipline="sd" name={currentObj.title || ""}></ProjectCard>}

         
      </section>
  })}
</motion.div> </div>
{/* End */}
</div>
}