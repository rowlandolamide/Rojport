import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import GsapHorizontalWrapper from '@/components/pages/home/GsapHorizontalWrapper'
import { loadHomePage } from '@/sanity/loader/loadQuery'

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
      

  <div className='pt-4 w-full '> <GsapHorizontalWrapper data={initial.data}>
   
   </GsapHorizontalWrapper></div>

      </div>
    )
  }

/*   return <HomePage data={initial.data} /> */
}
