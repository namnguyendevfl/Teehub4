import React, { useEffect } from "react";
import  useState  from 'react-usestateref'
import { useSelector, useDispatch } from "react-redux";
import Errors from "../../../errors/errors";
import { loggedInsLcalStorage, saveLoggedIn, saveRecentLoggedIn } from "./loggedInsSlice";
import { postUserLoggingIn, readUserLoggingIn } from "./loginApis";
import { signupNLoginEn } from "../../../languages/english/signupNLogin";
import { elementFocused } from "../../../utils/styles/elementFocused";
import { appIcons } from "../../../utils/icons/generalIcons/generalIcons";
import { popupChanged } from "../../../layout/layoutAltersSlice";
import { rightBanner } from "../../../utils/icons/banner/rightBanner";
import { accounts } from "../../../utils/icons/accounts/accounts";
import { loginErrors } from "../../../languages/english/errors";


export const UserLoggingIn = () => {
    const { userLoggingIn: { user_name, password } } = useSelector(state => state.logins)
    return { user_name: user_name,
        password: password
    }
}

const UserLoggedIn = ({ handleEscape, user}) => {
    return (
        <>
        <div className ="row mx-0 my-1 d-flex align-items-center justify-content-between">
            {/* Create empty div to make the escape btn stay on the R corner */}
            <div className = "col-2"></div>
            <div  className ="col"> </div>
            <div  className = "col-2 d-flex justify-content-end">
                <div className ="btn"> 
                    <button className ="btn"
                        onClick = {handleEscape}
                    >
                        {appIcons.escape()}
                    </button>                   
                </div>
            </div>
        </div>
        <div>
            <div className = "text-center mt-2 d-flex align-items-center justify-content-center"
            
            >
                {/* This is where the user ava is */}
                {/* {rightBanner.avaLogin()} */}
                {/* <div 
                style = {{height: "90px", width:"90px", borderRadius: "50%"}}
                > */}

                <strong className = "d-flex align-items-center justify-content-center fs-1"
                style = {{height: "90px", width:"90px", borderRadius: "50%", background:"#8b8c89", color:"white"}}
                
                > {user.first_name[0]}{user.sur_name[0]} </strong>

                {/* </div> */}
            </div>
            <div className = "text-center mt-2">
                <strong> {user.first_name} {user.sur_name} </strong>
            </div>
        </div> 
        </>
    )
}
  

const LoginPassword = ({user, handleChange, handleClick, password_id, handleGuestModeClick, error}) => {
    const { login_title_text, password_text, guest_mode_text, forgot_pass_text, } = signupNLoginEn
    const { user_name, password, guest_mode } = user
    const [ emptyInput, setEmptyInput ] = useState(true)
    //dont let a user to submit when the username and password are empty
    useEffect(() => {
        if (user_name !== "" && password !== "") setEmptyInput(() => false)
        else setEmptyInput(() => true)
    },[user_name, password])

    return (
        <>
            <div className = "d-flex px-3">
                <label htmlFor = " password"> </label>
                <input
                    className = "account-signup-N-login px-1 w-100 px-2"
                    id = {password_id}
                    name = "password"
                    type = "password"
                    placeholder = {password_text}
                    value = {password}
                    onChange = {handleChange}
                    onClick = {handleClick}
                    onKeyUp = {handleClick}
                >
                </input>
            </div>
            <div className = "pb-1"> 
            </div>
            <div className="text-start p-2 my-1 d-flex justify-content-start align-items-center"
                style = {{height: "20px"}}
            >
                <input
                    style = {{
                        width:"32px"
                    }}
                    type = "checkbox"
                    id = "guest_mode"
                    name = "guest_mode"
                    onChange={handleChange}
                    onKeyUp = {handleClick}
                    checked={guest_mode}
                   
                ></input>
                <label className = "px-2" htmlFor = "guestMode">{guest_mode_text}</label>
            </div>
            { error === null && <div style = {{height:"31px"}}> </div>}
            <div className ="d-flex justify-content-center my-2"  >    
                <a href = "" tabIndex = "-1">
                    <span className ="text-center"  > {forgot_pass_text}</span>
                </a>
            </div>            
            <div className = "position-relative m-3 mt-1 d-flex justify-content-center">
                
                <button 
                tabIndex = "-1"
                className = "submit-btn list-group-item w-100 p-2"
                type = "submit"
                >
                    <span className = "submit-btn-font"> {login_title_text}</span>
                </button>
                {emptyInput && 
                 <div 
                 tabIndex = "-1"
                 className = "disable-login-submit list-group-item w-100 p-2 d-flex align-items-center justify-content-center"
                 >
                 </div>
                }
            </div>
        </>
    )
}

//We need 2 login components, one for popup with known user_name and the other for general login. 
//Created a password component so that it can be used in these two components


