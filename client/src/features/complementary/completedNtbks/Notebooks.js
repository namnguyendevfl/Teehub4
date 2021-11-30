import React from "react";
import { useSelector } from "react-redux";
import AdditnalOptnsWCom from "./bar/AdditnOptnsWCom";
import MaxOptnBarW_oCom from "./bar/MaxOptnBarW_oCom";
import MinOptnBarW_oCom from "./bar/MinOptnBarW_oCom";
import SCULDM from "./bar/SCULDM";
import NtbkNChapterList from "./NtbkNChapterList";

//SCULDM: search, create, update&list, deleted and more
const SCULDMBar = () => {
    const { show } = useSelector(state => state.complementaries)
    return <div className = "position-relative">
        {show
        ?   <div> 
                <div className = "d-flex align-items-center justify-content-center" >
                    <SCULDM  />    
                </div> 
                <AdditnalOptnsWCom />
            </div>    
        :   <>
                <MaxOptnBarW_oCom />
                <MinOptnBarW_oCom />
            </>
        }
    </div>
}

export default function Notebooks() {
    const { ntbks_chaps_topics: { showSwitchTabs } } = useSelector(state => state.complementaries)
    return (
    <>  
        <SCULDMBar />
        {
            showSwitchTabs &&
            <>
            <hr className = "p-0 m-0 mt-1"/>
            <NtbkNChapterList option = "ntbks" />
            <NtbkNChapterList option = "chapters" />
            </>         
        }
    </>
    )     
}