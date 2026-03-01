// import { useRef, useState } from "react";
// import Popover from "../components/uikit/Popover/Popover";
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
    // const elementWithPopoverRef = useRef<HTMLButtonElement>(null);
    // const [activePopover, setActivePopover] = useState<null | number>(null);
    return (
        <>
            {/**.map c классами*/}
            <div className="train__class">
                <p className="train__class-name">
                    {coachClass}
                </p>
                <p className="train__class-ticket-count">
                    {seatsCount}
                </p>

                {/** Вопрос!! В ответе нет информации о верхних и нижних местах */}
                {/*<button
                    className="train__class-ticket-count"
                    type="button"
                    ref={elementWithPopoverRef}
                    onClick={() =>
                        setActivePopover(activePopover === 1 ? null : 1)
                    }
                >
                    88
                </button>
                <Popover 
                    className="train__class-ticket-count-popover"
                    elementWithPopoverRef={elementWithPopoverRef}
                    isOpen={activePopover === 1}
                >
                    <div>
                        <p>верхние</p>
                        <p>44</p>
                        <div className="train__class-ticket-price">
                            <span>1920</span> <RubleIcon />
                        </div>
                    </div>
                    <div>
                        <p>нижние</p>
                        <p>44</p>
                        <div className="train__class-ticket-price">
                            <span>2920</span> <RubleIcon />
                        </div>
                    </div>
                </Popover> */}
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
