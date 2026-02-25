import type React from "react";
import clsx from "clsx";
import "./Aside.css";


interface AsideProps {
    className?: string;
    children: React.ReactNode;
}

export default function Aside({className, children}: AsideProps) {
    return(
        <div className={clsx("aside", className)}>
            {children}
        </div>
    )
}