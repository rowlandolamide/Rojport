import React from 'react'
import type { HomePagePayload } from '@/types'
import RedesignProjectCard from './RedesignProjectCard'
import { urlForImage } from '@/sanity/lib/utils'

const RedesignProjectContainer = (props: { data: HomePagePayload | null }) => {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full grid grid-cols-2 gap-x-[20px] 2xl:gap-x-[0.93rem] gap-y-[75px] gap-y-[3.47rem] ">
        {props.data &&
          props.data.showcaseProjects?.map((item, idx) => {
            const { disci, coverImage, overview, slug, title } = item
            const imageUrl = coverImage
              ? urlForImage(coverImage)
                  ?.quality(100)
                  ?.format('webp')
                  ?.width(800)
                  .url()
              : ''
            return (
              <RedesignProjectCard
                key={idx}
                title={title || ''}
                slug={slug || ''}
                img={imageUrl || ''}
                discipline={disci ? disci[0] : ''}
              ></RedesignProjectCard>
            )
          })}
      </div>
    </div>
  )
}

export default RedesignProjectContainer
