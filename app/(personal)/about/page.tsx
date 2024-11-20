/* import dynamic from 'next/dynamic' */
/* import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import { AboutPage } from '@/components/pages/about/AboutPage'
import { getAboutPage } from '@/sanity/loader/loadQuery' */
/* const HomePagePreview = dynamic(
  () => import('@/components/pages/home/HomePagePreview'),
) */

export default function IndexRoute() {
/*   const initial = await getAboutPage() */
/* 
  if (draftMode().isEnabled) {
    return <HomePagePreview initial={initial} />
  } */

 /*  if (!initial.data) {
    return redirect('/')
  } */

  return <div className="">
<div className=" w-fit h-screen flex ">
  <div className="w-[300px] h-[400px] bg-red-500">We are gems</div>
  <div className="w-[300px] h-[400px] bg-red-500">We are gems</div>
  <div className="w-[300px] h-[400px] bg-red-500">We are gems</div>
  <div className="w-[300px] h-[400px] bg-red-500">We are gems</div>
  <div className="w-[300px] h-[400px] bg-red-500">We are gems</div>
  <div className="w-[300px] h-[400px] bg-red-500">We are gems</div>
  <div className="w-[300px] h-[400px] bg-red-500">We are gems</div>
  <div className="w-[300px] h-[400px] bg-red-500">We are gems</div>
  <div className="w-[300px] h-[400px] bg-red-500">We are gems</div>
  <div className="w-[300px] h-[400px] bg-red-500">We are gems</div>

      </div>
    {/* <AboutPage data={initial.data} /> */}</div>
}
