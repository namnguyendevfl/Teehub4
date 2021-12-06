import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { initState } from "../../../redux/getInitStates";
// import { listObjs } from "./apiNtbksComplete";
// import { topcs } from "../completedNtbksLcalStorage";


export const draftedNtbks = {
    getDraftedNtbks: () => {
        return JSON.parse(window.localStorage.getItem('draftedNtbks'))
    },
    saveDraftedNtbks: (topics) => window.localStorage.setItem('draftedNtbks', JSON.stringify(topics)),
    delDraftedNtbks: () => localStorage.removeItem('draftedNtbks'),
    getDraftedNtbkSelected: () => JSON.parse(window.localStorage.getItem('draftedNtbkSelected')),
    saveDraftedNtbkSelected: (topic) => window.localStorage.setItem('draftedNtbkSelected', JSON.stringify(topic)),
    delDraftedNtbkSelected: () => localStorage.removeItem('draftedNtbkSelected')   
}


const initialDrafts = draftedNtbks.getDraftedNtbks() && initState(draftedNtbks.getDraftedNtbks())
const draftedNtbksAdapter = createEntityAdapter();
const initialState = draftedNtbksAdapter.getInitialState({
    ...initialDrafts,
    status: 'idle',
})




export const fetchDraftedNtbks = createAsyncThunk('draftedNtbks/fetchDraftedNtbks', 
    async (urlSuffix) => {
    // const response = listObjs(urlSuffix) 
    const response = test
    return response
})

const draftedNtbksSlice = createSlice({
    name: 'draftedNtbks',
    initialState,
    reducers: {
        saveNewDraftedNtbk(state, action) {
            draftedNtbksAdapter.addOne(state, action.payload)
        },
        dltDraftedNtbk(state, action) {
            draftedNtbksAdapter.removeOne(state, action.payload)
        },
        // updateDraftedNtbk(state,action) {
        //     draftedNtbksAdapter.updateOne(state, action.payload)
        // }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchDraftedNtbks.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(fetchDraftedNtbks.fulfilled, (state, action) => {
            draftedNtbks.saveDraftedNtbks(action.payload)
            draftedNtbksAdapter.setAll(state, action.payload)
            state.status = 'idle'
        })
        .addCase(fetchDraftedNtbks.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error
        })
    }
})


export const {
    saveNewDraftedNtbk,
    dltDraftedNtbk,
    updateDraftedNtbk
} = draftedNtbksSlice.actions

export default draftedNtbksSlice.reducer

export const {
    selectAll: selectDraftedNtbks,
    selectById: selectDraftedNtbkById
} = draftedNtbksAdapter.getSelectors(state => state.draftedNtbks)

// export const selectTopicIds = createSelector(
//     selectTopics,
//     state => state.chapters,
//     (topics, chapters) => {
//         const { chapterSelected } = chapters
//         return topics
//         .filter((topic,idx) =>chapterSelected && topic.ntbk_id === chapterSelected.ntbk_id && topic.chapter_id === chapterSelected.id)
//         .map(topic => topic.id)
//     }
// )

// export const selectTopicsFiltered = createSelector(
//     selectTopics,
//     state => state.chapters,
//     (topics, chapters) => {
//         const { chapterSelected } = chapters
//         return topics
//         .filter((topic,idx) =>chapterSelected && topic.ntbk_id === chapterSelected.ntbk_id && topic.chapter_id === chapterSelected.id)
//     }
// )