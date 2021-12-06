import React from "react";
import useState from "react-usestateref"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { navEn } from "../../../languages/english/nav";
import { loggedOut, recentUrl } from "../../../features/accounts/login/loggedInsSlice";
import { navOptionSelected } from "./navOptionsSlice";
import { saveChapterSelected, setChaptersEmpty } from "../../../features/main/completedNtbks/ntbksNChapters/chaptersSlice";
import { saveNtbkSelected, setNtbksEmpty } from "../../../features/main/completedNtbks/ntbksNChapters/ntbksSlice";
import { breakIntervalAdded, focusDurationAdded, focusIntervalAdded, isTimerRunningChanged, sessionParamsChanged, sessionStatusChanged, setSessionEmpty } from "../../../features/banner/left/sessionsSlice";
import { setTopicsEmpty } from "../../../features/main/completedNtbks/topics/topicsSlice";
export default function Nav() {  
        
    const optionValues = Object.values(navEn)
    const optionKeys = Object.keys(navEn)
    const { recentLoggedIn } = useSelector(state => state.loggedIns)
    const navigate = useNavigate();
    const [ url, setUrl, urlRef ] = useState()
    const dispatch = useDispatch()
    const menuList = optionValues.map((option, idx) => {
        const handleClick = (e) => {
            switch (optionKeys[idx]) {
                case "ntbks":
                    setUrl(() => "/notebooks")
                    break;
                case "flashcards": 
                    setUrl(() => "/flashcards")
                    break;
                case "practice":  
                    setUrl(() => "/practices")
                    break;  
                case "logout": 
                    setUrl(() => "/")
                    // dispatch(breakIntervalAdded(null))
                    // dispatch(focusIntervalAdded(null))
                    // dispatch(sessionParamsChanged(null))
                    // dispatch(sessionStatusChanged(false))
                    // dispatch(isTimerRunningChanged(false))
                    dispatch(setSessionEmpty())
                    dispatch(setNtbksEmpty({}));
                    dispatch(setChaptersEmpty({}));
                    dispatch(setTopicsEmpty({}));
                    dispatch(loggedOut(recentLoggedIn.id));
                    break;
                default: 
                    setUrl("/home") 
                    break;
            }
            dispatch(saveNtbkSelected(null))
            dispatch(saveChapterSelected(null))
            dispatch(navOptionSelected(urlRef.current))
            recentUrl.saveUrl(urlRef.current)
            navigate(`${urlRef.current}`)
        }
        return(
        <li className = "list-group-item m-0 p-0">
            <button className = "list-group-item w-100 text-start"
                    onClick = {handleClick}
            >
                <span className = "text-start w-100"> {option} </span>
            </button>
        </li>
    )})
    return (
        <ul className = "list-group"
        >
            {menuList}
        </ul>
    )
}