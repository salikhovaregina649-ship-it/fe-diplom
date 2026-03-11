import { useEffect } from "react";
import { useLocation } from "react-router";

interface RouterState {
    scrollTo?: string;
}

export const ScrollManager = () => {
    const location = useLocation();

    useEffect(() => {
        const state = location.state as RouterState | null;

        if (state?.scrollTo) {
            // если перешли по якорной ссылке
            const element = document.getElementById(state.scrollTo);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }, 50);
            }
        } else {
            // если это обычный переход на страницу
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }, [location]);

    return null;
};
