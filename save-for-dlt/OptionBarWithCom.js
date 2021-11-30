import React from "react";
import { useSelector } from "react-redux";
import AdditnOptnsWCom from "../client/src/features/complementary/completedNtbks/bar/AdditnOptnsWCom";
import BasicOptions from "../client/src/features/complementary/completedNtbks/bar/SCULDM";

export default function OptionBarWithCom(props) {
    const { show, ntbks_chaps_topics } = useSelector(state => state.complementaries)
    return ( show &&
        <>
        <div className = "d-flex align-items-center justify-content-center" >
            <BasicOptions  />    
                
        </div> 
        <AdditnOptnsWCom 
            />
        </>
    )

}