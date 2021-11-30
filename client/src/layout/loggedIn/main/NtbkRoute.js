import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router";
import { fetchChapters } from "../../../features/main/completedNtbks/ntbksNChapters/chaptersSlice";
import NtbkNChapterList from "../../../features/main/completedNtbks/ntbksNChapters/NtbkNChapterList";
import { fetchNtbks } from "../../../features/main/completedNtbks/ntbksNChapters/ntbksSlice";
import TopicsMain from "../../../features/main/completedNtbks/topics/topicsMain";
import { fetchTopics } from "../../../features/main/completedNtbks/topics/topicsSlice";

const ChapterRoute = () => {
    return (
        <div>
            <Routes>
                <Route  path = "/" element = {<NtbkNChapterList/>} />
                <Route path = "/:chapterId" element = {<TopicsMain />} />
            </Routes>
        </div>
    )
}


export default function NtbkRoute() {
    const dispatch = useDispatch()
    const { recentLoggedIn } = useSelector(state => state.loggedIns)
    useEffect(() => {
        const options = ['notebooks', 'chapters', 'topics']
        options.forEach((option, idx) => {
            const urlSuffix = `${option}/${recentLoggedIn.id}`
            switch(option) {
                case "notebooks": return dispatch(fetchNtbks(urlSuffix));
                case "chapters": return dispatch(fetchChapters(urlSuffix));
                case "topics": return dispatch(fetchTopics(urlSuffix));
            }         
        })
    },[])

    return (
        <Routes>
            {/* <Route  path = "/" element = {<NtbksMain />} /> */}
            <Route  path = "/" element = {<NtbkNChapterList option = "ntbks" />} />
            <Route path = ":bookId/*" element = {<ChapterRoute />}/>  
        </Routes>
    )
}