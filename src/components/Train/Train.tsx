import { useNavigate } from "react-router";
import clsx from "clsx";
import Button from "../uikit/Button/Button";
import TrainOptions from "../TrainOptions/TrainOptions";
import type Train from "../../types/typeTrain";
import "./Train.css";
// icons
import OptionsIcons from "../../assets/icons/small/OptionsIcons";
import trainIcon from "../../assets/icons/big/train.svg";
import ArrowIconSmall from "../../assets/icons/small/ArrowIconSmall";
import TravelInfo from "../TravelInfo/TravelInfo";

interface TrainProps {
    className?: string;
    trainInfo: Train;
    verifyStep?: boolean;
    verifyStepHandle?: () => void;
}

export default function Train({ className, trainInfo, verifyStep = false, verifyStepHandle }: TrainProps) {
    const id = trainInfo.departure._id;

    const navigate = useNavigate();

    const handle = () => {
        navigate(`seats/${id}`);
    }

    return (
        <div className={clsx("train", className)}>
            <div className="train__info">
                <div className="train__icon-wrapper">
                    <img className="train__icon" src={trainIcon} alt="" />
                </div>
                <p className="train__number">
                    {trainInfo.departure.train.name}
                </p>
                <div className="train__directions">
                    <p className="train__city">
                        {/** Город из которого хочет отправится пассажир*/}
                        {trainInfo.departure.from.city.name}
                        <ArrowIconSmall />
                    </p>
                    <p className="train__city">
                        {/**Город в который хочет отправится пассажир*/}
                        {trainInfo.departure.to.city.name}
                    </p>
                </div>
            </div>

            <div className="train__travel-info-box">
                <TravelInfo
                    className="train__travel-info"
                    trainInfo={trainInfo}
                />
                {trainInfo.arrival && 
                     <TravelInfo
                        className="train__travel-info"
                        trainInfo={trainInfo}
                        back={true}
                    />   
                }   
            </div>
            
            <div className="train__options">
                {trainInfo.departure.have_fourth_class && (
                    <TrainOptions
                        coachClass={"Сидячий"}
                        seatsCount={trainInfo.available_seats_info.fourth}
                        priceInfo={trainInfo.departure.price_info.fourth}
                    />
                )}
                {trainInfo.departure.have_third_class && (
                    <TrainOptions
                        coachClass={"Плацкарт"}
                        seatsCount={trainInfo.available_seats_info.third}
                        priceInfo={trainInfo.departure.price_info.third}
                    />
                )}
                {trainInfo.departure.have_second_class && (
                    <TrainOptions
                        coachClass={"Купе"}
                        seatsCount={trainInfo.available_seats_info.second}
                        priceInfo={trainInfo.departure.price_info.second}
                    />
                )}
                {trainInfo.departure.have_first_class && (
                    <TrainOptions
                        coachClass={"Люкс"}
                        seatsCount={trainInfo.available_seats_info.first}
                        priceInfo={trainInfo.departure.price_info.first}
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
                            onClick={handle}
                        >
                            Выбрать места
                        </Button>
                    )
                }    
                    
            </div>
        </div>
    );
}
