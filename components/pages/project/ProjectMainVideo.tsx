"use client"

import { useContext, useEffect } from "react"

import { useRef, useState } from "react"
import ReactPlayer from "react-player"
import React from 'react'
import useMediaQuery from "@/components/hooks/useMediaQuery"
import { Draggable } from "gsap/Draggable";
import {gsap} from "gsap"
import {FastForward, Pause, Play} from "lucide-react"

import { MainContextWrapperType, ContextMain } from '@/components/global/ContextWrapper';


gsap.registerPlugin(Draggable)





const RewindFastFoward = (props: {handlePausePlay: ()=> void, isPlaying: boolean, handleRewind: ()=> void, handleFastForward: ()=> void})=>{
    return <div className=" flex gap-x-4 duration-300 2xl:scale-[2] 3xl:scale-[2.5]">
   <button onClick={()=>{
        props.handleRewind()
    }}>
   <FastForward   className="rotate-[180deg] hover:text-bl"></FastForward>
   </button>
    <button  onClick={()=>{props.handlePausePlay()}}>{props.isPlaying ? <Pause className="hover:text-bl"></Pause>: <Play className="hover:text-bl"></Play>}</button>
 <button onClick={()=>{
        props.handleFastForward()
    }}>
 <FastForward className="hover:text-bl "></FastForward> 
 </button>
    </div>
}


const Seek = (props: {ref: any, width: number, draggableWidth: number})=>{
    return <div style={{width: props.width}} className={` bg-white/[0.37] h-[3px] 2xl:h-[0.2vw] relative items-center flex seek`}>
        <div ref={props.ref} className="absolute h-[14px] 2xl:h-[0.4vw] rounded-[2px] shadow-md w-4 bg-blue-500 z-20"></div>
        <div style={{width: props.width, marginLeft: -props.width}} className={`h-[3px] 2xl:h-[0.2vw] progress-indicator   z-10 bg-bl`}>

        </div>
    </div>
}



export default function ProjectMainVideo({url}:{url: string}){

    /* Main Context */
    const { closeOverlay, lenisCurrent} = useContext(ContextMain) as MainContextWrapperType
    /* End */

    
   
    

    /* On Hover */
    const [isHovered, setIsHovered] = useState(false)
    /* End */


    const {x,} = useMediaQuery()

    /* Is Video Playing */
    const [isPlaying, setIsPlaying] = useState(false)
    /* Set is Video Playing */

    /* Current Second */
    const [played, setPlayed] = useState(0)
    /* End */
    
    

    /* Seek Draggable */
    const seekDraggable: any = useRef(null)
    const seekDragInstance: any =useRef(null)
    /* End */

    /* Video Container Ref */
    const videoContainerRef:any = useRef(null)
    /* End */

    const videoRef = useRef<ReactPlayer>(null!)

    /* Width of Seeking Draggable */
    const widthOfSeekingDraggable = 32
    /* End */

    const videoContainerWidth = videoContainerRef.current ? Math.floor(videoContainerRef.current.getBoundingClientRect().width) -widthOfSeekingDraggable : 300
   

    useEffect(()=>{
       if(!videoContainerRef.current) return
  
        seekDragInstance.current = Draggable.create(seekDraggable.current, {
            type: "x",
            bounds: {minX: 0, maxX: videoContainerWidth - 32},
            inertia: false,
            allowEventDefault: true,
            edgeResistance: 0.65,
           
    
            onDragEnd: ()=>{
               
                if(videoContainerRef.current){
                    console.log()
                }
                
                videoRef.current.seekTo(seekDragInstance.current[0].x/seekDragInstance.current[0].maxX)
                
            }
        })

    }, [seekDragInstance, seekDraggable, videoContainerRef, x, videoContainerWidth])
 
   useEffect(()=>{
    
 let ctx = gsap.context(()=>{
    const draggableCurrent = seekDragInstance.current[0]
/* 
    if(draggableCurrent.isPressed) return */
       
    const gsapTime =  gsap.timeline({})

    const durationSeconds =   videoRef.current.getDuration() 
    const playedSeconds  = videoRef.current.getCurrentTime()

  

    if( draggableCurrent.isPressed){
       
      gsapTime.to(".progress-indicator", {x:  draggableCurrent.x}, 0)
    }else{
      gsapTime.to(seekDraggable.current, {x: videoContainerWidth * playedSeconds/durationSeconds, overwrite: true }, 0).to(".progress-indicator", {x:  videoContainerWidth * playedSeconds/durationSeconds , overwrite: true, }, 0)
    }

 }, ".seek")
      
return ()=>{
    
    ctx.clear()
}
     
    }, [played,  videoContainerWidth, x,]) 

  /* const {handleOverlay,overlay } = useContext(ContextMain) as MainContextWrapperType */

    const [videoStates, setVideoStates] = useState({isPlaying: false, volume: 0.5})

 

    const beginningHandler = () => {
      const videoTag = videoRef.current.getInternalPlayer() as HTMLVideoElement;
     
      videoTag.style.objectFit = 'cover';
    }

    const RewindFunction = ()=>{
        if(videoRef.current){
            videoRef.current.seekTo(videoRef.current.getCurrentTime() - 5 )
        }
    }
    const FastForwardFunction = ()=>{
        if(videoRef.current){
            videoRef.current.seekTo(videoRef.current.getCurrentTime() + 5 )
        }
    }

 

  

    return <div onMouseLeave={()=>{
        setIsHovered(false)
    }} onMouseOver={()=>{
        setIsHovered(true)
    }} ref={videoContainerRef}    className="z-0 items-center relative 2xl:p-[0.2vw] 2xl:pt-0 pt-0 p-[2px] bg-bl justify-center flex-col flex w-full border border-black rounded-[3px] overflow-hidden">
<div className="text-white bg-bl text-[0.55vw] 2xl:text-[0.65vw] 3xl:text-[0.75vw] flex justify-between w-full px-2 items-center ">
<div  className=" self-center ">ALPHA - THE FUTURE LAPTOP</div>
<button onClick={()=>{
    closeOverlay()
}} className="text-[1vw] 3xl:text-[1.1vw] self-center text-[#72FF41] hover:text-red-500 duration-300">x</button>
</div>
   
  <div  className={`${!isHovered ? "opacity-0" : "opacity-1"} duration-300 absolute z-20`}>
            <RewindFastFoward handleFastForward={FastForwardFunction} handleRewind={RewindFunction} isPlaying={isPlaying} handlePausePlay={()=>{
                setIsPlaying(prev => !prev)
            }}></RewindFastFoward>
        </div> 
        <div className={`${!isHovered ? "opacity-0" : "opacity-1"} duration-300 absolute bottom-[40px] z-20`}>
            <Seek draggableWidth={widthOfSeekingDraggable} width={videoContainerWidth} ref={seekDraggable}></Seek>
        </div>

  <div className="rounded-[3px] overflow-hidden w-full">
  {  <ReactPlayer onProgress={(state)=>{
   

    setPlayed(state.played)
  }}  playing={isPlaying} playsinline={true}  ref={videoRef} controls={false} onStart={beginningHandler} height={"100%"} width={"100%"} style={{zIndex: 0, position: "relative", height: "auto !important", aspectRatio: "16/9", borderRadius: 3}}  volume={videoStates.volume}    url={url}></ReactPlayer>}
  </div>
    </div>
}