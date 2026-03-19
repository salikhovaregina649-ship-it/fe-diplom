import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import Button from "../uikit/Button/Button";
import CustomDatepicker from "../uikit/CustomDatepicker/CustomDatepicker";
import { setFromValue, setToValue, setFromCity, setToCity, setDateForth, setDateBack, swapCities } from "../../store/searchSlice/searchSlice";
import { useGetCitiesQuery } from "../../store/api/api";
import type { RootState } from "../../store/store";
import "./Search.css";
// icons
import GeolocationIcon from "../../assets/icons/small/GeolocationIcon";
import swapIcon from "../../assets/icons/small/swapIcon.svg";

interface SearchProps {
    className?: string;
}

export default function Search({ className }: SearchProps) {
    const dispatch = useDispatch();
    const { from, to, dateForth, dateBack } = useSelector((state: RootState) => state.search);

    const currentYear = new Date().getFullYear();
    const maxDate = new Date(currentYear, 11, 31);
    const minDate = new Date();

    const navigate = useNavigate();
    const handleSearch = () => {
        if (!from.selectedCity || !to.selectedCity) {
            return
        }

        navigate("/booking");
    };

    const handleSwap = () => {
        dispatch(swapCities());
    };

    //список городов
    const [debouncedValues, setDebouncedValues] = useState({
        from: from.value,
        to: to.value,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValues({
            from: from.value,
            to: to.value,
            });
        }, 300);

        return () => clearTimeout(timer);
    }, [from.value, to.value]);

    const { data: fromCities } = useGetCitiesQuery(debouncedValues.from || "а", {
        skip: false,
    });

    const { data: toCities } = useGetCitiesQuery(debouncedValues.to || "а", {
        skip: false,
    });

    const [fromFocused, setFromFocused] = useState(false);
    const [toFocused, setToFocused] = useState(false);
    const fromInputRef = useRef<HTMLInputElement>(null);
    const toInputRef = useRef<HTMLInputElement>(null);

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
                        ref={fromInputRef}
                        value={from.value}
                        onChange={(e) => dispatch(setFromValue(e.target.value))}
                        onFocus={() => setFromFocused(true)}
                        onBlur={() => setFromFocused(false)}
                        autoComplete="off"
                        required
                    />
                    <GeolocationIcon />
                    {fromFocused && fromCities && fromCities.length > 0 && (
                        <ul className="form-search__autocomplete-list">
                            {fromCities.map((city) => (
                                <li
                                    key={city._id}
                                    className="form-search__autocomplete-item"
                                    onMouseDown={(e) => { 
                                        e.preventDefault(); 
                                        dispatch(setFromCity(city));
                                        fromInputRef.current?.blur();
                                    }}
                                >
                                    {city.name}
                                </li>
                            ))}
                        </ul>
                    )}
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
                        ref={toInputRef}
                        value={to.value}
                        onChange={(e) => dispatch(setToValue(e.target.value))}
                        onFocus={() => setToFocused(true)}
                        onBlur={() => setToFocused(false)}
                        autoComplete="off"
                        required
                    />
                    <GeolocationIcon />
                    {toFocused && toCities && toCities.length > 0 && (
                        <ul className="form-search__autocomplete-list">
                            {toCities.map((city) => (
                                <li
                                    key={city._id}
                                    className="form-search__autocomplete-item"
                                    onMouseDown={(e) => { 
                                        e.preventDefault(); 
                                        dispatch(setToCity(city));
                                        toInputRef.current?.blur();
                                    }}
                                >
                                    {city.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="form-search__date">
                <label className="form-search__label" htmlFor="dataForth">
                    Дата
                </label>
                <div className="form-search__input-wrapper form-search__wrapper--col-1">
                    <CustomDatepicker
                        value={dateForth}
                        onChange={(date) => dispatch(setDateForth(date))}
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
                        onChange={(date) => dispatch(setDateBack(date))}
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
                onClick={handleSearch}
            >
                Найти билеты
            </Button>
        </form>
    );
}
