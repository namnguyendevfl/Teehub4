import React from "react";

export default function Errors({error}){
    return (
        error &&
        <div>
            Error: {error.message}
        </div>
        
    )
}