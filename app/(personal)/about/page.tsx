"use client"



import SmilingFace from "../../../app/public/Icons/Smile Icon.svg"
import SunIcon from "../../../app/public/Icons/Sun Icon.svg"
import {  motion} from "framer-motion"
import HorizontalBackground from "../../public/Images/Horizontal Lines Container.svg"
import ProfilePicture from "../../../app/public/Images/Profile Image.png"
import MicDrop from "../../public/Images/Mic Drop.png"
import {gsap} from "gsap"
import {Draggable} from "gsap/Draggable"
import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useContext } from "react"
import useMediaQuery from "@/components/hooks/useMediaQuery"
import useCurrentTime from "@/components/hooks/useCurrentTime"
import { MainContextWrapperType, ContextMain } from "@/components/global/ContextWrapper"

gsap.registerPlugin(Draggable)

const DeskTopDesignDisplay = (props: {text: ReactNode , header ?: string, Icon ?: string})=>{

  return <div className=" rounded-[5px] cursor-grab p-[4px] 2xl:p-[0.3vw] pt-0  border border-black bg-[#F2F2F2]">


    <motion.div  className="px-[35px] cursor-grab py-[30px] 2xl:py-[2vw] 2xl:px-[2.1vw] font-Ingram text-[11px] leading-[21px] xl:text-[0.7vw] xl:leading-[1.4vw]  ">
      <div className="justify-between cursor-grab items-center flex xl:text-[1.6vw] text-[24px]">  <div>{props.header}</div><Image width={37} height={37} alt="smilling face" className={`${props.Icon ?"": "hidden"} pb-4 xl:w-[2.4vw]`} src={props.Icon ? props.Icon : SmilingFace.src}></Image></div>
      {props.text}</motion.div>
  </div>
}

