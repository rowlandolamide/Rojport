import { useContext } from 'react'
import { getAboutPage } from '@/sanity/loader/loadQuery'
import AboutPage from '@/components/pages/about/AboutPage'
import {
  MainContextWrapperType,
  ContextMain,
} from '@/components/global/ContextWrapper'

export default async function IndexRoute() {
  const { data } = await getAboutPage()
  return <AboutPage data={data}></AboutPage>
}
