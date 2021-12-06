import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { listObjs } from "../apiNtbksComplete";
// import { topcs } from "../completedNtbksLcalStorage";
import { initState } from "../../../../redux/getInitStates";

export const topcs = {
    getTopics: () => {
        return JSON.parse(window.localStorage.getItem('topics'))
    },
    saveTopics: (topics) => window.localStorage.setItem('topics', JSON.stringify(topics)),
    dltTopics: () => localStorage.removeItem('topics'),
    getTopicSelected: () => JSON.parse(window.localStorage.getItem('topicSelected')),
    saveTopicSelected: (topic) => window.localStorage.setItem('topicSelected', JSON.stringify(topic)),
    dltTopicSelected: () => localStorage.removeItem('topicSelected')   
}

const topicsAdapter = createEntityAdapter();
const initialState = topicsAdapter.getInitialState({
    ...initState(topcs.getTopics()),
    status: 'idle',
})




export const fetchTopics = createAsyncThunk('topics/fetchTopics', 
    async (urlSuffix) => {
    const response = listObjs(urlSuffix)
    return response
})

const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        saveNewTopic(state, action) {
            topicsAdapter.addOne(state, action.payload)
        },
        dltTopic(state, action) {
            topicsAdapter.removeOne(state, action.payload)
        },
        updateTopic (state,action) {
            topicsAdapter.updateOne(state, action.payload)
        },
        setTopicsEmpty(state, action) {
            topicsAdapter.setAll(state, action.payload)
            topcs.dltTopics()
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchTopics.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(fetchTopics.fulfilled, (state, action) => {
            topcs.saveTopics(action.payload)
            topicsAdapter.setAll(state, action.payload)
            state.status = 'idle'
        })
        .addCase(fetchTopics.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error
        })
    }
})


export const {
    saveNewTopic,
    dltTopic,
    updateTopic,
    setTopicsEmpty
} = topicsSlice.actions

export default topicsSlice.reducer

export const {
    selectAll: selectTopics,
    selectById: selectTopicById
} = topicsAdapter.getSelectors(state => state.topics)

export const selectTopicIds = createSelector(
    selectTopics,
    state => state.chapters,
    (topics, chapters) => {
        const { chapterSelected } = chapters
        return topics
        .filter((topic,idx) =>chapterSelected && topic.ntbk_id === chapterSelected.ntbk_id && topic.chapter_id === chapterSelected.id)
        .map(topic => topic.id)
    }
)

export const selectTopicsFiltered = createSelector(
    selectTopics,
    state => state.chapters,
    (topics, chapters) => {
        const { chapterSelected } = chapters
        return topics
        .filter((topic,idx) =>chapterSelected && topic.ntbk_id === chapterSelected.ntbk_id && topic.chapter_id === chapterSelected.id)
    }
)