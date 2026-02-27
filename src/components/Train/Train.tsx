import clsx from "clsx";
import Button from "../uikit/Button/Button";
import { formatTime, formatTimeCompact } from "../../utils/formatTime";
// icons
import OptionsIcons from "../../assets/icons/small/OptionsIcons";
import trainIcon from "../../assets/icons/big/train.svg";
import ArrowIconSmall from "../../assets/icons/small/ArrowIconSmall";
import ArrowIconBig from "../../assets/icons/small/ArrowIconBig";

import "./Train.css";
import type Train from "../../types/typeTrain";
import TrainOptions from "../TrainOptions/TrainOptions";

interface TrainProps {
    className?: number;
    trainInfo: Train;
}

export default function Train({ className, trainInfo }: TrainProps) {
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
                    {/** Город из которого отправляется поезд изначально
                     *  <p className=".train__city train__starting-city">
                     *      {Город}
                            <ArrowIconSmall />    
                        </p>
                    */}
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

            <div className="train__travel-info">
                <div className="train__travel-info-wrapper .travel-info-wrapper--forth">
                    <div className="train__travel-way">
                        <time
                            className="train__travel-time"
                            dateTime={new Date(
                                trainInfo.departure.from.datetime * 1000,
                            ).toISOString()}
                        >
                            {formatTime(trainInfo.departure.from.datetime)}
                        </time>
                        <p className="train__travel-city">
                            {trainInfo.departure.from.city.name}
                        </p>
                        <p className="train__travel-station">
                            {trainInfo.departure.from.railway_station_name}
                        </p>
                    </div>
                    <div className="train__time-way">
                        <time
                            className="train__time-way-time"
                            dateTime={new Date(
                                trainInfo.departure.duration * 1000,
                            ).toISOString()}
                        >
                            {formatTimeCompact(trainInfo.departure.duration)}
                        </time>
                        <ArrowIconBig />
                    </div>
                    <div className="train__travel-way">
                        <time
                            className="train__travel-time"
                            dateTime={new Date(
                                trainInfo.departure.to.datetime * 1000,
                            ).toISOString()}
                        >
                            {formatTime(trainInfo.departure.to.datetime)}
                        </time>
                        <p className="train__travel-city">
                            {trainInfo.departure.to.city.name}
                        </p>
                        <p className="train__travel-station">
                            {trainInfo.departure.to.railway_station_name}
                        </p>
                    </div>
                </div>
                {/**Этот же поезд, если едет в обратном направлении ???*/}
                <div className="train__travel-info-wrapper travel-info-wrapper--back">
                    <div className="train__travel-way">
                        <time
                            className="train__travel-time"
                            dateTime={new Date(
                                trainInfo.departure.from.datetime * 1000,
                            ).toISOString()}
                        >
                            {formatTime(trainInfo.departure.from.datetime)}
                        </time>
                        <p className="train__travel-city">
                            {trainInfo.departure.from.city.name}
                        </p>
                        <p className="train__travel-station">
                            {trainInfo.departure.from.railway_station_name}
                        </p>
                    </div>
                    <div className="train__time-way">
                        <time
                            className="train__time-way-time"
                            dateTime={new Date(
                                trainInfo.departure.duration * 1000,
                            ).toISOString()}
                        >
                            {formatTimeCompact(trainInfo.departure.duration)}
                        </time>
                        <ArrowIconBig />
                    </div>
                    <div className="train__travel-way">
                        <time
                            className="train__travel-time"
                            dateTime={new Date(
                                trainInfo.departure.to.datetime * 1000,
                            ).toISOString()}
                        >
                            {formatTime(trainInfo.departure.to.datetime)}
                        </time>
                        <p className="train__travel-city">
                            {trainInfo.departure.to.city.name}
                        </p>
                        <p className="train__travel-station">
                            {trainInfo.departure.to.railway_station_name}
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="train__options">
                {trainInfo.departure.have_fourth_class && (
                    <TrainOptions 
                        carClass={"Сидячий"}
                        seatsCount={trainInfo.available_seats_info.fourth}
                        priceInfo={trainInfo.departure.price_info.fourth}
                    />
                )}
                {trainInfo.departure.have_third_class && (
                    <TrainOptions 
                        carClass={"Плацкарт"}
                        seatsCount={trainInfo.available_seats_info.third}
                        priceInfo={trainInfo.departure.price_info.third}
                    />
                )}
                {trainInfo.departure.have_second_class && (
                    <TrainOptions 
                        carClass={"Купе"}
                        seatsCount={trainInfo.available_seats_info.second}
                        priceInfo={trainInfo.departure.price_info.second}
                    />
                )}
                {trainInfo.departure.have_first_class && (
                    <TrainOptions
                        carClass={"Люкс"}
                        seatsCount={trainInfo.available_seats_info.first}
                        priceInfo={trainInfo.departure.price_info.first}
                    />
                )}
            </div>

            <div className="train__grid-wrapper">
                <div className="train__options-icons">
                    <OptionsIcons />
                </div>
                <Button
                    className="train__button"
                    variant="yellow"
                    type="button"
                >
                    Выбрать места
                </Button>
            </div>
        </div>
    );
}
