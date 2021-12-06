import React, { useEffect, useState } from "react"
import TextareaAutosize from "react-autosize-textarea"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import Errors from "../../../../../errors/errors";
import { generalTitles } from "../../../../../languages/english/generalTitles";
import { ntbkPlaceholdersEn, SCULDMTitlesEn } from "../../../../../languages/english/ntbks";
import { popupChanged } from "../../../../../layout/layoutAltersSlice";
import { complementary } from "../../../../../utils/icons/complementary/Complementary";
import { createObj } from "../../../../main/completedNtbks/apiNtbksComplete";
import { saveChapterSelected, saveNewChap } from "../../../../main/completedNtbks/ntbksNChapters/chaptersSlice";
import { saveNewNtbk, saveNtbkSelected } from "../../../../main/completedNtbks/ntbksNChapters/ntbksSlice";

export default function AddNtbkNChapter({}){
    const dispatch = useDispatch()
    const handleEscape = ({target: {id}}) => {
        dispatch(popupChanged(false))
    }
    const { ntbkSelected, ntbks } = useSelector(state => state.ntbks);
    const { chapterSelected } = useSelector(state => state.chapters);
    const { recentLoggedIn } = useSelector(state => state.loggedIns)
    const initialState = (ntbkSelected) ? {chapter_title: ""} : {ntbk_title: ""}
    useEffect(() => {
        setNewItem(() => initialState)
    },[ntbkSelected, chapterSelected])
    const [ error, setError ] = useState(null)
    const [ newItem, setNewItem ] = useState(initialState);
    const handleChange = ({target: { name, value }}) => {
        setNewItem((prevItem) => {
            const result = {
                ...prevItem,
                user_id: recentLoggedIn.id,
                [name]: value,   
            }
            if (ntbkSelected) result.ntbk_id = ntbkSelected.id
            return result  
        })
    }
    
    const { create_ntbk_placeholder_text, create_chapter_placeholder_text } = ntbkPlaceholdersEn
    const { create_ntbk_text, create_chapter_text} = SCULDMTitlesEn

    const inputParams = () => {
        if (ntbkSelected) return {title: newItem.chapter_title, id: "chapter_title", placeholder: create_chapter_placeholder_text, boxTitle: create_chapter_text}
        return {title: newItem.ntbk_title, id: "ntbk_title", placeholder: create_ntbk_placeholder_text, boxTitle: create_ntbk_text}
    }
    const { title, id, placeholder, boxTitle } = inputParams()
    const handleSubmit = (e) => {
        e.preventDefault();
        const parentUrl = (ntbkSelected) ? `/notebooks/${ntbkSelected.ntbk_title.replaceAll(" ","-")}` : "/notebooks"
        const urlSuffix = (newItem.ntbk_title) ? `notebooks/${newItem.user_id}` : `chapters/${newItem.user_id}`
        createObj(urlSuffix,newItem)
        .then((response) => {
            //add parentUrl to the the newItem
            const newItemSelected = {
                ...response,
                parentUrl: `${parentUrl}`
            }
            const selectedUrl = `${parentUrl}/${title.replaceAll(" ","-")}`
            if (response.ntbk_title) {
                dispatch(saveNewNtbk(response))
                dispatch(popupChanged(false))
            } else {
                dispatch(saveNewChap(response))
                dispatch(popupChanged(false))
            }
        })
        .catch(setError)
    };

    const { escapeIcon, listIcon } = complementary
    return (
        <>    
    <Errors error = {error} />
    <div className="row d-flex text-aligns-center m-0 justify-content-center">    
        <div className = "col-2"></div>
        <h5 className = "my-3 col-8 text-center text-dark m-0">{boxTitle}</h5>
        <div className = "col-2 m-0 d-flex align-items-center justify-content-end">
            <button className = "ntbkBtn d-flex align-items-center p-2 "
                    onClick = {handleEscape}
            >
                {escapeIcon()}
            </button>
        </div>
    </div>
    <hr className =" m-0 p-0"/>

    <form className = "px-3 pt-2 text-start w-100 my-3"
    onSubmit = {handleSubmit}>
        <div>
            <div>
                <TextareaAutosize
                    className = "textarea ntbk-popup-segment-middle w-100 "
                    id = {id}
                    name = {id}
                    placeholder = {placeholder}
                    value = {title}
                    onChange = {handleChange}
                />
            </div>   
        </div>
        <div className = "position-absolute text-center w-100 px-3" style = {{left: "0px"}}>
            
            <button 
                className = "submit-btn mb-3 list-group-item w-100 d-flex align-items-center justify-content-center text-center "
                type = "submit"
                onClick = {handleSubmit} 
                >
                <strong> {generalTitles.save_text} </strong>
            </button>
        </div>
    </form>
</>
    )
}