import { createSlice,  createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

export const complementaries = {
    getShowCom: () => JSON.parse(window.localStorage.getItem('showComplementaries')),
    saveShowCom: (result) => window.localStorage.setItem('showComplementaries', JSON.stringify(result)),   
    dltShowCom: () => localStorage.removeItem('showComplementaries'),
    //fullBarOptionNtbk
}

export const complementaryNtbks = {
    getShowBarOptionsWithComHided: () => JSON.parse(window.localStorage.getItem('showComNtbkBarWithComHided')),
    saveShowBarOptionsWithComHided: (result) => window.localStorage.setItem('showComNtbkBarWithComHided', JSON.stringify(result)),
    dltShowBarOptionsWithComHided: () => localStorage.removeItem('showComNtbkBarWithComHided'),
}

//CULDSM = create, list&update, delete, search and more
const showFullOptions = complementaryNtbks.getShowBarOptionsWithComHided() 
const initialState = {
    show: complementaries.getShowCom() ? complementaries.getShowCom() : true,
    ntbks_chaps_topics: {
        showFullOptionBarWithComHided: showFullOptions ? showFullOptions : false,
        showSwitchTabs: true,
        showCRUDBox: false,
        SCULDM: null,
        edit: false,
    }
}

const complementariesSlice = createSlice({
    name: "complementaries",
    initialState,
    reducers: {
        showComplementaryChanged(state, action) {
            complementaries.saveShowCom(!state.show)
            state.show = !state.show
        },
        showSwitchTabsChanged(state, action) {
            state.ntbks_chaps_topics.showSwitchTabs = action.payload
        },
        showFullOptionBarWithComHidedChanged(state, action) {
            if (action.payload === false || action.payload === true) 
                state.ntbks_chaps_topics.showFullOptionBarWithComHided = action.payload
            else{
                state.ntbks_chaps_topics.showFullOptionBarWithComHided = !state.ntbks_chaps_topics.showFullOptionBarWithComHided
            }
        },
        showSCULDMBoxChanged(state,action) {
            state.ntbks_chaps_topics = action.payload
        },
        editStatusChanged(state, action) {
            state.ntbks_chaps_topics.edit = !state.ntbks_chaps_topics.edit
        },
        setSCULDM (state, action) {
            state.ntbks_chaps_topics.SCULDM = action.payload 
        },
    }
})

export default complementariesSlice.reducer

export const { 
    showComplementaryChanged,
    showSwitchTabsChanged,
    showFullOptionBarWithComHidedChanged,
    showSCULDMBoxChanged,
    editStatusChanged,
    setSCULDM,
} = complementariesSlice.actions


