import React from "react";
// import SignupPopup from "../accounts/AccSignupPopup";
// import AccLogin from "../accounts/AccLogin";
// import TimerSetup from "../../newFeatureTest/newFeatureTest";
import { Centralize } from "../../utils/styles/centralize";
import { ntbkCRUDPopup, pomodoroPopup } from "../../utils/styles/popupForms";
import NtbkCRUD from "./ntbkCRUDPopup";

export default function Popups(props) {
    const {
        displayCreateAcc,
        displayLoginPopup,
    } = props

    const { height_pomodoro, top_pomodoro, width_pomodoro, left_pomodoro } = pomodoroPopup
    // const { height_ntbkCRUD, top_ntbkCRUd, width_ntbkCRUD, left_ntbkCRUD } = ntbkCRUDPopup
    const { bgPosition, elementPosition,offsetElementPosition} = (()=> {
        if (displayCreateAcc) return Centralize(530,49,500,50)
        if (displayLoginPopup) return Centralize(380,50,500,50)
        return Centralize(height_pomodoro,top_pomodoro,width_pomodoro,left_pomodoro)
    })()
    // const { width_pomodoro, height_pomodoro } = pomodoroPopup
  
    const elementStyle = { 
        ...elementPosition,
        width: `${width_pomodoro}px`,
        height: `${height_pomodoro}px`,
        zIndex: "2",
        border: "1px solid",
        background: "white",
    }
    return ( 
    <>
        <>
        <div className = "popup-offsetBackground w-100"></div>
        <div className = "popup-background" style = {bgPosition} >
                {/* <TimerSetup /> */}
            <div style = {elementStyle}>
                <NtbkCRUD />
            </div>
            <div style ={offsetElementPosition}></div>
        </div>
        </>
    </>
    )
}