import { createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { initState } from "../../../redux/getInitStates";


//Create a variable to hold values in the localStorage 
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

const loggedIns = loggedInsLcalStorage.getLoggedIns() ? loggedInsLcalStorage.getLoggedIns() : []
//used Redux toolkit to set up a normalized state structure for loggedIns
const loggedInsAdapter = createEntityAdapter()
const initialState = loggedInsAdapter.getInitialState({
    ...initState(loggedIns),
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
            //save logeegOut status in the localstorage to persist its state 
            recentLoggedInLcalStorage.saveLoggedIn(loggedOut)
            state.recentLoggedIn = loggedOut
        },
        saveLoggedIn: (state, action) => {
            recentLoggedInLcalStorage.saveLoggedIn(action.payload)
            //add new loggedIn to the localStorage 
            if (!state.ids.includes(action.payload.id)) {
                loggedIns.push(action.payload)
                loggedInsLcalStorage.saveLoggedIns(loggedIns)
            }
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

export const {
    selectAll: selectLoggedIns,
    selectById: selectLoggedInById,
} = loggedInsAdapter.getSelectors(state => state.loggedIns)

//create Ids from the loggedIns state for later use
export const selectLoggedInIds = createSelector(
    selectLoggedIns,
    (loggedIns) => {
        return loggedIns.map(loggedIn => loggedIn.id)
    }
)