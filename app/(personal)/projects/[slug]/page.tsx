/* import ProjectWrapper from '@/components/pages/project/ProjectWrapper' */
import type { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'
import ProjectText from '@/components/pages/project/ProjectText'
import ProjectImage from '@/components/pages/project/ProjectImage'
import ProjectMainVideo from '@/components/pages/project/ProjectMainVideo'
import { ProjectPage } from '@/components/pages/project/ProjectPage'
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

  console.log("maybe",initial)

  if (draftMode().isEnabled) {
    return <ProjectPreview params={params} initial={initial} />
  }

  /* if (!initial.data) {
    notFound()
  } */

    const TextData:any = initial.data?.content?.map((item: any)=>{
      if(item._type === "textBlock"){
        return <ProjectText body={item.description}></ProjectText>
      }else return <div></div>
    })

  return <ProjectWrapper>
    <div>
    <ProjectImage img='https://modii.org/wp-content/uploads/2020/12/random.png'></ProjectImage>
    <ProjectMainVideo></ProjectMainVideo>
    {initial.data?.content?.map((item:any, i)=>{
     if(item._type === "textBlock"){
      console.log("john",item)
      return <ProjectText key={i} body={item.description}></ProjectText>
     }
     else if(item._type.toLowerCase().includes("image")){
     const isSingleImage = !item.photoOne
     const singleImageUrl:any = urlForImage(item.photoOne)?.url()
     const secongImageUrl: any = urlForImage(item.photoTwo)?.url()
     if(isSingleImage){
      
      return <ProjectImage key={i} img={singleImageUrl}></ProjectImage>
     }
     else{
      return <div key={i}>
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