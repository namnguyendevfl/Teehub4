import React, { useEffect } from "react"
import { colors } from "../../utils/colors/colors"
import { useNavigate } from "react-router"
import { recentUrl } from "../../features/accounts/login/loggedInsSlice"
import { useSelector } from "react-redux"
import Nav from "./nav/Nav"
import Banner from "./banner/Banner"
import Complementaries from "./complementaries/Complementaries"
import Main from "./main/Main"
import Footer from "./footer/Footer"
import Popups from "../popups"

export default function LoggedIn(props) {
    const { complementaries } = useSelector(state => state)
    const navigate = useNavigate();
    useEffect (() => {
        navigate(`${recentUrl.getUrl()}`)
    },[])
    const { popupSelected } = useSelector(state => state.layoutAlters)
    return (
        <div className = "loggedIn-layout" >
            <div className = "banner bg-white">
                <Banner />
            </div>
            <header className = "navigation col-2 pe-1">
                <Nav />
            </header>
            <main className = "main-bg row w-100 m-0 p-0">
                <div className = "col-2"> </div>
                <div className ="col ms-1 me-1 p-0">
                    <Main />
                </div>
                {
                complementaries.show &&
                <div className ="col-3"></div>
                } 
            </main>
            <div className = "complementary col-3 p-0">
                <Complementaries />
            </div>
            <Footer />
            {popupSelected && <Popups popup = { popupSelected }/>}
        </div>
    )
}