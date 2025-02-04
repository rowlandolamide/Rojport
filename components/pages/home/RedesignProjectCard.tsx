'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useContext } from 'react'
import {
  ContextMain,
  MainContextWrapperType,
} from '@/components/global/ContextWrapper'
import { cn } from '@/lib/utils'

function RedesignProjectCard(props: {
  img: string
  title: string
  nextProjectItem?: boolean
  slug: string
  tag: string
}) {
  const { img, title, tag, slug, nextProjectItem } = props
  const { handleMouseStateChange } = useContext(
    ContextMain,
  ) as MainContextWrapperType
  return (
    <Link
      onMouseLeave={() => {
        handleMouseStateChange(null, 0)
      }}
      onMouseOver={() => {
        handleMouseStateChange(title, 2)
      }}
      className="group relative overflow-hidden"
      href={nextProjectItem ? slug : `projects/${slug}`}
    >
      <div className="w-full h-full">
        <div className="HOME-CNT-PRJ w-full h-full">
          <div
            className={cn(
              'w-full  overflow-hidden HOME-PRJ-ROUNDED hover:sm:rounded-[2.7vw] duration-300',
              nextProjectItem ? 'h-full' : 'h-fit',
            )}
          >
            <Image
              className={cn(
                ' w-full   h-[60vw] object-cover sm:object-fit sm:h-fit ',
                nextProjectItem &&
                  'h-full aspect-3/2 object-cover sm:h-full sm:object-cover',
              )}
              src={img}
              width={600}
              unoptimized
              height={500}
              alt={title}
            ></Image>
          </div>
          <div className="HOME-CNT-TEXT-PRJ">
            <span className="HOME-TXT-TITLE "> {title}</span>{' '}
            <span className="MONO-LO text-[15px] 2xl:text-[0.7rem]">{tag}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RedesignProjectCard
