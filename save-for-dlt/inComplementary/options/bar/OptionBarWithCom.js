import React from "react";
import { useSelector } from "react-redux";
import AdditnOptnsWCom from "./AdditnOptnsWCom";
import BasicOptions from "./BasicOptions";

export default function OptionBarWithCom(props) {
    const { show, ntbks } = useSelector(state => state.complementaries)
    return ( show &&
        <>
        <div className = "d-flex align-items-center justify-content-center" >
            <BasicOptions      
                />
        </div> 
        <AdditnOptnsWCom 
            />
        </>
    )

}