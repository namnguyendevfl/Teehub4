import "./index.css"
import React from "react";
import { Centralize } from "../../../utils/styles/centralize";
import LoginForm from "./LoginForm";
import ComplementaryLogin from "./ComplementaryLogin";


export default function Login(props) {

    const { bgPosition, elementPosition,offsetElementPosition} = Centralize(530,49,700 ,50)
    return (
        <div className = "login-bg w-100" style = {bgPosition} >
            <div className = "login-box" style = {elementPosition}>
                <div className = "login-segment-top d-flex justify-content-center align-items-center" >
                    <h2 className = "text-center"> Teehub </h2>
                </div>
                <div className = "login-segment-middle row mx-2">
                    <div className = "col-6 m-0 p-0 position-relative">
                        <ComplementaryLogin />
                    </div>
                    <div className = "col-6 m-0 p-0">
                        <LoginForm />
                    </div>
                </div>
                <div className ="login-segment-bottom w-100">
                </div>
            </div>
            <div style ={offsetElementPosition}></div>
        </div>
    )
}