import "./test.css"
import React, { useEffect } from "react";
import  useState  from 'react-usestateref'
import { complementary } from "../../utils/icons/complementary/Complementary";
import { accounts } from "../../utils/icons/accounts/accounts";
import { useDispatch, useSelector } from "react-redux";
import { popupChanged } from "../layoutAltersSlice";
import { createUser } from "../../features/accounts/login/loginApis";
import { saveLoggedIn, saveRecentLoggedIn } from "../../features/accounts/login/loggedInsSlice";
import { signupNLoginEn } from "../../languages/english/signupNLogin";
import { elementFocused } from "../../utils/styles/elementFocused";
import { errorIds, signupValidator } from "../../errors/validator";
import { signupErrors } from "../../languages/english/errors";
import { selectUserNames } from "../../features/accounts/signup/usersSlice";


const Birthday = ({user, handleChange, handleClick, handleBirthday}) => {
    const { age_month_text, age_day_text, age_year_text, use_age_text
    } = signupNLoginEn
    const { downChevron } = accounts
    const now = new Date();
    const currentYear = now.getFullYear()
    const dayList = (month) => {
        // const months30 = ["April","June","September","November"]
        const months30 = ["4","6","9","11"]
        const dayNum = (() => {
            if (months30.includes(month)) return 30
            return 31
        })()
        const days = []
        for (let i = 1; i<(dayNum + 1); i++) days.push(i)
        return days.map((day,idx) => <option value = {day}>{day}</option>)
    } 
    const months = []
    for (let i = 1; i < 13; i++) months.push(i)
    // const months = ["January","February","March","April","May","June","July",
    // "August","September","October","November","December"];
    const monthList = months.map((month,idx) => <option value = {month}>{month}</option>)
    const years = []
    for (let i = 1900; i<currentYear-12; i++) years.push(i)
    const yearList = years.map((year,idx) => <option value = {year}>{year}</option>)
    
    return (
        <>
     <div className = "d-flex justify-content-between">
        <div className = "pe-1 position-relative"> 
            <select
                className = "account-signup-N-login birthday-select text-start ps-2"
                id = "month"
                name = "age_month"
                type ="date"
                value = {user.age_month}
                onClick = {handleClick}
                onChange = {handleChange}
                onKeyUp = {handleClick}
                >
                <option> {age_month_text} </option>
                {monthList}
            </select>
            <div className ="select-arrowDown">
                {downChevron()}
            </div>
        </div>
        <div className = "pe-1 position-relative"> 
            <select
                className = "account-signup-N-login birthday-select text-start ps-2"
                id = "day"
                name = "age_day"
                type ="date"
                value = {user.age_day}
                onClick = {handleClick}
                onChange = {handleChange}
                onKeyUp = {handleClick}
                >
                <option> {age_day_text} </option>
                {dayList(user.age_month)}
            </select>
            <div className ="select-arrowDown">
                {downChevron()}
            </div>
        </div>
        <div className = "pe-1 position-relative"> 
            <select
                className = "account-signup-N-login birthday-select text-start ps-2"
                id = "year"
                name = "age_year"
                type ="date"
                value = {user.age_year}
                onClick = {handleClick}
                onChange = {handleChange}
                onKeyUp = {handleClick}
                required = "true"
                >
                <option> {age_year_text}</option>
                {yearList}                          
            </select>
            <div className = "my-2"> </div>
            <div className ="select-arrowDown">
                {downChevron()}
            </div>
        </div>
        </div>
        </>
    )
}

const Error = ({error}) => {
    const { errorIcon, errorIcon2 } = accounts
    return (
        <div className = "d-flex align-items-center"> 
            <div className = "mx-3 d-flex align-items-center justify-content-center"
                style = {{background:"orange"}}
            > {errorIcon2()} </div>
            <div className = "me-3"> {error} </div>
        </div>  
    )
}

