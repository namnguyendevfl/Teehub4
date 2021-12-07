import { createSlice } from "@reduxjs/toolkit";
export const navs = {
    getNavSelected: () => JSON.parse(window.localStorage.getItem('navSelected')),
    saveNavSelected: (chapter) => window.localStorage.setItem('navSelected', JSON.stringify(chapter)),   
    dltNavSelected: () => localStorage.removeItem('navSelected'),
}

const initialState = {
    show: true,
    selected: navs.getNavSelected() ? navs.getNavSelected() : "/home",
}

const navOptionsSlice = createSlice({
    name: "navOptions",
    initialState,
    reducers: {
        showNavOptionsChanged(state, action) {
            state.show = action.payload
        },
        navOptionSelected(state, action) {
            navs.saveNavSelected(action.payload)
            state.selected = action.payload
        },
    }
})

export default navOptionsSlice.reducer

export const { 
    showNavOptionsChanged,
    navOptionSelected,
} = navOptionsSlice.actions


