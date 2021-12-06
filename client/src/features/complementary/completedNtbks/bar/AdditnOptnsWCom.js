import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { complementary } from "../../../../utils/icons/complementary/Complementary";
import { main } from "../../../../utils/icons/main/main";
import { editStatusChanged, showComplementaryChanged, showFullOptionBarWithComHidedChanged, showSwitchTabsChanged} from "../../../../layout/loggedIn/complementaries/complementariesSlice";


export default function AdditnalOptnsWCom(props) {
    const dispatch = useDispatch()
    const { escapeIcon, editIcon } = complementary
    const [ btnStyle, setBtnStyle ] = useState({display: 'none'})
    const { ntbks_chaps_topics: { edit } } = useSelector(state => state.complementaries)
    const handleMouseEnter = (e) => {
        setBtnStyle ({display: 'flex'});    
    } 
    const handleMouseLeave = (e) => {
        setBtnStyle ({display: 'none'});                              
    }
    const handleHideCom = (e) => {
        dispatch(showComplementaryChanged())
        dispatch(showSwitchTabsChanged(false))
        dispatch(showFullOptionBarWithComHidedChanged(false))
        }
    return(
        <>
            <div className = "ntbk-expand-to-right p-0 mt-1" 
                    onMouseEnter = {handleMouseEnter}  
                    onMouseLeave = {handleMouseLeave} >                          
                <div className = "ntbkBtn-expand-to-right-bg p-0" >                   
                    <button className = "ntbkBtn-expand-to-right p-0"                                                                
                        style = {btnStyle}
                        onClick = {handleHideCom}
                    > 
                    {main.rightChevron()}
                    </button>
                </div>                         
            </div> 
            <div  className = "ntbk-edit-to-right p-0 mt-1" 
                onMouseEnter = {handleMouseEnter}  
                onMouseLeave = {handleMouseLeave} >                          
                <div    className = " ntbkBtn-expand-to-right-bg p-0" >                   
                    <button className = "ntbkBtn-expand-to-right p-0"   
                                                                          
                        style = {btnStyle}
                        onClick = {(e) => { dispatch(editStatusChanged())}}
                    > 
                    {!edit ? editIcon() : escapeIcon() }
                    </button>
                </div>                    
            </div> 
    </> 
    )}