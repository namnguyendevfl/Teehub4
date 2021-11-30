import React from "react"
import { useSelector } from "react-redux"
import { colors } from "../../../utils/colors/colors"

// export default function ProgressBar({progress, isTimerRunning}) {
export default function ProgressBar() {
  const { sessionStatus, isTimerRunning , sessionParams } 
    = useSelector(state => state.sessions)
    let background
    sessionParams && sessionStatus
      ? isTimerRunning
        ? background = colors.blue
        : background = colors.red
      : background = colors.background
      // : background = "white"
    const progress = sessionParams?.timeElapsedPercent
    return  <>
      <div>
        <div className="progress px-3" style={{ height: "13px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            style= {{width: "100%" }}
            aria-valuenow= {progress} // Increase aria-valuenow as elapsed time increases
            style={{ width: `${progress}%`, borderRadius:"5px", background:`${background}` }} // Increase width % as elapsed time increases 
          > </div> 
        </div>
      </div>
      </>
  }