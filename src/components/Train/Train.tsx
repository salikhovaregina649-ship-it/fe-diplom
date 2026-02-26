import { useRef, useState } from "react";
import Popover from "../uikit/Popover/Popover";
import Button from "../uikit/Button/Button";
import OptionsIcons from "../../assets/icons/small/OptionsIcons";
import RubleIcon from "../../assets/icons/small/RubleIcon";
import trainIcon from "../../assets/icons/big/train.svg";
import clsx from "clsx";
import "./Train.css";

const train = [
    {

    },
];

interface TrainProps {
    className?: string;
}

export default function Train({className}: TrainProps) {
    const elementWithPopoverRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div className={clsx("train", className)}>
            <div className="train__info">
                <img className="train__icon" src={trainIcon} alt="" />
                <p className="train__number">116С</p>
                <div className="train__directions">
                    <p className="train__starting-city">Адлер</p>
                    <p className="train__city">Москва</p>
                    <p className="train__city">Санкт-Петербург</p>
                </div>
            </div>
            <div className="train__travel-info train__travel-info--forth">
                <div className="train__way">
                    <time className="train__travel-time" dateTime="00:10">00:10</time>
                    <p className="train__travel-city">Москва</p>
                    <p className="train__travel-station">Курский вокзал</p>
                </div>
                <div className="train__time-way">
                    <time className="train__time-way-time" dateTime="09:42">9 : 42</time>
                    {/**добавить icon стрелки туда*/}
                </div>
                <div className="train__way">
                    <time className="train__travel-time" dateTime="09:52">09:52</time>
                    <p className="train__travel-city">Санкт-Петербург</p>
                    <p className="train__travel-station">Ладожский вокзал</p>
                </div>
            </div>
            {/**Существует если туда и обратно*/}
            <div className="train__travel-info train__travel-info--forth">
                <div className="train__way">
                    <time className="train__travel-time" dateTime="00:10">00:10</time>
                    <p className="train__travel-city">Москва</p>
                    <p className="train__travel-station">Курский вокзал</p>
                </div>
                <div className="train__time-way">
                    <time className="train__time-way-time" dateTime="09:42">9 : 42</time>
                    {/**добавить icon стрелки обратно*/}
                </div>
                <div className="train__way">
                    <time className="train__travel-time" dateTime="09:52">09:52</time>
                    <p className="train__travel-city">Санкт-Петербург</p>
                    <p className="train__travel-station">Ладожский вокзал</p>
                </div>
            </div>

            <div className="train__options">
                {/**.map c классами*/}
                <div className="train__class">
                    <p className="train__class-name">Сидячий</p>
                    <button
                        className="train__class-ticket-count"
                        type="button"
                        ref={elementWithPopoverRef}
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        88
                    </button>
                    <Popover className="train__class-ticket-count-popover" elementWithPopoverRef={elementWithPopoverRef} isOpen={isOpen}>
                        <div>
                            <p>верхние</p>
                            <p>44</p>
                            <div className="train__class-ticket-price">
                                от <span>1920</span> <RubleIcon />
                            </div>
                        </div>
                        <div>
                            <p>нижние</p>
                            <p>44</p>
                            <div className="train__class-ticket-price">
                                от <span>2920</span> <RubleIcon />
                            </div>
                        </div>
                    </Popover>
                    <div className="train__class-ticket-price">
                        от <span>1920</span> <RubleIcon />
                    </div>
                </div>
                <div className="train__options-icons">
                    <OptionsIcons />
                </div>
            </div>

            <Button
                className="train__button"
                variant="yellow"
                type="button"
            >
                Выбрать места
            </Button>
        </div>
    )
}