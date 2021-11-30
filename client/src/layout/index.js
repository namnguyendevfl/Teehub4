import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css"
import LoggedIn from "./loggedIn";
import LoggingIn from "./loggingIn/LoggingIn";

export default function Layout() {
    const { recentLoggedIn } = useSelector(state => state.loggedIns)
    const dispatch = useDispatch()
    const status = recentLoggedIn && recentLoggedIn.stayLoggedIn
    const [ loggedIn, setLoggedIn ] = useState(status)
    useEffect(() => {
        setLoggedIn(() => status)
    },[recentLoggedIn])
    return ( loggedIn ? <LoggedIn loggedin = {loggedIn}/> : <LoggingIn loggedin = {loggedIn}/>)
}