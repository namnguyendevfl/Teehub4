import React, { useState } from "react";
import { Routes,Route } from "react-router-dom";
import Home from "../../../features/main/home/Home";
import NtbkRoute from "./NtbkRoute";

export default function Main() {
    const navOption = "Notebookss"
    const initialHeight = window.innerHeight
    const [ viewHeight, setViewHeight ] = useState(initialHeight - 80)
    const handleResize = () => {
        setViewHeight(() => window.innerHeight - 80)
    }
    window.addEventListener('resize', handleResize);
    const mainNtbkStyle = (() => {
        if (navOption === "Notebooks") {
            return {
                maxHeight: `${viewHeight}px`,
                overflow: "auto",
            }
        }
        return {
            overflow :"hidden"
        }
    })()
    
    return (
        <>
        <Routes>
            <Route path = "/" element = {<Home />}/>
            <Route  path = "notebooks/*" element = {
                <div className = "ntbkMain" style = {mainNtbkStyle}>
                    <NtbkRoute />
                </div>
            }>  
            </Route>
        </Routes>
        </>
    )
}