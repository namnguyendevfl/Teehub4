import React from "react";
import { useSelector } from "react-redux";
import AddNtbkNChapter from "./AddNtbkNChapter";
import AddTopic from "./AddTopic";

export default function Add(){
    const { ntbkSelected } = useSelector(state => state.ntbks);
    const { chapterSelected } = useSelector(state => state.chapters)
    if (!ntbkSelected || !chapterSelected) {
        return ( <AddNtbkNChapter /> )
    }
    return ( <AddTopic /> )
}