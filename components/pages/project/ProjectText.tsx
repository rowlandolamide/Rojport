"use client"
import {PortableText} from "@portabletext/react"

import React from 'react';

function ProjectText(props: {body: any}) {
    return (
        <div className="pb-[40px] pt-[35px] rounded-[4px] px-[30px] border border-black">
            <PortableText value={props.body}></PortableText>
        </div>
    );
}

export default ProjectText;