import React, { useState } from "react";
import { rightBannerToolTips } from "../../../languages/english/rightBanner";
import { rightBanner } from "../../../utils/icons/banner/rightBanner";

const BtnList = ({btnId, handleBtnClick}) => {
    const ids = ['contacts', 'watch', 'connect', 'messages', 'notifications']
    const { peopleFilled, peopleIcon, TVFilled, TVIcon, worldFilled, worldIcon, messageFilled, messageIcon, notificationIcon, notificationFilled } = rightBanner
    const { contacts_text, connect_text, watch_text, messages_text, notifications_text } = rightBannerToolTips 

    return ids.map((id, idx) => {
        const btn = () => {
            switch (id) {
                case 'contacts': return {className: "nav-item d-none d-xl-block m-0", filled: peopleFilled(), unfilled: peopleIcon(), toolTipText: contacts_text}
                case 'watch': return {className: "nav-item d-none d-xl-block ms-1", filled: TVFilled(), unfilled: TVIcon(), toolTipText: watch_text}
                case 'connect': return {className: "nav-item d-lg-block d-none ms-0 ms-xl-1", filled: worldFilled(), unfilled: worldIcon(), toolTipText: connect_text}
                case 'messages': return {className: "nav-item d-block ms-0 ms-lg-1", filled: messageFilled(), unfilled: messageIcon(), toolTipText: messages_text}
                case 'notifications': return {className: "nav-item ms-0 ms-md-1", filled: notificationFilled(), unfilled: notificationIcon(), toolTipText: notifications_text}
                default:
            }
        }
        return (
            <li className = {btn().className}> 
            {btnId === id
              ? <div className="toolTip buttonSm d-flex justify-content-center align-items-center border-white">
                    <button className = "buttonSm d-flex justify-content-center align-items-center border-white"
                        id = {id}
                        onClick = {handleBtnClick}
                        >
                    {btn().filled}
                    </button>
                    <div className = 'barFilled'> </div>
                    <span className = "toolTip-text" > {btn().toolTipText} </span>
                </div>            
            : <div className="toolTip d-flex justify-content-center align-items-center border-white">
                    <button className = "buttonSm d-flex justify-content-center align-items-center border-white"
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
}


const BtnToolTips = ({handleBtnClick, toolTipDisplay}) => {
    const { peopleToolTip, TVToolTip, worldToolTip } = rightBanner
    const list = [peopleToolTip(), TVToolTip(), worldToolTip()]
    const toolTipList = list.map(item => {
        return (
            <li id = "right-banner-tooltip"
                className ="nav-item right-banner-tooltip">
                <button id = "right-banner-tooltip"
                        className = "tooltipBtn d-flex justify-content-center align-items-center border-white"> 
                {item}    
                </button>
            </li>
        )
    })
    return (
        <>
      {/* Create Tooltip for this one */}
        <li className ="nav-item d-xl-none d-block ms-1"> 
            <div className="toolTip">
                <button   type="button"
                            id = "more"
                            className = "buttonSm d-flex justify-content-center align-items-center border-white" 
                            onClick ={handleBtnClick}
                                > 
                    {rightBanner.moreIcon()}
                </button>
                {/* if black&white box appears, then turn off this tooltiptext */}
                {!toolTipDisplay
                ?  <span className = "toolTip-text" style = {{left:"0.5px"}}> {rightBannerToolTips.more} </span>
                :   <> </>}
            
            </div>
        {/* Create Tooltip for this one , and add nowrap to make them horizontally*/}
        <div    id = "right-banner-tooltip"
                    className="toolTip">
            {/* set black&white box appears when the More btn is click */}
            {toolTipDisplay
            ? <ul   id = "right-banner-tooltip"
                    className=" nav flex-nowrap d-flex tooltipBar toolTipRightBar">
                        {toolTipList}
            </ul>
            : <> </>}
        </div>   
    </li>
    </>
)
}

export default function RightBanner() {
    const [btnId, setBtnId] = useState ("")
    const [toolTipDisplay, setToolTipDisplay] = useState (false)
    const handleBtnClick = ({target}) => {
        setBtnId(() => target.id)
        if (target.id==="more") setToolTipDisplay(() => !toolTipDisplay)
        else setToolTipDisplay(() => false)
    }
    window.addEventListener("click",({target}) => {
        if ((target.id !== "more" && target.id !== "right-banner-tooltip") && (toolTipDisplay))
            setToolTipDisplay(() => false)
    })
    return <>
    {/* add no wrap to ul */}
    <ul className ="nav flex-nowrap">
    {/* <li className ="nav-item d-none d-xl-block m-0"> */}
    <BtnList btnId = {btnId} handleBtnClick = {handleBtnClick}/>
    <BtnToolTips handleBtnClick = {handleBtnClick} toolTipDisplay = {toolTipDisplay}/>
  
    {/* <li className ="nav-item ms-3 "> */}
    <li className ="nav-item ms-1 ">
        <button className = "Ava d-flex justify-content-center align-items-center border-white" > 
        {rightBanner.ava()}
        </button>
    </li>
    </ul>
    </>
}