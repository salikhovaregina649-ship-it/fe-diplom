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
    return (
        <>
            <div className="train__class">
                <p className="train__class-name">
                    {coachClass}
                </p>
                <p className="train__class-ticket-count">
                    {seatsCount}
                </p>
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
