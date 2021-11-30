import React from "react";
import EditChap from "../../../completedNtbks/edit/EditChap";
import EditNtbk from "../../../completedNtbks/edit/EditNtbk";
import EditTopic from "../../../completedNtbks/edit/editTopic";

export default function Edit(props) {
    const {
        ntbkSelected,
        setNtbkSelected, 
        ntbkAlteredCount,
        setNtbkAlteredCount,
        chapSelected, 
        setChapSelected, 
        chapAlteredCount,
        setChapAlteredCount,
        topicAlteredCount,
        setTopicAlteredCount,
        displayNav, 
        setDisplayNav, 
        displayCom, 
        setDisplayCom, 
        option,
        dropdown,
        setDropdown,
    } = props
    
    // return (
    //     <>
    //     This is edit
    //     </>
    // )
    
    if (!ntbkSelected) {
        return (
            <>
                <EditNtbk
                   option = {option} 
                   ntbkSelected = {ntbkSelected}
                   setNtbkSelected = {setNtbkSelected}
                   ntbkAlteredCount = {ntbkAlteredCount} 
                   setNtbkAlteredCount = {setNtbkAlteredCount}  
                   chapSelected = {chapSelected}
                   setChapSelected = {setChapSelected}
                   chapAlteredCount = {chapAlteredCount}
                   setChapAlteredCount = {setChapAlteredCount}
                   topicAlteredCount = {topicAlteredCount}
                   setTopicAlteredCount = {setTopicAlteredCount}
                   displayNav = {displayNav}
                   setDisplayNav = {setDisplayNav}
                   displayCom = {displayCom}
                   setDisplayCom = {setDisplayCom} 
                   dropdown = {dropdown}
                   setDropdown = { setDropdown }                     
                    />
            </>
        )
    }

    if (!chapSelected) {
        return (
            <>
                <EditChap
                    option = {option} 
                    ntbkSelected = {ntbkSelected}
                    setNtbkSelected = {setNtbkSelected}
                    ntbkAlteredCount = {ntbkAlteredCount} 
                    setNtbkAlteredCount = {setNtbkAlteredCount}  
                    chapSelected = {chapSelected}
                    setChapSelected = {setChapSelected}
                    chapAlteredCount = {chapAlteredCount}
                    setChapAlteredCount = {setChapAlteredCount}
                    topicAlteredCount = {topicAlteredCount}
                    setTopicAlteredCount = {setTopicAlteredCount}
                    displayNav = {displayNav}
                    setDisplayNav = {setDisplayNav}
                    displayCom = {displayCom}
                    setDisplayCom = {setDisplayCom} 
                    dropdown = {dropdown}
                    setDropdown = { setDropdown }                     
                    />
            </>
        )
    }
    return (
        <EditTopic
        option = {option} 
        ntbkSelected = {ntbkSelected}
        setNtbkSelected = {setNtbkSelected}
        ntbkAlteredCount = {ntbkAlteredCount} 
        setNtbkAlteredCount = {setNtbkAlteredCount}  
        chapSelected = {chapSelected}
        setChapSelected = {setChapSelected}
        chapAlteredCount = {chapAlteredCount}
        setChapAlteredCount = {setChapAlteredCount}
        topicAlteredCount = {topicAlteredCount}
        setTopicAlteredCount = {setTopicAlteredCount}
        displayNav = {displayNav}
        setDisplayNav = {setDisplayNav}
        displayCom = {displayCom}
        setDisplayCom = {setDisplayCom} 
        dropdown = {dropdown}
        setDropdown = { setDropdown }           
        />
    )
}