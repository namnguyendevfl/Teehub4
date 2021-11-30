import React from "react";
import { useSelector } from "react-redux";
import DltChapter from "../../../completedNtbks/dlt/DltChap";
import DltNtBk from "../../../completedNtbks/dlt/DltNtbk";
import DltTopic from "../../../completedNtbks/dlt/DltTopic";

export default function Dlt(props){
    const { ntbkSelected } = useSelector(state => state.ntbks);
    const { chapterSelected } = useSelector(state => state.chapters)

    if (!ntbkSelected) {
        return (
            <>
                < DltNtBk  
                />
            </>
        )
    }

    if (!chapterSelected ) {
        return (
            <>
                <DltChapter     
                />           
            </>
        )
    }
    return (
        <>
            <DltTopic    
                /> 
        </>
    )
}