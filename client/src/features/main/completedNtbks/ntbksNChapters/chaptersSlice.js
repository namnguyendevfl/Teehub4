import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { listObjs } from "../apiNtbksComplete";
import { initState } from "../../../../redux/getInitStates";

export const chaps = {
    getChaps: () => {
        const chapters = JSON.parse(window.localStorage.getItem('chapters'))
        return chapters ? chapters : []
    },
    saveChaps: (chapters) => window.localStorage.setItem('chapters', JSON.stringify(chapters)),
    dltChaps: () => localStorage.removeItem('chapters'),
    getChapSelected: () => JSON.parse(window.localStorage.getItem('chapterSelected')),
    saveChapSelected: (chapter) => window.localStorage.setItem('chapterSelected', JSON.stringify(chapter)),   
    dltChapSelected: () => localStorage.removeItem('chapterSelected'),
    // getParentUrl: () => JSON.parse(window.localStorage.getItem('chapterParentUrl')),
    // saveChaps: (chapters) => window.localStorage.setItem('chapters', JSON.stringify(chapters)),
    // dltChaps: () => localStorage.removeItem('chapters'),
}

const chaptersAdapter = createEntityAdapter();

const initialState = chaptersAdapter.getInitialState({
    ...initState(chaps.getChaps()),
    status: 'idle',
    chapterSelected: chaps.getChapSelected(),
})

export const fetchChapters = createAsyncThunk('chapters/fetchChapters', 
    async (urlSuffix) => {
    const response = listObjs(urlSuffix)
    return response
})

const chaptersSlice = createSlice({
    name: 'chapters',
    initialState,
    reducers: {
        saveChapterSelected(state, action) {
            chaps.saveChapSelected(action.payload)
            state.chapterSelected = action.payload
        },
        saveNewChap(state, action) {
            chaptersAdapter.addOne(state, action.payload)
        },
        dltChapter(state, action) {
            chaptersAdapter.removeOne(state, action.payload)
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchChapters.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(fetchChapters.fulfilled, (state, action) => {
            chaptersAdapter.setAll(state, action.payload)
            chaps.saveChaps(action.payload)
            state.status = 'idle'
        })
        .addCase(fetchChapters.rejected, (state, action) => {
            state.status = "rejected"
            state.error = action.error
        })
    }
})


export const {
    saveChapterSelected,
    saveNewChap,
    dltChapter,
} = chaptersSlice.actions

export default chaptersSlice.reducer

export const {
    selectAll: selectChapters,
    selectById: selectChapterById
} = chaptersAdapter.getSelectors(state => state.chapters)

export const selectChapterIds = createSelector(
    selectChapters,
    state => state.ntbks,
    (chapters, ntbks) => {
        const { ntbkSelected } = ntbks
        return chapters
        .filter((chapter,idx) => ntbkSelected && chapter.ntbk_id === ntbkSelected.id)
        .map(chapter => chapter.id)
    }
)

export const selectChaptersFiltered = createSelector(
    selectChapters,
    state => state.ntbks,
    (chapters, ntbks) => {
        const { ntbkSelected } = ntbks
        return chapters
        .filter((chapter,idx) => ntbkSelected && chapter.ntbk_id === ntbkSelected.id)
    }
)

export const selectChapterIdsAvai = createSelector(
    selectChapters,
    state => state.ntbks,
    state => state.chapters,
    (chapters, ntbks, allChapters) => {
        const { ntbkSelected } = ntbks
        const { chapterSelected } = allChapters
        return chapters
        .filter((chapter,idx) => ntbkSelected && chapter.ntbk_id === ntbkSelected.id)
        .filter((chapter,idx) => chapterSelected && chapter.id !== chapterSelected.id)
        .map(chapter => chapter.id)
    }
)