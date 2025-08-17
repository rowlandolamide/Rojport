import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const fileUrl = url.searchParams.get('url')
  const filename = url.searchParams.get('filename') || 'download.pdf'

  if (!fileUrl) {
    return NextResponse.json({ error: 'Missing url param' }, { status: 400 })
  }

  // Fetch the PDF from Sanity CDN
  const response = await fetch(fileUrl, { cache: 'no-store' })

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 })
  }

  const arrayBuffer = await response.arrayBuffer()

  return new NextResponse(arrayBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      // 👇 This forces browser to download instead of view
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
