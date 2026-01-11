'use client'

import { motion, AnimatePresence, animate } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { Suspense, useContext, useEffect, useRef, useState } from 'react'
import PixelTransition from '../PixelTransition/PixelTransition'

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext)
  const frozen = useRef(context).current

  if (!frozen) {
    return <>{props.children}</>
  }

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  )
}

const variants = {
  hidden: { opacity: 0, y: 0 },
  enter: { opacity: 1, y: '0' },
  exit: { opacity: 0, y: '0' },
}

const PageTransitionEffect = ({ children }: { children: React.ReactNode }) => {
  // The `key` is tied to the url using the `usePathname` hook.
  const key = usePathname()

  const [active, setActive] = useState(false)

  useEffect(() => {}, [])

  return (
    <AnimatePresence presenceAffectsLayout initial={false} mode="sync">
      <motion.div
        key={key}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        onAnimationStart={() => {
          setActive(true)
        }}
        onAnimationComplete={() => {
          setActive(false)
        }}
        className=""
        transition={{ ease: 'easeInOut', duration: 1.3 }}
      >
        {' '}
        <div className={`fixed top-0 left-0 z-50`}>
          <Suspense>
            {typeof window === 'object' && (
              <PixelTransition
                onAnimationEnd={() => {
                  setActive(false)
                }}
                menuIsActive={active}
                dimensions={{
                  width: window.innerWidth,
                  height: window.innerHeight,
                }}
              ></PixelTransition>
            )}
          </Suspense>
        </div>
        <FrozenRouter>
          <motion.div
            transition={{ duration: 0.6 }}
            animate={active && { opacity: 1, transition: { delay: 0.6 } }}
            initial={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        </FrozenRouter>
      </motion.div>
    </AnimatePresence>
  )
}
export const PageTransitionStaticEffect = ({ children , trigger}: { children: React.ReactNode , trigger: boolean}) => {
  const key = trigger.toString()

  const [active, setActive] = useState(false)

  useEffect(() => {}, [])

  return (
    <AnimatePresence presenceAffectsLayout initial={false} mode="sync">
      <motion.div
        key={key}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        onAnimationStart={() => {
          setActive(true)
        }}
        onAnimationComplete={() => {
          setActive(false)
        }}
        className=""
        transition={{ ease: 'easeInOut', duration: 1.3 }}
      >
        {' '}
        <div className={`fixed top-0 left-0 z-50`}>
          <Suspense>
            {typeof window === 'object' && (
              <PixelTransition
                onAnimationEnd={() => {
                  setActive(false)
                }}
                baseText='/'
                menuIsActive={active}
                dimensions={{
                  width: window.innerWidth,
                  height: window.innerHeight,
                }}
              ></PixelTransition>
            )}
          </Suspense>
        </div>
      
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransitionEffect
