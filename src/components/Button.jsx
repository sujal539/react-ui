import React from "react";
const Button = ({text, click, color, className}) => {
    return <button className={className} style={{background: color}} onClick={click}>{text}</button>
}

export default Button;