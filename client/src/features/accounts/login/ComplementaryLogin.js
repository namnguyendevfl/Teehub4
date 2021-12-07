import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupNLoginEn } from "../../../languages/english/signupNLogin";
import { popupChanged } from "../../../layout/layoutAltersSlice";
import { selectLoggedInIds, selectLoggedInById, saveRecentLoggedIn, removeAllLoggedIns } from "./loggedInsSlice";


const LoggedInList = ({id}) => {
    const dispatch = useDispatch();
    //get user logged in from the redux slice by "id" 
    const loggedIn = useSelector(state => selectLoggedInById(state, id))

    const recentLoggedIn = {
        ...loggedIn,
        // stayLoggedIn: false, //change it to false b/c it was set to true when user logged in 
        foundLoggedIn:false,
    }


    const handleClick = () => {
        if (loggedIn.stayLoggedIn === false) dispatch(popupChanged("login")) //set the popupSelected to login so that it'll show the login popup
        dispatch(saveRecentLoggedIn(recentLoggedIn)) //set new values for recentLoggedIn
    }

    return (
        <li className = "list-group-item m-0 p-0">
        <button className = "list-group-item w-100 d-flex align-items-center"
                onClick = {handleClick}
        >
            {/* {rightBanner.ava()} */}
            <div className = "d-flex align-items-center justify-content-center"
            style = {{ width : "40px", height:"40px", borderRadius:"50%", background:"#8b8c89", color:"white"}}> 
            <strong>  {loggedIn.first_name[0]}{loggedIn.sur_name[0]} </strong> </div>
            <div className = "d-flex align-items-center">
            <h6 className = "px-3" style ={{marginTop: "8px"}}> {loggedIn.first_name} {loggedIn.sur_name} </h6>
            </div>
        </button>
    </li>
    )
}
export default function ComplementaryLogin() {
    //get Ids from loggedIns in the redux store
    const loggedInIds = useSelector(selectLoggedInIds)
    const renderListLoggedIn = loggedInIds.map((loggedInId, idx) => {
        return <LoggedInList key = {idx} id = {loggedInId} />
    })
    const dispatch = useDispatch()
    const handleSignup = () => {
        dispatch(popupChanged("signup"))
    }

    const handleRemove = () => {
        dispatch(removeAllLoggedIns())
    }
    const { recent_loggedIns_text, remove_all_text, create_account_text } = signupNLoginEn
    return (
        <>
        <div className ="ms-3 me-2">
            <div className = "mb-4 ">
                <strong className ="d-flex justify-content-center">{recent_loggedIns_text} </strong>
            </div>
            <ul className = "list-group">
                {renderListLoggedIn}
            </ul>
            <div className = "row complementary-login-segment-btns d-flex w-100" >
            <hr className = " d-flex mx-2 justify-content-center mt-3 mb-1" style = {{ margin:"auto", width: "-webkit-fill-available" }} />
            <div className = "col-6 ">
                <button className = "complementary-btns w-100 p-2" onClick = {handleRemove}>
                    <span className = "submit-btn-font"> {remove_all_text}</span>
                </button>
            </div>
            <div className = "col-6 ">
                <button className = "complementary-btns w-100 p-2" onClick = {handleSignup} >
                    <span className = "submit-btn-font">{create_account_text}</span>
                </button>
            </div>
            </div>
        </div>
        </>
    )
}