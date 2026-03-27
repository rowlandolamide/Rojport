"use client"
import Vimeo from '@u-wave/react-vimeo'
import ReactPlayer from 'react-player'

export default function ProjectMainVideoVimeo(props: {
  url?: string
  title?: string
}) {
  const { url, title } = props

  if (!url) return <div>No Video Url</div>

  return url.includes("vimeo") ? (
<div className="w-[1550px] max-w-full mx-auto">
        <Vimeo
      video={url}
      controls
      loop
      responsive={true}   // ← THIS is the missing piece
      width={"100%"}
      height={"100%"}         // keep 16:9 ratio (1550 * 9 / 16)
    
    />
</div>
  ) : (
    <div className="w-[1550px] max-w-full mx-auto">
      <ReactPlayer
        url={url}
        controls
        title={title}
        width="100%"
      />
    </div>
  )
}
