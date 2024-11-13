"use client"
import React, { Suspense, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';

function ProjectWrapper(props: {children: React.ReactNode}) {
    
    return (
        <div className=' w-full px-[10px] lg:px-[21vw]'>

            <Suspense>
                <div className=''>{props.children}</div>
            </Suspense>
        </div>
    );
}

export default ProjectWrapper;