"use client"
import {PortableText} from "@portabletext/react"
import RookIcon from "../../../app/public/Icons/Rook.svg"
import Image from "next/image";

import React from 'react';

function ProjectText(props: {body: any}) {
    return (
        <div className="pb-[40px] w-full pt-[35px] leading-[21px] rounded-[4px] px-[30px] border border-black text-[10px] 2xl:text-[0.7vw] 3xl:text-[0.6vw] 2xl:leading-[1.2vw] 3xl:leading-[1vw]">
            <div className="flex justify-between mb-[44px]">
                <div className="text-[24px]">ALPHA</div>
                <div><Image src={RookIcon.src} alt="Kinf"width={30} height={30}></Image></div>
            </div>
            <PortableText value={props.body}></PortableText>
        </div>
    );
}

export default ProjectText;