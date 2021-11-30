import React, { useEffect } from "react";
import  useState  from 'react-usestateref'
import { useSelector, useDispatch } from "react-redux";
import Errors from "../../../errors/errors";
import { boxStyle } from "../../../utils/styles/boxStyle";
import { saveLoggedIn, saveRecentLoggedIn } from "./loggedInsSlice";
import { postUserLoggingIn, readUserLoggingIn } from "./loginApis";
export const UserLoggingIn = () => {
    const { userLoggingIn: {user_name, password} } = useSelector(state => state.logins)
    return { user_name: user_name,
        password: password
    }
}

export default function LoginForm(props){
    const {
        displayLoginPopup,
        setDisplayLoginPopup
    } = props
  
    const dispatch = useDispatch()
    const ids = ['user_name', 'password']
    const [ clickedId, setClickedId, clickedIdRef] = useState()
    const initialLogin = {
        user_name:" ",
        password:"",
    }

    const [found, setFound ] = useState(false)
    const [ user, setUser, userRef ] = useState(initialLogin)
    const handleClick = (e) => {
        setClickedId(() => e.target.id)
        if (ids.includes(clickedIdRef.current)) boxStyle.focus(e.target.id)
    }
    useEffect(() => {
        ids.forEach((id, idx) => (id !== clickedId) && boxStyle.unFocus(id))
    }, [clickedId])
    const [error, setError] = useState(null);
    const handleChange = ({target: {name, value, type, checked}}) => {
        value = type === "checkbox" ? checked : value
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const userLoggingIn = {
            user_name: user.user_name.trim(),
            password: user.password.trim()
        }
        postUserLoggingIn(userLoggingIn)
        .then()
        .then(() => 
            readUserLoggingIn(userLoggingIn)
            .then((result) => {
                const loggedIn = {
                    id: result.id,
                    stayLoggedIn: true
                }
                dispatch(saveLoggedIn(loggedIn))
                dispatch(saveRecentLoggedIn(loggedIn))
            }))
        .catch((err) => {
            setError(err)
        })
    }
    const loginBoxStyle = (() => {
        if (displayLoginPopup) return {
            position: "absolute",
            width: "500px",
            height: "380px",
            zIndex: "7",
            backgroundColor: "white",
            borderRadius:"8px",
            boxShadow: "0px 0px 5px 0.7px #6c757d",  
            paddingTop:"20px"          
        }
    })()
    return (
        <div className =""
            style = {loginBoxStyle}
        >
            <Errors error = {error}/>
            <div className ="row mx-0 d-flex align-items-center justify-content-between">
                <div className = "col-2"></div>
                <h4  className ="col text-center"> Log in</h4>
                <div  className = "col-2 d-flex justify-content-end">
                {displayLoginPopup &&
                    <div className ="btn"> 
                        <button className ="btn"
                            onClick = {(e) => setDisplayLoginPopup (() => !displayLoginPopup)}
                        >
                            {/* {complementary.escape()} */}
                        </button>                   
                    </div>
                     }    
                </div>
            </div>
            <div className = "signupBox">
            <form onSubmit = {handleSubmit}> 
                <div className = "d-flex px-3 pt-3">
                    <input
                        className = "accountSignupInput px-2 w-100"
                        id = "user_name"
                        name = "user_name"
                        placeholder = "Phone or email"
                        type = "text"
                        // value = {userLoggingIn.user_name}
                        value = {user.user_name}
                        onChange = {handleChange}
                        onClick = {handleClick}
                        // onKeyDown = {handleKeyDown}
                        // tabIndex = "0"
                        onKeyUp = {handleClick}
                        // required = "true"
                    >
                    </input>
                </div>
                <div className = "d-flex px-3 pt-3">
                    <label htmlFor = " password"> </label>
                    <input
                        className = "accountSignupInput px-1 w-100 px-2"
                        id = "password"
                        name = "password"
                        type = "password"
                        placeholder = "Password"
                        // value = {userLoggingIn.password}
                        value = {user.password}
                        onChange = {handleChange}
                        onClick = {handleClick}
                        onKeyUp = {handleClick}
                        // required = "true"
                    >
                    </input>
                </div>
                <div className = "pb-1"> 
                </div>
                {displayLoginPopup && <div style = {{ margin: "5px" }}> </div>}
                <div className="text-start px-2 d-flex justify-content-start align-items-center"
                    style = {{height: "25px"}}
                >
                    <input
                        style = {{
                            width:"32px"
                        }}
                        type = "checkbox"
                        id = "remember_pass"
                        name = "remember_pass"
                        onChange={handleChange}
                        onKeyUp = {handleClick}
                        // checked={userLoggingIn.remember_pass}
                        checked={user.remember_pass}
                        value="rememberPass"                
                    ></input>
                    <label className = "px-2" htmlFor = "rememberPass">Remeber password</label>
                </div>
                {displayLoginPopup && <div style = {{ margin: "5px" }}> </div>}
                <div className="text-start px-2 d-flex justify-content-start align-items-center"
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
                        // checked={userLoggingIn.guest_mode}
                        checked={user.guest_mode}
                        value="guestMode"
               
                    ></input>
                    <label className = "px-2" htmlFor = "guestMode">Guest mode</label>
                </div>
                <div className = "my-3">
                </div>
                {displayLoginPopup && <div style = {{ margin: "30px" }}> </div>}
                <div className = "my-2"> </div>
                <div className ="d-flex justify-content-center"  >    
                    <a href = "" tabIndex = "-1">
                        <span className ="text-center"  > Forgot password</span>
                    </a>
                </div>            
                <div className = "m-3 mt-1 d-flex justify-content-center">
                    <button 
                    tabIndex = "-1"
                    className = "signupBtn w-100 p-2"
                    type = "submit">
                        <span className = "signupBtnFont"> Log in</span>
                    </button>
                </div>
            </form>
            </div>
        </div>
    )
}