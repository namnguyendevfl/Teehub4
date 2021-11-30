import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { initState } from "../../../redux/getInitStates";

export const loggedInsLcalStorage = {
    getLoggedIns: () => JSON.parse(window.localStorage.getItem('loggedIns')),
    saveLoggedIns: (loginState) => window.localStorage.setItem('loggedIns', JSON.stringify(loginState)),
    dltLoggedIns: () => localStorage.removeItem('loggedIns'),
}

export const recentLoggedInLcalStorage = {
    getLoggedIn: () => JSON.parse(window.localStorage.getItem('loggedIn')),
    saveLoggedIn: (loginState) => window.localStorage.setItem('loggedIn', JSON.stringify(loginState)),
    dltLoggedIn: () => localStorage.removeItem('loggedIn'),
}

export const recentUrl = {
    getUrl: () => JSON.parse(window.localStorage.getItem('url')),
    saveUrl: (loginState) => window.localStorage.setItem('url', JSON.stringify(loginState)),
    dltUrl: () => localStorage.removeItem('url'),
}

const loggedInsAdapter = createEntityAdapter()
const initialState = loggedInsAdapter.getInitialState({
    ...initState(loggedInsLcalStorage.getLoggedIns()),
    recentLoggedIn: recentLoggedInLcalStorage.getLoggedIn()
})

const loggedInsSlice = createSlice({
    name: "loggedIns",
    initialState,
    reducers: {
        loggedOut: (state, action) => {
            const loggedOut = {
                id: action.payload,
                stayLoggedIn: false
            }
            recentLoggedInLcalStorage.saveLoggedIn(loggedOut)
            state.recentLoggedIn = loggedOut
        },
        saveLoggedIn: (state, action) => {
            recentLoggedInLcalStorage.saveLoggedIn(action.payload)
            loggedInsAdapter.addOne(state, action.payload)            
        },
        saveRecentLoggedIn: (state, action) => {
            state.recentLoggedIn = action.payload
        }
    }
})


export const { 
    saveLoggedIn, 
    saveRecentLoggedIn,
    loggedOut
} = loggedInsSlice.actions
export default loggedInsSlice.reducer