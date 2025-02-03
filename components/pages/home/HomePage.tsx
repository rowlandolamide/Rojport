'use client'
import React from 'react'

import RedesignProjectContainer from './RedesignProjectContainer'
import MobileAndTabletHomeScreen from './MobileAndTabletHomeScreen'
import HomePageHorizontal from './HomePageHorizontal'

import type { HomePagePayload } from '@/types'

function HomePage(props: { data: HomePagePayload | null }) {
  return (
    <div className="2xl:pb-[6.6vw] pb-[143px]">
      <div className=" w-full  ">
        {' '}
        <RedesignProjectContainer data={props.data}></RedesignProjectContainer>
      </div>
      {/*       <MobileAndTabletHomeScreen data={props.data}></MobileAndTabletHomeScreen> */}
    </div>
  )
}

export default HomePage
