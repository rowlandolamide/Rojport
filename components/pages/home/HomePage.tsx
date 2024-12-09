"use client"
import React from 'react';
import dynamic from "next/dynamic";

import MobileAndTabletHomeScreen from "./MobileAndTabletHomeScreen";
const HomePageHorizontal = dynamic(()=>import("./HomePageHorizontal"))
import useMediaQuery from "@/components/hooks/useMediaQuery";


import type { HomePagePayload } from "@/types";



function HomePage(props: {data: HomePagePayload | null}) {
    const {x} = useMediaQuery()
    const isLaptop = x > 1279
    return (
        <div>
            {isLaptop ? <HomePageHorizontal data={props.data}></HomePageHorizontal> : <MobileAndTabletHomeScreen data={props.data}></MobileAndTabletHomeScreen>}
        </div>
    );
}

export default HomePage;