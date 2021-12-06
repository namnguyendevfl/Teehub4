import { createSlice } from "@reduxjs/toolkit";
// import { sessionLocalStorage } from "../../utils/localStorage/timer";

//LocalStorage
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
    dltSessionStatus: () => localStorage.removeItem('sessionStatus'),
}

export const sessionLocalStorage = {
    sessionStatus: timer.getSessionStatus(),
    focusInterval: timer.getFocus(),
    breakInterval: timer.getBreak(),
    sessionParams: timer.getSessionParams(),
}

const initialSession = {
    timerPopup: false,
    sessionStatus: false,
    isTimerRunning: false,
    breakInterval:0,
    focusInterval:0,
    sessionParams: {
        label: "",
        interval: "",
        process: 0,
        timeElapsed: 0,
        timeElapsedPercent: 0,
        numPeriod: 0,        
    }
}
const initialState = sessionLocalStorage ? {...sessionLocalStorage, isTimerRunning:false} : initialSession
// timer.saveSessionStatus(true);
// timer.saveSessionParams(initialSession);
const sessionsSlice = createSlice({
    name: "sessions",
    initialState,
    reducers: {
        sessionStatusChanged(state, action) {
            timer.saveSessionStatus(action.payload);
            state.sessionStatus = action.payload
        },
        sessionParamsChanged(state,action) {
            timer.saveSessionParams(action.payload);
            state.sessionParams = action.payload
        },
        focusIntervalAdded(state, action) {
            timer.saveFocus(action.payload);
            state.focusInterval = action.payload
        },
        breakIntervalAdded(state, action) {
            timer.saveBreak(action.payload);
            state.breakInterval = action.payload
        },
        isTimerRunningChanged(state, action) {
            state.isTimerRunning = action.payload
        },
        timerPopupChanged(state, action) {
            state.timerPopup = action.payload
        },
        setSessionEmpty(state, action) {
            timer.dltBreak();
            timer.dltFocus();
            timer.dltSessionParams();
            timer.dltSessionStatus();
            state.sessionStatus = false
            state.isTimerRunning = false
        }
    }
})

export default sessionsSlice.reducer

export const { 
    sessionParamsChanged,
    focusIntervalAdded,
    breakIntervalAdded,
    sessionStatusChanged,
    isTimerRunningChanged, 
    timerPopupChanged,
    setSessionEmpty
} = sessionsSlice.actions


