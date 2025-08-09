import { loadHomePage } from '@/sanity/loader/loadQuery'
import HomePage from '@/components/pages/home/HomePage'

export default async function IndexRoute() {
  const initial = await loadHomePage()

  if (initial.data) {
    return (
      <div className="text-center text-2xl w-full  ">
        <div className="pt-4 w-full ">
          <HomePage data={initial.data}></HomePage>
        </div>
      </div>
    )
  }
}
