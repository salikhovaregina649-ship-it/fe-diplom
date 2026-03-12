import { useRef } from "react";
import Popover from "../uikit/Popover/Popover";
import RubleIcon from "../../assets/icons/small/RubleIcon";
import "./TrainOptions.css";

interface PriceInfo {
    price?: number;
    top_price?: number;
    bottom_price?: number;
    side_price?: number;
}

interface TrainOptionsProps {
    coachClass: string;
    seatsCount?: number;
    priceInfo?: PriceInfo;
}

export default function TrainOptions({coachClass, seatsCount, priceInfo}: TrainOptionsProps) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <>
            <div className="train__class">
                <p className="train__class-name">
                    {coachClass}
                </p>
                <p className="train__class-ticket-count" ref={ref}>
                    {seatsCount}
                </p>
                {coachClass !== "Люкс" && coachClass !== "Сидячий" &&
                    <Popover 
                        className="train__class-ticket-count-popover"
                        anchorRef={ref}
                        trigger="hover"
                    >
                        <div>
                            <p>верхние</p>
                            {/*Вопрос!! Где взять кол-во свободных мест верхних и нижних, эти данных нет в ответе routes */}
                            <p className="train__class-ticket-count">44</p>
                            <p className="train__class-ticket-price">
                                <span>{priceInfo?.top_price}</span>
                                <RubleIcon />
                            </p>
                        </div>
                        <div>
                            <p>нижние</p>
                            <p className="train__class-ticket-count">44</p>
                            <p className="train__class-ticket-price">
                                <span>{priceInfo?.bottom_price}</span>
                                <RubleIcon />
                            </p>
                        </div>
                    </Popover>
                }
                <div className="train__class-ticket-price">
                    от <span>
                        {Math.min(
                            priceInfo && priceInfo.price ? priceInfo.price : Infinity,
                            priceInfo && priceInfo.top_price ? priceInfo.top_price : Infinity,
                            priceInfo && priceInfo.bottom_price ? priceInfo.bottom_price : Infinity,
                            priceInfo && priceInfo.side_price ? priceInfo.side_price : Infinity
                        )}    
                    </span> <RubleIcon />
                </div>
            </div>
        </>
    );
}
