import { useNavigate } from "react-router";
import clsx from "clsx";
import Button from "../uikit/Button/Button";
import TrainOptions from "../TrainOptions/TrainOptions";
import type { Ticket } from "../../types/typeTicket";
import "./Train.css";
// icons
import OptionsIcons from "../../assets/icons/small/OptionsIcons";
import trainIcon from "../../assets/icons/big/train.svg";
import ArrowIconSmall from "../../assets/icons/small/ArrowIconSmall";
import TravelInfo from "../TravelInfo/TravelInfo";

interface TrainProps {
    className?: string;
    ticketInfo: Ticket;
    verifyStep?: boolean;
    verifyStepHandle?: () => void;
}

export default function Train({ className, ticketInfo, verifyStep = false, verifyStepHandle }: TrainProps) {
    const id = ticketInfo.departure._id;

    const navigate = useNavigate();

    const handleThen = () => {
        navigate(`seats/${id}`);
    }

    return (
        <div className={clsx("train", className)}>
            <div className="train__info">
                <div className="train__icon-wrapper">
                    <img className="train__icon" src={trainIcon} alt="" />
                </div>
                <p className="train__number">
                    {ticketInfo.departure.train.name}
                </p>
                <div className="train__directions">
                    <p className="train__city">
                        {/** Город из которого хочет отправится пассажир*/}
                        {ticketInfo.departure.from.city.name}
                        <ArrowIconSmall />
                    </p>
                    <p className="train__city">
                        {/**Город в который хочет отправится пассажир*/}
                        {ticketInfo.departure.to.city.name}
                    </p>
                </div>
            </div>

            <div className="train__travel-info-box">
                <TravelInfo
                    className="train__travel-info"
                    ticketInfo={ticketInfo}
                />
                {ticketInfo.arrival && 
                     <TravelInfo
                        className="train__travel-info"
                        ticketInfo={ticketInfo}
                        back={true}
                    />   
                }   
            </div>
            
            <div className="train__options">
                {ticketInfo.departure.have_fourth_class && (
                    <TrainOptions
                        coachClass={"Сидячий"}
                        seatsCount={ticketInfo.available_seats_info.fourth}
                        priceInfo={ticketInfo.departure.price_info.fourth}
                    />
                )}
                {ticketInfo.departure.have_third_class && (
                    <TrainOptions
                        coachClass={"Плацкарт"}
                        seatsCount={ticketInfo.available_seats_info.third}
                        priceInfo={ticketInfo.departure.price_info.third}
                    />
                )}
                {ticketInfo.departure.have_second_class && (
                    <TrainOptions
                        coachClass={"Купе"}
                        seatsCount={ticketInfo.available_seats_info.second}
                        priceInfo={ticketInfo.departure.price_info.second}
                    />
                )}
                {ticketInfo.departure.have_first_class && (
                    <TrainOptions
                        coachClass={"Люкс"}
                        seatsCount={ticketInfo.available_seats_info.first}
                        priceInfo={ticketInfo.departure.price_info.first}
                    />
                )}
            </div>

            <div className="train__grid-wrapper">
                <div className="train__options-icons">
                    <OptionsIcons />
                </div>
                {verifyStep ? 
                    (
                        <Button
                            className="train__button"
                            variant="light"
                            type="button"
                            onClick={verifyStepHandle}
                        >
                            Изменить
                        </Button>
                    ) : (
                        <Button
                            className="train__button"
                            variant="yellow"
                            type="button"
                            onClick={handleThen}
                        >
                            Выбрать места
                        </Button>
                    )
                }    
                    
            </div>
        </div>
    );
}
