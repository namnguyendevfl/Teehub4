export const duration = {
    secToMin: (givenSecs) => {
        const minutes = Math.floor (givenSecs / 60)
            .toString()
            .padStart(2, "0")
        const seconds = Math.round (givenSecs % 60)
            .toString()
            .padStart(2, "0");
        return `${minutes}:${seconds}`;
    },
    minToDuration: (givenMins) => {
        const minutes = Math.floor(givenMins).toString().padStart(2, "0");
        return `${minutes}:00`;
    } 
}