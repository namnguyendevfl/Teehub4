import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { dltObj, listObjs } from "../apiNtbksComplete";
import { initState } from "../../../../redux/getInitStates";

//This slice is used for both ntbks in Main and in Complementaries


export const ntbks = {
    getNtbks: () => JSON.parse(window.localStorage.getItem('notebooks')),
    saveNtbks: (notebooks) => window.localStorage.setItem('notebooks', JSON.stringify(notebooks)),
    dltNtbks: () => localStorage.removeItem('notebooks'),
    getNtbkSelected: () => JSON.parse(window.localStorage.getItem('notebookSelected')),
    saveNtbkSelected: (notebook) => window.localStorage.setItem('notebookSelected', JSON.stringify(notebook)),
    dltNtbkSelected: () => localStorage.removeItem('notebookSelected'),
}

const ntbksAdapter = createEntityAdapter();
const initialState = ntbksAdapter.getInitialState({
    ...initState(ntbks.getNtbks()),
    status: 'idle',
    // entities: {},
    ntbkSelected: ntbks.getNtbkSelected(),
})

export const fetchNtbks = createAsyncThunk('ntbks/fetchNtbks', 
    async (urlSuffix) => {
    const response = listObjs(urlSuffix)
    return response
})

// export const dltNtbk = createAsyncThunk("ntbks/dltNtbk",
//     async (urlSuffix, id) => {
//     const response = dltObj(urlSuffix)
//     return id
// })

const ntbksSlice = createSlice({
    name: 'ntbks', 
    initialState,
    reducers: {
        saveNtbkSelected(state, action) {
            ntbks.saveNtbkSelected(action.payload)
            state.ntbkSelected = action.payload
        },
        saveNewNtbk(state, action) {
            ntbksAdapter.addOne(state, action.payload)
        },
        dltNtbk(state, action) {
            ntbksAdapter.removeOne(state, action.payload)
        },
        updateNtbk(state, action) {
            // console.log(action.payload)
            ntbksAdapter.updateOne(state,action.payload)
        }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchNtbks.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(fetchNtbks.fulfilled, (state, action) => {
            ntbks.saveNtbks(action.payload)
            ntbksAdapter.setAll(state, action.payload)
            state.status = 'idle'
        })
        .addCase(fetchNtbks.rejected,(state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
    }
})


export const {
    saveNtbkSelected,
    saveNewNtbk, 
    dltNtbk,
    updateNtbk
} = ntbksSlice.actions

export default ntbksSlice.reducer

export const {
    selectAll: selectNtbks,
    selectById: selectNtbkById,
} = ntbksAdapter.getSelectors(state => state.ntbks)

export const selectNtbkIds = createSelector(
    selectNtbks,
    (ntbks) => {
        return ntbks.map(ntbk => ntbk.id)
    }
)


export const selectNtbkIdsAvai = createSelector(
    selectNtbks,
    state => state.ntbks,
    (ntbks, ntbksAll) => {
        const { ntbkSelected } = ntbksAll
        return ntbks
        .filter(ntbk => ntbkSelected && ntbk.id !== ntbkSelected.id)
        .map(ntbk => ntbk.id)
    }
)