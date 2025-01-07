'use client'
import React from 'react'

import MobileAndTabletHomeScreen from './MobileAndTabletHomeScreen'
import HomePageHorizontal from './HomePageHorizontal'

import type { HomePagePayload } from '@/types'

function HomePage(props: { data: HomePagePayload | null }) {
  return (
    <div>
      <div className="hidden xl:block w-full">
        {' '}
        <HomePageHorizontal data={props.data}></HomePageHorizontal>
      </div>
      <MobileAndTabletHomeScreen data={props.data}></MobileAndTabletHomeScreen>
    </div>
  )
}

export default HomePage
