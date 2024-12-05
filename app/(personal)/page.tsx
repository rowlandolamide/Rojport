

import HomePageHorizontal from '@/components/pages/home/HomePageHorizontal'
import { loadHomePage } from '@/sanity/loader/loadQuery'




export default async function IndexRoute() {
  const initial = await loadHomePage()





  if (initial.data) {
    return (
      <div className="text-center text-2xl w-full ">
      

  <div className='pt-4 w-full '> <HomePageHorizontal data={initial.data}>
   
   </HomePageHorizontal></div>

      </div>
    )
  }


}
