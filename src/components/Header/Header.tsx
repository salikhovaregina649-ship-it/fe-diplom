import "./Header.css"
import Logo from "../../assets/icons/Logo.tsx";
import { NavLink } from "react-router";

export default function Header () {

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
                            <NavLink to="/#about" className="header__nav-link">О нас</NavLink> {/**сначала на главную страницу, потом к якорю */}
                        </li>
                        <li className="header__item">
                            <NavLink to="/#how" className="header__nav-link">Как это работает</NavLink>
                        </li>
                        <li className="header__item">
                            <NavLink to="/#reviews" className="header__nav-link">Отзывы</NavLink>
                        </li>
                        <li className="header__item">
                            <NavLink to="/#contacts" className="header__nav-link">Контакты</NavLink> {/**футер есть везде, поэтом удолжен быть просто сколл к нему */}
                        </li>
                    </ul>
                </div>
            </nav> 
        </header>
    )
}