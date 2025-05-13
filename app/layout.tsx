import ScrollToTop from '@/lib/ScrollToTheTop'
import ContextWrapper from '@/components/global/ContextWrapper'
import './globals.css'
import { Suspense } from 'react'
const LenisHorizontalWrapper = dynamic(
  () => import('@/components/pages/home/LenisHorizontalWrapper'),
)

import dynamic from 'next/dynamic'
// import { Inter } from 'next/font/google'

import { loadSettings } from '@/sanity/loader/loadQuery'

// const sans = Inter({
//   variable: '--font-sans',
//   subsets: ['latin'],
//   // weight: ['500', '700', '800'],
// })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get custom colors for bg and text from Sanity settings page, fallback to white and black if not set
  const [{ data: settings }] = await Promise.all([loadSettings()])
  const rgbaBgColor = `${settings?.bgColor?.r || 255}, ${settings?.bgColor?.g || 255}, ${settings?.bgColor?.b || 255}`
  const rgbaTextColor = `${settings?.textColor?.r || 0}, ${settings?.textColor?.g || 0}, ${settings?.textColor?.b || 0}`

  return (
    <html
      lang="en"
      className="font-Ingram"
      // Assign custom color css variables for Tailwind to use as Tailwind variables
    >
      <body className="text-black relative  bg-white">
        <Suspense
          fallback={
            <div
              aria-busy="true"
              aria-live="polite"
              style={{
                minHeight: '1rem',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
              }}
            />
          }
        >
          {' '}
          <ScrollToTop></ScrollToTop>
          <ContextWrapper>
            {<LenisHorizontalWrapper>{children}</LenisHorizontalWrapper>}
          </ContextWrapper>
        </Suspense>
      </body>
    </html>
  )
}
