'use client'
import React from 'react'
import {motion} from "framer-motion"
import RedesignProjectContainer from './RedesignProjectContainer'

import type { HomePagePayload } from '@/types'

function HomePage(props: { data: HomePagePayload | null }) {
  return (
    <div className="2xl:pb-[6.6vw] sm:pb-[143px] pb-[55px] GEN-PAD">
      <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.5 , delay: 1}} className=" w-full  ">
        <RedesignProjectContainer data={props.data}></RedesignProjectContainer>
      </motion.div>
    </div>
  )
}

export default HomePage
