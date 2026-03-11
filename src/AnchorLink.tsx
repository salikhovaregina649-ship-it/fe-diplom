import React from "react";
import { useNavigate, useLocation } from "react-router";

interface AnchorLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string; // Путь роута (например, "/")
    anchor: string; // ID элемента (например, "about")
    children: React.ReactNode; // Содержимое ссылки
}

export const AnchorLink: React.FC<AnchorLinkProps> = ({
    to,
    anchor,
    children,
    ...props
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (location.pathname === to) {
            const element = document.getElementById(anchor);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        } else {
            navigate(to, { state: { scrollTo: anchor } });
        }
    };

    return (
        <a href={`/${anchor}`} onClick={handleClick} {...props}>
            {children}
        </a>
    );
};
