"use client"
import {PortableText} from "@portabletext/react"

import React from 'react';

function ProjectText(props: {body: any}) {
    return (
        <div>
            <PortableText value={props.body}></PortableText>
        </div>
    );
}

export default ProjectText;