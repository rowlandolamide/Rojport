'use client'
import { PortableText } from '@portabletext/react'
import RookIcon from '../../../app/public/Icons/Rook.svg'
import Image from 'next/image'
import type { BlockObject } from '@/sanity.types'

import React from 'react'
import { cn } from '@/lib/utils'

function ProjectText(props: {
  body: any
  title: string
  overview?: boolean
  disciplines?: Array<
    {
      _key: string
    } & BlockObject
  > | null
  year?: string
  isProjectSummary: boolean
}) {
  return (
    <div className=" UPPER-TEXT-CNT-PRJ">
      <div className="TEXT-CNT-PRJ">
        <div className="MN-TEXT-PRJ">{props.title}</div>
        <div
          className={`${props.isProjectSummary ? 'flex gap-y-[20px]' : 'hidden'} flex-col`}
        >
          <div className="MONO-LO w-fit">Exploration</div>
          <div className="MONO-LO w-fit">{props.year}</div>
        </div>

        <div className="TN  PASSAGE-PRJ-TEXT ">
          {' '}
          <PortableText value={props.body}></PortableText>
        </div>
        <div className={cn(props.isProjectSummary ? '' : 'hidden')}>
          <div className="CREDIT-DISCI-TITLE ">CREDITS</div>
          <div className="CREDIT-DISCI-ITEM-CONT">
            {' '}
            {props.disciplines &&
              props.disciplines.map((item, index) => {
                return (
                  <div
                    className=" DISCI-TEXT-PRJ sm:PASSAGE-TEXT-PRJ"
                    key={index}
                  >
                    <PortableText
                      value={item.blockText ? item.blockText : []}
                    ></PortableText>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectText
