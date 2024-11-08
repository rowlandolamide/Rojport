"use client"

import React from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { MainContextWrapperType, ContextMain } from '@/components/global/ContextWrapper';



function ProjectImage(props: {img: string}) {
    const {overlay, handleOverlay} = useContext(ContextMain) as MainContextWrapperType
    return (
        <div onClick={()=>{
            handleOverlay({...overlay, item: props.img, open: true, })
        }}>
            <Image src={props.img} width={100} height={100} className='w-screen ' alt={"projectImage"}></Image>
        </div>
    );
}

export default ProjectImage;