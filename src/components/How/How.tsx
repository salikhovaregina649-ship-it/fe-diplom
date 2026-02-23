import Button from "../uikit/Button/Button";
import Title from "../uikit/Title/Title";
import "./How.css";

//icons
import monitorIcon from "../../assets/icons/big/monitor.svg";
import officeIcon from "../../assets/icons/big/office.svg";
import internetIcon from "../../assets/icons/big/internet.svg";

export default function How() {
    return(
        <section className="how" id="how">
            <div className="container">
                <Title as="h2" className="how__title" uppercase={true}>Как это работает</Title>
                <ul className="how__list">
                    <li className="how__item">
                        <img className="how__item-icon" src={monitorIcon} alt="" />
                        Удобный заказ на сайте
                    </li>
                    <li className="how__item">
                        <img className="how__item-icon" src={officeIcon} alt="" />
                        Нет необходимости ехать в офис
                    </li>
                    <li className="how__item">
                        <img className="how__item-icon" src={internetIcon} alt="" />
                        Огромный выбор направлений
                    </li>
                </ul>
                <Button className="how__btn" variant="transparent" type="button">
                    Узнать больше
                </Button>
            </div>
        </section>
    )
}