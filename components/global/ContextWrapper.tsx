'use client'
import { createContext, useState } from 'react'
import useMouse from '@react-hook/mouse-position'
import { useRef } from 'react'
import { useCallback } from 'react'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Overlay from './Overlay'

const CustomMouse = dynamic(() => import('./CustomMouse'))
import { useMemo } from 'react'
import { loadHomePage } from '@/sanity/loader/loadQuery'
import dynamic from 'next/dynamic'

export interface MainContextWrapperType {
  x: string
  overlay: {
    open: boolean
    index: number
    item: string
    isVideo?: boolean
    videoTitle: string
  }
  handleOverlay: (
    obj: MainContextWrapperType['overlay'],
    isVideo?: boolean,
  ) => void
  handleMouseStateChange: (text: string | null, displayState: number) => void
  closeOverlay: () => void
  setVideoTitle: (videoTitle: string) => void

  mouseStates: {
    x: number
    y: number
    displayStatesObj: {
      text: string | null
      displayState: number
    }
  }

  lenisCurrent: any
  setLenisCurrent: (current: any) => void
}

export const ContextMain = createContext<MainContextWrapperType | null>(null)

function ContextWrapper({ children }: { children: React.ReactNode }) {
  const mouseref = useRef(null)
  const [lenisCurrent, setLenisCurrent] = useState(null)
  const mouse = useMouse(mouseref, { enterDelay: 100, leaveDelay: 100 })

  const [overlay, setOverlay] = useState<MainContextWrapperType['overlay']>({
    open: false,
    index: 0,
    item: '',
    videoTitle: '',
  })

  const handleMouseStateChange = (
    text: string | null,
    displayState: number,
  ) => {
    setDisplayStatesObj({ text, displayState })
  }
  const handleOverlay = useCallback(
    (obj: MainContextWrapperType['overlay']) => {
      setOverlay(obj)
    },
    [],
  )
  const [displayStatesObj, setDisplayStatesObj] = useState<{
    text: string | null
    displayState: number
  }>({ text: null, displayState: 0 })

  const setVideoTitle = useCallback((videoTitle: string) => {
    setOverlay((prev) => ({ ...prev, videoTitle }))
  }, [])

  const setLenis = useCallback((current: any) => {
    setLenisCurrent(current)
  }, [])

  const closeOverlay = useCallback(() => {
    setOverlay((prev) => ({ ...prev, open: false }))
  }, [])

  return (
    <div className="relative" ref={mouseref}>
      <ContextMain.Provider
        value={{
          x: 'Job',
          setVideoTitle: setVideoTitle,
          handleMouseStateChange,
          closeOverlay,
          lenisCurrent,
          setLenisCurrent: setLenis,
          mouseStates: {
            x: mouse.clientX || 0,
            y: mouse.clientY || 0,
            displayStatesObj,
          },
          overlay: overlay,
          handleOverlay: handleOverlay,
        }}
      >
        <div className="relative" style={{ zIndex: 999 }}>
          <CustomMouse x={mouse.pageX || 0} y={mouse.pageY || 0}></CustomMouse>
        </div>
        <AnimatePresence>
          <motion.div
            style={{ zIndex: 99 }}
            className="fixed z-30 w-full "
            transition={{ duration: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            key={overlay.open.toString()}
          >
            {overlay.open && (
              <div style={{ zIndex: 99 }}>
                <Overlay
                  closeOverlay={() => {
                    setOverlay((prev) => {
                      return { ...prev, open: false }
                    })
                  }}
                  setIsVideoFalse={() => {
                    setOverlay((prev) => {
                      return { ...prev, isVideo: false }
                    })
                  }}
                  obj={overlay}
                ></Overlay>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        {children}
      </ContextMain.Provider>
    </div>
  )
}

export default ContextWrapper
