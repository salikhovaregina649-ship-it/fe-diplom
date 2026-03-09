import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import "./Popover.css";

interface PopoverProps {
    className?: string;
    anchorRef: React.RefObject<HTMLElement | null>;
    trigger?: "hover" | "click" | "manual";
    isOpen?: boolean;
    children: React.ReactNode;
}

export default function Popover({
    className,
    anchorRef,
    trigger = "hover",
    isOpen: controlledOpen,
    children,
}: PopoverProps) {
    const popoverRef = useRef<HTMLDivElement>(null);

    const [internalOpen, setInternalOpen] = useState(false);

    const isOpen = trigger === "manual" ? controlledOpen : internalOpen;

    const [position, setPosition] = useState({ top: 0, left: 0 });

    const updatePosition = () => {
        if (!anchorRef.current || !popoverRef.current) return;

        const anchor = anchorRef.current.getBoundingClientRect();
        const pop = popoverRef.current.getBoundingClientRect();

        const left =
            anchor.left + anchor.width / 2 - pop.width / 2 + window.scrollX;
        const top = anchor.bottom + 8 + window.scrollY;

        setPosition({ top, left });
    };

    useEffect(() => {
        if (!isOpen) return;

        updatePosition();

        window.addEventListener("scroll", updatePosition);
        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("scroll", updatePosition);
            window.removeEventListener("resize", updatePosition);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!anchorRef.current || trigger === "manual") return;

        const el = anchorRef.current;

        if (trigger === "hover") {
            const enter = () => setInternalOpen(true);
            const leave = () => setInternalOpen(false);

            el.addEventListener("mouseenter", enter);
            el.addEventListener("mouseleave", leave);

            return () => {
                el.removeEventListener("mouseenter", enter);
                el.removeEventListener("mouseleave", leave);
            };
        }

        if (trigger === "click") {
            const click = () => setInternalOpen((v) => !v);

            el.addEventListener("click", click);

            return () => el.removeEventListener("click", click);
        }
    }, [trigger, anchorRef]);

    if (!isOpen) return null;

    return createPortal(
        <div
            ref={popoverRef}
            className={clsx("popover", className)}
            style={{
                position: "absolute",
                top: position.top,
                left: position.left,
            }}
        >
            {children}
        </div>,
        document.body,
    );
}
