import { formatTime, formatTimeCompact } from "../../utils/formatTime";
import clsx from "clsx";
import type Train from "../../types/typeTrain";
import "./TravelInfo.css";
// icons
import ArrowIconBig from "../../assets/icons/small/ArrowIconBig";

interface TravelInfoProps {
    className?: string;
    trainInfo: Train;
    back?: boolean; //Если Группа направлений
}

export default function TravelInfo({ className, trainInfo, back = false }: TravelInfoProps) {
    let info;

    if (back) {
       info =  trainInfo.arrival;
    } else {
        info = trainInfo.departure;
    }

    return (
            <div className={clsx("travel-info", back && ".travel-info--back", className)}>
                <div className="travel-info__way">
                    <time
                        className="travel-info__time"
                        dateTime={new Date(
                            info.from.datetime * 1000,
                        ).toISOString()}
                    >
                        {formatTime(info.from.datetime)}
                    </time>
                    <p className="travel-info__city">
                        {info.from.city.name}
                    </p>
                    <p className="travel-info__station">
                        {info.from.railway_station_name}
                    </p>
                </div>
                <div className="travel-info__time-way">
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
                <div className="travel-info__way">
                    <time
                        className="travel-info__time"
                        dateTime={new Date(
                            info.to.datetime * 1000,
                        ).toISOString()}
                    >
                        {formatTime(info.to.datetime)}
                    </time>
                    <p className="travel-info__city">
                        {info.to.city.name}
                    </p>
                    <p className="travel-info__station">
                        {info.to.railway_station_name}
                    </p>
                </div>
            </div>
    );
}
