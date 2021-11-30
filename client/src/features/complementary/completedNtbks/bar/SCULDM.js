import React from "react";
import { useDispatch } from "react-redux";
import { complementary } from "../../../../utils/icons/complementary/Complementary";
import { setSCULDM } from "../../../../layout/loggedIn/complementaries/complementariesSlice";
import { popupChanged } from "../../../../layout/layoutAltersSlice";

export default function SCULDM() {
    const dispatch = useDispatch()
    const handleClick = ({target: {id}}) => {
        dispatch(popupChanged(id))
        dispatch(setSCULDM(id))
    }
    return (
        <>
            <div className = "ms-1 ntbkBtn mt-1" >
                <button className = "p-0 ntbkBtn" id = "search" onClick = {handleClick} >
                    {complementary.search()}
                </button>
            </div>                       
            <div className = "ms-1 ntbkBtn mt-1">
                <button className = "p-0 ntbkBtn" id = "add" onClick = {handleClick}    >
                    {complementary.plus()} 
                </button>
            </div>                   
            <div className = "ms-1 ntbkBtn mt-1">
                <button className = "p-0 ntbkBtn" id= "trash" onClick = {handleClick} >
                    {complementary.trash()}
                </button>
            </div>                   
            <div className = "ms-1 ntbkBtn mt-1">
                <button className = "p-0 ntbkBtn" id = "list" onClick = {handleClick} > 
                    {complementary.list()}
                </button>
            </div>                          
            <div className = "ms-1 ntbkBtn mt-1">
                <button className = "p-0 ntbkBtn" id = "more" onClick = {handleClick} >
                    {complementary.threeDot()}
                </button>
            </div>
        </>
    )

}