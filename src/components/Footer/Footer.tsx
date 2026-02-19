import FormSubscription from "../FormSubscription/FormSubscription";
import "./Footer.css";

//icons
import PhoneIcon from "../../assets/icons/contacts/PhoneIcon.tsx";
import EmailIcon from "../../assets/icons/contacts/EmailIcon.tsx";
import SkypeIcon from "../../assets/icons/contacts/SkypeIcon.tsx";
import GeolocationIcon from "../../assets/icons/contacts/GeolocationIcon.tsx";

import YoutubeIcon from "../../assets/icons/social/YoutubeIcon.tsx";
import LinkedInIcon from "../../assets/icons/social/LinkedInIcon.tsx";
import GooglePlusIcon from "../../assets/icons/social/GooglePlusIcon.tsx";
import FacebookIcon from "../../assets/icons/social/FacebookIcon.tsx";
import TwitterIcon from "../../assets/icons/social/TwitterIcon.tsx";

import Logo from "../../assets/icons/Logo.tsx";
import arrowTop from "../../assets/icons/btn__arrow-top.svg";

export default function Footer() {

    return (
        <footer className="footer">
            <div className="footer__content container">
                <div className="footer__grid">
                    <div className="footer__contacts" id="contacts">
                        <h3 className="footer__title">Свяжитесь с нами</h3>
                        <ul className="footer__contacts-list">
                            <li className="footer__contacts-item">
                                <a className="footer__contacts-link" href="tel:88000000000">
                                    <PhoneIcon />
                                    8 (800) 000 00 00
                                </a>
                            </li>
                            <li className="footer__contacts-item"> 
                                <a className="footer__contacts-link" href="mailto:inbox@mail.ru">
                                    <EmailIcon />
                                    inbox@mail.ru
                                </a>
                            </li>
                            <li className="footer__contacts-item">
                                <a className="footer__contacts-link" href="skype:tu.train.tickets?chat">
                                    <SkypeIcon />
                                    tu.train.tickets
                                </a>
                            </li>
                            <li className="footer__contacts-item">
                                <address className="footer__contacts-address">
                                    <GeolocationIcon />
                                    г. Москва<br/>
                                    ул. Московская 27-35<br/>
                                    555 555
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
                                    <YoutubeIcon />
                                </a>
                            </li>
                            <li className="footer__subscription-item">
                                <a className="footer__subscription-link" href="https://linkedin.com" target="_blank" rel="noopener">
                                    <LinkedInIcon />
                                </a>
                            </li>
                            <li className="footer__subscription-item">
                                <a className="footer__subscription-link" href="#" target="_blank" rel="noopener">
                                    <GooglePlusIcon />
                                </a>
                            </li>
                            <li className="footer__subscription-item">
                                <a className="footer__subscription-link" href="https://facebook.com" target="_blank" rel="noopener">
                                    <FacebookIcon />
                                </a>
                            </li>
                            <li className="footer__subscription-item">
                                <a className="footer__subscription-link" href="https://twitter.com" target="_blank" rel="noopener">
                                    <TwitterIcon />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                <div className="footer__row container">
                    <Logo />
                    <button className="footer__back-to-top" type="button">
                        <img className="footer__arrow-top" src={arrowTop} alt="Вверх"/>
                    </button>
                    <span className="footer__year">2018 WEB</span>
                </div>
            </div>
        </footer>
    )
}