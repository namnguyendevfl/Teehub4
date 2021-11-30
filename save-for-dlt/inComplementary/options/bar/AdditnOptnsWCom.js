import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { complementary } from "../../../../../utils/icons/complementary/Complementary";
import { main } from "../../../../../utils/icons/main/main";
import { editStatusChanged, showComplementaryChanged, showFullOptionBarWithComHidedChanged, showNtbkSwitchTabsChanged } from "../../../complementariesSlice";


export default function AdditnalOptnsWCom(props) {
    const dispatch = useDispatch()
    const [ btnStyle, setBtnStyle ] = useState({display: 'none'})
    const { show, ntbks: { edit } } = useSelector(state => state.complementaries)
    // const rChevronStyleWhenEditng = {
    //     position: "absolute",
    //     left: "-53px",
    //     top: "4px",
    // }
    // const escapeStyleWhenEditng = {
    //     position: "absolute",
    //     left: "-90px",
    //     top: "4px",
    // }
    const handleMouseEnter = (e) => {
        setBtnStyle ({display: 'flex'});    
    } 
    const handleMouseLeave = (e) => {
        setBtnStyle ({display: 'none'});                              
    }
    const handleHideCom = (e) => {
        dispatch(showComplementaryChanged())
        dispatch(showNtbkSwitchTabsChanged(false))
        dispatch(showFullOptionBarWithComHidedChanged(false))
        // setDropdown(() => false)
        const ntbkStyle = {
            color:"black", 
            boxShadow:"none", 
            background:"none", 
            width:"260px"
        }
        // setNtbkStyle(() => ntbkStyle);
        }
    // return ( chapSelected &&
    // <>
    return(
        <>
        {/* { ntbkEdit &&
        <>
            <div className = "p-0 mt-1" >                        
                <div    className = "p-0" >                   
                    <button className = "ntbkBtnExpandToRight p-0"                                                               
                        style = {rChevronStyleWhenEditng}
                        onClick = {(e) => handleHideCom(e)}
                    > 
                    {main.rightChevron()}
                    </button>
                </div>                         
            </div> 
            <div className = "p-0 mt-1 me-2" 
                onMouseEnter = {(e) => handleMouseEnter(e)}  
                onMouseLeave = {(e) => handleMouseLeave(e)} >                          
                <div    className = "p-0" >                   
                    <button className = "ntbkBtnExpandToRight p-0"                                                             
                        style = {escapeStyleWhenEditng}
                        onClick = {(e) => {
                            setNtbkEdit(() => !ntbkEdit);              
                        }}
                    > 
                    {!ntbkEdit ? complementary.edit() : complementary.escape() }
                    </button>
                </div>                        
            </div> 
        </> 
        }
        {!ntbkEdit &&
        <> */}
            <div    className = "ntbkExpandToRight p-0 mt-1" 
                    onMouseEnter = {(e) => handleMouseEnter(e)}  
                    onMouseLeave = {(e) => handleMouseLeave(e)} >                          
                <div    className = "ntbkBtnExpandToRightBg p-0" >                   
                    <button className = "ntbkBtnExpandToRight p-0"                                                                
                        style = {btnStyle}
                        onClick = {(e) => handleHideCom(e)}
                    > 
                    {main.rightChevron()}
                    </button>
                </div>                         
            </div> 
            <div  className = "ntbkEditToRight p-0 mt-1" 
                onMouseEnter = {(e) => handleMouseEnter(e)}  
                onMouseLeave = {(e) => handleMouseLeave(e)} >                          
                <div    className = "ntbkBtnExpandToRightBg p-0" >                   
                    <button className = "ntbkBtnExpandToRight p-0"                                                                
                        style = {btnStyle}
                        onClick = {(e) => {
                        dispatch(editStatusChanged())
                        }}
                    > 
                    {!edit ? complementary.edit() : complementary.escape() }
                    </button>
                </div>                    
            </div> 
        {/* </>
        } */}
    </> 
    )}