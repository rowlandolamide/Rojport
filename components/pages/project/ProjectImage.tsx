"use client"

import React from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { MainContextWrapperType, ContextMain } from '@/components/global/ContextWrapper';



function ProjectImage(props: {img: string, highRes?: string}) {
    const {overlay, handleOverlay} = useContext(ContextMain) as MainContextWrapperType
    return (
        <div  onClick={()=>{
            handleOverlay({...overlay, item: props.img, open: true, isVideo: false})
        }}>
            <Image  unoptimized src={props.img} width={100} height={100} className='w-screen h-full  rounded-[4px] border border-black' alt={"projectImage"}></Image>
        </div>
    );
}

export default ProjectImage;