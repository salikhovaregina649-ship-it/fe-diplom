import "./Hero.css";
import React from "react";

interface HeroProps {
    children: React.ReactNode;
    className?: string;
}

export default function Hero({children, className = ""}: HeroProps) {
    
    return(
        <div className={`hero ${className ? `hero--${className}` : ""}`}>
            {children}
        </div>
    )
}