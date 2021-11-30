import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveChapterSelected, selectChapterById, selectChapterIds } from "./chaptersSlice";
import { saveNtbkSelected, selectNtbkById, selectNtbkIds } from "./ntbksSlice";
import Errors from "../../../../errors/errors";
import { recentUrl } from "../../../accounts/login/loggedInsSlice";

export const ListItem = ({id, option, url}) => {

    const item = useSelector(state => {
        if (option === "ntbks")
        return selectNtbkById(state, id)
        return selectChapterById(state,id)
    })
    const title = option === "ntbks" ? item.ntbk_title : item.chapter_title;
    const newItem = {
        ...item,
        parentUrl: `${url}`
    }
    const dispatch = useDispatch();
    const handleClick = e => {
        option === "ntbks" 
        ? dispatch(saveNtbkSelected(newItem))
        : dispatch(saveChapterSelected(newItem))
    }
    return (
    <li className = "list-group-item m-0 p-0 w-100">
        <Link className = "link"
            to = {`${title.replaceAll(" ","-")}`}
            >
            <button className = "list-group-item w-100 m-0 text-start"
                onClick = {handleClick}
            > 
                {title}
            </button>
        </Link>
    </li>
    )}

export default function NtbkNChapterList({option}) {
    const url = useLocation().pathname
    useEffect(() => {
        recentUrl.saveUrl(url)
    },[])
    const [ error, setError ] = useState(null)
    const ntbkIds = useSelector(selectNtbkIds);
    const chapterIds = useSelector(selectChapterIds)
    const optionIds = option === "ntbks" ? ntbkIds : chapterIds 
    // const ntbkIds = useSelector(selectNtbkIds)
    const renderedList = optionIds.map((optionId, idx) => {
    // const renderedNtbkList = ntbkIds.map((ntbkId,idx) => {
        return <ListItem key = {idx} id = {optionId} option = {option} url = {url}/>
    })
    const loader = <div className = "loader"/>

    return (
        <>
        {/* <p style = {{background:"white"}} className = "px-2">
        Speaking to Fox News, a parent in California who has witnessed the impact of masking school children, said: "Parents have been begging for the same consideration that teacher union and education leaders extended to themselves; for their kids to be able to hear their classmates. Randi is at higher risk of severe covid as a vaccinated senior than my unvaccinated young children."

"Their soft voices have been muffled for nearly two years and we are one of the few countries masking toddlers and grade school children," the parent added. "It’s not lost on me that this severe obligation on kids would not exist if it weren’t for Ms. Weingarten and the other corrupt leaders that run our public education system."        
        </p> */}
        <Errors error = {error} />
        <ul className = "list-group">
            {/* {ntbkList} */}
            {renderedList}
        </ul>
        {loader}
        {/* <DnD notebooks = {notebooks}/> */}
        </>
    )
}