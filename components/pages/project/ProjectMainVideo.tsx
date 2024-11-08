"use client"


import { Slider } from "@/components/ui/Slider"
import { useRef, useState } from "react"
import ReactPlayer from "react-player"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
/* import {FastRewind, FastForward} from "@material-ui/icons" */


const TestCrad  = ()=>{
    return <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card Description</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Card Content</p>
    </CardContent>
    <CardFooter>
      <p>Card Footer</p>
    </CardFooter>
  </Card>
  
}


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

export default function ProjectMainVideo(){
    const ref:any = useRef(null)
    const [videoStates, setVideoStates] = useState({isPlaying: false, volume: 0.5})

    const RewindFunction = ()=>{
        if(ref.current){
            ref.current.seekTo(ref.current.getCurrentTime() + 5 )
        }
    }

  

    return <div className="relative items-center justify-center flex">
      <div className="absolute ">
            {PlayPause(()=>(setVideoStates(prev =>  ({...prev, isPlaying: !prev.isPlaying}))))}
        </div> 
        
        <button onClick={()=>{
            RewindFunction()
        }} className="absolute">
            <RewindFastFoward></RewindFastFoward>
        </button>

        <ReactPlayer volume={videoStates.volume}  ref={ref} playing={videoStates.isPlaying}  controls={true} url={"https://vimeo.com/664718350"}></ReactPlayer>
    </div>
}