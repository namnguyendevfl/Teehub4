import React from "react";
import "./Banner.css";
import { useSelector } from "react-redux";
import NonTiming from "../../../features/banner/left/NonTiming";
import Timing from "../../../features/banner/left/Timing";
import SearchBox from "../../../features/banner/search/Search";
import ProgressBar from "../../../features/banner/progressBar/ProgressBar";
import RightBanner from "../../../features/banner/right/RightBanner";

export default function Banner(props) {
      //First part: Running Pomodoro
    const { sessionStatus } = useSelector(state => state.sessions)
    return (
        <>
        <div className ="row w-100 p-1 d-flex align-items-center justify-content-start flex-nowrap" >
            <div className ="leftBanner col  ms-3 me-md-3 me-2 d-flex flex-nowrap justify-content-start m-0 p-0">        
            {sessionStatus ? <Timing /> : <NonTiming />}
            </div>
            <div className = " col">
                <SearchBox />
            </div>
            <div className ="rightBanner col d-flex flex-nowrap justify-content-end ms-md-3 p-0 me-3 ">
                <RightBanner />
            </div>
        </div>
        <div>
            <ProgressBar  />
        </div>
        </>
    )
}