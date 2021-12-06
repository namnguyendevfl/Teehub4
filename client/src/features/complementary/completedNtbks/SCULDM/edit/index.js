import React from "react";
import { useSelector } from "react-redux";
import UpdateNRearrageObj from "./UpdateNListObj";

export default function UpdateNList(props) {
    const { ntbkSelected } = useSelector(state => state.ntbks);
    const { chapterSelected } = useSelector(state => state.chapters)
    
    if (!ntbkSelected) {
        return (<UpdateNRearrageObj option = "notebooks" />)
    }
    if (!chapterSelected) {
        return ( <UpdateNRearrageObj option = "chapters" />)
    }
    return ( <UpdateNRearrageObj option = "topics" />)
}