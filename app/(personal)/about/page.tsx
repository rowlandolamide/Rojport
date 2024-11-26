"use client"
/* import dynamic from 'next/dynamic' */
/* import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import { AboutPage } from '@/components/pages/about/AboutPage'
import { getAboutPage } from '@/sanity/loader/loadQuery' */
/* const HomePagePreview = dynamic(
  () => import('@/components/pages/home/HomePagePreview'),
) */

import FungSwayIcon from "../../../app/public/Icons/FungSway.svg"
import SmilingFace from "../../../app/public/Icons/Smile Icon.svg"
import { useDragControls , motion} from "framer-motion"
import {gsap} from "gsap"
import {Draggable} from "gsap/Draggable"
import { useEffect, useRef } from "react"
import Image from "next/image"

gsap.registerPlugin(Draggable)

const DeskTopDesignDisplay = (props: {text: string})=>{

  return <div className="rounded-[5px] p-[4px] pt-0 bg-[#6599FF]">
    <div className="flex justify-end py-[8px]"><Image width={12} className="" height={15}  alt="About" src={FungSwayIcon.src}></Image></div>

    <motion.div  className="px-[35px] py-[30px] font-Ingram text-[11px] leading-[21px] border border-black rounded-[4px] bg-[#F2F2F2]">
      <div><Image width={37} height={37} alt="smilling face" className="pb-4" src={SmilingFace.src}></Image></div>
      {props.text}</motion.div>
  </div>
}

export default function IndexRoute() {

  const dragInstance:any = useRef(null)
  const ref:any = useRef()

  /* Gsap Try */
  useEffect(()=>{
    if(!ref.current) return
    dragInstance.current = Draggable.create(ref.current, {
      type: "x,y",
      inertia: true
    })


  }, [ref])




  /* Framer motion Draggable */
  const control = useDragControls()
/*   const initial = await getAboutPage() */
/* 
  if (draftMode().isEnabled) {
    return <HomePagePreview initial={initial} />
  } */

 /*  if (!initial.data) {
    return redirect('/')
  } */

    const textOne = "I'm Olamide Rowland – a motion design enthusiast and creative problem-solver. I thrive on empowering brands, startups, and companies to flourish. From collaborating with top studios like Yellow Lab and Funken Studio to leading as Creative Director at Brass Bank, each project fuels my growth and innovation.let’s collaborate on something Olamide@rojthegoat.com"

  return <div className="h-full absolute top-0 ">
<div className=" w-fit h-full flex relative items-center  ">

<div ref={ref} className="absolute left-[6.7vw] w-[345px] z-50">
<DeskTopDesignDisplay text={textOne}></DeskTopDesignDisplay>
</div>

<div className="flex flex-col xl:text-[13.9vw] 2xl:leading-[7.5vw] 2xl:text-[10vw] absolute right-[41vw]  xl:leading-[10vw]  h-[90vh] top-0  justify-center">
  <span className="font-PPn">ROJ’ THE GOAT</span>
  <span className="font-PPn">MOTION DESIGNER</span>
  <span className="font-PPn">ART DIRECTOR</span>
</div>
  <div  className="w-[300px] h-[400px] bg-pink-500 absolute top-[30px] left-[100px]"></div>
  <div className="w-[300px] h-[400px] "></div>
  <div className="w-[300px] h-[400px] "></div>
  <div className="w-[300px] h-[400px] "></div>
  <div className="w-[300px] h-[400px] "></div>
  <div className="w-[300px] h-[400px] "></div>
  <div className="w-[300px] h-[400px] "></div>
  <div className="w-[300px] h-[400px] "></div>
  <div className="w-[300px] h-[400px] "></div>
  <div className="w-[300px] h-[400px] "></div>

      </div>
    {/* <AboutPage data={initial.data} /> */}</div>
}
