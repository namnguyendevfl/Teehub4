import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { listUsers } from "./login/loginApis";

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
    },
    extraReducers: builder => {
        builder
        .addCase(fetchUsers.pending, (state, action) => {
            state.status = "loading"
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
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