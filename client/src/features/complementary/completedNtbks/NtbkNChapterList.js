import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { CaretDownIcon, SwitchIcon } from "../../../utils/icons/complementary/Complementary";
import { saveChapterSelected, selectChapterById, selectChapterIds, selectChapterIdsAvai } from "../../main/completedNtbks/ntbksNChapters/chaptersSlice";
import { saveNtbkSelected, selectNtbkById, selectNtbkIdsAvai } from "../../main/completedNtbks/ntbksNChapters/ntbksSlice";
import { selectTopicById, selectTopicIds } from "../../main/completedNtbks/topics/topicsSlice";

const TopicListItem = ({option, title, idx}) => {
    const header = `${idx + 1}. ${title}`
    return option === "topics" && (
        <li key = {idx} className = "ntbkDropdown bg-transparent  list-group-item m-0 p-0 border-white"> 
            <a className = "ntbkDropdown bg-transparent  list-group-item w-100 d-flex border-white ps-4 text-decoration-none text-secondary"
            href={`#${title}`}
            >
                <span style = {{fontSize : "15px"}} className = "text-white"> {title} </span>
            </a>
        </li>       
    )
}


const NtbkNChapterListItem = ({option, parentUrl, title, handleSelect}) => {
    return option !== "topics" && (
        <li className = "list-group-item bg-transparent p-0 m-0">
        <Link   className = "link" 
                    to = {`${parentUrl}/${title.replaceAll(" ","-")}`} 
                    >            
            <button     className = "ntbkDropdown bg-transparent list-group-item w-100 text-start"
                        onClick = {handleSelect}
            > 
                <span style = {{fontSize : "15px"}} className = "text-white"> {title} </span>
            </button>
        </Link>
    </li>       
    )
}

const ListItem = ({id, option, idx}) => {
    const item = useSelector(state => {
        switch (option) {
            case "ntbks" : return selectNtbkById(state,id)
            case "chapters" : return selectChapterById(state,id)
            case "topics": return selectTopicById(state,id)
            default:
        }
    })
    const title = (() => {
        switch (option) {
            case "ntbks" : return item.ntbk_title
            case "chapters" : return item.chapter_title
            case "topics": return item.topic_title
            default:
        }
    })()
    const { ntbkSelected } = useSelector(state => state.ntbks);
    const { chapterSelected } = useSelector(state => state.chapters);
    const parentUrl = (option === "ntbks") ? `${ntbkSelected .parentUrl}` : `${chapterSelected .parentUrl}`
    const newItem = {
        ...item,
         parentUrl: `${parentUrl}`
    }
    const dispatch = useDispatch()
    const handleSelect = () => {        
        if (option === "ntbks") {
            dispatch(saveNtbkSelected(newItem))
            dispatch(saveChapterSelected(null))
        }
        else if (option === "chapters") {
            dispatch(saveChapterSelected(newItem))
        }
    }

    return (
        <>
        <NtbkNChapterListItem option = {option} parentUrl = {parentUrl} title = {title} handleSelect = {handleSelect} />
        <TopicListItem option = {option} idx = {idx} parentUrl = {parentUrl} title = {title} handleSelect = {handleSelect} />
        </>
)}

export default function NtbkNChapterList({option}) {
    const initialId = (option === "ntbks") ? "switchNtbk" : "switchChap"
    const { ntbkSelected } = useSelector(state => state.ntbks);
    const [ itemSwitch, setItemSwitch ] = useState(false)
    const [ topicsDropdown, setTopicsDropdown ] = useState(false)
    const { chapterSelected } = useSelector(state => state.chapters);
    const [ switchId, setSwitchId ] = useState(initialId)
    const topicIds = useSelector(selectTopicIds);
    const ntbkIds = useSelector(selectNtbkIdsAvai)
    const chapterIds = useSelector(selectChapterIdsAvai)
    const optionIds = (option === "ntbks") ? ntbkIds : chapterIds 
    const dropdownItemList = (optionIds, option) => optionIds.map((itemId,idx) => {
       return <ListItem key = {idx} id = {itemId} option = {option} idx = {idx}/>               
    })
    window.addEventListener("click",({target}) => {
        const targetId= target.id
        if (targetId !== switchId ) {
            setItemSwitch(() => false)
        }
        if (targetId !== "caretTopicDown") setTopicsDropdown(() => false)
    }) 
    const tabTitle = (() => {
        if (option === "ntbks") {
            return (ntbkSelected) ? ntbkSelected.ntbk_title : "Notebooks"
        }
        return (chapterSelected) ? chapterSelected.chapter_title : "Chapters"
    })()
    const handleSwitch = (e) => {
        setItemSwitch(() => !itemSwitch)
        setSwitchId(() => e.target.id)
        setTopicsDropdown(() => false)
    }

    const handleTopicDropdown = (e) => {
        setTopicsDropdown(() => !topicsDropdown)
        setItemSwitch(() => false)
    }
    return (
        <>
        <div>
            <ul className = "list-group"> 
                <li className = "list-group-item bg-transparent py-1 d-flex align-items-center justify-content-between" > 
                    <div className = "d-flex align-items-center py-1"> 
                        <h5 className = "d-flex align-items-center m-0"> 
                        <span className= "fs-6 "> {tabTitle} </span>
                        </h5>
                    </div >
                    <div className = "d-flex align-items-center ms-2">
                        {
                            (option !== "ntbks") && topicIds.length !== 0 &&
                             <button className = "ntbkBtn"
                                    id = "caretTopicDown"
                                    onClick = {handleTopicDropdown}
                                > 
                                <CaretDownIcon />
                            </button>  
                        }
                        {
                            optionIds.length !== 0 &&
                            <button className = "ntbkBtn"                             
                                id = {initialId}
                                onClick = {handleSwitch}
                                >  
                                <SwitchIcon option = {option} />
                            </button>       
                        }  
                    </div>
                </li>
            </ul>
            {
                itemSwitch
                ?   
                    <ul className = "list-group dropdown-ntbkListBox ">
                        {dropdownItemList(optionIds, option)}
                    </ul>    
                :   null
            }
            {
                chapterSelected && topicsDropdown
                ?   <ul className = "list-group dropdown-ntbkListBox ">
                        {dropdownItemList(topicIds, "topics")}
                    </ul>
                :   null
            } 
        </div>
        </>
    )
}