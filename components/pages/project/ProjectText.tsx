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
        <div className="MN-TEXT-PRJ">{props.title}</div>
        <div
          className={`${props.isProjectSummary ? 'flex gap-y-[20px]' : 'hidden'} flex-col`}
        >
          <div className="MONO-LO w-fit">Exploration</div>
          <div className="MONO-LO w-fit">{props.year}</div>
        </div>

        <div>
          {props.disciplines &&
            props.disciplines.map((item, index) => {
              return (
                <div
                  className="leading-[40px] DISCI-TEXT-PRJ sm:hidden"
                  key={index}
                >
                  {item}
                </div>
              )
            })}
        </div>
        <div className="TN PASSAGE-TEXT-PRJ">
          {' '}
          <PortableText value={props.body}></PortableText>
        </div>
        <div className="">
          <div className="CREDIT-DISCI-TITLE ">CREDITS</div>
          <div className="CREDIT-DISCI-ITEM-CONT">
            {' '}
            {props.disciplines &&
              props.disciplines.map((item, index) => {
                return (
                  <div className=" DISCI-TEXT-PRJ hidden sm:block" key={index}>
                    {item}
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