export default function IndexRoute() {


  const {x} = useMediaQuery()
  const isLaptop = x> 1279

  const {lenisCurrent} = useContext(ContextMain) as MainContextWrapperType
  
 /* Current Time */
 const value = useCurrentTime()
 /* End */


  const dragInstanceOne:any = useRef(null)
  const ref:any = useRef()

  /* Drag Instance Two */
  const refTwo: any = useRef()
  const dragInstanceTwo: any = useRef()
  /* End */

  /* Drag Instance Three */
  const refThree:any = useRef()
  const dragInstanceThree: any = useRef()
  /* End */

  /* Drag Instance Four */
  const refFour:any = useRef()
  const dragInstanceFour: any = useRef()
  /* End */

  /* Gsap Try */
  useEffect(()=>{
const ctx = gsap.context(()=>{
  if(!ref.current) return
  dragInstanceOne.current = Draggable.create(ref.current, {
    type: "x,y",
    inertia: true,
    cursor: "inherit",
    activeCursor: "grab"
  })

  if(!refTwo.current) return
  dragInstanceTwo.current = Draggable.create(refTwo.current, {
    type: "x,y",
    inertia: true
  })

  if(!refThree.current) return
  dragInstanceThree.current = Draggable.create(refThree.current, {
    type: "x,y",
    inertia: true
  })

  if(!refFour.current) return
  dragInstanceFour.current = Draggable.create(refFour.current, {
    type: "x,y",
    inertia: true
  })
})
/* End */

return ()=> ctx.clear()
  }, [ref, refFour, refTwo, refThree, lenisCurrent])

  /* ContainerRef */
  const [containerRef, setContainerRef] = useState<any>()

  const containerRefCallBack: any = useCallback((node)=>{
    if(node){
      setContainerRef(node)
    }
  }, [])
 
  /* End */

useEffect(()=>{
  if(lenisCurrent && containerRef){
    if(isLaptop){
      lenisCurrent.scrollTo(0)
    }
    
    lenisCurrent.resize()
  }
}, [lenisCurrent, containerRef])


    

    const textThree = "When I'm not working, I like to watch movies from the 1980s, collect old cameras, and add to my ever-growing collection of toys. I think being creative is a way of life, so I'm always looking for new ideas and ways to express myself."
    const textTwo = <div>Focus: Motion Design | Art Direction | Web Design | Animation | Brand Design <div className="mt-4">Capabilities: Proficient in Cinema 4D, Redshift, Octane, Arnold, X Particles, Blender, After Effects, Illustrator, Davinci Resolve, web design with Figma</div></div>
    const textOne = <div>I&apos;m Olamide Rowland – a motion design enthusiast and creative problem-solver. I thrive on empowering brands, startups, and companies to flourish. From collaborating with top studios like Yellow Lab and Funken Studio to leading as Creative Director at Brass Bank, each project fuels my growth and innovation. <div className="mt-4">let&apos;s collaborate on something Olamide@rojthegoat.com</div></div>

  return <div>
    <div ref={containerRefCallBack} className="xl:block hidden w-[200vw]">
  {/* background Image */}
  <Image width={100} height={100} alt="Horizontal Bg" className="w-full  fixed left-0 h-full scale-y-[2] z-30 top-0" unoptimized src={HorizontalBackground.src}></Image>
  {/* End */}
    <div className="h-full absolute top-0 overflow-hidden w-[200vw] ">
      
<div className=" w-full  h-full flex relative items-center  ">

<div ref={ref} className="absolute  left-[6.7vw] 2xl:w-[23.9vw] w-[345px] z-30 ">
<DeskTopDesignDisplay text={textOne}></DeskTopDesignDisplay>
</div>
<div ref={refTwo} className="grabb cursor-grab absolute right-[70vw] 2xl:w-[20vw] w-[310px] z-30">
<DeskTopDesignDisplay Icon={SmilingFace.src} header="CAPABILITIES" text={textTwo}></DeskTopDesignDisplay>
</div>
<div ref={refThree} className="absolute right-[7vw] 2xl:w-[20vw] w-[310px] z-30">
<DeskTopDesignDisplay Icon={SunIcon.src} header="BONUS" text={textThree}></DeskTopDesignDisplay>
</div>

<div ref={refFour} className="absolute right-[27.2vw]  z-30">
<Image width={100} unoptimized height={100} alt="Mic" className="w-[550px] 2xl:w-[38vw] border border-black rounded-[4px]" src={MicDrop.src}></Image>
</div>

<div className=" flex flex-col  xl:text-[13.9vw] 2xl:leading-[7.5vw] 2xl:text-[11vw] absolute left-[41vw]  xl:leading-[10vw]  h-[90vh] top-0  justify-center">
  <span className="font-PPn flex items-center"><Image alt="" width={100} height={100} className="rounded-[10px] h-full w-fit mt-2" src={ProfilePicture.src}></Image>ROJ’ THE GOAT</span>
  <span className="font-PPn font-thin">MOTION DESIGNER</span>
  <span className="font-PPn flex"><span className="text-bl">✨</span>ART DIRECTOR</span>
</div>
  <div  className="w-[300px] h-[400px] bg-pink-500 absolute top-[30px] left-[100px]"></div>
  


      </div>
    </div>
  </div>
  <div className="xl:hidden ">
<div className="px-[20px]">   <div className=" overflow-hidden rounded-[4px]"> <Image unoptimized src={ProfilePicture.src} width={100} height={100} className="w-full rounded-[4px] scale-[1.1]" alt="Roj's picyure"></Image></div></div>
<div className="flex items-center justify-center text-[12vw] text-center flex-col leading-[8.6vw] mt-[20px]">   <div>  <span className="font-PPn ">ROJ’ THE GOAT  <div> MOTION DESIGNER <span className="text-bl">✨ </span></div>ART DIRECTOR <span className="text-bl"></span></span>
</div >

</div>
<div className="flex flex-col items-center justify-center px-[20px] mt-[40px] gap-y-[30px] w-full text-[14px] max-w-[600px] mx-auto">
Lagos, Nigeria  {value.getUTCHours()+ 1}:{value.getUTCMinutes()} GMT+1
<DeskTopDesignDisplay text={textOne}></DeskTopDesignDisplay>
<DeskTopDesignDisplay header="CAPABILITIES" Icon={SmilingFace.src}  text={textTwo}></DeskTopDesignDisplay>
<DeskTopDesignDisplay header="BONUS" text={textThree} Icon={SunIcon.src}></DeskTopDesignDisplay>

<Image width={100} unoptimized height={100} alt="Mic" className="w-full border border-black rounded-[4px]" src={MicDrop.src}></Image>
</div>

  </div>
  <div>

  </div>
  </div>
}
