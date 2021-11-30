import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { breakIntervalAdded, focusDurationAdded, sessionStatusChanged, sessionParamsChanged, isTimerRunningChanged, timer } from "../../../layout/loggedIn/banner/sessionsSlice";
import { leftBanner } from "../../../utils/icons/banner/leftBanner";

export default function TimerToolTip () {
  const [ focusIntervalLocal, setFocusIntervalLocal] = useState("")
  const [ breakIntervalLocal, setBreakIntervalLocal] = useState("")
  const dispatch = useDispatch()
  const handleFocus = ({target}) => setFocusIntervalLocal(() => target.value)
  const handleBreak = ({target}) => setBreakIntervalLocal(() => target.value)    
  const handleClick = () => {
    const initialSession = {
      label: "Focusing",
      interval: focusIntervalLocal,
      timeElapsed: 0,
      process:0,
    };  
    dispatch(focusDurationAdded(focusIntervalLocal));
    dispatch(breakIntervalAdded(breakIntervalLocal));
    dispatch(sessionParamsChanged(initialSession));
    dispatch(sessionStatusChanged(true));
    dispatch(isTimerRunningChanged(true));
    timer.saveSessionStatus(true);
    timer.saveSessionParams(initialSession);
    timer.saveFocus(focusIntervalLocal);
    timer.saveBreak(breakIntervalLocal);
    }
    return (
      <div  className = "toolTip"
            id = "timerToolTip"
      >
        <div  
              className = "flex-nowrap d-flex toolTipBar timerToolTipBar"          
            >
          <form
                className ="d-flex justify-content-center align-items-center "
                onSubmit = {handleClick}
                >
            <input  id = "focusInterval"
                    type ="text"
                    name = "focusInterval"
                    className ="durationInput" 
                    placeholder = "Focus"
                    onChange = {handleFocus}
            ></input>
            <input  id = "breakInterval"
                    type ="text"
                    name = "breakInterval"
                    className ="durationInput"
                    placeholder = "Break"
                    onChange = {handleBreak}
            ></input>  
            <button type = "submit"
                    id = "timerSubmitBtn"
                    className =" forwardBtn d-flex align-items-center justify-content-center"
                    onClick ={handleClick}    
                    >
            {leftBanner.forwardArrowWhite()}
            </button>
          </form>

        </div>        
      </div>
    )
}