export default function UserSignup(){
    const initialUser = {
        first_name: "",
        sur_name: "",
        user_name : "",
        password : "",
        age_day: null,
        age_month: null,
        age_year: null, 
        age:null,
    }
    const ids = ['first_name', 'sur_name', 'user_name_popup', 'password_popup', 'age_popup', 'month' ,'day', 'year' ]
    const dispatch = useDispatch();
    //use the react-useStateRef to update the most recent values of any state variables 
    const [ error, setError] = useState(null);
    const [ errorIdList, setErrorIdList, errorIdListRef ] = useState(null)
    const [clickedId, setClickId, clickedIdRef] = useState("")
    const handleClick = (e) => {
        setClickId(() => e.target.id)
        if (ids.includes(clickedIdRef.current)) {
            elementFocused.focus(e.target.id)
        }
        setError(() => null)
    }
    useEffect(() => {
        ids.forEach((id, idx) => {
            if (id !== clickedId) elementFocused.unFocus(id) 
        })
    }, [clickedId])

    const [ ageBirthday, setAgeBirthday ] = useState(true)
    const handleBirthday = (e) => {
        if (ageBirthday)  setClickId(() => "month")
        else setClickId(() => "age_popup")
        setAgeBirthday(() => !ageBirthday)
        setError(() => null)
        setErrorIdList(() => null)
    }
    const [month, setMonth, monthRef] = useState()
    const [day, setDay, dayRef] = useState()
    const [year, setYear, yearRef] = useState()
    const [ birthday, setBirthday, birthdayRef ] = useState()
    const [ user, setUser, userRef ] = useState(initialUser);
    const handleChange = ({target: {name, value, type, checked}}) => {
        value = type === "checkbox" ? checked : value
        if (name === "age_month") setMonth(() => value)
        if (name === "age_day") setDay(() => value)
        if (name === "age_year") setYear(() => value)
        const date = new Date(`${monthRef.current}/${dayRef.current}/${yearRef.current}`)
        if (Object.prototype.toString.call(date) === "[object Date]"){
            if (isNaN(date.getTime())) {
                console.log("this is not valid")
                setBirthday(() => undefined)              
            } else {
                console.log("this is valid")
                setBirthday(() => date.toLocaleDateString())              
            }
        } else {
            console.log("this is not a date")
            setBirthday(() => undefined)              
        }
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
            birthday: birthdayRef.current, 
        }))
    }

    const usersTaken = useSelector(selectUserNames)
    const handleSubmit = (event) => {
        event.preventDefault();
        const newUser = {
            first_name: user.first_name,
            sur_name: user.sur_name,
            user_name : user.user_name,
            password : user.password,
            birthday : user.birthday,
        }
        setErrorIdList(() => errorIds(newUser, usersTaken))
        errorIdListRef.current.forEach((id) => elementFocused.error(id))
        const err = signupValidator(newUser, usersTaken)
        if (err) {
            setError(()=>err) 
        }
        else {
            createUser(newUser)
            .then((result) => {
                setUser(() => initialUser);
                const newUser = {
                    ...result,
                    stayLoggedIn: true
                }
                dispatch(popupChanged(false))
                dispatch(saveLoggedIn(newUser))
                dispatch(saveRecentLoggedIn(newUser))
            })
            .catch(setError) 
        }
    }  
    const handleEscape = () => dispatch(popupChanged(false)) 
    const {
        signup_title_text, first_name_text, sur_name_text, user_name_text, password_text,
        birthday_text, birthday_policy_text, age_text, signup_text, use_DOB_text, use_age_text
    } = signupNLoginEn
    const { birthday_err_text, password_err_text, user_name_err_text, first_last_name_err_text, 
        email_taken_text, phone_taken_text
    } = signupErrors

    const userNameErr = () => {
        switch(error) {
            case "email taken" : return email_taken_text
            case "phone taken" : return phone_taken_text
            case "username err": return user_name_err_text
            default: return null
        }
    }
    console.log(error)
    return (
        <>
        <div className ="">
            <div className ="row mt-3 mx-0 d-flex align-items-center justify-content-between">
                <div className = "col-2"></div>
                <h4  className ="col text-center"> {signup_title_text} </h4>
                <div  className = "col-2 d-flex justify-content-end">
                    <div className ="btn">
                        <button className ="btn"
                        onClick = {handleEscape}
                        >
                            {complementary.escapeIcon()}
                        </button>
                    </div>
                </div>
            </div>
            <form onSubmit = {handleSubmit}> 
                <div className = "d-flex px-3 pt-3">
                    <div className = "d-flex justify-content-between w-100">
                        <div className = "pe-1 position-relative">
                            <input
                                className = "test account-signup-N-login first-last-name px-2 "
                                id = "first_name"
                                name = "first_name"
                                type = "text"
                                placeholder = {first_name_text}
                                value = {user.first_name}
                                onChange = {handleChange}
                                onClick = {handleClick}
                                onKeyUp = {handleClick}
                                // required = "true"
                                >
                            </input>
                            {(error === "first name err") &&
                                <div className = "error-box w-100 name-first-last d-flex align-items-center">
                                   <Error error = {first_last_name_err_text}/>
                                </div>
                            }
                        </div>
                        <div className = "ps-1 position-relative ">
                            <input
                                className = "account-signup-N-login first-last-name px-2 "
                                id = "sur_name"
                                name = "sur_name"
                                type = "text"
                                placeholder = {sur_name_text}
                                value = {user.sur_name}
                                onChange = {handleChange}
                                onClick = {handleClick}
                                onKeyUp = {handleClick}
                                // required = "true"
                                >
                            </input>
                            {(error === "last name err") &&
                                <div className = "error-box w-100 name-first-last d-flex align-items-center">
                                   <Error error = {first_last_name_err_text}/>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className = "position-relative d-flex px-3 pt-3 my-2">
                    <input
                        className = "account-signup-N-login px-2 w-100"
                        id = "user_name_popup"
                        name = "user_name"
                        placeholder = {user_name_text}
                        type = "text"
                        value = {user.user_name}
                        onChange = {handleChange}
                        onClick = {handleClick}
                        onKeyUp = {handleClick}
                        // required = "true"
                    >
                    </input>
                    {(userNameErr()) &&
                       <div className = "error-box d-flex align-items-center ">
                       <Error error = {userNameErr()}/>
                        </div>
                    }
                </div>
                <div className = "position-relative d-flex px-3 pt-3 my-2">
                    <input
                        className = "account-signup-N-login px-1 w-100 px-2"
                        id = "password_popup"
                        name = "password"
                        type = "password"
                        placeholder = {password_text}
                        value = {user.password}
                        onChange = {handleChange}
                        onClick = {handleClick}
                        onKeyUp = {handleClick}
                        // required = "true"
                    >
                    </input>
                    {(error === "password err") &&
                       <div className = "error-box">
                       <Error error = {password_err_text}/>
                        </div>
                    }
                </div>
                <div className="position-relative text-start px-3 pt-2">
                    <h6>{birthday_text}</h6>
                    <p
                        style = {{
                            color: "#343a40",
                            lineHeight: "20px",
                            fontWeight: "400",
                        }}
                    > {birthday_policy_text}
                    </p>
                    {ageBirthday
                    ? <Birthday user = {user} handleChange = {handleChange} handleClick = {handleClick} handleBirthday = {handleBirthday}/>
                    : <div className = "">
                            <input
                                className = "account-signup-N-login px-1 w-100 px-2 mb-2"
                                id = "age_popup"
                                name = "age"
                                type = "age"
                                placeholder = {age_text}
                                value = {user.age}
                                onChange = {handleChange}
                                onClick = {handleClick}
                                onKeyUp = {handleClick}
                                // required = "true"
                            >
                            </input>        
                        </div>
                    }
                     <button className = "" type = "reset" style = {{background:"none", border:"none", color: "blue", outline:"none"}}
                            onClick = {handleBirthday}> {!ageBirthday ? use_DOB_text : use_age_text} </button>
                    {(error === "birthday err") &&
                       <div className = "birthday-error-box">
                       <Error error = {birthday_err_text}/>
                        </div>
                    }
                </div>
                <div className="text-start px-2 d-flex justify-content-start align-items-center">
                    <input
                        style = {{
                            width:"0px",
                            color:"white",
                            height: "0px",
                        }}
                        onKeyUp = {handleClick}
                        id = "none"
                    ></input>
                </div>
            {/* testing  */}
                <div className = "m-3">
                    <button 
                        className = "submit-btn list-group-item w-100 p-2"
                        type = "submit"
                        id = "submit"
                        onClick = {handleClick}
                        tabIndex = "-1"
                    >
                        <span className = "submit-btn-font"> {signup_text}</span>
                    </button>
                </div>
            </form>
        </div>
        </>
    )
}