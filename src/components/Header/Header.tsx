import "./Header.css"
import Logo from "../../assets/icons/Logo.tsx";
import { NavLink, useLocation } from "react-router";
import { AnchorLink } from "../../AnchorLink.tsx";

export default function Header () {
    const location = useLocation();

    return (
        <header className="header">
            <div className="container">
                <NavLink to="/" className="header__logo">
                    <Logo />
                </NavLink>
            </div>
            <nav className="header__navigation">
                <div className="container">
                    <ul className="header__list">
                        <li className="header__item">
                            <AnchorLink to="/" anchor="about" className="header__nav-link">О нас</AnchorLink>
                        </li>
                        <li className="header__item">
                            <AnchorLink to="/" anchor="how" className="header__nav-link">Как это работает</AnchorLink>
                        </li>
                        <li className="header__item">
                            <AnchorLink  to="/" anchor="reviews" className="header__nav-link">Отзывы</AnchorLink>
                        </li>
                        <li className="header__item">
                            <AnchorLink to={location.pathname} anchor="contacts" className="header__nav-link">Контакты</AnchorLink>
                        </li>
                    </ul>
                </div>
            </nav> 
        </header>
    )
}