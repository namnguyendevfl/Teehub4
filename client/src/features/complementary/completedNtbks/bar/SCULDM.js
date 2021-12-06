import React from "react";
import { useDispatch } from "react-redux";
import { complementary } from "../../../../utils/icons/complementary/Complementary";
import { setSCULDM } from "../../../../layout/loggedIn/complementaries/complementariesSlice";
import { popupChanged } from "../../../../layout/layoutAltersSlice";
import { ntbkToolTipsEn } from "../../../../languages/english/complementary";

export default function SCULDM() {
    const dispatch = useDispatch()
    const handleClick = ({target: {id}}) => {
        dispatch(popupChanged(id))
        dispatch(setSCULDM(id))
    }
    const { searchIcon, plusIcon, trashIcon, listIcon, threeDotIcon } = complementary
    const { search_text, create_text, delete_text, update_text, more_text } = ntbkToolTipsEn
    const btns = [ [searchIcon(), search_text], [plusIcon(), create_text], [trashIcon(), delete_text], [listIcon(), update_text], [threeDotIcon(), more_text]]
    const btnList = btns.map((btn,idx) => {
        return ( 
            <div key = {idx} className = "toolTip ms-1 ntbkBtn" >
            <button className = "p-0 btn" onClick = {handleClick} >
                {btn[0]}
            </button>
            {/* toolTip-complementary in complementary.css  */}
            <span className = "toolTip-text toolTip-complementary" > {btn[1]} </span>
        </div>
        )
    })
    return (
        <>
        {btnList}
        </>
    )

}