import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddNtbkNChapter from "../../AddNtbkNChapter";
import OptionBarWithCom from "./bar/OptionBarWithCom";
import OptionBarW_outCom from "./bar/OptionBarW_outCom";
import Add from "../../Add";
import Dlt from "./options/Dlt";
import Edit from "./options/Edit";
import More from "./options/More";

export default function Options(props) {
    const { show, ntbks : { CULDSM, CULDSMBoxDropDown } } = useSelector(state => state.complementaries)
    const optionBoxStyle = (() => {
        if (show) return {
            right: "10px"
        }
        return {
            right: "0px",
            top:"42px"
        }
    })()
    const displayOption = (option) => {
        switch (option) {
            case "add":
                //We have to return it => remember
                return <Add   
                    option = {option}
                />
            case "trash":
                return <Dlt 
                option = {option}
                   
                    />
            
            case "list":
                return <Edit 
                option = {option}
                   
                    />  
            case "more":
                return <More
                option = {option}
                    />                     
        }
    }
    return (
        <> 
        <div className = "position-relative">
        <OptionBarWithCom 
            
            />
        <OptionBarW_outCom               
            />
            {
                CULDSM && CULDSMBoxDropDown &&
                <div className = "optionNtbkBox bg-white container-fluid m-0 p-0"
                    style = {optionBoxStyle }
                    >
                    {displayOption(CULDSM)}
                </div>
            }
        </div>
        
        </>
    )
}