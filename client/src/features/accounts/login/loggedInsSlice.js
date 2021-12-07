import { createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { initState } from "../../../redux/getInitStates";


//Create a variable to hold values in the localStorage 
export const loggedInsLcalStorage = {
    getLoggedIns: () => JSON.parse(window.localStorage.getItem('loggedIns')),
    saveLoggedIns: (loggedIns) => window.localStorage.setItem('loggedIns', JSON.stringify(loggedIns)),
    dltLoggedIns: () => localStorage.removeItem('loggedIns'),
}

export const recentLoggedInLcalStorage = {
    getLoggedIn: () => JSON.parse(window.localStorage.getItem('loggedIn')),
    saveLoggedIn: (recentLoggedIn) => window.localStorage.setItem('loggedIn', JSON.stringify(recentLoggedIn)),
    dltLoggedIn: () => localStorage.removeItem('loggedIn'),
}

export const recentUrl = {
    getUrl: () => JSON.parse(window.localStorage.getItem('url')),
    saveUrl: (loginState) => window.localStorage.setItem('url', JSON.stringify(loginState)),
    dltUrl: () => localStorage.removeItem('url'),
}

const loggedIns = loggedInsLcalStorage.getLoggedIns() ? loggedInsLcalStorage.getLoggedIns() : []
// const loggedIns = []
const recentLoggedIn = (() => {
    if (recentLoggedInLcalStorage) {
        const { getLoggedIn } = recentLoggedInLcalStorage
        return {
            ...getLoggedIn(),
            foundLoggedIn : false
        }
    }
    return null
})()
//used Redux toolkit to set up a normalized state structure for loggedIns
const loggedInsAdapter = createEntityAdapter()
const initialState = loggedInsAdapter.getInitialState({
    ...initState(loggedIns),
    recentLoggedIn: recentLoggedIn
})

const loggedInsSlice = createSlice({
    name: "loggedIns",
    initialState,
    reducers: {
        logOut: (state, action) => {
            //save logeegOut status in the localstorage to persist its state 
            loggedInsAdapter.updateOne(state,action.payload)
            recentLoggedInLcalStorage.saveLoggedIn(null)
            state.recentLoggedIn = null
        },

        updateLoggedIn(state, action) {
            loggedInsAdapter.updateOne(state,action.payload)
        },

        saveLoggedIn: (state, action) => {
            //add new loggedIn to the localStorage 
            if (action.payload) {
                recentLoggedInLcalStorage.saveLoggedIn(action.payload)
                const { id } = action.payload
                const payloadIdx = state.ids.indexOf(id)
                if (payloadIdx === -1) loggedIns.push(action.payload)
                else loggedIns.splice(payloadIdx, 1, action.payload)
                loggedInsLcalStorage.saveLoggedIns(loggedIns)
                state.recentLoggedIn = action.payload
                loggedInsAdapter.addOne(state, action.payload)   
            }
        },
        removeAllLoggedIns: (state, action) => {
            recentLoggedInLcalStorage.saveLoggedIn(null)
            loggedInsLcalStorage.saveLoggedIns(null)
            state.recentLoggedIn = null
            loggedInsAdapter.removeAll(state)  
        },
        saveRecentLoggedIn: (state, action) => {
            state.recentLoggedIn = action.payload
        }
    }
})


export const { 
    saveLoggedIn, 
    saveRecentLoggedIn,
    logOut,
    updateLoggedIn,
    removeAllLoggedIns
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