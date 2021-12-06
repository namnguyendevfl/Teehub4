import React, {  useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { generalTitles } from "../../../../../languages/english/generalTitles";
import { SCULDMTitlesEn } from "../../../../../languages/english/ntbks";
import { popupChanged } from "../../../../../layout/layoutAltersSlice";
import DnD from "../../../../../utils/dnd/DnD";
import { complementary } from "../../../../../utils/icons/complementary/Complementary";
import { updateObj } from "../../../../main/completedNtbks/apiNtbksComplete";
import { selectChapterIds, selectChapters, selectChaptersFiltered } from "../../../../main/completedNtbks/ntbksNChapters/chaptersSlice";
import { selectNtbkIds, selectNtbks, updateNtbk } from "../../../../main/completedNtbks/ntbksNChapters/ntbksSlice";
import { selectTopicIds, selectTopics, selectTopicsFiltered } from "../../../../main/completedNtbks/topics/topicsSlice";


export default function UpdateNRearrageObj ({option}){
    const [ itemsEdited, setItemsEdited ] = useState([])  
    const navigate = useNavigate();
    const [ error, setError ] = useState()
    const [ count, setCount ] = useState(0)//for instant update
    const { ntbkSelected } = useSelector(state => state.ntbks);
    const { chapterSelected } = useSelector(state => state.chapters);
    const ntbkIds = useSelector(selectNtbkIds);
    const ntbks = useSelector(selectNtbks)
    const chapterIds = useSelector(selectChapterIds)
    const chapters = useSelector(selectChaptersFiltered)
    const topicIds = useSelector(selectTopicIds);
    const topics = useSelector(selectTopicsFiltered);
    const [ popUpOff, setPopupOff ] = useState(false)
    const dispatch = useDispatch()
    const { update_list_ntbk_text, update_list_chapter_text, update_list_topic_text} = SCULDMTitlesEn

    useEffect(() => {
        if (popUpOff) dispatch(popupChanged(false))
    },[popUpOff])
    const objects = () => {
        switch (option) {
            case "notebooks": return {ids: ntbkIds, objs: ntbks, title: update_list_ntbk_text};
            case "chapters": return {ids: chapterIds, objs: chapters, title: update_list_chapter_text};
            case "topics": return {ids: topicIds, objs: topics, title: update_list_topic_text};
            default:
        }
    }

    const handleEscape = () => {
        setPopupOff(() => true)
    }
    const handleUpNList = (e) => {
        e.preventDefault();
        //Because the id is read-only => so we have to create a new one
        let itemsEditedRearraged = []
            if (itemsEdited !== undefined)  {
            itemsEdited.forEach((item, idx) => {
                let newItem = {
                    ...item,
                    id: objects().ids[idx]
                }
                itemsEditedRearraged.push(newItem)
            })}
        itemsEditedRearraged.forEach((item,idx) => {
            const urlSuffix = `${option}/${item.user_id}/${item.id}`
            if (option === "notebooks") {
                updateObj(urlSuffix, item)
                .then(() => {
                    setPopupOff(() => true)
                    dispatch(updateNtbk({id: item.id, changes: {ntbk_title: item.ntbk_title}}))
                })
                .catch(setError)
            }
            if (option === "chapters") {
                updateObj(urlSuffix, item)
                .then(() => {
                    setPopupOff(() => true)
                    dispatch(updateNtbk({id: item.id, changes: {chapter_title: item.chapter_title}}))
                })
                .catch(setError)
            }
            updateObj(urlSuffix, item)
            .then(() => {
                setPopupOff(() => true)
                dispatch(updateNtbk({id: item.id, changes: {topic_title: item.topic_title}}))
            })
            .catch(setError)
        })
    }
    return (
    <>
            <div className="row d-flex text-aligns-center m-0 justify-content-center">
            <div className = "col-2"></div>
            <h5 className = "my-3 col-8 text-center m-0">{objects().title}</h5>
            <div className = "col-2 m-0 d-flex align-items-center justify-content-end">
                <button className = "ntbkBtn d-flex align-items-center p-2 "
                onClick = {handleEscape}
                >
                    {complementary.escapeIcon()}
                </button>
            </div>
        </div>
        <hr className =" m-0 p-0"/>
        <div className = "ntbk-popup-segment-middle m-1 my-3 me-3">
            <DnD 
                indicator = {option}
                objsEdited = { itemsEdited }
                setObjsEdited = { setItemsEdited }
                objects = {objects().objs}
            />
        </div>
        <div className = "text-center w-100 px-3">
        <button 
            className = "submit-btn list-group-item w-100 d-flex align-items-center justify-content-center text-center "
            type = "submit"
            onClick = {handleUpNList}
            >
            <strong> {generalTitles.save_text} </strong>
        </button>
        </div>
      
    </>
    )
}