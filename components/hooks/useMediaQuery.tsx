"use client"
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation';



function useMediaQuery() {
    const [media, setMedia] = useState({x:0, y: 0, otherStuff: false })
    const pathname = usePathname()

    useEffect(()=>{
        setMedia(prev => ({...prev, x: prev.x -1, otherStuff: !prev.otherStuff}))
    }, [pathname])

    useEffect(()=>{
        if(typeof window != "object") return
        
        const resize = ()=>{
            setMedia(prev => ({...prev, x: window.innerWidth, y: window.innerHeight,}))
        }
        resize()
        window.addEventListener("resize", resize )
        return ()=> window.removeEventListener("resize",resize)
    }, [])

    return media
}

export default useMediaQuery;