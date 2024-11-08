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
    return <div className="w-[23.2vw]  hover:bg-red-500  h-fit bg-[#FDFEC0] rounded-[5px] p-[4px] border border-black ">
        <div className="flex justify-between py-4">
            <div className="text-[3.5vw]">{props.name}</div>
            <div className="text-[10px]">{props.discipline} -{x}</div>
            
        </div>
        <div className="w-full  h-[14.3vw] border border-black rounded-[5px]"></div>
    </div>
}