"use client"
import Link from 'next/link'
import useCurrentTime from "@/components/hooks/useCurrentTime"
import { usePathname } from 'next/navigation'

import type {  SettingsPayload } from '@/types'
import { cn } from '@/lib/utils'

interface NavbarProps {
  data?: SettingsPayload
  title?: string | null
  logo?: any | null
}
export default function Navbar(props: NavbarProps) {


   /* Current Time */
 const value = useCurrentTime()
 /* End */

 const pathname = usePathname()

 

 const isStudio = pathname.includes("studio")






return (
    <div className={`${isStudio ? "hidden": "flex "} text-black z-50 fixed w-screen xl:w-full flex-wrap justify-between items-center gap-x-5 px-[5vw]   py-4 md:px-5 md:py-4 lg:px-5`}>
     <div className='flex justify-between sm:px-2 xl:px-4 w-full items-center'>
     <Link href={"/"} scroll={false} className=' hover:text-bl top-4 right-4 text-[32px] md:text-[40px] font-PPn 3xl:text-[1.8vw]'>ROJ THE GOAT</Link>
      <span className=' mx-auto md:block hidden TN '>

      Motion Designer & Art Director 
      <div>
      Lagos, Nigeria: {value.getUTCHours() + 1}:{value.getUTCMinutes()} WAT</div> 
      </span>
    <div className='flex gap-x-4 xl:gap-x-8 items-center  text-[14px] md:text-[1.7vw] 3xl:text-[1.4vw]'>
  {[{name: "Work", link: "/"}, {name: "Info", link: "/about"}].map((ite, i)=>{
    return <Link className={cn("hover:text-bl duration-300", pathname === ite.link ? "text-bl": "" )}scroll={false} key={i} href={ite.link}>{ite.name}</Link>
  })}
    </div>
     </div>
 
    </div>
  )
}
