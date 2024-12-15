"use client"
import React, { Suspense, useEffect, useRef, useState } from 'react';

import { MainContextWrapperType } from './ContextWrapper';
import Image from 'next/image';

import ProjectMainVideo from '../pages/project/ProjectMainVideo';




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
  <div className='w-screen h-screen flex items-center justify-center bg-gray-100/[0.5]'>

 {/*    <ReactPlayer playing  style={{display: rend ?"": "hidden"}} previewTabIndex={2} onReady={()=>{setRend(true)
   }}  controls={true} width={"80vw"} height={"100vh"}  url={props.obj.item}></ReactPlayer> */}
          <div ref={ref} className='md:w-[80%] w-[98%] h-screen flex justify-center items-center '>
   {props.obj.isVideo ?         <div className='flex w-full items-center justify-center xl:p-[40px] p-[10px]  2xl:p-[4vw]'>
   <ProjectMainVideo   url={props.obj.item}></ProjectMainVideo></div>:

<Image ref={ref} unoptimized alt='something' width={100} height={100} className='w-full' src={obj.item}></Image>   }         
        </div> 
  </div>
    );
}

export default Overlay;