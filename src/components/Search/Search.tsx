import { useState } from "react";
import { useNavigate } from "react-router";
import clsx from "clsx";
import Button from "../uikit/Button/Button";
import CustomDatepicker from "../uikit/CustomDatepicker/CustomDatepicker";
import "./Search.css";
// icons
import GeolocationIcon from "../../assets/icons/small/GeolocationIcon";
import swapIcon from "../../assets/icons/small/swapIcon.svg";

interface SearchProps {
    className?: string;
}

export default function Search({ className }: SearchProps) {
    const [cityForth, setCityForth] = useState("");
    const [cityBack, setCityBack] = useState("");
    const [dateForth, setDateForth] = useState<Date | null>(null);
    const [dateBack, setDateBack] = useState<Date | null>(null);

    const currentYear = new Date().getFullYear();
    const maxDate = new Date(currentYear, 11, 31);
    const minDate = new Date()

    const navigate = useNavigate();
    const handle = () => {
        navigate("/booking");
    };

    const handleSwap = () => {
        setCityForth(cityBack);
        setCityBack(cityForth);
    };

    return (
        <form className={clsx("form-search", className)}>
            <div className="form-search__direction">
                <label className="form-search__label" htmlFor="cityForth">
                    Направление
                </label>
                <div className="form-search__input-wrapper form-search__wrapper--col-1">
                    <input
                        className="form-search__input"
                        id="cityForth"
                        type="text"
                        placeholder="Откуда"
                        value={cityForth}
                        onChange={(e) => setCityForth(e.target.value)}
                    />
                    <GeolocationIcon />
                </div>
                <button className="form-search__swap-btn" type="button" onClick={handleSwap}>
                    <img
                        className="form-search__swap-icon"
                        src={swapIcon}
                        alt="Обмен"
                    />
                </button>
                <div className="form-search__input-wrapper form-search__wrapper--col-2">
                    <input
                        className="form-search__input"
                        id="cityBack"
                        type="text"
                        placeholder="Куда"
                        value={cityBack}
                        onChange={(e) => setCityBack(e.target.value)}
                    />
                    <GeolocationIcon />
                </div>
            </div>
            <div className="form-search__date">
                <label className="form-search__label" htmlFor="dataForth">
                    Дата
                </label>
                <div className="form-search__input-wrapper form-search__wrapper--col-1">
                    <CustomDatepicker
                        value={dateForth}
                        onChange={setDateForth}
                        name="date-forth"
                        icon="big"
                        minDate={minDate}
                        maxDate={maxDate}
                        modifier="search"
                    />
                </div>
                <div className="form-search__input-wrapper form-search__wrapper--col-2">
                    <CustomDatepicker
                        value={dateBack}
                        onChange={setDateBack}
                        name="date-back"
                        icon="big"
                        minDate={minDate}
                        maxDate={maxDate}
                        modifier="search"
                    />
                </div>
            </div>
            <Button
                className="form-search__bnt"
                variant="yellow"
                uppercase={true}
                onClick={handle}
            >
                Найти билеты
            </Button>
        </form>
    );
}
