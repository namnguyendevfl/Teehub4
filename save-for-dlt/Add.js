import React from "react";
import { useSelector } from "react-redux";
import AddNtbkNChapter from "./AddNtbkNChapter";
import AddTopic from "./addTopic";


export default function Add(props){
    const { ntbkSelected } = useSelector(state => state.ntbks);
    const { chapterSelected } = useSelector(state => state.chapters)

    if (!ntbkSelected) {
        return ( <AddNtbkNChapter /> )
    }
    if (!chapterSelected) {
        return (
            <AddNtbkNChapter />
        )
    }
    return (
        <>
        <AddTopic                        
            />  
        </>
    )
}