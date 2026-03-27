import { getAboutPage } from '@/sanity/loader/loadQuery'
import AboutPage from '@/components/pages/about/AboutPage'


export default async function IndexRoute() {
  const { data } = await getAboutPage()


  return <><AboutPage data={data}></AboutPage>
    </>
}
