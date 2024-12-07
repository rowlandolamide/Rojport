"use client"

import { useContext, useEffect } from "react"
import { Slider } from "@/components/ui/Slider"
import { useRef, useState } from "react"
import ReactPlayer from "react-player"
import React from 'react'
import useMediaQuery from "@/components/hooks/useMediaQuery"
import { Draggable } from "gsap/Draggable";
import {gsap} from "gsap"
import {FastForward, Pause, Play} from "lucide-react"
import Image from "next/image"
import { MainContextWrapperType, ContextMain } from '@/components/global/ContextWrapper';


gsap.registerPlugin(Draggable)

import closeIconForVideo from "../../../app/public/Icons/closeIconForVideo.svg"



const RewindFastFoward = (props: {handlePausePlay: ()=> void, isPlaying: boolean, handleRewind: ()=> void, handleFastForward: ()=> void})=>{
    return <div className=" flex gap-x-4">
   <button onClick={()=>{
        props.handleRewind()
    }}>
   <FastForward  className="rotate-[180deg] "></FastForward>
   </button>
    <button onClick={()=>{props.handlePausePlay()}}>{props.isPlaying ? <Pause></Pause>: <Play></Play>}</button>
 <button onClick={()=>{
        props.handleFastForward()
    }}>
 <FastForward ></FastForward> 
 </button>
    </div>
}

const PlayPause = (onClick: ()=> void)=>{
    return <button onClick={()=>{onClick()}} className="hidden bg-[#000AFF] px-[54px] py-2 text-white">PLAY ALPHA +</button>
}

const Seek = (props: {ref: any, width: number, draggableWidth: number})=>{
    return <div style={{width: props.width}} className={` bg-white/[0.37] h-[3px] relative items-center flex`}>
        <div ref={props.ref} className="absolute h-2 w-4 bg-blue-500 z-20"></div>
        <div style={{width: props.width, marginLeft: -props.width}} className={`h-[3px] progress-indicator   z-10 bg-bl`}>

        </div>
    </div>
}

const SliderVolume = (props: {setVolume: (val: number)=>void})=>{
    return <Slider value={[50]} onValueChange={(val)=>{
        props.setVolume(val[0]/10)
    }}  min={0} max={100} step={1} ></Slider>
}

export default function ProjectMainVideo({url}:{url: string}){

    /* Main Context */
    const {overlay, handleOverlay} = useContext(ContextMain) as MainContextWrapperType
    /* End */

    const gsapTime =  gsap.timeline({})

    /* On Hover */
    const [isHovered, setIsHovered] = useState(false)
    /* End */


    const {x, y} = useMediaQuery()

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
            onDragEnd: ()=>{
               
                if(videoContainerRef.current){
                    console.log()
                }
                
                videoRef.current.seekTo(seekDragInstance.current[0].x/seekDragInstance.current[0].maxX)
            }
        })

    }, [seekDragInstance, seekDraggable, videoContainerRef, x, videoContainerWidth])

   useEffect(()=>{
      const durationSeconds =   videoRef.current.getDuration() 
      const playedSeconds  = videoRef.current.getCurrentTime()

      gsapTime.to(seekDraggable.current, {x: videoContainerWidth * playedSeconds/durationSeconds }).to(".progress-indicator", {x:  videoContainerWidth * playedSeconds/durationSeconds })
    }, [played, gsapTime, videoContainerWidth]) 

  /* const {handleOverlay,overlay } = useContext(ContextMain) as MainContextWrapperType */
    const ref:any = useRef(null)
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

 

    const returnWidth = ()=>{
    if( x > 1280){
      return "31.1vw"
    }else return "50vw"
    }

    return <div onMouseLeave={()=>{
        setIsHovered(false)
    }} onMouseOver={()=>{
        setIsHovered(true)
    }} ref={videoContainerRef} onClick={()=>{
      handleOverlay({...overlay, open: true, isVideo: true, item: url })
    }}   className="z-0 items-center relative 2xl:p-[0.2vw]  p-[2px] bg-bl justify-center flex-col flex w-full border border-black rounded-[3px] overflow-hidden">
<div className="text-white bg-bl text-[0.55vw] 2xl:text-[0.65vw] flex justify-between w-full px-2 items-center">
<div  className="self-start ">ALPHA - THE FUTURE LAPTOP</div>
<button><Image src={closeIconForVideo.src} width={30} height={30} className="w-[0.48vw] 2xl:w-[0.55vw] " alt="closeIcon" ></Image></button>
</div>
   
  <div  className={`${!isHovered ? "opacity-0" : "opacity-1"} duration-300 absolute z-20`}>
            <RewindFastFoward handleFastForward={FastForwardFunction} handleRewind={RewindFunction} isPlaying={isPlaying} handlePausePlay={()=>{
                setIsPlaying(prev => !prev)
            }}></RewindFastFoward>
        </div> 
        <div className={`${!isHovered ? "opacity-0" : "opacity-1"} duration-300 absolute bottom-[40px] z-20`}>
            <Seek draggableWidth={widthOfSeekingDraggable} width={videoContainerWidth} ref={seekDraggable}></Seek>
        </div>
{/* <Video  src={getStarted}></Video> */}
  <div className="rounded-[3px] overflow-hidden w-full">
  {  <ReactPlayer onProgress={(state)=>{
   

    setPlayed(state.played)
  }}  playing={isPlaying} playsinline={true}  ref={videoRef} controls={false} onStart={beginningHandler} height={"100%"} width={"100%"} style={{zIndex: 0, position: "relative", height: "auto !important", aspectRatio: "16/9", borderRadius: 3}}  volume={videoStates.volume}    url={url}></ReactPlayer>}
  </div>
    </div>
}