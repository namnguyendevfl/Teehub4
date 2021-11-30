import { colors } from "../../colors/colors"
import myFace from "./myFace.jpg"

export const rightBanner = {
    
    peopleToolTip :() => <svg xmlns="http://www.w3.org/2000/svg" 
            id = "contacts"
            width="23" height="23" className="ionicon" viewBox="0 0 512 512">
            <path
                id = "contacts" 
                d="M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z" 
            fill="black" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
            <path
                id = "contacts" 
                d="M336 304c-65.17 0-127.84 32.37-143.54 95.41-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z" 
                fill="black" stroke="white" 
                strokeMiterlimit="10" strokeWidth="32"/>
            <path d="M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z" 
                id = "contacts" 
                fill="black" stroke="white" 
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
            <path d="M206 306c-18.05-8.27-37.93-11.45-59-11.45-52 0-102.1 25.85-114.65 76.2-1.65 6.66 2.53 13.25 9.37 13.25H154" 
                id = "contacts" 
                fill="black" stroke="white" 
                strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32"/>
            </svg>,
    peopleFilled : () =>
            <svg xmlns="http://www.w3.org/2000/svg" 
            width="23" height="23" 
            id = "contacts"
            className="ionicon" viewBox="0 0 512 512">
            <path d="M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z" 
                id = "contacts"
                fill={colors.blue} stroke={colors.blue} 
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
            <path d="M336 304c-65.17 0-127.84 32.37-143.54 95.41-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z" 
                id = "contacts"
                fill={colors.blue} stroke={colors.blue} 
                strokeMiterlimit="10" strokeWidth="32"/>
            <path d="M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z" 
                id = "contacts"
                fill={colors.blue} stroke={colors.blue} 
                strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
            <path d="M206 306c-18.05-8.27-37.93-11.45-59-11.45-52 0-102.1 25.85-114.65 76.2-1.65 6.66 2.53 13.25 9.37 13.25H154" 
                id = "contacts"
                fill={colors.blue} stroke={colors.blue} 
                strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32"/>
            </svg>,
    people : () =>
            <svg xmlns="http://www.w3.org/2000/svg" 
                width="23" height="23" className="ionicon" 
                id = "contacts"
                // style = {{marginTop:"-3px"}}
                viewBox="0 0 512 512">
                <path
                    id = "contacts" 
                    d="M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z" 
                    fill="none" stroke={colors.iconStroke} 
                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                <path
                    id = "contacts" 
                    d="M336 304c-65.17 0-127.84 32.37-143.54 95.41-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z" 
                    fill="none" stroke={colors.iconStroke} 
                    strokeMiterlimit="10" strokeWidth="32"/>
                <path 
                    id = "contacts"
                    d="M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z" 
                    fill="none" stroke={colors.iconStroke} 
                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/>
                <path
                    id = "contacts" 
                    d="M206 306c-18.05-8.27-37.93-11.45-59-11.45-52 0-102.1 25.85-114.65 76.2-1.65 6.66 2.53 13.25 9.37 13.25H154" 
                    fill="none" stroke={colors.iconStroke} 
                    strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32"/>
            </svg>,
    TV : () =>
            <svg xmlns="http://www.w3.org/2000/svg" 
                width="23" height="23" 
                // style = {{marginTop:"-5px"}}
                id = "watch"
                className="ionicon" viewBox="0 0 512 512">
                <rect 
                    id = "watch"
                    x="32" y="96" width="448" height="272" rx="32.14" 
                    ry="32.14" 
                    fill="none" stroke={colors.iconStroke} 
                    strokeLinejoin="round" strokeWidth="32"/>
                <path 
                    id = "watch"
                    stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" 
                    strokeWidth="32" d="M128 416h256"/>
            </svg>,
    TVToolTip : () =>
        <svg xmlns="http://www.w3.org/2000/svg" 
            id = "watch"
            width="23" height="23" 
            className="ionicon" viewBox="0 0 512 512">
            <rect
                id = "watch" 
                x="32" y="96" width="448" height="272" rx="32.14" 
                ry="32.14" 
                fill="black" stroke="white" 
                strokeLinejoin="round" strokeWidth="32"/>
            <path 
                id = "watch"
                stroke="white" strokeLinecap="round" 
                strokeMiterlimit="10" 
                strokeWidth="32" d="M128 416h256"/>
        </svg>,
    TVFilled : () =>
        <svg xmlns="http://www.w3.org/2000/svg" 
            width="23" height="23" 
            className="ionicon" viewBox="0 0 512 512">
            <rect x="32" y="96" width="448" height="272" rx="32.14" 
                ry="32.14" 
                fill={colors.blue}  stroke={colors.blue}  
                strokeLinejoin="round" strokeWidth="32"/>
            <path 
                stroke={colors.blue} strokeLinecap="round" strokeMiterlimit="10" 
                strokeWidth="32" d="M128 416h256"/>
        </svg>,
    world : () => 
        <svg xmlns="http://www.w3.org/2000/svg"  
            fill={colors.iconStroke} 
            id = "connect"
            // style = {{marginTop:"-5px"}} 
            // width="23" height="22.5" 
            width="23" height="23" 
            className="bi bi-globe" 
            viewBox="0 0 16 16">
            <path
                id = "connect" 
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
        </svg>,
    worldFilled : () => 
        <svg xmlns="http://www.w3.org/2000/svg" 
            id = "connect"
            fill={colors.blue}
            // width="23.5" height="23" 
            width="23" height="23" 
            className="bi bi-globe" 
            viewBox="0 0 16 16">
            <path
                id = "connect" 
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
        </svg>,
    worldToolTip : () => 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
            fill="white"
            width="19" height="19" 
            className="bi bi-globe" 
            viewBox="0 0 16 16">
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
        </svg>,
    more : () => 
        <svg xmlns="http://www.w3.org/2000/svg" 
            id = "more"
            width="26" height="26" 
            fill="currentColor" 
            class="bi bi-list" viewBox="0 0 16 16">
            <path 
                id = "more"
                fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>,
    message : () =>
        <svg xmlns="http://www.w3.org/2000/svg" 
            width="24" height="24" viewBox="0 0 24 24"
            // style = {{marginTop:"-5px"}} 
            id = "messages"
            fill="none" stroke={colors.iconStroke} 
            strokeWidth="2" strokeLinecap="round" 
            strokeLinejoin="round" className="feather feather-message-square">
            <path
                id = "messages" 
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>,    
    messageFilled : () =>
        <svg xmlns="http://www.w3.org/2000/svg" 
            id = "messages"
            width="24" height="24" viewBox="0 0 24 24" 
            fill={colors.blue} stroke={colors.blue}
            strokeWidth="2" strokeLinecap="round" 
            strokeLinejoin="round" className="feather feather-message-square">
            <path 
                id = "messages"
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>,
    notification : () =>
        <svg xmlns="http://www.w3.org/2000/svg" 
            width="26" height="26"
            id = "notifications"  
            // style = {{marginTop:"-1px"}}
            className="ionicon" viewBox="0 0 512 512">
            <path d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16" 
                id = "notifications"  
                fill="none" stroke={colors.iconStroke} 
                strokeLinecap="round" strokeLinejoin="round" 
                strokeWidth="32"/>
        </svg>,
    notificationFilled : () =>
        <svg xmlns="http://www.w3.org/2000/svg" 
            id = "notifications"  
            width="26" height="26"  
            className="ionicon" viewBox="0 0 512 512">
            <path d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16" 
                id = "notifications"  
                fill={colors.blue}  stroke={colors.blue} 
                strokeLinecap="round" strokeLinejoin="round" 
                strokeWidth="32"/>
        </svg>,
    ava : () => 
    <img    src = {myFace} 
            style = {{ width : "35px", height:"35px", borderRadius:"50%"}} 
    />,
}
      





    
