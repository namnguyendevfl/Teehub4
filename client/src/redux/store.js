import { configureStore } from "@reduxjs/toolkit";
import loggedInsReducer from "../features/accounts/login/loggedInsSlice";
import complementariesReducer from "../layout/loggedIn/complementaries/complementariesSlice";
import navOptionsReducer from "../layout/loggedIn/nav/navOptionsSlice";
import sessionsReducer from "../layout/loggedIn/banner/sessionsSlice";
import chaptersReducer from "../features/main/completedNtbks/ntbksNChapters/chaptersSlice";
import topicsReducer from "../features/main/completedNtbks/topics/topicsSlice";
import ntbksReducer from "../features/main/completedNtbks/ntbksNChapters/ntbksSlice";
import layoutAltersReducer from "../layout/layoutAltersSlice";

const store = configureStore({
    reducer: {
        layoutAlters: layoutAltersReducer,
        loggedIns: loggedInsReducer,
        sessions: sessionsReducer,
        navOptions: navOptionsReducer,
        ntbks: ntbksReducer,
        chapters: chaptersReducer,
        topics: topicsReducer,
        complementaries: complementariesReducer,
    }
})

export default store