/* import ProjectWrapper from '@/components/pages/project/ProjectWrapper' */
import type { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Head from 'next/head'
import { toPlainText } from 'next-sanity'
import ProjectText from '@/components/pages/project/ProjectText'
import ProjectImage from '@/components/pages/project/ProjectImage'

import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { urlForImage } from '@/sanity/lib/utils'
import { loadProject, loadMoreProjects } from '@/sanity/loader/loadQuery'
const ProjectPreview = dynamic(
  () => import('@/components/pages/project/ProjectPreview'),
)
import NextProject from '@/components/pages/project/NextProject'

import Process from '@/components/pages/project/Process'

import ProjectDisplayVideo from '@/components/pages/project/ProjectDisplayVideo'
import { cn } from '@/lib/utils'

const ProjectWrapper = dynamic(
  () => import('@/components/pages/project/ProjectWrapper'),
  { ssr: false },
)

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: project } = await loadProject(params.slug)
  const ogImage = urlForOpenGraphImage(project?.coverImage)

  return {
    title: project?.title,
    description: project?.overview
      ? toPlainText(project.overview)
      : (await parent).description,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('project')
}

export default async function ProjectSlugRoute({ params }: Props) {
  const initial = await loadProject(params.slug.trim())

  const drop: any = await loadMoreProjects()
  console.log('drop', drop.data.showcaseProjects)

  if (draftMode().isEnabled) {
    return <ProjectPreview params={params} initial={initial} />
  }

  return (
    <ProjectWrapper>
      <Head>
        <title>{`${initial.data?.title} | ROJ THE GOAT`}</title>
        <meta content={`${initial.data?.description}`} name="about" />
        <meta name="description" content={`${initial.data?.description}`} />
      </Head>
      <div className="">
        <div className="w-full pb-[58px] ">
          <ProjectDisplayVideo
            videoTitle={initial.data?.mainVideoTitle || ''}
            url={initial.data?.mainVideo || ''}
          ></ProjectDisplayVideo>
        </div>

        <div className="py-[58px] 3xl:py-[5vw]  w-full flex items-center justify-center">
          <div className="2xl:max-w-[31vw] 3xl:max-w-[28vw] max-w-[450px] mx-auto w-full">
            <ProjectText
              isProjectSummary
              title={initial.data?.title || ''}
              overview
              year={initial.data?.year}
              disciplines={initial.data?.disci}
              body={initial.data?.overview}
            ></ProjectText>
          </div>
        </div>

        <div className="space-y-[10px] lg:space-y-[0.46rem]">
          {initial.data?.content &&
            initial.data?.content?.map((item: any, i) => {
              const isLastImageType = () => {
                if (!initial) return false
                if (!initial.data) return false
                if (!initial.data.content) return false

                const lastType = initial.data.content[i + 1]

                return lastType
                  ? initial.data?.content[i + 1]._type
                      .toLowerCase()
                      .includes('image') &&
                      initial.data?.content[i]._type
                        .toLowerCase()
                        .includes('image')
                  : true
              }
              if (item._type === 'textBlock') {
                return (
                  <div
                    key={i}
                    className="py-[58px] 3xl:py-[5vw]  w-full flex items-center justify-center"
                  >
                    <div className="2xl:max-w-[31vw] 3xl:max-w-[28vw] max-w-[450px] mx-auto w-full">
                      <ProjectText
                        title={item.textBlockType || ''}
                        key={i}
                        isProjectSummary={false}
                        body={item.description}
                      ></ProjectText>
                    </div>
                  </div>
                )
              } else if (item._type.toLowerCase().includes('image')) {
                /* Logic for two images */
                const isSingleImage = !item.photoOne
                const firstImageUrl: any = urlForImage(item.photoOne)
                  ?.quality(100)
                  ?.url()
                const secondImageUrl: any = urlForImage(item.photoTwo)
                  ?.quality(100)
                  ?.url()
                /* End */

                /* Logic for single images */
                const singleImageUrl = urlForImage(item.photo)?.width(800).url()
                const singleImageUrlHighRes = urlForImage(item.photo)
                  ?.quality(100)
                  ?.url()
                /* End */

                if (isSingleImage) {
                  return (
                    <div key={i} className="IMG-PRJ">
                      <ProjectImage
                        highRes={singleImageUrlHighRes}
                        key={i}
                        img={singleImageUrlHighRes || ''}
                      ></ProjectImage>
                    </div>
                  )
                } else {
                  return (
                    <div className={`TWO-IMGS-PRJ  `} key={i}>
                      <ProjectImage img={firstImageUrl}></ProjectImage>
                      <ProjectImage img={secondImageUrl}></ProjectImage>
                    </div>
                  )
                }
              } else if (item._type === 'process') {
                const videoUrl = item.singleVideo.videoLink
                const processSingleImageUrls = item.processSingleImage
                  ? item.processSingleImage.map((img) => {
                      return urlForImage(img)?.url()
                    })
                  : []

                const processTwoImageUrls = item.twoImages
                  ? item.twoImages.map((img) => {
                      const { processPhotoOne, processPhotoTwo } = img
                      return {
                        left: urlForImage(processPhotoOne)?.url(),
                        right: urlForImage(processPhotoTwo)?.url(),
                      }
                    })
                  : []

                return (
                  <Process
                    key={i}
                    processTwoImageSrcs={processTwoImageUrls}
                    processSingleImageSrc={processSingleImageUrls}
                    processVideoSrc={videoUrl}
                    projectTitle={initial.data?.title || ''}
                  ></Process>
                )
              }
            })}
        </div>
      </div>
      {drop.data && (
        <div>
          {drop.data.showcaseProjects &&
            drop.data.showcaseProjects.map((item, index) => {
              const allShowcasedProjects = drop.data.showcaseProjects
              let currentPageIndex = 0

              const isMatch = item.slug?.trim() === params.slug.trim()
              console.log(item.slug?.trim(), params.slug.trim())
              if (isMatch) {
                currentPageIndex =
                  index + 1 === allShowcasedProjects?.length ? 0 : index + 1
              }
              console.log(currentPageIndex, allShowcasedProjects?.length)
              const isAcceptableRange =
                index >= currentPageIndex && index <= currentPageIndex + 1

              const acceptableRangeArrIndex = [
                currentPageIndex,
                currentPageIndex + 1,
              ]

              const finalArr: any[] = []
              acceptableRangeArrIndex.forEach((prjNo, idx) => {
                allShowcasedProjects?.forEach((shwPrjs, idxB) => {
                  if (prjNo === idxB) {
                    const img = urlForImage(shwPrjs.coverImage)?.url()
                    finalArr.push({
                      img: img || '',
                      slug: shwPrjs.slug,
                      title: shwPrjs.title,
                      tag: shwPrjs.tag,
                    })
                  }
                })
              })

              console.log(finalArr)

              return (
                <div key={index}>
                  {isMatch ? (
                    <div
                      className={cn(
                        'xl:pt-[10.65vw] pt-[230px] pb-[105px] xl:pb-[4.86vw]',
                      )}
                      key={index}
                    >
                      <NextProject nxtProjectArr={finalArr}></NextProject>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              )
            })}
        </div>
      )}
    </ProjectWrapper>
  )
}