const handleEscape = (e, dispatch) => dispatch(popupChanged(false))
const handleSubmit = (e, user, dispatch, setError) => {
    e.preventDefault();
    const { user_name, password, guest_mode } = user


    const userLoggingIn = {
        user_name: user_name.trim(),
        password: password.trim()
    }
    //Post the logging in user credential to the server to see what if the password inputted is correct
    //If user credentials are correct, then request the server to send back "id" of the logging in user
    //Then create a loggedIn obj with 2 keys including "id" and loggedin status
    //Use redux "useDispatch" to save this new obj to the redux store and localstorage to persist the state of loggedin status

    postUserLoggingIn(userLoggingIn)
    .then()
    .then(() => 
        readUserLoggingIn(userLoggingIn)
        .then((result) => {
            const loggedIn = (() => {
                if (guest_mode) return {...result, stayLoggedIn:false, foundLoggedIn: true}
                return  {
                ...result,
                stayLoggedIn: true,
                foundLoggedIn: true
            }})()

            console.log(loggedIn)
            dispatch(saveLoggedIn(loggedIn))
            dispatch(popupChanged(false))
        }))
    .catch((err) => {
        setError(err)
    })
}

export function LoginPopup () {
    const dispatch = useDispatch()
    //create an ids array and clickedId variable using useStateRef to set window.focus() on a clicked element and window.unfocus() on other elements
    const ids = ['password_login_popup']
    const [ clickedId, setClickedId, clickedIdRef] = useState()
    const { recentLoggedIn } = useSelector(state => state.loggedIns)
    const initialLogin = {
        user_name: recentLoggedIn.user_name,
        password:"",
        remember_pass: false,
        guest_mode: false
    }
    const [ user, setUser, userRef ] = useState(initialLogin)
    const handleClick = (e) => {
        setClickedId(() => e.target.id)
        if (ids.includes(clickedIdRef.current)) elementFocused.focus(e.target.id)
    }
    useEffect(() => {
        ids.forEach((id, idx) => (id !== clickedId) && elementFocused.unFocus(id))
    }, [clickedId])
    const [error, setError] = useState(null);
    const handleGuestModeClick = () => {
        setUser((prevUser) => ({
            ...prevUser,
            guest_mode: false
        }))
    }
    const handleChange = ({target: {name, value, type, checked}}) => {
        value = type === "checkbox" ? checked : value
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    }
    return (
        <div className =""
        >
            <Errors error = {error}/>
            <UserLoggedIn handleEscape = {e => handleEscape(e,dispatch)} user = {recentLoggedIn}/>
            <div className = "signupBox">
            <form onSubmit = {e => handleSubmit(e, user, dispatch, setError)}> 
                <LoginPassword user = {user} handleGuestModeClick = {handleGuestModeClick} 
                handleChange = {handleChange} 
                // handleChange = {e => handleChange(e, setUser())} //dnt work as setUser has to stay in a React Component
                handleClick = {handleClick} password_id = {"password_login_popup"}/>
            </form>
            </div>
        </div>
    )
}

const Error = ({error = { message : ""}}) => {
    const { exclamationCircleIcon } = accounts
    const { invalid_username_text } = loginErrors
    return ( error &&
        <div className = "ms-3 d-flex" > 
            <div className = " me-2 my-1"
            > {exclamationCircleIcon()} </div>
            <span className = "username-login-error me-3 my-1"> {invalid_username_text} </span>
        </div>  
    )
}
export default function LoginForm(){
    const dispatch = useDispatch()
    //create an ids array and clickedId variable using useStateRef to set window.focus() on a clicked element and window.unfocus() on other elements
    const ids = ['user_name_login', 'password_login']
    const [ clickedId, setClickedId, clickedIdRef] = useState()
    const initialLogin = {
        user_name: "",
        password:"",
        remember_pass: false,
        guest_mode: false
    }
    const [ user, setUser, userRef ] = useState(initialLogin)
    const handleClick = (e) => {
        setClickedId(() => e.target.id)
        if (ids.includes(clickedIdRef.current)) elementFocused.focus(e.target.id)
    }
    useEffect(() => {
        ids.forEach((id, idx) => (id !== clickedId) && elementFocused.unFocus(id))
    }, [clickedId])
    const [error, setError] = useState(null);
    const handleChange = ({target: {name, value, type, checked}}) => {
        value = type === "checkbox" ? checked : value
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    }
    // console.log(error)
    const { login_title_text, user_name_text } = signupNLoginEn
    return (
        <div>
            <div className ="row mx-0 d-flex align-items-center justify-content-between">
                <h4  className ="col text-center"> {login_title_text}</h4>
            </div>
            <div className = "signupBox">
            <form onSubmit = {e => handleSubmit(e, user, dispatch, setError)}> 
                <div className = "d-flex px-3 pt-3">
                    <input
                        className = "account-signup-N-login px-2 w-100"
                        id = "user_name_login"
                        name = "user_name"
                        placeholder = {user_name_text}
                        type = "text"
                        value = {user.user_name}
                        onChange = {handleChange}
                        onClick = {handleClick}
                        onKeyUp = {handleClick}
                    >
                    </input>
                </div>
                {error && error.message === "invalid username"
                ? <Error error = {error}/>
                : <div className = "mb-3"> </div>
                }

                <LoginPassword user = {user} 
                handleChange = {handleChange} 
                handleClick = {handleClick} password_id = {"password_login"}
                error = {error}
                />
            </form>
            </div>
        </div>
    )
}