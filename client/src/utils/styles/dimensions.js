import { useState} from "react";

export function GetHeight() {
    const [viewHeight, setViewHeight] = useState(window.innerHeight);
    const handleResize = () => setViewHeight(() => window.innerHeight)
    window.addEventListener('resize', handleResize);
    return  {viewHeight: viewHeight}
}

export function GetWidth() {
    const initialWidth = window.innerWidth
    const [viewWidth, setViewWidth] = useState(initialWidth);
    const handleResize = () => setViewWidth(() => window.innerWidth)
    window.addEventListener('resize', handleResize);
    return {viewWidth: viewWidth}
}
