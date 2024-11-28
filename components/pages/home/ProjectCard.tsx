"use client"
import Image from "next/image"
import { useContext } from "react"
import Link from "next/link"
import { ContextMain, MainContextWrapperType } from "@/components/global/ContextWrapper"



interface ProjectCardProps {
    media ?: any
    name: string
    discipline: string
    isProject: boolean
    animate?: boolean
    slug: string
}

export default function ProjectCard(props: ProjectCardProps){
    const {x } = useContext(ContextMain) as MainContextWrapperType
    return <>
    {props.isProject ?<div> <Link href={`/projects/${props.slug}`}><div draggable={false} className="removeHigh hover:bg-bl xl:w-[25vw] w-[80vw] sm:w-[24vw] xl:min-w-[327px]  h-fit bg-[#FDFEC0] rounded-[5px] 3xl:p-[6px] p-[4px] border border-black duration-300">
        <div className="flex justify-between py-4 h-fit">
            <div className="xl:text-[3vw] 3xl:text-[1.7vw] 3xl:py-2 2xl:text-[2.2vw]  sm:text-[2.5vw] text-[8vw] font-PP ">{props.name}</div>
            <div className="text-[10px] pr-4 2xl:text-[0.6vw] 3xl:text-[0.6vw]">3d design</div>
            
        </div>
        <div className=" w-full overflow-hidden h-[41vw] sm:h-[12vw] xl:h-[13.7vw] xl:min-h-[198px]  border border-black rounded-[5px] ">
            <Image unoptimized unselectable={"off"} width={100} height={100} className="w-full scale-[1.2] image-contain " alt={props.name + "cover image"}  src={props.media || "null"}></Image>
        </div>
    </div> </Link></div>:            <div className="w-0 xl:w-full h-full hidden xl:flex items-center justify-center ">   <Image unoptimized width={100} height={100} className={`w-2/5  image-cover h-fit ${props.animate ? "animate-spin": ""}`} alt={props.name + "cover image"}  src={props.media || "null"}></Image></div>}
    
    </>
}