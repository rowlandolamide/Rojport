import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import ProjectCard from '@/components/pages/home/ProjectCard'
import LenisHorizontalWrapper from '@/components/pages/home/LenisHorizontalWrapper'
import { HomePage } from '@/components/pages/home/HomePage'
import { studioUrl } from '@/sanity/lib/api'
import type { HomePagePayload } from '@/types'
import GsapHorizontalWrapper from '@/components/pages/home/GsapHorizontalWrapper'
import { loadHomePage } from '@/sanity/loader/loadQuery'
import { AnimatePresence } from 'framer-motion'
const HomePagePreview = dynamic(
  () => import('@/components/pages/home/HomePagePreview'),
)



export default async function IndexRoute() {
  const initial = await loadHomePage()

  console.log("dd",initial)

  if (draftMode().isEnabled) {
    return <HomePagePreview initial={initial} />
  }

  if (initial.data) {
    return (
      <div className="text-center text-2xl w-full ">
      
     {/*    <GsapHorizontalWrapper></GsapHorizontalWrapper> */}
  <div className='pt-4 w-full '> <GsapHorizontalWrapper data={initial.data}>
   
   </GsapHorizontalWrapper></div>
{/*     <LenisHorizontalWrapper >
         <div className='flex gap-x-[20px]'>
         {Array.from({length: 10}).map((ite, i)=>{
            return <ProjectCard key={i} discipline='Jack' name='Something'></ProjectCard>
          })}
         </div>
        </LenisHorizontalWrapper> */}
      </div>
    )
  }

/*   return <HomePage data={initial.data} /> */
}
