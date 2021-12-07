import { configureStore } from "@reduxjs/toolkit";
import loggedInsReducer from "../features/accounts/login/loggedInsSlice";
import complementariesReducer from "../layout/loggedIn/complementaries/complementariesSlice";
import navOptionsReducer from "../layout/loggedIn/nav/navOptionsSlice";
import chaptersReducer from "../features/main/completedNtbks/ntbksNChapters/chaptersSlice";
import topicsReducer from "../features/main/completedNtbks/topics/topicsSlice";
import ntbksReducer from "../features/main/completedNtbks/ntbksNChapters/ntbksSlice";
import layoutAltersReducer from "../layout/layoutAltersSlice";
import draftedNtbksReducer from "../features/main/completedNtbks/draftedNtbksSlice";
import draftedTopicsReducer from "../features/main/completedNtbks/draftedTopicsSlice";
import sessionsReducer from "../features/banner/left/sessionsSlice";
import usersReducer from "../features/accounts/usersSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        layoutAlters: layoutAltersReducer,
        loggedIns: loggedInsReducer,
        sessions: sessionsReducer,
        navOptions: navOptionsReducer,
        draftedNtbks: draftedNtbksReducer,
        draftedTopics: draftedTopicsReducer,
        ntbks: ntbksReducer,
        chapters: chaptersReducer,
        topics: topicsReducer,
        complementaries: complementariesReducer,
    }
})

export default store