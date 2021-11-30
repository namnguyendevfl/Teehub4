import React from "react";
import { useSelector } from "react-redux";
import Add from "../../features/complementary/completedNtbks/SCULDM/add";
import Dlt from "../../features/complementary/completedNtbks/SCULDM/dlt";
import UpdateNList from "../../features/complementary/completedNtbks/SCULDM/edit";
import More from "../../features/complementary/completedNtbks/SCULDM/more";



export default function NtbkCRUD() {
    const { ntbks_chaps_topics : { SCULDM } } = useSelector(state => state.complementaries)

    const displayOption = (option) => {
        switch (option) {
            case "add": return <Add option = {option}/>
            case "trash": return <Dlt option = {option}/>
            case "list": return <UpdateNList option = {option}/>
            case "more": return <More option = {option}/>
        }
    }
    return (
        <>
        {displayOption(SCULDM)}
    </>
    )
}