import React from "react";
import { useSelector } from "react-redux";
import DltObj from "./DltObj";

export default function Dlt(props){
    const { ntbkSelected } = useSelector(state => state.ntbks);
    const { chapterSelected } = useSelector(state => state.chapters)

    if (!ntbkSelected) {
        return (
                <DltObj option = "notebooks"/>
        )
    }

    if (!chapterSelected ) {
        return (
                <DltObj option ="chapters"/>
        )
    }
    return (
        <DltObj option = "topics"/>
    )
}