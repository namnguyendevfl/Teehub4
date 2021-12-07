import React from "react";
import { useSelector } from "react-redux";
import { LoginPopup } from "../../features/accounts/login/LoginForm";
import { Centralize } from "../../utils/styles/centralize";
import NtbkCRUD from "./ntbkCRUDPopup";
import PomodoroTimer from "./PomodoroTimer";
import UserSignup from "./signupPopup";

export default function Popups() {
    // get the popupSelected state from Redux store
    const { popupSelected } = useSelector(state => state.layoutAlters)
    const position = (() => {
        if (popupSelected === "signup") return { height: 550, top: 50, width:500, left: 50 }
        if (popupSelected === "timer") return { height: 400, top: 50, width:500, left: 50 }
        if (popupSelected === "login") return { height: 400, top: 50, width:380, left: 50 }
        return { height: 400, top: 50, width:500, left: 50 }
    })()
    const { height, top, width, left } = position
    //Call the Centralize component in the utils/style and pass in appropriate arguments to get background and element set up for the popup 
    const { bgPosition, elementPosition, offsetElementPosition } = Centralize(height, top, width, left)
    //Style the popup form 
    const elementStyle = { 
        ...elementPosition,
        width: `${position.width}px`,
        height: `${position.height}px`,
        zIndex: "4",
        background: "white",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px 2px" 

    }

    const popupRendered = (() => {
        if (popupSelected === false) return null
        if (popupSelected === "timer") return <PomodoroTimer />
        if (popupSelected === "signup") return <UserSignup />
        if (popupSelected === "login") return <LoginPopup />
        return <NtbkCRUD />
    })()
    return ( 
    <>
        <>
        <div className = "popup-offset-background w-100"></div>
        <div className = "popup-background" style = {bgPosition} >
            <div style = {elementStyle}>
                {popupRendered}
            </div>
            <div style ={offsetElementPosition}></div>
        </div>
        </>
    </>
    )
}