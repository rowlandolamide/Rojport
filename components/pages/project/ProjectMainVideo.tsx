"use client"

import { useContext } from "react"
import { Slider } from "@/components/ui/Slider"
import { useRef, useState } from "react"
import ReactPlayer from "react-player"
import useMediaQuery from "@/components/hooks/useMediaQuery"
import { MainContextWrapperType, ContextMain } from "@/components/global/ContextWrapper"

  
/* import {FastRewind, FastForward} from "@material-ui/icons" */




const RewindFastFoward = ()=>{
    return <div className="w-[30px]">
      {/*   <FastRewind></FastRewind>
        <FastForward></FastForward> */}
    </div>
}

const PlayPause = (onClick: ()=> void)=>{
    return <button onClick={()=>{onClick()}} className="bg-[#000AFF] px-[54px] py-2 text-white">PLAY ALPHA +</button>
}

const SliderVolume = (props: {setVolume: (val: number)=>void})=>{
    return <Slider value={[50]} onValueChange={(val)=>{
        props.setVolume(val[0]/10)
    }}  min={0} max={100} step={1} ></Slider>
}

export default function ProjectMainVideo({url}:{url: string}){
  const {handleOverlay,overlay } = useContext(ContextMain) as MainContextWrapperType
    const ref:any = useRef(null)
    const [videoStates, setVideoStates] = useState({isPlaying: false, volume: 0.5})

    const videoRef = useRef<ReactPlayer>(null!)

    const beginningHandler = () => {
      const videoTag = videoRef.current.getInternalPlayer() as HTMLVideoElement;
      videoTag.style.objectFit = 'cover';
    }

    const RewindFunction = ()=>{
        if(ref.current){
            ref.current.seekTo(ref.current.getCurrentTime() + 5 )
        }
    }

    const {x, y} = useMediaQuery()

    const returnWidth = ()=>{
    if( x > 1280){
      return "31.1vw"
    }else return "50vw"
    }

    return <div onClick={()=>{
      handleOverlay({...overlay, open: true, isVideo: true, item: url })
    }}  className="z-0 items-center justify-center flex w-full border border-black rounded-[10px] overflow-hidden">
    <div  className="absolute z-20">
            {PlayPause(()=>(setVideoStates(prev =>  ({...prev, isPlaying: !prev.isPlaying}))))}
        </div> 
         
      {/*   <button onClick={()=>{
            RewindFunction()
        }} className="absolute z-20">
            <RewindFastFoward></RewindFastFoward>
        </button> */}

      {  <ReactPlayer ref={videoRef} onStart={beginningHandler} height={"100%"} width={"100%"} style={{zIndex: 0, position: "relative", height: "auto !important", aspectRatio: "16/9"}}  volume={videoStates.volume}    url={"https://vimeo.com/664718350"}></ReactPlayer>}
    </div>
}