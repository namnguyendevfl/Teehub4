import React from "react"
import TextareaAutosize from "react-autosize-textarea"
import { complementary } from "../../../../../utils/icons/complementary/Complementary"

export default function More(props){
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
    
    return (
    <>
    <div className="row d-flex text-aligns-center m-0 justify-content-center">    
        <div className = "col-2"></div>
        <h5 className = "ntbkOptnBoxTitle col-8 text-center m-0">More</h5>  
        <div className = "col-2 m-0  d-flex align-items-center justify-content-end">
            <button className = "ntbkBtn d-flex align-items-center p-2 "
                    onClick = {(e) => setDropdown (() => !dropdown)}
            >
          
                {complementary.escape()}
            </button>
        </div>
    </div>
    <hr className =" m-0 p-0"/>
 
    </>
    )
}