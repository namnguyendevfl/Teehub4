import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedInsLcalStorage, recentLoggedInLcalStorage } from "../features/accounts/login/loggedInsSlice";
import { fetchUsers, selectUserNames, selectUsers } from "../features/accounts/usersSlice";
import LoggedIn from "./loggedIn";
import LoggingIn from "./loggingIn/LoggingIn";
import Popups from "./popups";

export default function Layout() {
    const { recentLoggedIn } = useSelector(state => state.loggedIns)
    const dispatch = useDispatch()
    const status = (() => {
        if (recentLoggedIn) {
            const { foundLoggedIn, stayLoggedIn } = recentLoggedIn
            if (stayLoggedIn) return true
            return foundLoggedIn ? true : false
        }
        return false
    })()
    const [ loggedIn, setLoggedIn ] = useState(status)
    useEffect(() => {
        setLoggedIn(() => status)
        dispatch(fetchUsers())
    },[recentLoggedIn])

    const { popupSelected } = useSelector(state => state.layoutAlters)
    return ( 
        loggedIn 
        ? <LoggedIn loggedin = {loggedIn}/> 
        : 
        <>
        <LoggingIn loggedin = {loggedIn}/>
        {popupSelected && <Popups popup = { popupSelected }/>}
        </>
        )
}