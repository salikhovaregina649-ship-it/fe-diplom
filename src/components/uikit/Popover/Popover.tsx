import React, { useEffect, useRef, useState } from 'react';
import './Popover.css';
import clsx from 'clsx';

interface PopoverProps {
    className?: string;
    elementWithPopoverRef: React.RefObject<HTMLElement | null>;
    isOpen: boolean;
    children: React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({className, elementWithPopoverRef, isOpen, children}) => {
    const popoverRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({top: 0, left: 0});

    useEffect(() => {
        if (!isOpen || !elementWithPopoverRef.current || !popoverRef.current) return;

        const elementWithPopoverRect = elementWithPopoverRef.current.getBoundingClientRect();
        const popoverRect = popoverRef.current.getBoundingClientRect();

        const left = elementWithPopoverRect.left + elementWithPopoverRect.width / 2 - popoverRect.width / 2 + window.scrollX;

        const top = elementWithPopoverRect.bottom + 10 + window.scrollY;

        setPosition({ top, left });
    }, [isOpen, elementWithPopoverRef]);

    if (!isOpen) return null;

    return (
        <div
            ref={popoverRef}
            className={clsx("popover", className)}
            style={{
                top: position.top,
                left: position.left,
            }}
        >
            <div className="popover__content">{children}</div>
        </div>
    );
};

export default Popover;