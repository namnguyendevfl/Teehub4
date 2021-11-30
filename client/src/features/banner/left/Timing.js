import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sessionStatusChanged, sessionParamsChanged, isTimerRunningChanged, timer } from "../../../layout/loggedIn/banner/sessionsSlice";
import { duration } from "../../../utils/time/duration";
import { leftBanner } from "../../../utils/icons/banner/leftBanner";

export const TimerRunning = ({isTimerRunningLocal, setIsTimerRunningLocal, sessionParamsLocal, secsToMins}) => {
    const dispatch = useDispatch()
    const handleClick = () => {
        setIsTimerRunningLocal(()=> !isTimerRunningLocal)  
        dispatch(isTimerRunningChanged(!isTimerRunningLocal))    
    }
    const titleStyle = {
        color: isTimerRunningLocal ? "#0d6efd" : "#d00000"
    }
    return (
      <>
       <li className = "nav-item me-3">
            <div className="toolTip button d-flex justify-content-center align-items-center border-white">
                <button className = "button p-0" onClick = {!isTimerRunningLocal && handleClick}>
                    { isTimerRunningLocal ? leftBanner.playFilled() : leftBanner.play()}
                </button>
                <span className = "tooltiptext"> Play </span>
            </div>
        </li>
        <li className = "nav-item me-3">
            <div className="toolTip d-flex justify-content-center align-items-center border-white">
                <button className = "button p-0" onClick = {isTimerRunningLocal && handleClick}> 
                    { isTimerRunningLocal ? leftBanner.pause() : leftBanner.pauseFilled()}
                </button>
                <span className = "tooltiptext"> Pause </span>
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
    // const timeRemaining = Math.max(0,prevState.timeRemaining - 1)
    const timeElapsed = Math.min(prevState.interval*60,prevState.timeElapsed + 1)
    const timeElapsedPercent = timeElapsed/(prevState.interval*60)*100
    const session = {
        ...prevState,
        timeElapsed,
        timeElapsedPercent
    }
    timer.saveSessionParams(session)
    dispatch(sessionParamsChanged(session))
    // dispatch(sessionStatusChanged)
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
      // if (session.timeRemaining === 0) {
    //   if (session.timeElapsedPercent === 100) {
      if (sessionParamsLocal?.timeElapsedPercent === 100) {
        console.log("voice")
        return setSessionParamsLocal(nextSession(focusInterval, breakInterval))
      }
      return setSessionParamsLocal(nextTick)
    }, 
    // isTimerRunning ? 1000 : null
    isTimerRunningLocal ? 1000 : null
    )
 

    const secsToMins = duration.secToMin(sessionParamsLocal?.timeElapsed)
    const handleStop = (event) => { 
        event.preventDefault();
        setIsTimerRunningLocal(() => false);
        dispatch(isTimerRunningChanged(false))    
        setSessionParamsLocal(()=>null);
        timer.dltSessionParams();
        timer.dltBreak();
        timer.dltFocus();
        timer.saveSessionStatus(false)
        dispatch(sessionStatusChanged(false))
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
                    {leftBanner.home()}
                    {/* <Home /> */}
                </button>
                </form>
                <span className = "tooltiptext"> Home </span>
        </div>
    </li>
    <TimerRunning isTimerRunningLocal = {isTimerRunningLocal} 
                    secsToMins = {secsToMins}
                    sessionParamsLocal = {sessionParamsLocal}    
                    setIsTimerRunningLocal = {setIsTimerRunningLocal}
    />
</ul>
    
    )}