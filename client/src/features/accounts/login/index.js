import "./index.css"
import React from "react";
import { Centralize } from "../../../utils/styles/centralize";
import LoginForm from "./LoginForm";


export default function Login(props) {
    const {
        displayCreateAcc,
        displayLoginPopup,
        setDisplayLoginPopup
    } = props


    const { bgPosition, elementPosition,offsetElementPosition} = Centralize(530,49,700 ,50)
    return ( (!displayLoginPopup && !displayCreateAcc) &&
        <div className = "loginBg w-100" style = {bgPosition} >
            <div className = "loginBox" style = {elementPosition}>
                <div className = "loginBoxTop d-flex justify-content-center align-items-center" >
                    <h2 className = "text-center"> Teehub </h2>
                </div>
                <div className = "loginBoxMiddle row mx-2">
                    <div className = "col-6 m-0 p-0 position-relative">
          
                    </div>
                    <div className = "col-6 m-0 p-0">
                        <LoginForm />
                    </div>
                </div>
                <div className ="loginBoxBottom w-100">
                </div>
            </div>
            <div style ={offsetElementPosition}></div>
        </div>
    )
}