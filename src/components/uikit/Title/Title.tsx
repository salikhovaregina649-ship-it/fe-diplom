import React from "react";
import clsx from "clsx";
import "./Title.css";

interface TitleProps {
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
  className?: string;
  uppercase?: boolean;
  modifier?: string;
}

export default function Title({as: Tag = "h2", children, className, uppercase = false, modifier}: TitleProps) {
    return (
        <Tag 
            className={
                clsx(
                    "title", 
                    uppercase && "title--uppercase",
                    modifier && `title--${modifier}`,
                    className
                )
            }
        >
            {children}
        </Tag>
    )
}