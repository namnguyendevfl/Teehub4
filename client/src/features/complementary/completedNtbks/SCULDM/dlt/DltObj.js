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
import { SCULDMTitlesEn } from "../../../../../languages/english/ntbks";
import { generalTitles } from "../../../../../languages/english/generalTitles";

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
            {complementary.trashIcon()}
        </button>
        </li>
    )}

export default function DltObj({option}) {
    const url = useLocation().pathname
    useEffect(() => {
        recentUrl.saveUrl(url)
    },[])
    const [ itemsDlted, setItemsDlted ] = useState([]);
    const [ error, setError ] = useState(null)
    const ntbkIds = useSelector(selectNtbkIds);
    const chapterIds = useSelector(selectChapterIds)
    const topicIds = useSelector(selectTopicIds) 
    const { dlt_ntbk_text, dlt_chapter_text, dlt_topic_text} = SCULDMTitlesEn

    const initialState = (() => {
        if ( option === "notebooks" ) return {ids: ntbkIds, actionTitle: dlt_ntbk_text}
        if ( option === "chapters" ) return {ids: chapterIds, actionTitle: dlt_chapter_text}
        return {ids: topicIds, actionTitle: dlt_topic_text}
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
            <h5 className = "my-3 col-8 text-center text-dark m-0">{initialState().actionTitle}</h5>
            <div className = "col-2 m-0 d-flex align-items-center justify-content-end">
                <button className = "btn d-flex align-items-center p-2 " onClick ={handleEscape} >
                    {complementary.escapeIcon()}
                </button>
            </div>
        </div>
        <hr className ="m-0 p-0"/>
        <div className = "ntbk-popup-segment-middle m-1 my-3 me-3">
            <ul className = "list-group">
                {renderedList}
            </ul>
        </div>
        <div className = "position-absolute text-center w-100 px-3">
        <button 
            className = "submit-btn mb-3 list-group-item w-100 d-flex align-items-center justify-content-center text-center "
            type = "submit"
            onClick = {handleSubmit} 
            >
            <strong> {generalTitles.save_text} </strong>
        </button>
        </div>
      
    </>


        </>
    )
}