"use client"
import React, { useEffect, useState }  from 'react'

import { motion } from 'framer-motion';

const anim = {
    initial: {
        opacity: 0
    },
    open: (i) => ({
        opacity: 1,
        transition: {duration: 0.1, delay: 0.08 * i}
    }),
    closed: (i) => ({
        opacity: 0,
        transition: {duration: 0.1, delay: 0.08 * i}
    })
}

export default function PixelTransition({menuIsActive, dimensions, onAnimationEnd}) {
    const { width, height } = dimensions;
    const [open, setOpen] = useState(false)

    

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
        const blockSize = innerWidth * 0.05;
        const nbOfBlocks = Math.ceil(innerHeight / blockSize);
        const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map( (_, i) => i))
        return shuffledIndexes.map( (randomIndex, index) => {
            return (
                <motion.div 
            
                    key={index} 
                    className={`w-[100%] h-[5vw] bg-blue-500`}
                    variants={anim}
                    initial="initial"
                    animate={menuIsActive ? "open" : "closed"}
                    custom={randomIndex}
                />
            )
        })
    }

    return (
        <div className={`${open ? "h-[100vh] w-[100vw]": ""} overflow-hidden relative fixed z-50 top-0 left-0 flex pointer-none `}>
            {open &&
                [...Array(20)].map( (_, index) => {
                    return <div key={index} className={`w-[5vw] h-[100%] flex flex-col `}>
                        {
                            getBlocks()
                        }
                    </div>
                })
            }
        </div>
    )
}