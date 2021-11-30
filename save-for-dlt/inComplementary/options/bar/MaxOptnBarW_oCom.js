import React from "react";
import AdditnOptnsW_oCom from "./MinOptnBarW_oCom";
import BasicOptions from "./BasicOptions";
import { complementary } from "../../../../../utils/icons/complementary/Complementary";
import { main } from "../../../../../utils/icons/main/main";
import { useDispatch, useSelector } from "react-redux";
import { showComplementaryChanged, showFullOptionBarWithComHidedChanged, showNtbkSwitchTabsChanged } from "../../../complementariesSlice";

export default function MaxOptnBarW_oCom(props) {
    const {

        dropdown, 
        setDropdown, 
        option,
        setOption,
            
    } = props

    const dispatch = useDispatch()
    const { ntbks: { showFullOptionBarWithComHided } } = useSelector(state => state.complementaries)
    const handleMinimizeOptnBox = (e) =>  {
        // setDropdown(() => false)
        // setBtnStyle({display:"flex"})
        // minNtbkCom.saveMin(!maxOptionBox);
        // setMaxOptionBox(() => !maxOptionBox);
        dispatch(showNtbkSwitchTabsChanged(false))
        dispatch(showFullOptionBarWithComHidedChanged())
        const newStyle = {
            background:"none",
            width:"260px"
        }
        // setNtbkStyle(newStyle)
        // ntbkCom.saveStyle(newStyle)
    }
    const handleOpenCom = () => {
        // setBtnStyle({display:"none"})  
        // setDisplayCom(() => !displayCom);
        // setMaxOptionBox(() => false)
        // setDropdown(() => false)
        dispatch(showNtbkSwitchTabsChanged(true))
        dispatch(showComplementaryChanged())
        dispatch(showFullOptionBarWithComHidedChanged(false))
        const newStyle = {
            width: "inherit",
            backgroundColor: "#e9ecef", 
        }
        // setNtbkStyle(() => newStyle);
        // hideCom.saveHideCom(!displayCom);
        // minNtbkCom.saveMin(false);
        // ntbkCom.saveStyle(newStyle)
    }
    const maxOptionBox = false
    return ( 
            // maxOptionBox &&
            showFullOptionBarWithComHided &&
            <>
                <div className = "d-flex align-items-center justify-content-center">
                    <BasicOptions 
                        option = {option} 
                        setOption = {setOption}       
                        dropdown = {dropdown}
                        setDropdown = { setDropdown } 
                    />
                    <div className = "ms-1 ntbkBtn mt-1">
                        <button className = "p-0 ntbkBtn" onClick = {(e) => handleMinimizeOptnBox(e)} >
                            {complementary.boxArrowUpRight()}               
                        </button>
                    </div>
                    <div className = "mx-1 ntbkBtn mt-1" >   
                        <button className = "p-0 ntbkBtn"                               
                            onClick = {(e) => handleOpenCom(e)}
                        > 
                            {main.leftChevron()}
                        </button>
                    </div>
                </div>     
            </>
    )
}