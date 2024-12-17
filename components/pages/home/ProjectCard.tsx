"use client"
import Image from "next/image"
import { useContext } from "react"
import Link from "next/link"
import { ContextMain, MainContextWrapperType } from "@/components/global/ContextWrapper"



interface ProjectCardProps {
    media ?: any
    name: string
    discipline: string[] | undefined
    isProject: boolean
    animate?: boolean
    slug: string
}

export default function ProjectCard(props: ProjectCardProps){
    const {x } = useContext(ContextMain) as MainContextWrapperType
    return   <Link onMouseDown={(e)=>{
        e.preventDefault();
   }} href={`/projects/${props.slug}`}><div draggable={false} className="hover:bg-bl xl:w-[25vw] w-[90vw] sm:w-[40vw] xl:min-w-[327px]  h-fit bg-[#FDFEC0] rounded-[5px] 3xl:p-[8px] p-[4px] border border-black duration-300">
       <div className="flex justify-between py-4 h-fit 3xl:px-4">
           <div className="xl:text-[3vw] 3xl:text-[1.7vw] 3xl:py-2 2xl:text-[2.2vw]  sm:text-[2.5vw] text-[7vw] font-PP pl-[2px] ">{props.name}</div>
           <div className="text-[11px] sm:pr-4 pr-2 2xl:text-[0.6vw] 3xl:text-[0.6vw] flex gap-x-2">{props.discipline && props.discipline.map((item, i)=>{
               return <div key={i}>{item}</div>
           })}</div>
           
       </div>
       <div className=" w-full overflow-hidden h-[47vw] sm:h-[20vw] xl:h-[13.7vw] xl:min-h-[198px]  border border-black rounded-[5px] ">
           <Image unoptimized unselectable={"off"} width={100} height={100} className="w-full scale-[1.2] image-contain " alt={props.name + "cover image"}  src={props.media || "null"}></Image>
       </div>
   </div> </Link>
}