import React, { useEffect, useState } from "react"
import TextareaAutosize from "react-autosize-textarea"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import Errors from "../../errors/errors";
import { complementary } from "../../utils/icons/complementary/Complementary";
import { setCULDSMBoxDropDown } from "./complementariesSlice";

export default function AddNtbkNChapter({}){
    const dispatch = useDispatch()
    const handleEscape = ({target: {id}}) => {
        dispatch(setCULDSMBoxDropDown(false))
    }
    const { ntbkSelected } = useSelector(state => state.ntbks);
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
    
    const navigate = useNavigate();
    // const ntbkSelectedUrl = (ntbkSelected) && `${ntbkSelected.parentUrl.title}`
    const parentUrl = (ntbkSelected) ? `/notebooks/${ntbkSelected.ntbk_title.replaceAll(" ","-")}` : "/notebooks"
    const inputParams = () => {
        if (ntbkSelected) return {title: newItem.chapter_title, id: "chapter_title", placeholder: `Write a chapter title`, boxTitle: "Create chapter"}
        return {title: newItem.ntbk_title, id: "ntbk_title", placeholder: `Write a notebook title`, boxTitle: "Create notebook"}
    }
    const { title, id, placeholder, boxTitle } = inputParams()
    console.log(newItem)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newItemSelected = {
            ...newItem,
            parentUrl: `${parentUrl}`
        }
        const selectedUrl = `${parentUrl}/${title.replaceAll(" ","-")}`
       console.log(selectedUrl)
        // `${parentUrl}/${title.replaceAll(" ","-")}`
        // createNtbk(newNtbk)
        // .then(() => {
        //     setDropdown(() => !dropdown)
        //     setNtbkAlteredCount(() => ntbkAlteredCount + 1)
        //     navigate("/notebooks")
        // })
        // .catch(setError)
    };



    return (
        <>    
    <Errors error = {error} />
    <div className="row d-flex text-aligns-center m-0 justify-content-center">    
        <div className = "col-2"></div>
        <h5 className = "ntbkOptnBoxTitle col-8 text-center text-dark m-0">{boxTitle}</h5>
        <div className = "col-2 m-0 d-flex align-items-center justify-content-end">
            <button className = "ntbkBtn d-flex align-items-center p-2 "
                    onClick = {handleEscape}
            >
                {complementary.escape()}
            </button>
        </div>
    </div>
    <hr className =" m-0 p-0"/>

    <form className = ""
    onSubmit = {handleSubmit}>
        <div>
            <div>
                <TextareaAutosize
                    className = "textarea ntbkTextarea w-100 px-3 pt-2 text-start w-100"
                    id = {id}
                    name = {id}
                    placeholder = {placeholder}
                    value = {title}
                    onChange = {handleChange}
                />
            </div>   
        </div>

        <div className = "position-absolute bottom-0 text-center w-100 px-3">
            <div className = "py-1 w-100 d-flex justify-content-between">
                <p className = "m-0 "> Add to your note </p>
                <div>
                <button className = "ntbkBtn d-flex justify-content-center align-items-center"
                        onClick = {(e) => {
                            e.preventDefault();
                            // setDisplayAddOption (() => !displayAddOption);
                        }}
                >
                    {complementary.list()}
                </button>

                </div>

            </div>
            <button 
                className = "saveNtbk mb-3 list-group-item w-100 d-flex align-items-center justify-content-center text-center"
                type = "submit"
                >
                Save
            </button>
        </div>
    </form>
</>
    )
}