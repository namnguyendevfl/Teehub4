import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { initState } from "../../../redux/getInitStates";
import { listObjs } from "./apiNtbksComplete";
import { topcs } from "./topics/topicsSlice";

export const draftedTopcs = {
    getDraftedTopics: () => {
        return JSON.parse(window.localStorage.getItem('draftedTopics'))
    },
    saveDraftedTopics: (topics) => window.localStorage.setItem('draftedTopics', JSON.stringify(topics)),
    delDraftedTopics: () => localStorage.removeItem('draftedTopics'),
    getDraftedTopicSelected: () => JSON.parse(window.localStorage.getItem('draftedTopicSelected')),
    saveDraftedTopicSelected: (topic) => window.localStorage.setItem('draftedTopicSelected', JSON.stringify(topic)),
    delDraftedTopicSelected: () => localStorage.removeItem('draftedTopicSelected')   
}

const draftedTopicsAdapter = createEntityAdapter();
const initialState = draftedTopicsAdapter.getInitialState({
    // ...initState(draftedTopcs.getDraftedTopics()), //get error with the initial null value
    ...initState(topcs.getTopics()),
    status: 'idle',
})




export const fetchDraftedTopics = createAsyncThunk('draftedTopics/fetchDraftedTopics', 
    async (urlSuffix) => {
    const response = listObjs(urlSuffix)
    return response
})

const draftedTopicsSlice = createSlice({
    name: 'draftedTopics',
    initialState,
    reducers: {
        saveNewDraftedTopic(state, action) {
            draftedTopicsAdapter.addOne(state, action.payload)
        },
        dltDraftedTopic(state, action) {
            draftedTopicsAdapter.removeOne(state, action.payload)
        },
        updateDraftedTopic (state,action) {
            draftedTopicsAdapter.updateOne(state, action.payload)
        },
        updateDraftedTopics (state,action) {
            // draftedTopicsAdapter.updateMany(state, action.payload)
            draftedTopicsAdapter.setAll(state, action.payload)
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchDraftedTopics.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(fetchDraftedTopics.fulfilled, (state, action) => {
            draftedTopcs.saveTopics(action.payload)
            draftedTopicsAdapter.setAll(state, action.payload)
            state.status = 'idle'
        })
        .addCase(fetchDraftedTopics.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error
        })
    }
})


export const {
    saveDraftedNewTopic,
    dltDraftedTopic,
    updateDraftedTopic,
    updateDraftedTopics
} = draftedTopicsSlice.actions

export default draftedTopicsSlice.reducer

export const {
    selectAll: selectDraftedTopics,
    selectById: selectDraftedTopicById
} = draftedTopicsAdapter.getSelectors(state => state.draftedTopics)

export const selectDraftedTopicIds = createSelector(
    selectDraftedTopics,
    state => state.chapters,
    (topics, chapters) => {
        const { chapterSelected } = chapters
        return topics
        .filter((topic,idx) =>chapterSelected && topic.ntbk_id === chapterSelected.ntbk_id && topic.chapter_id === chapterSelected.id)
        .map(topic => topic.id)
    }
)

export const selectDraftedTopicsFiltered = createSelector(
    selectDraftedTopics,
    state => state.chapters,
    (topics, chapters) => {
        const { chapterSelected } = chapters
        return topics
        .filter((topic,idx) =>chapterSelected && topic.ntbk_id === chapterSelected.ntbk_id && topic.chapter_id === chapterSelected.id)
    }
)