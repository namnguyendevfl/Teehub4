import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { complementary } from "../../../../utils/icons/complementary/Complementary";
import { main } from "../../../../utils/icons/main/main";
import { editStatusChanged, showComplementaryChanged, showFullOptionBarWithComHidedChanged, showSwitchTabsChanged } from "../../../../layout/loggedIn/complementaries/complementariesSlice";

export default function MinOptnBarW_oCom() {
    const { show, ntbks_chaps_topics: { edit } } = useSelector(state => state.complementaries)
    const dispatch = useDispatch()
    const [ btnStyle, setBtnStyle ] = useState({display: 'none'})
    const btnStyleAfterEdit = edit ? {display: 'flex'} : btnStyle
    const handleMouseEnter = (e) => {
        setBtnStyle({display: 'flex'});  
    } 

    const handleMouseLeave = (e) => {
        setBtnStyle({display: 'none'})                             
    }
    const handleMaximizeOptnBox = (e) =>  {
        dispatch(showFullOptionBarWithComHidedChanged())
        dispatch(showSwitchTabsChanged(true))
        setBtnStyle({display: 'none'}) 
        const newStyle = {
            background:"white", 
            width:"260px",
            boxShadow: "0px 1px 7px 4px lightgrey"    
        };
        // setNtbkStyle(() => newStyle); 
    }
    
    const handleOpenCom = () => {
        dispatch(showSwitchTabsChanged(true))
        dispatch(showComplementaryChanged())
        dispatch(showFullOptionBarWithComHidedChanged(false))
        setBtnStyle({display:"none"})
        const newStyle = {
            width: "inherit",
            backgroundColor: "#e9ecef", 
        }
        // setNtbkStyle(() => newStyle);
    }
    const { ntbks_chaps_topics: { showFullOptionBarWithComHided } } = useSelector(state => state.complementaries)

    const { editIcon, escapeIcon, boxArrowDownLeftIcon } = complementary
    return( !showFullOptionBarWithComHided && !show &&
    <div className = "d-flex align-items-center justify-content-end">
        <div className = "ms-1 offsetNtbkBtn mt-1" onMouseEnter = {handleMouseEnter}  onMouseLeave = {handleMouseLeave} > 
            <div className = "ntbk-escape-from-expand p-0">  </div>                                                        
            <div className = "ntbkBtn-expand-to-right-bg" >
                <button className = "p-0 ntbkBtn-expand-to-right" 
                    // style = {btnStyleAfterEdit}
                    style = {btnStyle} 
                    onClick = {(e) => {
                        dispatch(editStatusChanged())
                    }} >
                    {!edit ? editIcon() : escapeIcon()}
                </button>
            </div>
        </div>                
        { 
            !edit &&
                <div className = "ms-1 offset-ntbkBtn mt-1" onMouseEnter = {handleMouseEnter}  onMouseLeave = {handleMouseLeave} > 
                    <div className = "ntbk-escape-from-expand p-0">  </div>                                                        
                    <div className = "ntbkBtn-expand-to-right-bg" >
                        <button className = "p-0 ntbkBtn-expand-to-right" 
                            style = {btnStyle} 
                            onClick = {(e) => handleMaximizeOptnBox(e)} >
                            {boxArrowDownLeftIcon()}
                        </button>
                    </div>
                </div>
        }
        <div className = "ms-1 me-2 offset-ntbkBtn mt-1" onMouseEnter = {handleMouseEnter}  onMouseLeave = {(e) => handleMouseLeave(e)} > 
            <div className = "ntbk-escape-from-expand p-0">  </div>                                                        
            <div className = "ntbkBtn-expand-to-right-bg" >
                <button className = "p-0 ntbkBtn-expand-to-right" 
                    // style = {btnStyleAfterEdit} 
                    style = {btnStyle} 
                    onClick = {(e) => handleOpenCom(e)}              
                > 
                    {main.leftChevron()}
                </button>
            </div>
        </div>
    </div>
    )

}