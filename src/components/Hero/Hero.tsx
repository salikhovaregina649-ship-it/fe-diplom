import React from "react";
import clsx from "clsx";
import "./Hero.css";

interface HeroProps {
    children: React.ReactNode;
    className?: string;
}

export default function Hero({children, className}: HeroProps) {
    
    return(
        <div 
            className={
                clsx(
                    "hero",
                    className
                )
            }
        >
            {children}
        </div>
    )
}