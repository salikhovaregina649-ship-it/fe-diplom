import { useRef, useEffect } from "react";
import type React from "react";
import clsx from "clsx";
import "./Collapse.css";

interface CollapseProps {
    isOpen: boolean;
    children: React.ReactNode;
    className?: string;
}

export default function Collapse({isOpen, children, className}: CollapseProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = contentRef.current;
        if(!el) return;

        if(isOpen) {
            el.style.maxHeight = el.scrollHeight + 'px';
        } else {
            el.style.maxHeight = el.scrollHeight + 'px';
            requestAnimationFrame(() => {
                el.style.maxHeight = '0px';
            });
        }
        console.log(isOpen);

    }, [isOpen]);

    return(
        <div className={clsx("collapse", className)} ref={contentRef}>
            {children}
        </div>
    )
}