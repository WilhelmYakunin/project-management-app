import React, { MouseEventHandler } from "react"

const Button = ({style, text, onClick} : { style: string, text: string, onClick: MouseEventHandler }) => {
    return (
        <button className={style} type="button" onClick={onClick}>{text}</button>
    )
}

export default React.memo(Button)