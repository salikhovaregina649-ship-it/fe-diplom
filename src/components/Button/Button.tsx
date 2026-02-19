import "./Button.css";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;
    variant?: "yellow" | "light" | "transparent";
    uppercase?: true | false;
}

export default function Button({children, className, variant = "yellow", uppercase = false, ...props}: ButtonProps) {
    return(
        <button className={`button button--${variant} ${className ?? ""} ${uppercase ? "button--uppercase" : ""}`} {...props}>
            {children}
        </button>
    )
}