'use client'
import { cn } from '@/lib/utils'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { ContextMain, MainContextWrapperType } from './ContextWrapper'

function CustomMouse(props: { x: number; y: number }) {
  const { mouseStates } = useContext(ContextMain) as MainContextWrapperType

  const { displayStatesObj } = mouseStates
  const [width, setWidth] = useState(0)
  const textRef: any = useRef(null)
  useEffect(() => {
    if (textRef.current) {
      setWidth(textRef.current.offsetWidth)
  }
  }, [mouseStates.displayStatesObj.text])
  return (
    <motion.div
      style={{ zIndex: 999 }}
      className=" pointer-events-none absolute hidden sm:block"
      animate={{ x: props.x + 8, y: props.y - 28 }}
    >
      <span ref={textRef} className="absolute invisible  MOUSE-TEXT ">
        {mouseStates.displayStatesObj.text}
      </span>
      <motion.div
        transition={{ duration: 0.05 }}
        style={{ originX: 0.5 }}
        animate={{
          width: mouseStates.displayStatesObj.text ? width + 30 : width,
        }}
        className={cn(
          ' overflow-hidden flex items-center justify-center  mix-blend-difference bg-bl text-white  px-1 duration-300   min-w-6 min-h-6 max-h-6',
          mouseStates.displayStatesObj.text
            ? ' rounded-[5px] xl:rounded-[0.23vw]'
            : 'rounded-full',
          displayStatesObj.displayState === 3 ? 'scale-[1.4]' : '',
          displayStatesObj.displayState === 2 ? 'rounded-[6px] ' : '',
        )}
      >
        <AnimatePresence key={mouseStates.displayStatesObj.text}>
          <motion.span
            initial={{ opacity: 0 }}
            key={mouseStates.displayStatesObj.text}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="MOUSE-TEXT "
          >
            {' '}
            {mouseStates.displayStatesObj.text}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export default CustomMouse
