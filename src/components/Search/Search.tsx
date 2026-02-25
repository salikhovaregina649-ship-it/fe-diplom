import "./Search.css";
import Button from "../uikit/Button/Button";
import { useNavigate } from "react-router";
import clsx from "clsx";

import GeolocationIcon from "../../assets/icons/small/GeolocationIcon";
import CalendarIcon from "../../assets/icons/small/CalendarIcon";
import swapIcon from "../../assets/icons/small/swapIcon.svg";
import InputDate from "../uikit/InputDate/InputDate";

interface SearchProps {
    className?: string;
}

export default function Search({className}: SearchProps) {

    const navigate = useNavigate();
    const handle = () => {
        navigate("/booking");
    }

    return (
        <form className={clsx("form-search", className)}>
            <div className="form-search__direction">
                <label className="form-search__label" htmlFor="cityForth">Направление</label>
                <div className="form-search__input-wrapper form-search__wrapper--col-1">
                    <input className="form-search__input" id="cityForth" type="text" placeholder="Откуда" />
                    <GeolocationIcon/>
                </div>   
                <button className="form-search__swap-btn">
                    <img className="form-search__swap-icon" src={swapIcon} alt="Обмен"/>
                </button>
                <div className="form-search__input-wrapper form-search__wrapper--col-2">
                    <input className="form-search__input" id="cityBack" type="text" placeholder="Куда" />
                    <GeolocationIcon/>
                </div>
            </div>
            <div className="form-search__date">
                <label className="form-search__label" htmlFor="dataForth">Дата</label>
                <div className="form-search__input-wrapper form-search__wrapper--col-1">
                    <InputDate className="form-search__input" id="dataForth" Icon={CalendarIcon} />
                </div>
                <div className="form-search__input-wrapper form-search__wrapper--col-2">
                    <InputDate className="form-search__input" id="dateBack" Icon={CalendarIcon} />
                </div>
            </div>
            <Button className="form-search__bnt" variant="yellow" uppercase={true} onClick={handle}>Найти билеты</Button>
        </form>
    );
}
