"use client"
import React, { Suspense, useEffect, useRef, useState } from 'react';

import {motion} from "framer-motion"
import { MainContextWrapperType } from './ContextWrapper';
import Image from 'next/image';

import ProjectMainVideo from '../pages/project/ProjectMainVideo';
import ProjectMainVideoVimeo from '../pages/project/ProjectMainVideoVimeo';




function Overlay(props: {obj:  MainContextWrapperType["overlay"], setIsVideoFalse: ()=> void, closeOverlay: ()=> void}) {
  const {obj} = props
  const reactRef:any  = useRef(null)
    const ref: any = useRef(null)
    useEffect(()=>{
      const { setIsVideoFalse, closeOverlay} = props
        const onClick = (e)=>{ 
            if(!ref) return
            if(!ref.current) return  
            if (ref.current.contains(e.target)){
               
              // Clicked in box
            } else{
              // Clicked outside the box
              closeOverlay()
              setIsVideoFalse()

            }
          }
        window.addEventListener('mousedown', onClick);
()=> {
    window.removeEventListener("mousedown", onClick)
    setIsVideoFalse()
}
    }, [props])


    useEffect(()=>{
      if(reactRef.current)
      {
        const videoCurrent= reactRef.current.getInternalPlayer()
       if(videoCurrent){
        videoCurrent.addEventListener("mouseover", ()=>{
         
        })
       }
      }

      
    
    }, [])


   

   

    return (
  <div className='w-screen h-screen flex items-center  justify-center '>
<motion.div animate={{opacity: 1}} initial={{opacity: 0}} transition={{duration: 1.5, delay: 0.3}} className='w-full h-full  absolute backdrop-blur-[2px] '></motion.div>

          <div ref={ref} className='md:w-[80%] w-[90%] h-fit flex justify-center items-center '>
   {props.obj.isVideo ?         <div className='flex w-full items-center justify-center xl:p-[40px] p-[10px]  2xl:p-[4vw]'>
    <div className=' z-50'>
    <ProjectMainVideoVimeo url={obj.item} title={obj.videoTitle}></ProjectMainVideoVimeo>
    </div>
   {/* <ProjectMainVideo title={props.obj.videoTitle}  url={props.obj.item}></ProjectMainVideo> */}</div>:

<div className='w-full md:p-[20px] z-40'>
<Image ref={ref} unoptimized alt='something' width={100} height={100} className='w-full' src={obj.item}></Image> 
</div>  }         
        </div> 
  </div>
    );
}

export default Overlay;