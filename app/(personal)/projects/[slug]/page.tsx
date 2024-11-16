/* import ProjectWrapper from '@/components/pages/project/ProjectWrapper' */
import type { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import { toPlainText } from 'next-sanity'
import ProjectText from '@/components/pages/project/ProjectText'
import ProjectImage from '@/components/pages/project/ProjectImage'
import ProjectMainVideo from '@/components/pages/project/ProjectMainVideo'

import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { urlForImage } from '@/sanity/lib/utils'
import { loadMoreProjects, loadProject } from '@/sanity/loader/loadQuery'
const ProjectPreview = dynamic(
  () => import('@/components/pages/project/ProjectPreview'),
)
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
  const initial = await loadProject(params.slug)
  const moreProjects = await loadMoreProjects()


  if (draftMode().isEnabled) {
    return <ProjectPreview params={params} initial={initial} />
  }

  /* if (!initial.data) {
    notFound()
  } */



  return <ProjectWrapper>
    <div className=''>
      <div className='w-full pb-[58px] '>
        
    <ProjectMainVideo url='https://vimeo.com/664718350'></ProjectMainVideo>
      </div>
  {/*   <ProjectImage img='https://modii.org/wp-content/uploads/2020/12/random.png'></ProjectImage> */}
   
    {initial.data?.content?.map((item:any, i)=>{
      const isLastImageType =  ()=>{
        if(!initial) return false
        if(!initial.data) return false
        if(!initial.data.content) return false
        return initial.data?.content[i + 1]._type.toLowerCase().includes("image") && initial.data?.content[i]._type.toLowerCase().includes("image")
      }
     if(item._type === "textBlock"){
      console.log("john",item)
      return <div key={i} className='py-[58px]'> <ProjectText key={i} body={item.description}></ProjectText></div>
     }
     else if(item._type.toLowerCase().includes("image")){
     const isSingleImage = !item.photoOne
     const singleImageUrl:any = urlForImage(item.photoOne)?.url()
     const secongImageUrl: any = urlForImage(item.photoTwo)?.url()
     if(isSingleImage){
      
      return <div key={i} className='py-[22px]'><ProjectImage  key={i} img={singleImageUrl}></ProjectImage></div>
     }
     else{
      return <div  className={`grid grid-cols-1 xl:grid-cols-2 gap-x-[22px] xl:gap-y-0 gap-y-[22px] ${isLastImageType() && "pb-[22px]"}`} key={i}>
      <ProjectImage img={singleImageUrl}></ProjectImage>
      <ProjectImage img={secongImageUrl}></ProjectImage>
      </div>
     }
     
     }
    
    })}
  </div> 
  </ProjectWrapper>
}


{/* <ProjectPage data={initial.data} moreProjects={moreProjects.data} /> */}