import React from "react";
export const SearchIcon = () => 
    <svg 
        id = "search"
        xmlns="http://www.w3.org/2000/svg" 
        width="16" height="16" fill="#6c757d" 
        className="bi bi-search" viewBox="0 0 16 16">
        <path id="search"
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
    </svg>

export default function SearchBox () {
    const handleClick = ({target}) => {
        const box = target.parentNode
        box.style.boxShadow = "0px 0px 2px 0.1px blue"
        box.style.border = "1px solid blue"
    }
    window.addEventListener("click",({target}) => {
        const box = document.querySelector(".searchBox")
        if (target.id !== "search"){
            if (box) {
            box.style.boxShadow = "none"
            box.style.border = "1px solid black"
            }
        }
    })  
    return <>
    <div   
            className = " col d-flex justify-content-between align-items-center searchBox w-100 px-3"
            >
        <SearchIcon />
        <input  type = "text"  
                className = "searchInput ps-2"
                id = "search"
                placeholder = "Search"
                style ={{width:"100%"}}
                        //   onChange = {handleSearch}
                          onClick = {handleClick}
        ></input>
    </div>
    </>
}