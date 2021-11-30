import { createSlice } from "@reduxjs/toolkit";

export const timer = {
    getSessionParams: () => JSON.parse(window.localStorage.getItem('sessionParams')),
    saveSessionParams: (session) => window.localStorage.setItem('sessionParams',JSON.stringify(session)),
    dltSessionParams: () => localStorage.removeItem('sessionParams'),
    getFocus: () => JSON.parse(window.localStorage.getItem('focusInterval')),
    saveFocus: (focusInterval) => window.localStorage.setItem('focusInterval',JSON.stringify(focusInterval)),
    dltFocus: () => localStorage.removeItem('focusInterval'),
    getBreak: () => JSON.parse(window.localStorage.getItem('breakInterval')),
    saveBreak: (breakInterval) => window.localStorage.setItem('breakInterval',JSON.stringify(breakInterval)),
    dltBreak: () => localStorage.removeItem('breakInterval'),
    getSessionStatus: () => JSON.parse(window.localStorage.getItem('sessionStatus')),
    saveSessionStatus: (setBoolean) => window.localStorage.setItem('sessionStatus',JSON.stringify(setBoolean)),
}

export const sessionLocalStorage = {
    sessionStatus: timer.getSessionStatus(),
    focusInterval: timer.getFocus(),
    breakInterval: timer.getBreak(),
    sessionParams: timer.getSessionParams(),
}



const initialSession = {
    ntbkCRUD: false,
}


const initialState = sessionLocalStorage ? {...sessionLocalStorage, isTimerRunning:false} : initialSession

const sessionsSlice = createSlice({
    name: "sessions",
    initialState,
    reducers: {
        sessionStatusChanged(state, action) {
            state.sessionStatus = action.payload
        },
        sessionParamsChanged(state,action) {
            state.sessionParams = action.payload
        },
        focusDurationAdded(state, action) {
            state.focusInterval = action.payload
        },
        breakIntervalAdded(state, action) {
            state.breakInterval = action.payload
        },
        isTimerRunningChanged(state, action) {
            state.isTimerRunning = action.payload
        },
        timerPopupChanged(state, action) {
            state.timerPopup = action.payload
        }
    }
})

export default sessionsSlice.reducer

export const { 
    sessionParamsChanged,
    focusDurationAdded,
    breakIntervalAdded,
    sessionStatusChanged,
    isTimerRunningChanged, 
    timerPopupChanged
} = sessionsSlice.actions


