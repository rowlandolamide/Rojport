import Vimeo from '@u-wave/react-vimeo'
import ReactPlayer from 'react-player'


export default function ProjectMainVideoVimeo(props: {
    url?: string
    title?: string
}) {
    const { url, title } = props
    return (
       <Vimeo  className=''   video={"https://vimeo.com/1023347832?fl=pl&fe=sh"} style={{zIndex: 999}} 
       width={800}
       
       controls={true} 
        loop></Vimeo>
    )
}