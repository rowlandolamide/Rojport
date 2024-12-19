"use client"
import {gsap} from "gsap"
import React, { useContext, useEffect, useMemo, useRef, useState} from 'react';
import {  usePathname } from "next/navigation";
import ReelVideo from "./ReelVideo";

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
import ScrollBarIcon from "../../../app/public/Icons/Scrollbar.svg"

import { urlForImage } from "@/sanity/lib/utils";

import type { HomePagePayload } from "@/types";






gsap.registerPlugin(Observer)
gsap.registerPlugin(ScrollTrigger, Draggable)






export default function HomePageHorizontal({data}: {data: HomePagePayload | null}){

  const {lenisCurrent} = useContext(ContextMain) as MainContextWrapperType

  const routerPage = usePathname()




  /* Media Query */
const {x, y} = useMediaQuery()
/* End */

/* Laptop Total Container Ref */
const laptopTotalContainerRef: any = useRef()
/* End */

  /* Laptop Contaier Ref */
  const laptopContRef:any = useRef(null)

  const laptopContainerPositionFromTop = laptopContRef.current ? laptopContRef.current.getBoundingClientRect().top +20 : 40
  /* End */


  /* ScrollBar Length */

  const scrollBarLength = useMemo(()=>{
    if(!y) 200
 return y * 30/100
  }, [y])

  /* End */

   /* Is Laptop */
   const isLaptop = useMemo(()=>{
    return x> 1279
   }, [x])
   /* End */
  


const modifiedDataTwo  = useMemo(()=>{
  return  data?.showcaseProjects?.map((item)=>{
  
    const imgUrl = item.coverImage ? urlForImage(item.coverImage)?.quality(100)?.format("webp")?.width(800).url() : ""
    return {title: item.title, slug: item.slug, img: item.coverImage, imgUrl: imgUrl,  isProject: true, discipline: item.disci}
  })
}, [data])


let finalModifiedArray:any[] = []




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
 
  if(lenisCurrent &&  down.status === true ) {

      const p = down.position - e.pageX

      lenisCurrent.scrollTo(lenisCurrent.scroll + p)
  }
},[down, lenisCurrent])
/* End */









useEffect(()=>{
  
  const ctx = gsap.context(()=>{


const ySetter = gsap.quickSetter(gsapDragRef.current, "y", "px")
/* End */
  if(lenisCurrent && gsapDragRef.current){
    

 

  lenisCurrent.on('scroll', ()=>{
  if(lenisCurrent.isScrolling == false) return
  
  if(dragInstance.current[0].isDragging) return

   ySetter(scrollBarLength * lenisCurrent.progress)
   

  })



  }
  }, laptopTotalContainerRef)


  return ()=> ctx.clear()
  

}, [lenisCurrent, gsapDragRef, scrollBarLength, routerPage])


useEffect(()=>{
  if(!lenisCurrent) return
  if(isLaptop){
    lenisCurrent.scrollTo(0)
  }
  
}, [lenisCurrent, isLaptop])



/* Use Effect to initialize gsap drag for Horizontal wrapper for desktop screen */
useEffect(()=>{
  if(!lenisCurrent) return

  let ctx = gsap.context(()=>{
    dragInstance.current = Draggable.create(gsapDragRef.current, {
      type: "y",
      bounds: {minY: 0, maxY: scrollBarLength},
      inertia: false,
  cursor: ".grabb",
  
      onDrag: ()=>{
     
       
        const proportionalMovement = (ref.current.getBoundingClientRect().width - x)/scrollBarLength
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
   
  }, laptopTotalContainerRef)

  
 

return ()=> ctx.clear()

}, [ lenisCurrent, gsapDragRef,x, dragInstance, scrollBarLength, laptopTotalContainerRef])



if(modifiedDataTwo){
 
  

  const count = 9 - modifiedDataTwo?.length

 
 if(count){
  
  for(let l=0; l < count; l++){
    finalModifiedArray.push(modifiedDataTwo[l])
  
  }
 }

  finalModifiedArray =  [...modifiedDataTwo, ...finalModifiedArray]
}




 

  return <div ref={laptopTotalContainerRef}  className="xl:h-[100vh] xl:absolute top-0  xl:flex items-center xl:justify-center">
   <div className="fixed relative right-[28px] xl:block hidden ">
   <div style={{top: laptopContainerPositionFromTop}}  ref={refCallback} className={`grabb w-fit right-[26px] cursor-grab 3xl:right-[25px]  shadow-lg line fixed sb  z-30 rounded-sm`}>
<Image src={ScrollBarIcon.src} width={26} height={100} className="h-fit 2xl:w-[24px] 3xl:w-[45px] grabb cursor-grab" alt="Scrollbar"></Image>
</div>
    <div  style={{top: laptopContainerPositionFromTop, height: scrollBarLength + (0.0388 * y)}} className={`3xl:w-[40px] w-[20px] bg-bl/[0.11] right-[28px] top-[${Math.floor(laptopContainerPositionFromTop)}px] z-10 fixed`}>
    </div>
   </div>

  


    {/* Laptop View */}
<div ref={laptopContRef} className="xl:flex hidden flex-col  h-fit py-auto w-fit ">
<div></div>

  <motion.div ref={ref} onMouseUp={onMouseUp} onMouseDown={onMouseDown} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}   className="grid h-full  w-fit  px-4 grid-rows-2 z-0 grid-flow-col gap-6 3xl:gap-8">
  <ReelVideo url="https://res.cloudinary.com/doaahozax/video/upload/v1734541085/ROJ/reel_video_a9pssh.mp4"></ReelVideo>
  {finalModifiedArray && finalModifiedArray.map((i, k)=>{
     
     
      const currentObj = finalModifiedArray[k]
     

     
      return <section onDrag={(e)=>{
        e.stopPropagation()
      }} unselectable="on" draggable={false} key={k} className=" h-full pointerr relative cursor-pointer ">
        
      { <ProjectCard slug={i.slug || "/"} animate={k === finalModifiedArray.length - 1} isProject={currentObj.isProject} media={currentObj.imgUrl} discipline={currentObj.discipline} name={currentObj.title || ""}></ProjectCard>}

         
      </section>
  })}
</motion.div> </div>
{/* End */}
</div>
}