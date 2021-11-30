import React, { useState } from "react";
import { projectSetupEn } from "../languages/english/projectTimerSetup";
import { pomodoroPopup } from "../utils/styles/popupForms";
import { useDispatch } from "react-redux";
import { timerPopupChanged } from "../features/sessions/sessionsSlice";
const Project = () => {
    const dispatch = useDispatch()
    const actionList = projectSetupEn.actions.map((action, idx) => {
        return (
            <option key = {idx}>{action}</option>
        )
    })
    const initialState = {
        project_label: "",
        expected_time: "",
        action: "",
        source:"",
        session: {
            focus_interval: "",
            break_interval: "",
        }
    }

    const handleCancel = (e) => {
        dispatch(timerPopupChanged(false))
    }
    
    const [ formData, setFormData ] = useState(initialState)


    //Pomodoro

    
    return (
        <form className = "p-3">
             <div >
                <h3 className = "text-center mb-3">{projectSetupEn.setupSession}</h3>
                <div className = "row d-flex justify-content-between"> 
                    <div className = "col-6">
                        <input className = "py-1 my-1 px-2 w-100"
                            type = "number"
                            name = "break_interval"
                            placeholder = {projectSetupEn.break_interval}
                            value = {formData.session.break_interval}
                        >
                        </input>
                    </div>
                    <div className = "col-6">
                        <input
                            className = "py-1 my-1 px-2 w-100"
                            type = "number"
                            name = "focus_interval"
                            placeholder = {projectSetupEn.focus_interval}
                            value = {formData.session.focus_interval}
                        >
                        </input>
                    </div>
                </div>
                <div>
                    <input 
                        className = "me-3 "
                        type = "checkbox"
                        name = "focus_mode"
                        value = {formData.session.focus_mode}
                    />
                    <label htmlFor="focus_mode">{projectSetupEn.focus_mode}</label>
                </div>
            </div>
            {/* <div>
                Note: Upon submiting the form, only urgent messages and calls will be notified during focusing time. To be able to communicate with others when working on the project, you can customize a list of exempted people
            </div> */}
            <div>
            <hr />
            <h5>{projectSetupEn.project}</h5>
                <div>
                    <input
                        className = "py-1 my-1 w-100"
                        type = "text"
                        name = "project_label"
                        placeholder = {projectSetupEn.project_label}
                        value = {formData.project_label}
                        onChange = ""
                    >
                    </input>
                </div>
                <div>
                    <input
                        className = "py-1 my-1 w-100"
                        type = "number"
                        name = "expected_name"
                        placeholder = {projectSetupEn.expected_time}
                        value = {formData.expected_time}
                    >
                    </input>
                </div>
                <div>
                    <select
                        className = "py-1 my-1 w-100"
                    >
                        {/* <option value = "">{projectSetupEn.actions[0]}</option> */}
                        {actionList}
                    </select>
                </div>
            </div> 
            <div>
                <button className = "" type = "submit">
                    Save
                </button>
                <button className = "" type = "submit" onClick = {handleCancel}>
                    Cancel
                </button>
            </div>  
        </form>
    )
}


export default function TimerSetup() {
    const { width_pomodoro, height_pomodoro } = pomodoroPopup
  
    const className = {
        width: `${width_pomodoro}px`,
        // position: "fixed",
        height: `${height_pomodoro}px`,
        zIndex: "2",
        border: "1px solid",
        background: "white",
    }

    return (
    <div style={className}>
        <Project />
    </div>)
}