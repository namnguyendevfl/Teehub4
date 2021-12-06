import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { projectSetupEn } from "../../languages/english/projectTimerSetup";
import { popupChanged } from "../layoutAltersSlice";
import { breakIntervalAdded, focusIntervalAdded, sessionStatusChanged, sessionParamsChanged, isTimerRunningChanged, timer } from "../../features/banner/left/sessionsSlice";
import { appIcons } from "../../utils/icons/generalIcons/generalIcons";

const Pomodoro = ({ setFormData }) => {
    const handleFocus = ({ target: { name, value } }) => {
        setFormData((prevForm) => ({
            ...prevForm,
            session : {
                ...prevForm.session,
                [name]: value
            }
        }))
    }

    const handleBreak = ({ target: { name, value } }) => {
        setFormData((prevForm) => ({
            ...prevForm,
            session : {
                ...prevForm.session,
                [name]: value
            }
        }))
    }    

    const handleMode = ({ target: { name, value, type, checked } }) => {
        const checkedValue = (type === "checkbox") ? checked : value
        setFormData((prevForm) => ({
            ...prevForm, 
            session: {
                ...prevForm.session,
                [name]: checkedValue,
            }
        }))
    }
    return (
        <div >
            <div className = "row d-flex justify-content-between"> 
                <div className = "col-6">
                    <input className = "py-1 my-1 px-2 w-100"
                        name = "focus_interval"
                        onChange = {handleFocus}
                        placeholder = {projectSetupEn.focus_interval}
                    >
                    </input>
                </div>
                <div className = "col-6">
                    <input
                        className = "py-1 my-1 px-2 w-100"
                        name = "break_interval"
                        placeholder = {projectSetupEn.break_interval}
                        onChange = {handleBreak}
                    >
                    </input>
                </div>
            </div>
            <div className = "d-flex">
                <input 
                    className = "m-2 w-0"
                    style = {{width: "10px"}}
                    type = "checkbox"
                    name = "focus_mode"
                    onChange = {handleMode}
                />
                <label htmlFor="focus_mode">{projectSetupEn.focus_mode}</label>
            </div>
        </div>
      )
  }

const Project = ({formData, setFormData}) => {
    const actionList = projectSetupEn.actions.map((action, idx) => {
        return (
            <option key = {idx}>{action}</option>
        )
    });

    const handleChange = ({ target: { name, value } }) => {
        setFormData( prevForm => ({
            ...prevForm,
            [name]: value
        }))
    }
    return (
        <div>
            <div>
            <h5>{projectSetupEn.project}</h5>
                <div>
                    <input
                        className = "py-1 my-1 w-100"
                        type = "text"
                        name = "project_label"
                        placeholder = {projectSetupEn.project_label}
                        value = {formData.project_label}
                        onChange = {handleChange}
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
                        onChange = {handleChange}
                    >
                    </input>
                </div>
                <div>
                    <select
                        className = "p-1 m-1 px-2 w-100"
                        name = "action"
                        value = {formData.action}
                        onChange = {handleChange}
                    >
                        {actionList}
                    </select>
                </div>
            </div> 
            <div>
            </div>  
        </div>
    )
}


export default function PomodoroTimer() {
    const dispatch = useDispatch();
    const initialState = {
        project_label: "",
        expected_time: "",
        action: "",
        source:"",
        session: {
            focus_interval: "",
            break_interval: "",
            focus_mode: false ,
        }
    };
    //create a react state using the useState hook to store values of the component
    const [ formData, setFormData ] = useState(initialState);
    const handleEscape = (e) => {;
        dispatch(popupChanged(false))
    };

    const handleSubmit = () => {
        //set up the initial values for the pomodoro timer and dispatch these value to the sessionReducer
        //Then save these value in the store and localStorage so that the state can persist even when we close the browser
        const focusInterval = formData.session.focus_interval;
        const breakInterval = formData.session.break_interval;
        const initialSession = {
            label: "Focusing",
            interval: focusInterval,
            timeElapsed: 0,
            process:0,
        };  
        dispatch(focusIntervalAdded(focusInterval));
        dispatch(breakIntervalAdded(breakInterval));
        dispatch(sessionParamsChanged(initialSession));
        dispatch(sessionStatusChanged(true));
        dispatch(isTimerRunningChanged(true));
        dispatch(popupChanged(false))
    };     

    return (
    <div >
         <div className="row mt-3 m-2 d-flex text-aligns-center justify-content-between">    
            {/* Create an empty div to offset the escape btn position */}
            <div className = "col-2"></div>
            <h4 className = "col text-center">{projectSetupEn.setupSession}</h4>
            <div className = "col-2 m-0 d-flex align-items-center justify-content-end">
                <button className = "btn p-2 d-flex align-items-center "
                        onClick = {handleEscape}
                >
                    {appIcons.escape()}
                </button>
            </div>
        </div>
        <div>
        <form className = "p-3 pt-0" onSubmit = {handleSubmit}>
            <Pomodoro formData = {formData} setFormData = {setFormData} />
            <div>
            <hr />
            <Project formData = {formData} setFormData = {setFormData} />
            </div> 
            <div>
            <button 
                className = "submit-btn my-3 list-group-item w-100 d-flex align-items-center justify-content-center text-center"
                type = "submit"
                >
                Save
            </button>
            </div>  
        </form>
        </div>
    </div>)
}