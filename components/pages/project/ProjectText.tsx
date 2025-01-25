'use client'
import { PortableText } from '@portabletext/react'
import RookIcon from '../../../app/public/Icons/Rook.svg'
import Image from 'next/image'

import React from 'react'

function ProjectText(props: {
  body: any
  title: string
  overview?: boolean
  disciplines?: string[]
  year?: string
  isProjectSummary: boolean
}) {
  return (
    <div className=" UPPER-TEXT-CNT-PRJ">
      <div className="TEXT-CNT-PRJ">
        <div
          className={`${props.isProjectSummary ? 'flex gap-y-[20px]' : 'hidden'} flex-col`}
        >
          <div className="MONO-LO">Exploration</div>
          <div className="MONO-LO w-fit">{props.year}</div>
        </div>
        <div className="MN-TEXT-PRJ">{props.title}</div>
        <div className="TN PASSAGE-TEXT-PRJ">
          {' '}
          <PortableText value={props.body}></PortableText>
        </div>
        <div>
          {props.disciplines &&
            props.disciplines.map((item, index) => {
              return (
                <div className="leading-[40px] DISCI-TEXT-PRJ" key={index}>
                  {item}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default ProjectText
