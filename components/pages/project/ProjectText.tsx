'use client'
import { PortableText } from '@portabletext/react'

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
        <h1 className="MN-TEXT-PRJ">{props.title}</h1>
        <h2
          className={`${props.isProjectSummary ? 'flex gap-y-[20px]' : 'hidden'} flex-col`}
        >
          <div className="NEW-TITLES w-fit">Exploration</div>
          <div className="NEW-TITLES w-fit">{props.year}</div>
        </h2>

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
