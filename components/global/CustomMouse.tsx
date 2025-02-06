'use client'
import { cn } from '@/lib/utils'
import React, { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Mouse from '../../app/public/Icons/Mouse-New.svg'

import { ContextMain, MainContextWrapperType } from './ContextWrapper'

function CustomMouse(props: { x: number; y: number }) {
  const { mouseStates } = useContext(ContextMain) as MainContextWrapperType
  const textLetter = mouseStates.displayStatesObj.text?.length || 0
  const textWidth = textLetter * 8.7
  const { displayStatesObj } = mouseStates
  return (
    <motion.div
      style={{ zIndex: 999 }}
      className=" pointer-events-none absolute hidden sm:block"
      animate={{ x: props.x + 8, y: props.y - 28 }}
    >
      <motion.div
        transition={{ duration: 0.05 }}
        style={{ originX: 0.5 }}
        animate={{ width: textWidth }}
        className={cn(
          ' overflow-hidden flex items-center justify-center  mix-blend-difference bg-bl text-white  px-2 px-1 duration-300   min-w-6 min-h-6 max-h-6',
          mouseStates.displayStatesObj.text
            ? ' rounded-[5px] xl:rounded-[0.23vw]'
            : 'rounded-full',
          displayStatesObj.displayState === 3 ? 'scale-[1.3]' : '',
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
