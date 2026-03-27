"use client"
import React, { useEffect, useState }  from 'react'
import { usePathname } from 'next/navigation';
import { motion ,} from 'framer-motion';
import useMediaQuery from '../hooks/useMediaQuery';



const anim = {
    initial: {
        opacity: 0
    },
    open: (i) => ({
        opacity: 1,
        transition: {duration: 0.1, delay: window.innerWidth < 1280 ? 0.05 * i: 0.075 * i}
    }),
    closed: (i) => ({
        opacity: 0,
        transition: {duration: 0.1, delay: window.innerWidth < 1280 ? 0.05 * i: 0.075 * i}
    })
}

export default function PixelTransition({menuIsActive, dimensions, onAnimationEnd, baseText}: {menuIsActive: boolean, dimensions: {width: number, height: number}, onAnimationEnd: () => void, baseText?: string}) {
const { width, height } = dimensions;
    const [open, setOpen] = useState(false)
    const params = usePathname()
    const {x} = useMediaQuery()

    const values = ()=>{
        if(x > 1280){
            return {sizeOfBlocks: 0.05, height: `5vw`, width: `5vw`, number: 20}
        }
        else return {sizeOfBlocks: 0.1, height: `20vh`, width: `10vw`, number: 10}
    }
    const displayedText = !params.includes("project") ? "/" +params.split("/")[1]: params.split("/")[2] 
   

  useEffect(()=>{
    setOpen(true)
        setTimeout(()=>{setOpen(false)}, 3000)
    }, [])
  
    /**
     * Shuffles array in place (Fisher–Yates shuffle).
     * @param {Array} a items An array containing the items.
     */
    const shuffle = (a) => {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    const getBlocks = () => {
        const { innerWidth, innerHeight } = window;
        const blockSize =  innerWidth * values().sizeOfBlocks
        const nbOfBlocks = Math.ceil(innerHeight / blockSize);
        const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map( (_, i) => i))
        return shuffledIndexes.map( (randomIndex, index) => {
            return (
                <motion.div 
            style={{height: `${values().height}`}}
                    key={index} 
                    className={`w-[100%] h-[${values().height}] bg-[#000AFF]`}
                    variants={anim}
                    initial="initial"
                    animate={menuIsActive ? "open" : "closed"}
                    custom={randomIndex}
                />
            )
        })
    }

    return (
        <div style={{zIndex: 999}} className={`${open ? "h-[100vh] w-[100vw]": ""} overflow-hidden relative fixed z-50 top-0 left-0  flex pointer-none flex-wrap `}>
            {open &&
                [...Array(values().number)].map( (_, index) => {
                    return <div style={{width: `${values().width}`}} key={index} className={`w-[${values().width}] h-[100%] flex flex-col `}>
                        {
                            getBlocks()
                        }
                    </div>
                })
            }
            <motion.div animate={{opacity: 0,}} transition={{delay: 1.5}} className='text-white text-center w-full h-full font-PP text-[12vw] absolute overflow-hidden top-0 left-0 flex items-center justify-center'>
                {!baseText ? displayedText ==="/about" ?"/info" : displayedText : "/"}
            </motion.div>
        </div>
    )
}