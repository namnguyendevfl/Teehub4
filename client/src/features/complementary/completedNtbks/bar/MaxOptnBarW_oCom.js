import React from "react";
import { complementary } from "../../../../utils/icons/complementary/Complementary";
import { main } from "../../../../utils/icons/main/main";
import { useDispatch, useSelector } from "react-redux";
import { showComplementaryChanged, showFullOptionBarWithComHidedChanged, showSwitchTabsChanged } from "../../../../layout/loggedIn/complementaries/complementariesSlice";
import SCULDM from "./SCULDM";

export default function MaxOptnBarW_oCom(props) {
    const dispatch = useDispatch()
    const { ntbks_chaps_topics: { showFullOptionBarWithComHided } } = useSelector(state => state.complementaries)
    const handleMinimizeOptnBox = (e) =>  {
        // setBtnStyle({display:"flex"})
        dispatch(showSwitchTabsChanged(false))
        dispatch(showFullOptionBarWithComHidedChanged())
        const newStyle = {
            background:"none",
            width:"260px"
        }
        // setNtbkStyle(newStyle)
    }
    const handleOpenCom = () => {
        // setBtnStyle({display:"none"})  
        dispatch(showSwitchTabsChanged(true))
        dispatch(showComplementaryChanged())
        dispatch(showFullOptionBarWithComHidedChanged(false))
        const newStyle = {
            width: "inherit",
            backgroundColor: "#e9ecef", 
        }
        // setNtbkStyle(() => newStyle);
    }
    return ( 
            showFullOptionBarWithComHided &&
            <>
                <div className = "d-flex align-items-center justify-content-center">
                    <SCULDM /> 
                    <div className = "ms-1 ntbkBtn mt-1">
                        <button className = "p-0 ntbkBtn" onClick = {handleMinimizeOptnBox} >
                            {complementary.boxArrowUpRight()}               
                        </button>
                    </div>
                    <div className = "mx-1 ntbkBtn mt-1" >   
                        <button className = "p-0 ntbkBtn"                               
                            onClick = { handleOpenCom}
                        > 
                            {main.leftChevron()}
                        </button>
                    </div>
                </div>     
            </>
    )
}