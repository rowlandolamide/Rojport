"use client"
import React, { Suspense, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';

function ProjectWrapper(props: {children: React.ReactNode}) {
    
    return (
        <div>

            <Suspense>{props.children}</Suspense>
        </div>
    );
}

export default ProjectWrapper;