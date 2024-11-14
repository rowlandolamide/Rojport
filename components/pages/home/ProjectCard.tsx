"use client"
import Image from "next/image"
import { useContext } from "react"
import { ContextMain, MainContextWrapperType } from "@/components/global/ContextWrapper"



interface ProjectCardProps {
    media ?: any
    name: string
    discipline: string
}

export default function ProjectCard(props: ProjectCardProps){
    const {x } = useContext(ContextMain) as MainContextWrapperType
    return <div draggable={false} className="xl:w-[25vw] w-[24vw] xl:min-w-[327px]  h-fit bg-[#FDFEC0] rounded-[5px] p-[4px] border border-black duration-300">
        <div className="flex justify-between py-4">
            <div className="text-[3vw] font-PP">{props.name}</div>
            <div className="text-[10px] pr-4">{props.discipline} -{x}</div>
            
        </div>
        <div className="w-full overflow-hidden h-[25vh] xl:h-[27.5vh] xl:min-h-[198px]  border border-black rounded-[5px] ">
            <Image unoptimized width={100} height={100} className="w-full image-cover  " alt={props.name + "cover image"}  src={props.media || "null"}></Image>
        </div>
    </div>
}