"use client"
import React, { Suspense, useEffect, useRef, useState } from 'react';

import { MainContextWrapperType } from './ContextWrapper';
import Image from 'next/image';
import ReactPlayer from 'react-player';



function Overlay(props: {obj:  MainContextWrapperType["overlay"], setIsVideoFalse: ()=> void, closeOverlay: ()=> void}) {
  const {obj} = props

    const ref: any = useRef(null)
    useEffect(()=>{
      const { setIsVideoFalse, closeOverlay} = props
        const onClick = (e)=>{ 
            if(!ref) return
            if(!ref.current) return  
            if (ref.current.contains(e.target)){
                console.log("cll")
              // Clicked in box
            } else{
              // Clicked outside the box
              closeOverlay()

            }
          }
        window.addEventListener('mousedown', onClick);
()=> {
    window.removeEventListener("mousedown", onClick)
    setIsVideoFalse()
}
    }, [])


   

    const [rend, setRend] = useState(false)

    return (
  <div className='w-screen h-screen flex items-center justify-center bg-gray-100/[0.5]'>
          <div ref={ref} className='w-[80%] h-screen flex justify-center items-center '>
   {props.obj.isVideo ?         <div className='flex items-center justify-center'><div  className={`${rend ? "hidden": ""} w-full h-[500px] animate-pulse bg-gray-400`}></div> <ReactPlayer style={{display: rend ?"": "hidden"}} previewTabIndex={2} onReady={()=>{setRend(true)
   }}  controls width={"80vw"} height={"100vh"} url={props.obj.item}></ReactPlayer></div>:

<Image ref={ref} unoptimized alt='something' width={100} height={100} className='w-fit h-screen' src={obj.item}></Image>   }         
        </div>
  </div>
    );
}

export default Overlay;