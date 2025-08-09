'use client'
import React from 'react'

import RedesignProjectContainer from './RedesignProjectContainer'

import type { HomePagePayload } from '@/types'

function HomePage(props: { data: HomePagePayload | null }) {
  return (
    <div className="2xl:pb-[6.6vw] sm:pb-[143px] pb-[55px] GEN-PAD">
      <div className=" w-full  ">
        <RedesignProjectContainer data={props.data}></RedesignProjectContainer>
      </div>
    </div>
  )
}

export default HomePage
