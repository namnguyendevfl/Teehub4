export const elementFocused = {
    focus :(id) => {
        const box = document.querySelector(`#${id}`)
        if (box) return (
            box.style.border = "1px solid blue",
            box.style.boxShadow = "0px 0px 2px 0.1px blue"
        )
    },
    unFocus: (id) => {
        const box = document.querySelector(`#${id}`)
        if (box) return (
            box.style.border = "1px solid #adb5bd",
            box.style.boxShadow = "none"
        )
    },
    error :(id) => {
        const box = document.querySelector(`#${id}`)
        if (box) return (
            box.style.border = "1px solid red",
            box.style.boxShadow = "0px 0px 2px 0.1px red"
        )
    },
}