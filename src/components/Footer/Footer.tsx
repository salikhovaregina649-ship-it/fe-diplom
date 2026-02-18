import FormSubscription from "../FormSubscription";
import "./Footer.css";

//icons
import phone from "../../assets/icons/phone.svg";
import mail from "../../assets/icons/mail.svg";
import skype from "../../assets/icons/skype.svg";
import geolocation from "../../assets/icons/geolocation.svg";
import youtube from "../../assets/icons/youtube.svg";
import linkedIn from "../../assets/icons/linkedIn.svg";
import googlePlus from "../../assets/icons/google-plus.svg";
import facebook from "../../assets/icons/facebook.svg";
import twitter from "../../assets/icons/twitter.svg";
import logo from "../../assets/icons/logo.svg";
import arrowTop from "../../assets/icons/btn__arrow-top.svg";

export default function Footer() {

    return (
        <footer className="footer">
            <div className="footer__content container">
                <div className="footer__contacts">
                    <h3 className="footer__title">Свяжитесь с нами</h3>
                    <ul className="footer__contacts-list">
                        <li className="footer__contacts-item">
                            <a className="footer__contacts-link" href="tel:88000000000">
                                <img className="footer__contacts-icon" src={phone} alt="Телефон" />
                                8 (800) 000 00 00
                            </a>
                        </li>
                        <li className="footer__contacts-item"> 
                            <a className="footer__contacts-link" href="mailto:inbox@mail.ru">
                                <img className="footer__contacts-icon" src={mail} alt="Почта" />
                                inbox@mail.ru
                            </a>
                        </li>
                        <li className="footer__contacts-item">
                            <a className="footer__contacts-link" href="skype:tu.train.tickets?chat">
                                <img className="footer__contacts-icon" src={skype} alt="Скайп" />
                                tu.train.tickets
                            </a>
                        </li>
                        <li className="footer__contacts-item">
                            <address className="footer__contacts-address">
                                <img className="footer__contacts-icon" src={geolocation} alt="Местоположение" />
                                г. Москва<br/>
                                ул. Московская<br/>
                                27-35 555 555
                            </address>
                        </li>
                    </ul>
                </div>
                <div className="footer__form">
                    <h3 className="footer__title">Подписка</h3>
                    <FormSubscription />
                </div>
                <div className="footer__subscription">
                    <h3 className="footer__title">Подписывайтесь на нас</h3>
                    <ul className="footer__subscription-list">
                        <li className="footer__subscription-item">
                            <a className="footer__subscription-link" href="https://youtube.com" target="_blank" rel="noopener">
                                <img className="footer__subscription-icon" src={youtube} alt="Youtube" />
                            </a>
                        </li>
                        <li className="footer__subscription-item">
                            <a className="footer__subscription-link" href="https://linkedin.com" target="_blank" rel="noopener">
                                <img className="footer__subscription-icon" src={linkedIn} alt="LinkedIn" />
                            </a>
                        </li>
                        <li className="footer__subscription-item">
                            <a className="footer__subscription-link" href="#" target="_blank" rel="noopener">
                                <img className="footer__subscription-icon" src={googlePlus} alt="Google+" />
                            </a>
                        </li>
                        <li className="footer__subscription-item">
                            <a className="footer__subscription-link" href="https://facebook.com" target="_blank" rel="noopener">
                                <img className="footer__subscription-icon" src={facebook} alt="Facebook" />
                            </a>
                        </li>
                        <li className="footer__subscription-item">
                            <a className="footer__subscription-link" href="https://twitter.com" target="_blank" rel="noopener">
                                <img className="footer__subscription-icon" src={twitter} alt="Twitter" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer__bottom">
                <img className="footer__logo" src={logo} alt="Лого" />
                <span className="footer__year">2018 WEB</span>
                <button className="footer__back-to-top" type="button">
                    <img className="footer__arrow-top" src={arrowTop} alt="Вверх"/>
                </button>
            </div>
        </footer>
    )
}