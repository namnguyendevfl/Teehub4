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
    const styleLoggedIn = {
        height: "100vh",
        background: colors.background
    }

    const styleBanner = {
        height: "60px",
        width: "100%",
        position: "fixed",
        background: "white",
        zIndex: "3",
        // border: "2px solid"
    }

    const styleNav = {
        top: "80px",
        bottom:"0",
        position:"fixed",
        overflowY:"scroll",
        overflowX:"hidden",
        zIndex: "1"
    }
    const styleMain = {
        top: "77px",
        bottom:"0",
        position:"absolute",
        // overflowY:"scroll",
        // overflowX:"hidden",
        // zIndex: "1"
    }
    const styleCom = {
        top: "90px",
        right: "0px",
        bottom:"0",
        position:"fixed",
        paddingRight: "8px"
    }

    const { popupSelected } = useSelector(state => state.layoutAlters)
    return (
        <div className = "" style = {styleLoggedIn}>
            <div className = "bg-white" style = {styleBanner}>
                <Banner />
            </div>
            <header className = "col-2 pe-1" style ={styleNav}>
                <Nav />
            </header>
            <main className = "row w-100 m-0 p-0" style = {styleMain}>
                <div className = "col-2"> </div>
                <div className ="col ms-1 me-1 p-0">
                    <Main />
                </div>
                {
                complementaries.show &&
                <div className ="col-3"></div>
                } 
            </main>
            <div className = "col-3 p-0" style = {styleCom}>
                <Complementaries />
            </div>
            <Footer />
            {popupSelected && <Popups popup = { popupSelected }/>}
        </div>
    )
}