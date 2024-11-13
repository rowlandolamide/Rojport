"use client"
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';



function useMediaQuery() {
    const [media, setMedia] = useState({x:0, y: 0})

    useEffect(()=>{
        if(typeof window != "object") return
        const resize = ()=>{
            setMedia(prev => ({x: window.screenX, y: window.screenY}))
        }
        window.addEventListener("resize", resize )
        return ()=> window.removeEventListener("resize",resize)
    }, [])

    return media
}

export default useMediaQuery;