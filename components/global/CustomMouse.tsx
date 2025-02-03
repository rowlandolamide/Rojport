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
  const textWidth = textLetter * 8.5
  return (
    <motion.div
      style={{ zIndex: 999 }}
      className=" pointer-events-none absolute hidden sm:block"
      animate={{ x: props.x, y: props.y }}
    >
      <motion.div
        transition={{ duration: 0.05 }}
        style={{ originX: 0.5 }}
        animate={{ width: textWidth }}
        className={cn(
          ' overflow-hidden flex items-center justify-center  bg-bl text-white rounded-full px-2 px-1 duration-300   min-w-4 min-h-4 max-h-6',
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
