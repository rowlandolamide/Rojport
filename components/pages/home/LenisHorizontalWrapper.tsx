'use client'

import React, { ReactNode, useEffect } from 'react'
import { Lenis, ReactLenis } from '@studio-freight/react-lenis'
import { usePathname } from 'next/navigation'
import ReactPlayer from 'react-player'
import { useContext } from 'react'

import useMediaQuery from '@/components/hooks/useMediaQuery'
import { motion } from 'framer-motion'
import { useDragControls } from 'framer-motion'
import useRefWithCallback from '@/components/hooks/useRerenderCallback'

/* import CustomMouse from '@/components/global/CustomMouse'; */
import {
  ContextMain,
  MainContextWrapperType,
} from '@/components/global/ContextWrapper'

export default function LenisHorizontalWrapperAlt(props: {
  children: ReactNode
}) {
  /* New callback */

  const [lenisRef, setLenisRef] = React.useState<any>()
  const lenisRefCall: any = React.useCallback((node) => {
    if (node) {
      setLenisRef(node)
    }
  }, [])
  /* End */

  /* State useRef with useCallbackHook */
  const [toggle, refCallback, myRef] = useRefWithCallback<HTMLSpanElement>()
  //const lenisRef:any = useRef()
  /* End */

  /* Hooks */
  const pathname = usePathname()
  const { x } = useMediaQuery()
  const { setLenisCurrent } = useContext(ContextMain) as MainContextWrapperType

  /* End */

  /* Framer motion Draggable init */
  const controls = useDragControls()
  /* End */

  /* Global pathname variables */
  const isHome = pathname === '/'
  const isProjects = pathname.includes('projects')
  const isAbout = pathname === '/about'
  const isLaptop = x > 1279
  /* End */

  /* Lenis isHorizontal Variable */
  const isHorizontal = () => {
    if (isHome) {
      return false
    } else if (isProjects) {
      return false
    } else if (isAbout) {
      return false
    } else return false
  }
  /* End */

  /* Set lenisCurrent is Global Context that is Used in GSAPhorizontal wrapper */
  useEffect(() => {
    if (!lenisRef) return

    setLenisCurrent(lenisRef.lenis)
  }, [toggle, x, lenisRef, setLenisCurrent, pathname])
  /* End */

  useEffect(() => {
    if (!lenisRef) return
    if (!lenisRef.lenis) return

    setTimeout(() => {
      lenisRef.lenis.resize()
    }, 1500)
  }, [pathname, lenisRef])

  return (
 <>

 <iframe
  src="https://player.vimeo.com/video/1023347832"
  width="640"
  height="360"
  
  allow="autoplay; fullscreen; picture-in-picture"
  
></iframe>

   <iframe
      title="vimeo-player"
      src={"https://vimeo.com/1023347832?fl=pl&fe=sh"}
      width="640"
      height="360"
  
    
    
    >
    </iframe>
    <ReactPlayer  url={"https://vimeo.com/1023347832?fl=pl&fe=sh"} style={{zIndex: 999}} controls={true}  loop></ReactPlayer>
    <div ref={refCallback}>
      <div className="">
        {' '}
        <ReactLenis
          root
          ref={lenisRefCall}
          options={{
            autoResize: true,
            orientation: isHorizontal() ? 'horizontal' : 'vertical',
            syncTouch: true,
            gestureOrientation: 'both',
            lerp: 0.1,
          }}
        >
          {props.children}
        </ReactLenis>{' '}
      </div>
    </div></>
  )
}
