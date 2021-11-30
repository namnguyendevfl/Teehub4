import React, { useState } from "react";
import { rightBanner } from "../../../utils/icons/banner/rightBanner";

export default function RightBanner() {
    const [btnId, setBtnId] = useState ("")
    const [toolTipDisplay, setToolTipDisplay] = useState (false)
    const handleBtnClick = ({target}) => {
        setBtnId(() => target.id)
        if (target.id==="more") setToolTipDisplay(() => !toolTipDisplay)
        else setToolTipDisplay(() => false)
    }
    
    
    window.addEventListener("click",({target}) => {
        if ((target.id !== "more" && target.id !== "rightHeaderToolTip") && (toolTipDisplay))
            setToolTipDisplay(() => false)
    })
   
    return <>
    {/* add no wrap to ul */}
    <ul className ="nav flex-nowrap">
    <li className ="nav-item d-none d-xl-block m-0">

        {btnId === "contacts"
              ? <div className="toolTip buttonSm d-flex justify-content-center align-items-center border-white">
                    <button className = "buttonSm d-flex justify-content-center align-items-center border-white"
                        id = "contacts"
                        onClick = {handleBtnClick}
                        > 
                        {rightBanner.peopleFilled()}
                    </button>
                    <div className = 'barSmFilled'> </div>
                </div>             
              : <div className="toolTip d-flex justify-content-center align-items-center border-white">
                    <button className = "buttonSm d-flex justify-content-center align-items-center border-white"
                        id = "contacts"
                        onClick = {handleBtnClick}
                        > 
                        {rightBanner.people()}
                    </button>
                    <span className = "tooltiptext" > Contacts </span>
                </div>
            }
    </li>
    <li className ="nav-item d-none d-xl-block ms-1">
    {/* <li className ="nav-item d-none d-xl-block ms-3"> */}
    {btnId === "watch"
              ? <div className="toolTip buttonSm d-flex justify-content-center align-items-center border-white">
                    <button className = "buttonSm d-flex justify-content-center align-items-center border-white"
                        id = "watch"
                        onClick = {handleBtnClick}                   
                        > 
                    {rightBanner.TVFilled()}
                    </button>
                    <div className = 'barSmFilled'> </div>
                </div>            
                     
              : <div    className="toolTip d-flex justify-content-center align-items-center border-white"
                        >
                    <button className = "buttonSm d-flex justify-content-center align-items-center border-white"
                        id = "watch"
                        onClick = {handleBtnClick}  
                        > 
                    {rightBanner.TV()}
                    </button>
                    <span className = "tooltiptext" > Watch </span>
                </div>
            }
    </li>
    <li className ="nav-item d-lg-block d-none ms-0 ms-xl-1">
    {btnId === "connect"
              ? <div className="toolTip buttonSm d-flex justify-content-center align-items-center border-white"
                   >
                    <button className = "buttonSm d-flex justify-content-center align-items-center border-white"
                        id = "connect"
                        onClick = {handleBtnClick}
                        >   
                    {rightBanner.worldFilled()}                     
                    </button>
                    <div className = 'barSmFilled'> </div>
                </div>            
                     
              : <div className="toolTip d-flex justify-content-center align-items-center border-white">
                    <button className = "buttonSm p-0 d-flex justify-content-center align-items-center border-white" 
                        id = "connect"
                        onClick = {handleBtnClick}
                        >
                    {rightBanner.world()} 
                    </button>
                    <span className = "tooltiptext" > Connect </span>
                </div>
            }
    </li>
    <li className ="nav-item d-block ms-0 ms-lg-1">
    {btnId === "messages"
              ? <div className="toolTip buttonSm d-flex justify-content-center align-items-center border-white">
                    <button className = "buttonSm d-flex justify-content-center align-items-center border-white"
                        id = "messages"
                        onClick = {handleBtnClick}
                        > 
                    {rightBanner.messageFilled()}
                    </button>
                    <div className = 'barSmFilled'> </div>
                </div>            
                     
              : <div className="toolTip d-flex justify-content-center align-items-center border-white">
                    <button className = "buttonSm d-flex justify-content-center align-items-center border-white"
                        id = "messages"
                        onClick = {handleBtnClick}
                        > 
                    {rightBanner.message()}
                    </button>
                    <span className = "tooltiptext" > Messages </span>
                </div>
            }
    </li>
    <li className ="nav-item ms-0 ms-md-1">
    {btnId === "notifications"
              ? <div className="toolTip buttonSm d-flex justify-content-center align-items-center border-white">
                    <button className = "buttonSm d-flex justify-content-center align-items-center border-white"
                        id = "notifications"
                        onClick = {handleBtnClick}
                        >    
                    {rightBanner.notificationFilled()} 
                    </button>  
                    <div className = 'barSmFilled'> </div>
                </div>            
                     
              : <div className="toolTip d-flex justify-content-center align-items-center border-white">
                    <button className = "buttonSm d-flex justify-content-center align-items-center border-white"
                        id = "notifications"
                        onClick = {handleBtnClick}
                        > 
                    {rightBanner.notification()}
                    </button>
                    <span className = "tooltiptext" > Notifications </span>
                </div>
            }
    </li>
    {/* Create Tooltip for this one */}
    <li className ="nav-item d-xl-none d-block ms-1"> 
        <div className="toolTip">
              <button   type="button"
                        id = "more"
                        className = "buttonSm d-flex justify-content-center align-items-center border-white" 
                        onClick ={handleBtnClick}
                            > 
                {rightBanner.more()}
              </button>
            {/* if black&white box appears, then turn off this tooltiptext */}
            {!toolTipDisplay
            ?  <span className = "tooltiptext" style = {{left:"0.5px"}}> More </span>
            :   <> </>}
           
        </div>
    {/* Create Tooltip for this one , and add nowrap to make them horizontally*/}
        <div    id = "rightHeaderToolTip"
                className="toolTip">
            {/* set black&white box appears when the More btn is click */}
            {toolTipDisplay
            ? <ul   id = "rightHeaderToolTip"
                    className=" nav flex-nowrap d-flex toolTipBar toolTipRightBar">
                <li id = "rightHeaderToolTip"
                    className ="nav-item rightHeaderToolTip">
                    <button id = "rightHeaderToolTip"
                            className = "tooltipBtn d-flex justify-content-center align-items-center border-white"> 
                    {rightBanner.peopleToolTip()}    
                    </button>
                </li>
                <li  id = "rightHeaderToolTip"
                    className ="nav-item rightHeaderToolTip">
                    <button  id = "rightHeaderToolTip"
                            className = "tooltipBtn d-flex justify-content-center align-items-center border-white"> 
                    {rightBanner.TVToolTip()}
                    </button>
                </li>
                <li id = "rightHeaderToolTip"
                    className =" rightHeaderToolTip nav-item d-lg-none d-block d-flex justify-content-center align-items-center border-white">
                    <button id = "rightHeaderToolTip"
                            className = "tooltipBtn"> 
                    {rightBanner.worldToolTip()}
                    </button>
                </li>
               </ul>
            : <> </>}
        </div>    
    </li>
    {/* <li className ="nav-item ms-3 "> */}
    <li className ="nav-item ms-1 ">
        <button className = "Ava d-flex justify-content-center align-items-center border-white" > 
        {rightBanner.ava()}
        </button>
    </li>
    </ul>
    </>
}