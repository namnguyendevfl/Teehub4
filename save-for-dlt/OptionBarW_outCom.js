import React, { useState } from "react";
import MinOptnBarW_oCom from "../client/src/features/complementary/completedNtbks/bar/MinOptnBarW_oCom";
import MaxOptnBarW_oCom from "../client/src/features/complementary/completedNtbks/bar/MaxOptnBarW_oCom";
import { useSelector } from "react-redux";

export default function OptionBarW_outCom(props) {
    const [ btnStyle, setBtnStyle ] = useState({display: 'none'})
    const { show, ntbks_chaps_topics } = useSelector(state => state.complementaries)
    const { chapterSelected } = useSelector(state => state.chapters)
    // return ( !show && chapterSelected &&
    return ( 
        <>
        <MaxOptnBarW_oCom />
                 
        <MinOptnBarW_oCom />
    </>
    )
}