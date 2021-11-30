const background = "#e9ecef"
const iconStroke =  "#6c757d"
const blue =  "#0d6efd"
const red =  "#d00000"

export const leftBanner = {
    home: () => <svg xmlns="http://www.w3.org/2000/svg" 
                    id = "home"
                    width="26" height="27" className="ionicon" viewBox="0 0 512 512">
                    <path d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212" 
                        id = "home"
                        fill="none" 
                        stroke={iconStroke} 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="32"/>
                    <path d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69" 
                        id = "home"
                        fill="none" 
                        stroke={iconStroke} 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="32"/>
                    </svg>,
    homeFilled: () => <svg xmlns="http://www.w3.org/2000/svg" 
                        id = "home"
                        width="26" height="27" className="ionicon" viewBox="0 0 512 512">
                    <path d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212" 
                        id = "home"
                        fill={blue}  
                        stroke={blue} 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="32"/>
                    <path d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69" 
                        id = "home"
                        fill={blue} 
                        stroke={blue} 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="32"/>
                    </svg>,
    dotCircle: () => <svg xmlns="http://www.w3.org/2000/svg" 
                        id = "focus"
                        height="29px" viewBox="0 0 24 24" width="29px" 
                        fill= {iconStroke} >
                        <path d="M0 0h24v24H0z" 
                            id = "focus"
                            fill="none"/>
                        <path 
                            id = "focus" 
                            d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
                    </svg>,
    dotCircleFilled: () => <svg xmlns="http://www.w3.org/2000/svg" 
                            height="29px" viewBox="0 0 24 24" width="29px" 
                            fill= {blue} 
                            id = "focus"
                            >   
                            <path d="M0 0h24v24H0z" 
                                id = "focus"
                                fill="none"/>
                            <path
                                id = "focus" 
                                d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z"/>
                        </svg>,
    coffee: () =>  <svg xmlns="http://www.w3.org/2000/svg" 
                        id = "social"
                        width="30" height="38" 
                        className="ionicon" 
                        viewBox="0 0 512 512">
                        <path 
                            id = "social"
                            fill="none" stroke={iconStroke}
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="28" d="M368 80h64a16 16 0 0116 16v34a46 46 0 01-46 46h-34M96 80h272v192a80 80 0 01-80 80H176a80 80 0 01-80-80V80h0zM64 416h336" />
                    </svg>,
    coffeeFilled: () => <svg xmlns="http://www.w3.org/2000/svg" 
                        id = "social"
                        width="30" height="38" 
                        className="ionicon" viewBox="0 0 512 512">
                        <path 
                            id = "social"
                            fill={blue} stroke={blue}
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="28" d="M368 80h64a16 16 0 0116 16v34a46 46 0 01-46 46h-34M96 80h272v192a80 80 0 01-80 80H176a80 80 0 01-80-80V80h0zM64 416h336" />
                        </svg>,
    journal: () =>   <svg xmlns="http://www.w3.org/2000/svg" 
                        id = "journal"
                        width="25" height="22" 
                        fill={iconStroke}
                        className="bi bi-journal" viewBox="0 0 16 16">
                        <path 
                            id = "journal"
                            d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                        <path   
                            id = "journal"
                            d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                    </svg>,
    journalFilled: () => <svg xmlns="http://www.w3.org/2000/svg" 
                        id = "journal"
                        width="25" height="22" 
                        fill={blue}
                        className="bi bi-journal" viewBox="0 0 16 16">
                        <path 
                            fill={blue}
                            id = "journal" 
                            d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                        <path 
                            fill={blue}
                            id = "journal" 
                            d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                    </svg>,
    timer: () =>  <svg xmlns="http://www.w3.org/2000/svg" 
                    id = "timer"
                    width="25" height="25" 
                    fill={iconStroke}
                    className="bi bi-stopwatch" viewBox="0 0 16 16">
                    <path   
                        id = "timer"
                        d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"/>
                    <path  
                        id = "timer"
                        d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"/>
                </svg>,
    timerFilled: () => <svg xmlns="http://www.w3.org/2000/svg" 
                    width="25" height="25" 
                    fill={blue}
                    className="bi bi-stopwatch" viewBox="0 0 16 16">
                    <path 
                        d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"/>
                    <path 
                        d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"/>
                </svg>,
    forwardArrow: () => <svg xmlns="http://www.w3.org/2000/svg" 
                    width="16" height="16" fill="#d00000" 
                    className="bi bi-arrow-right  d-flex " viewBox="0 0 16 16">
                    <path 
                        fill-rule="evenodd" 
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>,
    forwardArrowRed: () =>   <svg xmlns="http://www.w3.org/2000/svg" 
                        width="16" height="16" fill="#d00000" 
                        className="bi bi-arrow-right  d-flex " viewBox="0 0 16 16">
                        <path 
                            fill-rule="evenodd" 
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>,
    forwardArrowWhite: () => <svg xmlns="http://www.w3.org/2000/svg" 
                        width="18" height="16" 
                        className="bi bi-arrow-right forwardArrowSvgWhite " 
                        viewBox="0 0 16 16">
                        <path 
                            fill-rule="evenodd" 
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>,
    play: () =>     <svg xmlns="http://www.w3.org/2000/svg" 
                        width="32" height="32" 
                        fill={iconStroke} 
                        className="bi bi-play" viewBox="0 0 16 16">
                        <path 
                            d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                    </svg>,
    playFilled: () =>     <svg xmlns="http://www.w3.org/2000/svg" 
                    width="32" height="32" fill={blue}
                    className="bi bi-play" viewBox="0 0 16 16">
                    <path 
                        fill={blue}
                        d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                </svg>,
    pause: () =>  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="32" height="32" 
                    fill={iconStroke} 
                    className="bi bi-pause" 
                    viewBox="0 0 16 16">
                    <path 
                        d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                </svg>,
    pauseFilled: () =>     <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="32" height="32" fill={red}  
                    className="bi bi-pause" viewBox="0 0 16 16">
                <   path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                </svg>
}

