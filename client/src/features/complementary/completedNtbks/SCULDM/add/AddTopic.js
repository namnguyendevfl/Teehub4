import React, { useState } from "react"
import TextareaAutosize from "react-autosize-textarea"
import { useDispatch, useSelector } from "react-redux";
import { popupChanged } from "../../../../../layout/layoutAltersSlice";
import { complementary } from "../../../../../utils/icons/complementary/Complementary";
import { createObj } from "../../../../main/completedNtbks/apiNtbksComplete";
import { saveNewTopic } from "../../../../main/completedNtbks/topics/topicsSlice";

const AddContent = (props) => {
    const {
        handleEscape, handleSubmit,
        displayAddOption, setDisplayAddOption,
        displayContent, setDisplayContent,
        newTopic, setNewTopic
    } = props
    const [ error, setError ] = useState()
    const handleChange = ({ target: {name, value}}) => {
        setNewTopic((prevTopic) => ({
            ...prevTopic,
            [name]: value,
        }))
    };


    return (
        <>
     <div className="row d-flex text-aligns-center m-0 justify-content-center">  
        <div className = "col-2 m-0 ps-2 d-flex align-items-center">
            <button className = "ntbkBtn d-flex align-items-center p-0 "
                    onClick = {(e) => setDisplayContent(() => !displayContent)}
            >
                {complementary.leftArrow()}
            </button>
        </div>
        <h5 className = "ntbkOptnBoxTitle col-8 text-center m-0 ">
            <span className = ""> Create topic content </span>
        </h5>  
        <div className = "col-2 m-0  d-flex align-items-center justify-content-end">
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
            <TextareaAutosize
                className = "textarea ntbkTextarea w-100 px-3 pt-2 text-start w-100"
                type = "textarea"
                id = "topic_content"
                name = "topic_content"
                placeholder = "Write a content..."
                value = {newTopic.topic_content}
                onChange = {handleChange}
            />
        </div>

        <div className = "text-center w-100 px-3">
            <div className = "py-1 w-100 d-flex justify-content-between">
                <p className = "m-0 "> Add to your note </p>
                <div>
                <button className = "ntbkBtn d-flex justify-content-center align-items-center"
                        onClick = {(e) => {
                            e.preventDefault();
                            
                            setDisplayAddOption (() => !displayAddOption);
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

export default function AddTopic(props){
    const dispatch = useDispatch();
    const { chapterSelected } = useSelector(state => state.chapters);
    const { user_id = " ", ntbk_id = "", id = " "} = chapterSelected || ""
    const [ displayAddOption, setDisplayAddOption ] = useState(false);
    const [ displayContent, setDisplayContent ] = useState(false)
    const initTopic = {
        topic_title: "",
        topic_content:"",
        user_id: user_id,
        ntbk_id: ntbk_id,
        chapter_id: id,
    }
    const [newTopic, setNewTopic] = useState(initTopic);
    //becareful string and number over here
    const handleChange = ({ target: {name, value}}) => {
        const contents = value.split("\n")
        const newContents = contents.filter((content,idx) => content.replace(/\s/g, '').length)
        setNewTopic((prevTopic) => ({
            ...prevTopic,
            [name]: newContents.join('\n'),
            user_id: user_id,
            ntbk_id: ntbk_id,
            chapter_id: id,
        }))
    };

    const [ error, setError ] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedContent = newTopic.topic_content.trim();
        const trimmedNewTopic = {
            ...newTopic,
            topic_content: trimmedContent
        }
        const urlSuffix = `topics/${trimmedNewTopic.user_id}`
        createObj(urlSuffix,trimmedNewTopic)
        .then((response) => {
            dispatch(saveNewTopic(response))
            dispatch(popupChanged(false))
        })
        .catch(setError)
    };

    const handleEscape = (e) => {
        dispatch(popupChanged(false))
        // dispatch(setCULDSMBoxDropDown(false))
    }
    return (
        <> 
        {
            !displayContent &&
            <>
            <div className="row d-flex text-aligns-center m-0 justify-content-center">    
                <div className = "col-2"></div>
                <h5 className = "ntbkOptnBoxTitle col-8 text-center m-0 ">Create topic title</h5>  
                <div className = "col-2 m-0  d-flex align-items-center justify-content-end">
                    <button className = "ntbkBtn d-flex align-items-center p-2 "
                            onClick = {handleEscape}
                    >
                        {complementary.escape()}
                    </button>
                </div>
            </div>
            <hr className =" m-0 p-0"/>
            <form className = "" onSubmit = {handleSubmit}>        
                <div>
                    <TextareaAutosize
                        className = "textarea ntbkTextarea w-100 px-3 pt-2 text-start w-100"
                        id = "topic_title"
                        name = "topic_title"
                        placeholder = "Write a topic title"
                        value = {newTopic.topic_title}
                        onChange = {handleChange}
                    />
                </div>         
                <div className = " bottom-0 text-center w-100 px-3">
                {/* <div className = "position-absolute bottom-0 text-center w-100 px-3"> */}
                    <div className = "py-1 w-100 d-flex justify-content-between">
                        <p className = "m-0 "> Add to your note </p>
                        <div>
                            <button className = "ntbkBtn d-flex justify-content-center align-items-center"
                                    onClick = {(e) => {
                                        e.preventDefault();
                                        setDisplayAddOption (() => !displayAddOption);
                                    }}
                            >
                                {complementary.list()}
                            </button>
                        </div>
                    </div>
                    <button 
                        className = "saveNtbk mb-3 list-group-item w-100 d-flex align-items-center justify-content-center text-center"
                        onClick = {(e) => {
                            e.preventDefault();
                            setDisplayContent(() => newTopic && newTopic.topic_title && true)
                        }}
                        >
                        Add Content
                    {/* <Plus /> */}
                    </button>
                
                </div>
            </form>
            </>
        }
        {
            displayContent &&         
            <AddContent    newTopic = {newTopic} setNewTopic = {setNewTopic} 
                                displayContent = {displayContent} setDisplayContent = {setDisplayContent} 
                                handleEscape = {handleEscape} handleSubmit = {handleSubmit}
                                />
        }


</>
    )
}