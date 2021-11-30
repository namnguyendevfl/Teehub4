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