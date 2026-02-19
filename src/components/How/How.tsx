import "./How.css";
import Button from "../Button/Button";
import monitorIcon from "../../assets/icons/monitor.svg";
import officeIcon from "../../assets/icons/office.svg";
import internetIcon from "../../assets/icons/internet.svg";

export default function How() {
    return(
        <section className="how" id="how">
            <div className="container">
                <h2 className="how__title">Как это работает</h2>
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