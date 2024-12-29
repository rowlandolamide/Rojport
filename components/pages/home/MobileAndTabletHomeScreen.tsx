import React, { useMemo } from 'react'
import type { HomePagePayload } from '@/types'
import { urlForImage } from '@/sanity/lib/utils'
import ProjectCard from './ProjectCard'
import ReelVideo from './ReelVideo'
import useCurrentTime from '@/components/hooks/useCurrentTime'

function MobileAndTabletHomeScreen({ data }: { data: HomePagePayload | null }) {
  /* Current Time */
  const value = useCurrentTime()
  /* End */

  const modifiedDataTwo = useMemo(() => {
    return data?.showcaseProjects?.map((item) => {
      const imgUrl = item.coverImage
        ? urlForImage(item.coverImage)
            ?.quality(100)
            ?.format('webp')
            ?.width(500)
            .url()
        : ''
      return {
        title: item.title,
        slug: item.slug,
        img: item.coverImage,
        imgUrl: imgUrl,
        isProject: true,
        discipline: item.disci,
      }
    })
  }, [data])

  return (
    <div className="w-full">
      {/* Mobile View */}
      <div className="Js-lenis sm:hidden flex flex-col items-center justify-center w-full tab-display">
        <div className="TN w-[90vw] mx-auto   leading-[14px] self-start mb-[20px] flex flex-col text-left">
          <div>Motion Designer & Art Director</div>
          <div>
            Lagos, Nigeria: {value.getUTCHours() + 1}:{value.getUTCMinutes()}{' '}
            WAT
          </div>
        </div>
        <div className="flex flex-col gap-y-[22px]">
          <ReelVideo
            url={process.env.NEXT_PUBLIC_REEL_DISPLAY_VIDEO || ''}
          ></ReelVideo>
          {modifiedDataTwo &&
            modifiedDataTwo.map((i, k) => {
              const currentObj = i

              return (
                <section key={k} className="   gap-y-4 ">
                  {
                    <ProjectCard
                      slug={i.slug || '/'}
                      isProject={currentObj.isProject}
                      media={currentObj.imgUrl}
                      discipline={currentObj.discipline}
                      name={currentObj.title || ''}
                    ></ProjectCard>
                  }
                </section>
              )
            })}
        </div>
      </div>
      {/* End */}

      {/* Tab View */}
      <div className="w-full hidden sm:block xl:hidden data-lenis-prevent Js-lenis">
        <div className="gap-x-4  grid grid-cols-2 z-0  gap-y-5  items-center justify-items-center">
          <div className=" w-full   flex items-center justify-center">
            {' '}
            <ReelVideo
              url={process.env.NEXT_PUBLIC_REEL_DISPLAY_VIDEO || ''}
            ></ReelVideo>
          </div>
          {modifiedDataTwo &&
            modifiedDataTwo.map((i, k) => {
              const currentObj = modifiedDataTwo[k]

              return (
                <section key={k} className=" px-[20px]  gap-y-4 ">
                  {
                    <ProjectCard
                      slug={i.slug || '/'}
                      isProject={currentObj.isProject}
                      media={currentObj.imgUrl}
                      discipline={currentObj.discipline}
                      name={currentObj.title || ''}
                    ></ProjectCard>
                  }
                </section>
              )
            })}
        </div>
      </div>
      {/* End */}
    </div>
  )
}

export default MobileAndTabletHomeScreen
