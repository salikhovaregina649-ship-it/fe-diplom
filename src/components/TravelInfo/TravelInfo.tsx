import { formatDate, formatTime, formatTimeCompact } from "../../utils/formatTime";
import clsx from "clsx";
import type Train from "../../types/typeTrain";
import type { Departure } from "../../types/typeTrain";
import "./TravelInfo.css";
// icons
import ArrowIconBig from "../../assets/icons/small/ArrowIconBig";

interface TravelInfoProps {
    className?: string;
    trainInfo: Train;
    back?: boolean; //Если Группа направлений
    tripDetails?: boolean; //только для TripDetails
}

//Моки
const dates = {
    dateStart : "2018-08-30", 
    dateEnd: "2018-09-09",
}

export default function TravelInfo({ className, trainInfo, back = false, tripDetails = false }: TravelInfoProps) {
    let info: Departure;

    if (back) {
        if (!trainInfo.arrival) {
            return null;
        }
        info = trainInfo.arrival;
    } else {
        info = trainInfo.departure;
    }

    const firstPoint = back ? info.to : info.from;
    const secondPoint = back ? info.from : info.to;

    return (
            <div className={clsx("travel-info", back && "travel-info--back", className)}>
                <div className="travel-info__way">
                    <div className="travel-info__way-box">
                        <time
                            className="travel-info__time"
                            dateTime={new Date(
                                firstPoint.datetime * 1000,
                            ).toISOString()}
                        >
                            {formatTime(firstPoint.datetime)}
                        </time>
                        {tripDetails &&
                            <p className="travel-info__date">
                                {formatDate((dates.dateStart))}
                            </p>
                        }
                        <p className="travel-info__city">
                            {firstPoint.city.name}
                        </p>
                        <p className="travel-info__station">
                            {firstPoint.railway_station_name} вокзал
                        </p>
                    </div>
                    <div className={clsx("travel-info__way-box", "travel-info__time-way")}>
                        <time
                            className="travel-info__time-way-time"
                            dateTime={new Date(
                                info.duration * 1000,
                            ).toISOString()}
                        >
                            {formatTimeCompact(info.duration)}
                        </time>
                        <ArrowIconBig />
                    </div>
                </div>
                <div className="travel-info__way">
                    <time
                        className="travel-info__time"
                        dateTime={new Date(
                            secondPoint.datetime * 1000,
                        ).toISOString()}
                    >
                        {formatTime(secondPoint.datetime)}
                    </time>
                    {tripDetails &&
                        <p className="travel-info__date">
                            {formatDate((dates.dateEnd))}
                        </p>
                    }    
                    <p className="travel-info__city">
                        {secondPoint.city.name}
                    </p>
                    <p className="travel-info__station">
                        {secondPoint.railway_station_name} вокзал
                    </p>
                </div>
            </div>
    );
}
