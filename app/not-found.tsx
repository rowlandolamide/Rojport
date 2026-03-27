"use client"
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Navbar } from '@/components/global/Navbar'
import { Footer } from '@/components/global/Footer'
import not_found from '@/public/404.svg'
import { useRouter } from 'next/navigation'
import PageTransitionEffect, {PageTransitionStaticEffect} from '@/components/global/PageTransitionEffect'
import {motion} from 'framer-motion'


export default function NotFound() {
    const router = useRouter()
    const [trigger, setTrigger] = useState(false)
    const reff = useRef<HTMLAnchorElement>(null)
 



  return (
    <div className={`flex min-h-screen flex-col delay-75 duration-75 text-white ${!trigger ? 'bg-bl' : 'bg-white'}`}>
        <PageTransitionStaticEffect trigger={trigger}>
            <></>
        </PageTransitionStaticEffect>
        
    
      <div className="flex flex-col items-center justify-center w-full h-screen px-[20px] sm:px-0">
   <div className='max-w-[620px] sm:w-[42vw] '>
         <img className='self-start sm:w-fit w-[42vw]' src={not_found.src} alt="" />
        <p className="text-base sm:text-xl font-light tracking-widest mb-8 leading-loose">
            It seems like your PC wandered into the wrong neighborhood in cyberspace. Don&apos;t worry, we&apos;ll kindly guide you back to the right path!
        </p>
        
        <div  className='p-2  overflow-hidden w-full h-[29px] rounded-[4px] border duration-100 border-white'>
            <motion.div onAnimationComplete={()=>{
                if(reff.current){
                setTrigger(true)
                 setTimeout(()=>{
                    reff.current?.click()
                 },2000)
                }
          /*       router.push('/about') */
            }} animate={{width: `100%`}} transition={{duration: 5, delay: 1}} initial={{width: '0%'}} className={`h-full rounded-[4px] bg-white duration-300`}></motion.div>

            
        </div>

        <Link ref={reff} href="/" className='text-white opacity-0 font-light tracking-widest text-base sm:text-xl'>About</Link>
   </div>
      </div>
     
   
    </div>
  )
}
