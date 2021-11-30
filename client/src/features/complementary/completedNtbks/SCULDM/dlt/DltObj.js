import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dltChapter, saveChapterSelected, selectChapterById, selectChapterIds } from "../../../../main/completedNtbks/ntbksNChapters/chaptersSlice";
import { dltNtbk, saveNtbkSelected, selectNtbkById, selectNtbkIds, testDltNtbk } from "../../../../main/completedNtbks/ntbksNChapters/ntbksSlice";
import Errors from "../../../../../errors/errors";
import { recentUrl } from "../../../../accounts/login/loggedInsSlice";
import { complementary } from "../../../../../utils/icons/complementary/Complementary";
import { dltObj } from "../../../../main/completedNtbks/apiNtbksComplete";
import { dltTopic, selectTopicById, selectTopicIds } from "../../../../main/completedNtbks/topics/topicsSlice";
import { popupChanged } from "../../../../../layout/layoutAltersSlice";

export const ListItem = ({id, option, url, setItemsDlted, setOptionIds}) => {
    const item = useSelector(state => {
        if (option === "notebooks") return selectNtbkById(state, id)
        if (option === "chapters") return selectChapterById(state,id)
        return selectTopicById(state,id)
    })
    const title = (() => {
        if (option === "notebooks") return item.ntbk_title 
        if (option === "chapters") return item.chapter_title
        return item.topic_title
    })()
  
    const dispatch = useDispatch();
    const handleDlt = () => {
        setItemsDlted((prevItemsDlted) => [...prevItemsDlted,item])
        setOptionIds(prevIds => prevIds.filter(prevId => prevId !== item.id))
    }
    return (
        <li className = "dlt me-0 py-1 pe-2 list-group-item d-flex align-items-center justify-content-between">
        <span>{title} </span>
        <button 
                className = "ntbkBtn d-flex align-items-center justify-content-center"
                onClick = {handleDlt}
                > 
            {complementary.trash()}
        </button>
        </li>
    )}

export default function DltObj({option}) {
    const url = useLocation().pathname
    useEffect(() => {
        recentUrl.saveUrl(url)
    },[])
    const [ itemsDlted, setItemsDlted ] = useState([]);
    const navigate = useNavigate()
    const [ error, setError ] = useState(null)
    const ntbkIds = useSelector(selectNtbkIds);
    const chapterIds = useSelector(selectChapterIds)
    const topicIds = useSelector(selectTopicIds) 
    const initialState = (() => {
        if ( option === "notebooks" ) return {ids: ntbkIds, actionTitle: "Delete Notebook"}
        if ( option === "chapters" ) return {ids: chapterIds, actionTitle: "Delete Chapter"}
        return {ids: topicIds, actionTitle: "Delete Topic"}
    })
    useEffect(() => {
        setItemsDlted(() => [])
    },[option])
    const [ optionIds, setOptionIds ] = useState(initialState().ids)
    const renderedList = optionIds.map((optionId, idx) => {
        return <ListItem    key = {idx} id = {optionId} option = {option} url = {url}
                            itemslted = {itemsDlted} setItemsDlted = { setItemsDlted }
                            setOptionIds = {setOptionIds}
        />
    })
    const loader = <div className = "loader"/>
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
            e.preventDefault();
            itemsDlted.forEach((itemDlted, idx) => {
                const urlSuffix = `${option}/${itemDlted.user_id}/${itemDlted.id}`
                if (option === "notebooks") {
                    dltObj(urlSuffix)
                    .then(() => {
                        dispatch(popupChanged(false))
                        dispatch(dltNtbk(itemDlted.id))
                    })
                    .catch(setError)
                }
                if (option === "chapters") {
                    dltObj(urlSuffix)
                    .then(() => {
                        dispatch(popupChanged(false))
                        dispatch(dltChapter(itemDlted.id))
                    })
                    .catch(setError)
                }
                dltObj(urlSuffix)
                .then(() => {
                    dispatch(dltTopic(itemDlted.id))
                    dispatch(popupChanged(false))
                })
                .catch(setError)
            })
        }

    
    const handleEscape = () => {
        dispatch(popupChanged(false))
    }
    return (
        <>
        <Errors error = {error} />
        {/* {loader} */}
        <>
            <div className="row d-flex text-aligns-center m-0 justify-content-center">
            <div className = "col-2"></div>
            <h5 className = "ntbkOptnBoxTitle col-8 text-center text-dark m-0">{initialState().actionTitle}</h5>
            <div className = "col-2 m-0 d-flex align-items-center justify-content-end">
                <button className = "ntbkBtn d-flex align-items-center p-2 " onClick ={handleEscape} >
                    {complementary.escape()}
                </button>
            </div>
        </div>
        <hr className =" m-0 p-0"/>
        <div className = "ntbkOptnBoxList">
            <ul className = "list-group">
                {renderedList}
            </ul>
        </div>
        <div className = "position-absolute bottom-0 text-center w-100 px-3">
        <button 
            className = "mb-3 saveNtbk list-group-item w-100 d-flex align-items-center justify-content-center text-center "
            type = "submit"
            onClick = {handleSubmit} 
            >
            Save
        </button>
        </div>
      
    </>


        </>
    )
}