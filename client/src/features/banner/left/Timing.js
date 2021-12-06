import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sessionStatusChanged, sessionParamsChanged, isTimerRunningChanged, timer } from "./sessionsSlice";
import { duration } from "../../../utils/time/duration";
import { leftBanner } from "../../../utils/icons/banner/leftBanner";
import { leftBannerToolTipsEn } from "../../../languages/english/leftBanner";

export const TimerRunning = ({isTimerRunningLocal, setIsTimerRunningLocal, sessionParamsLocal, secsToMins}) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        setIsTimerRunningLocal(()=> !isTimerRunningLocal)  
        dispatch(isTimerRunningChanged(!isTimerRunningLocal))    
    }
    const titleStyle = {
        color: isTimerRunningLocal ? "#0d6efd" : "#d00000"
    }
    const { playIcon, playFilled, pauseIcon, pauseFilled } = leftBanner

    const { play_text, pause_text } = leftBannerToolTipsEn
    return (
      <>
       <li className = "nav-item me-3">
            <div className="toolTip button d-flex justify-content-center align-items-center border-white">
                <button className = "button p-0" onClick = {!isTimerRunningLocal && handleClick}>
                    { isTimerRunningLocal ? playFilled() : playIcon()}
                </button>
                <span className = "toolTip-text"> {play_text} </span>
            </div>
        </li>
        <li className = "nav-item me-3">
            <div className="toolTip d-flex justify-content-center align-items-center border-white">
                <button className = "button p-0" onClick = {isTimerRunningLocal && handleClick}> 
                    { isTimerRunningLocal ? pauseIcon() : pauseFilled()}
                </button>
                <span className = "toolTip-text"> {pause_text} </span>
            </div>
        </li>
        <li className = "nav-item d-flex">
            <div className ="d-flex align-items-center justify-content-center timerTitle">
                <span   className = "d-flex align-items-center justify-content-center px-1" 
                        style = {titleStyle}> 
                <b className = "ms-2">{sessionParamsLocal?.label} {secsToMins} </b> 
                </span>
            </div>
        </li>
      </>  
    )
}

export default function Timing() {
    const  {
        sessionParams, 
        sessionStatus,
        isTimerRunning,
        breakInterval,
        focusInterval,
    } = useSelector(state => state.sessions)

    
    const [ sessionParamsLocal, setSessionParamsLocal ] = useState(null)
    const [ isTimerRunningLocal, setIsTimerRunningLocal ] = useState(isTimerRunning)
    useEffect (() => {
        if (sessionStatus && sessionParamsLocal === null) {
          setSessionParamsLocal(() => sessionParams)
        } else {
          setSessionParamsLocal(() => sessionParamsLocal);
        }   
    }, [sessionParamsLocal])
    const dispatch = useDispatch();

  //Step 1: Set interval to run the callback function every second  
  // function useInterval (nextTick, delay) {
  const useInterval = (nextTick, delay) => {
    const savedNextTick = useRef()
    //Then set up the interval
    useEffect (() => {
      //Remember the lastest callback
      savedNextTick.current = nextTick
      if (delay !== null){
        //Note: We should use a callback function we passing it into setInterval
        let id = setInterval(() => savedNextTick.current(),delay)
        return () => clearInterval(id)
      }
    },[delay, nextTick])
  }
  

  //Step 2: Step up nextTick function with a parameter "preState"
  const nextTick = (prevState) => {
    const timeElapsed = Math.min(prevState.interval*60,prevState.timeElapsed + 1)
    const timeElapsedPercent = timeElapsed/(prevState.interval*60)*100
    const session = {
        ...prevState,
        timeElapsed,
        timeElapsedPercent
    }
    timer.saveSessionParams(session)
    dispatch(sessionParamsChanged(session))
    return session
  }  
  
  //Step 3: Define the nextSession as either focusing or on break by stating function to transition the current session type to the next session
  //Fixing a bug which does not memorize the interval of focusing and on break
  const nextSession = (focusInterval, breakInterval) => {
    return (currentSession) => 
      (currentSession.label === "Focusing")
      ?   { label: "On Break",
            interval: breakInterval,
            timeElapsed:0,
            timeElapsedPercent:0,
            numSession: currentSession.numSession
          }
      :   { label: "Focusing",
            interval: focusInterval,
            timeElapsed:0,
            timeElapsedPercent:0,
            numSession: currentSession.numSession + 1
          }
    }
  //Step5: call the useInterval function: if play (istimerRunning): delay 1s, and run the call back function to set state of session with label and timeremining decrementing by 1
    useInterval(() => {
      if (sessionParamsLocal?.timeElapsedPercent === 100) {
        console.log("voice")
        return setSessionParamsLocal(nextSession(focusInterval, breakInterval))
      }
      return setSessionParamsLocal(nextTick)
    }, 
    isTimerRunningLocal ? 1000 : null
    )
    const secsToMins = duration.secToMin(sessionParamsLocal?.timeElapsed)
    const handleStop = (event) => { 
        event.preventDefault();
        setIsTimerRunningLocal(() => false);
        dispatch(isTimerRunningChanged(false))    
        setSessionParamsLocal(()=>null);
        timer.dltBreak();
        timer.dltFocus();
        timer.saveSessionStatus(false)
        dispatch(sessionStatusChanged(false))
        dispatch(sessionParamsChanged(null))
    }

    return (
    <ul className = "nav">
      <li className = "nav-item me-3">  
          <button className = "button"> logo
          </button>
      </li>
      <li className = "nav-item me-3">           
          <div className="toolTip d-flex justify-content-center align-items-center border-white">
                  <form 
                  >
                  <button className = "button p-0"
                      id = "home"
                      type = "submit"
                      onClick = {handleStop}
                      >
                      {leftBanner.homeIcon()}
                  </button>
                  </form>
                  <span className = "toolTip-text"> {leftBannerToolTipsEn.home_text} </span>
          </div>
      </li>
      <TimerRunning isTimerRunningLocal = {isTimerRunningLocal} 
                      secsToMins = {secsToMins}
                      sessionParamsLocal = {sessionParamsLocal}    
                      setIsTimerRunningLocal = {setIsTimerRunningLocal}
      />
    </ul>
    
    )}