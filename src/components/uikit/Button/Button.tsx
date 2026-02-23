import clsx from "clsx";
import React from "react";
import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;
    variant?: "yellow" | "light" | "transparent";
    uppercase?: boolean;
}

export default function Button({children, className, variant = "yellow", uppercase = false, ...props}: ButtonProps) {
    return(
        <button 
            className={
                clsx(
                    "button",
                    `button--${variant}`,
                    uppercase && "button--uppercase",
                    className
                )
            } 
            {...props}
        >
            {children}
        </button>
    )
}