import React from "react"
import { useSelector } from "react-redux";
import "./Complementaries.css"
import Notebooks from "../../../features/complementary/completedNtbks/Notebooks";

export default function Complementaries() {
    const navOption = useSelector(state => state.navOptions)
    const { show, ntbks_chaps_topics: { showFullOptionBarWithComHided, edit } } = useSelector(state => state.complementaries)
    const style = (() => {
        if (edit) {
            if (show) {
                return {
                    background: "none",
                    width:"auto"
                }
            } return {
                background: "none",
                right: "4px", 
                width: "auto" 
            } 
        }
        if (show) {
            return {
                width: "inherit",
                backgroundColor: "#e9ecef",   
            }
        }
        if (!show) {
            if (!showFullOptionBarWithComHided) {
                return {
                    color:"black", 
                    boxShadow:"none", 
                    background:"none", 
                    width:"260px",               
                    right:"4px",         
                }
            } else {
                return {
                    background:"white", 
                    width:"260px",
                    boxShadow: "0px 1px 7px 4px lightgrey",
                    borderRadius:"8px",
                    right:"4px",            
                    }        
            }
        }

    })()
    return (
    <>  
        <>
            {
            (navOption.selected === "/notebooks") &&
            <>
            <div className = "notebooks" style = {style}>
                <Notebooks />
            </div>   
            <div className = "offsetNtbk" ></div>
            </>
            }  
            {show &&        
            <div className = "comContent">
            Speaking to Fox News, a parent in California who has witnessed the impact of masking school children, said: "Parents have been begging for the same consideration that teacher union and education leaders extended to themselves; for their kids to be able to hear their classmates. Randi is at higher risk of severe covid as a vaccinated senior than my unvaccinated young children."

            "Their soft voices have been muffled for nearly two years and we are one of the few countries masking toddlers and grade school children," the parent added. "It’s not lost on me that this severe obligation on kids would not exist if it weren’t for Ms. Weingarten and the other corrupt leaders that run our public education system."
            </div>
            }  
        </>
        {/* } */}
       
    </>
    )

}