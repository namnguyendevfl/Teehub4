import React from "react"
import { useDispatch } from "react-redux"
import { popupChanged } from "../../../../../layout/layoutAltersSlice"
import { complementary } from "../../../../../utils/icons/complementary/Complementary"

export default function More(){
    const dispatch = useDispatch()
    const handleEscape = ({target: {id}}) => {
        dispatch(popupChanged(false))
    }
    return (
    <>
    <div className="row d-flex text-aligns-center m-0 justify-content-center">    
        <div className = "col-2"></div>
        <h5 className = "my-3 col-8 text-center m-0">More</h5>  
        <div className = "col-2 m-0  d-flex align-items-center justify-content-end">
            <button className = "btn d-flex align-items-center p-2 " onClick = {handleEscape}>
                {complementary.escapeIcon()}
            </button>
        </div>
    </div>
    <hr className =" m-0 p-0"/>
 
    </>
    )
}