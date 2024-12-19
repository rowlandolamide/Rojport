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
import { loadProject } from '@/sanity/loader/loadQuery'
const ProjectPreview = dynamic(
  () => import('@/components/pages/project/ProjectPreview'),
)

import ProjectDisplayVideo from '@/components/pages/project/ProjectDisplayVideo'

const ProjectWrapper = dynamic(
  () => import('@/components/pages/project/ProjectWrapper'), {ssr: false}
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



  if (draftMode().isEnabled) {
    return <ProjectPreview params={params} initial={initial} />
  }

  /* if (!initial.data) {
    notFound()
  } */

    console.log(initial.data?.content)


  return <ProjectWrapper>
     <Head>
        <title>{`${initial.data?.title} | ROJ THE GOAT`}</title>
        <meta
          content={`${initial.data?.description}`}
          name="about"
        />
        <meta
          name="description"
          content={`${initial.data?.description}`}
        />
      </Head>
    <div className=''>
      <div className='w-full pb-[58px] '>
        
    <ProjectDisplayVideo url={initial.data?.mainVideo || ""}></ProjectDisplayVideo>
      </div>
  
   
    {initial.data?.content && initial.data?.content?.map((item:any, i)=>{
      const isLastImageType =  ()=>{
        if(!initial) return false
        if(!initial.data) return false
        if(!initial.data.content) return false
        console.log(initial.data.content[i +1])
        const lastType = initial.data.content[i +1]
      
        return lastType ? initial.data?.content[i + 1]._type.toLowerCase().includes("image") && initial.data?.content[i]._type.toLowerCase().includes("image") : true
      }
     if(item._type === "textBlock"){
     
      return <div key={i} className='py-[58px] 3xl:py-[5vw]  w-full flex items-center justify-center'> 
      <div className='2xl:max-w-[31vw] 3xl:max-w-[28vw] max-w-[450px] mx-auto w-full'><ProjectText key={i} body={item.description}></ProjectText></div></div>
     }
     else if(item._type.toLowerCase().includes("image")){
      /* Logic for two images */
     const isSingleImage = !item.photoOne
     const firstImageUrl:any = urlForImage(item.photoOne)?.url()
     const secondImageUrl: any = urlForImage(item.photoTwo)?.url()
     /* End */


     /* Logic for single images */
     const singleImageUrl = urlForImage(item.photo)?.url()
     /* End */

     if(isSingleImage){
      
      return <div key={i} className='py-[22px]'><ProjectImage  key={i} img={singleImageUrl || ""}></ProjectImage></div>
     }
     else{
      return <div  className={`grid grid-cols-1 xl:grid-cols-2 gap-x-[22px] xl:gap-y-0 gap-y-[22px] 3xl:gap-x-[1.7vw] ${isLastImageType() && "pb-[22px] 3xl:pb-[1.7vw]"}`} key={i}>
      <ProjectImage img={firstImageUrl}></ProjectImage>
      <ProjectImage img={secondImageUrl}></ProjectImage>
      </div>
     }
     
     }
    
    })}
  </div> 
  
  </ProjectWrapper>
}


