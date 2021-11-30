import React, { useEffect } from "react"
import Nav from "../../features/nav/Nav"
import { colors } from "../client/src/utils/colors/colors"
import Banner from "../client/src/layout/loggedIn/banner/Banner"
import Complementary from "../../features/complementary/Complementary"
import Footer from "../client/src/layout/loggedIn/footer/Footer"
import Main from "../client/src/layout/loggedIn/main/Main"
import { useNavigate } from "react-router"
import { recentUrl } from "../client/src/features/accounts/login/loggedInsSlice"
import { useSelector } from "react-redux"


export default function LoggedIn(props) {
    const { loggedin 
    } = props
    const { complementaries } = useSelector(state => state)

    const navigate = useNavigate();
    useEffect (() => {
        if (loggedin)
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
        zIndex: "1",
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
        top: "80px",
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

    // const [ timerPopup, setTimerPopup ] = useState(null)
    return loggedin && 
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
                <Complementary />
            </div>
            <Footer />
        </div>
}