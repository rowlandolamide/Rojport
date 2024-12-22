"use client"
import {PortableText} from "@portabletext/react"
import RookIcon from "../../../app/public/Icons/Rook.svg"
import Image from "next/image";


import React from 'react';

function ProjectText(props: {body: any, title: string, overview ?: boolean}) {
   
    return (
        <div className="pb-[40px] 2xl:pb-[2.78vw] 2xl:pt-[2.4vw] 2xl:px-[2vw] w-full pt-[35px] leading-[21px] rounded-[4px] px-[30px] border border-black text-[14px] 2xl:text-[0.7vw] 3xl:text-[0.65vw] 2xl:leading-[1.2vw] 3xl:leading-[1vw]">
            <div className="flex justify-between mb-[44px] items-center">
                <div className="text-[24px] 2xl:text-[1.6vw] capitalize">{props.title}</div>
                <div className={`${props.overview ? "": "hidden"}`}><Image className="2xl:w-[1.6vw]" src={RookIcon.src} alt="Kinf"width={30} height={30}></Image></div>
            </div>
            <PortableText value={props.body}></PortableText>
        </div>
    );
}

export default ProjectText;