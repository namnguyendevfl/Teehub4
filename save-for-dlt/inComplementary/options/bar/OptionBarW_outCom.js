import React, { useState } from "react";
import MinOptnBarW_oCom from "./MinOptnBarW_oCom";
import MaxOptnBarW_oCom from "./MaxOptnBarW_oCom";
import { useSelector } from "react-redux";

export default function OptionBarW_outCom(props) {
    const [ btnStyle, setBtnStyle ] = useState({display: 'none'})
    const { show, ntbks } = useSelector(state => state.complementaries)
    const { chapterSelected } = useSelector(state => state.chapters)
    // return ( !show && chapterSelected &&
    return ( 
        <>
        <MaxOptnBarW_oCom />
                 
        <MinOptnBarW_oCom />
    </>
    )
}