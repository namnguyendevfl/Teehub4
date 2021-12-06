import React from "react";
import useState from "react-usestateref"
import { useDispatch } from "react-redux";
import { leftBanner } from "../../../utils/icons/banner/leftBanner";
import { popupChanged } from "../../../layout/layoutAltersSlice";
import { leftBannerToolTipsEn } from "../../../languages/english/leftBanner";

export default function NonTiming () {
    const dispatch = useDispatch();
    const ids = ['home', 'focus', 'social', 'journal']
    const [ btnId, setBtnId] = useState ("home");
    
    const handleBtnClick = ({target}) => {
        const targetId= target.id
        setBtnId(() => targetId)
        if (targetId==="timer" ) {
            dispatch(popupChanged("timer"))
        }
        else {
            dispatch(popupChanged(false))
        }
    }

    const { homeFilled, homeIcon, dotCircleFilled, dotCircleIcon, coffeeFilled, coffeeIcon, journalFilled, journalIcon} = leftBanner
    const { home_text, project_text, social_text, journal_text, timer_text } = leftBannerToolTipsEn
    const btnList = ids.map((id, idx) => {
        const btn = () => {
            switch (id) {
                case 'home': return {filled: homeFilled(), unfilled: homeIcon(), toolTipText: home_text}
                case 'focus': return {filled: dotCircleFilled(), unfilled: dotCircleIcon(), toolTipText: project_text}
                case 'social': return {filled: coffeeFilled(), unfilled: coffeeIcon(), toolTipText: social_text}
                case 'journal': return {filled: journalFilled(), unfilled: journalIcon(), toolTipText: journal_text}
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
                    <span className = "toolTip-text" > {btn().toolTipText} </span>
                </div>            
                    
            : <div className="toolTip d-flex justify-content-center align-items-center border-white">
                    <button className = "button d-flex justify-content-center align-items-center border-white"
                        id = {id}
                        onClick = {handleBtnClick}
                        > 
                    {btn().unfilled}
                    </button>
                    <span className = "toolTip-text" > {btn().toolTipText} </span>
                </div>
            }
        </li>      
        )
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
                    {leftBanner.timerIcon()}
            </button>
            <span className = "toolTip-text" > {timer_text} </span>
            </div>     
        </li>
    </ul>
    )
}