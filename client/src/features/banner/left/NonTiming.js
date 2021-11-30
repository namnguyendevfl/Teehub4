import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TimerToolTip from "./TimerTooltip";
import { timerPopupChanged } from "../../../layout/loggedIn/banner/sessionsSlice";
import { leftBanner } from "../../../utils/icons/banner/leftBanner";

export default function NonTiming () {
    const dispatch = useDispatch();
    const ids = ['home', 'focus', 'social', 'journal']
    const [ btnId, setBtnId] = useState ("home");
    const [ toolTipDisplay, setToolTipDisplay ] = useState (false);
    const handleBtnClick = ({target}) => {
        const targetId= target.id
        setBtnId(() => targetId)
        if (targetId==="timer" ) {
            dispatch(timerPopupChanged(!toolTipDisplay))
            setToolTipDisplay(() => !toolTipDisplay)
        }
        else {
            dispatch(timerPopupChanged(false))
            setToolTipDisplay(() => false)
        }
    }
    const btnList = ids.map((id, idx) => {
        const btn = () => {
            switch (id) {
                case 'home': return {filled: leftBanner.homeFilled(), unfilled: leftBanner.home()}
                case 'focus': return {filled: leftBanner.dotCircleFilled(), unfilled: leftBanner.dotCircle()}
                case 'social': return {filled: leftBanner.coffeeFilled(), unfilled: leftBanner.coffee()}
                case 'journal': return {filled: leftBanner.journalFilled(), unfilled: leftBanner.journal()}
                default:
            }
        }
        return (
            <li className = "nav-item me-3">
            {btnId === id
            ? <div className="toolTip button d-flex justify-content-center align-items-center border-white">
                    <button className = "button d-flex justify-content-center align-items-center border-white"
                            id = {id}
                            onClick = {handleBtnClick}
                        >
                    {btn().filled}
                    </button>
                    <div className = 'barFilled'> </div>
                </div>            
                    
            : <div className="toolTip d-flex justify-content-center align-items-center border-white">
                    <button className = "button d-flex justify-content-center align-items-center border-white"
                        id = {id}
                        onClick = {handleBtnClick}
                        > 
                    {btn().unfilled}
                    </button>
                    <span className = "tooltiptext" > Home </span>
                </div>
            }
        </li>      
        )
    })

    window.addEventListener("click",({target}) => {
        const targetId= target.id
        if (targetId === "focusInterval" || targetId === "breakInterval") return setToolTipDisplay(() => true)
        if ((targetId !== "timer" && targetId !== "timerToolTip") && (toolTipDisplay))
        return setToolTipDisplay(() => false)
    })  
    
    return (
    <ul className = "nav ">
        <li className = "nav-item me-3">  
            <button className = "button "> logo
            </button>
        </li>
        {btnList}
        <li className = "nav-item ">
            <div className="toolTip button d-flex justify-content-center align-items-center border-white">
            <button  className = "button d-flex justify-content-center align-items-center border-white"
                        id = "timer"
                        onClick = {handleBtnClick}
                        >
                    {leftBanner.timer()}
            </button>
            </div>
                {
                toolTipDisplay 
                ? <TimerToolTip    
                />
                : null
                }     
        </li>
    </ul>
    )
}