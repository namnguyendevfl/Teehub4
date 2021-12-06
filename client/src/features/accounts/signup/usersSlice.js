import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { listUsers } from "../login/loginApis";


//This slice is used for both ntbks in Main and in Complementaries

// export const users = {
//     getUsers: () => JSON.parse(window.localStorage.getItem('notebooks')),
//     saveNtbks: (notebooks) => window.localStorage.setItem('notebooks', JSON.stringify(notebooks)),
//     dltNtbks: () => localStorage.removeItem('notebooks'),
//     getNtbkSelected: () => JSON.parse(window.localStorage.getItem('notebookSelected')),
//     saveNtbkSelected: (notebook) => window.localStorage.setItem('notebookSelected', JSON.stringify(notebook)),
//     dltNtbkSelected: () => localStorage.removeItem('notebookSelected'),
// }

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState({
    status: 'idle',
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', 
    async () => {
    const response = listUsers()
    return response
})



const usersSlice = createSlice({
    name: 'users', 
    initialState,
    reducers: {
        // saveNtbkSelected(state, action) {
        //     ntbks.saveNtbkSelected(action.payload)
        //     state.ntbkSelected = action.payload
        // },
        // saveNewNtbk(state, action) {
        //     ntbksAdapter.addOne(state, action.payload)
        // },
        // dltNtbk(state, action) {
        //     ntbksAdapter.removeOne(state, action.payload)
        // },
        // updateNtbk(state, action) {
        //     ntbksAdapter.updateOne(state,action.payload)
        // }
    },
    extraReducers: builder => {
        builder
        .addCase(fetchUsers.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            // ntbks.saveNtbks(action.payload)
            usersAdapter.setAll(state, action.payload)
            state.status = 'idle'
        })
        .addCase(fetchUsers.rejected,(state, action) => {
            state.status = 'rejected'
            state.error = action.error
        })
    }
})


export const {
} = usersSlice.actions

export default usersSlice.reducer

export const {
    selectAll: selectUsers,
    selectById: selectUserById,
} = usersAdapter.getSelectors(state => state.users)

export const selectNtbkIds = createSelector(
    selectUsers,
    (users) => {
        return users.map(user => user.id)
    }
)


export const selectUserNames = createSelector(
    selectUsers,
    (users) => users.map(user => user.user_name)
)