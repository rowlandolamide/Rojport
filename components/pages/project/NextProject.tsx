import { cn } from '@/lib/utils'
import React from 'react'
import Image from 'next/image'
import RedesignProjectCard from '../home/RedesignProjectCard'
import Link from 'next/link'

const NextProject = ({
  nxtProjectArr,
}: {
  nxtProjectArr: {
    img: string
    discipline: string
    title: string
    slug: string
    tag: string
  }[]
}) => {
  return (
    <div>
      <div className="flex gap-x-[10px] text-[15px] xl:text-[0.7rem] pb-[36px] 2xl:pb-[1.7vw]">
        <span className="MONO-LO border-none">RELATED PROJECTS</span>{' '}
        <Link href={nxtProjectArr[0].slug[0]} className="MONO-LO ">
          NEXT PROJECT
        </Link>
      </div>
      <div className={cn('TWO-IMGS-PRJ ')}>
        {nxtProjectArr.map((item, idx) => {
          const { tag, img, slug, title } = item
          return (
            <RedesignProjectCard
              tag={tag}
              img={img}
              slug={slug}
              title={title}
              key={idx}
              nextProjectItem
            ></RedesignProjectCard>
          )
        })}
      </div>
    </div>
  )
}

export default NextProject
