import { formatDate, formatTime, formatTimeCompact } from "../../utils/formatTime";
import clsx from "clsx";
import type { Ticket, Departure } from "../../types/typeTicket";
import "./TravelInfo.css";
// icons
import ArrowIconBig from "../../assets/icons/small/ArrowIconBig";

interface TravelInfoProps {
    className?: string;
    ticketInfo: Ticket;
    back?: boolean; //Если Группа направлений
    tripDetails?: boolean; //только для TripDetails
}

export default function TravelInfo({ className, ticketInfo, back = false, tripDetails = false }: TravelInfoProps) {
    let info: Departure;

    if (back) {
        if (!ticketInfo.arrival) {
            return null;
        }
        info = ticketInfo.arrival;
    } else {
        info = ticketInfo.departure;
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
                                {formatDate(firstPoint.datetime)}
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
                            {formatDate((secondPoint.datetime))}
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
