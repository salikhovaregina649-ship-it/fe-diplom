import { useState } from "react";
import Collapse from "../uikit/Collapse/Collapse";
import Button from "../uikit/Button/Button";
import Title from "../uikit/Title/Title";
import clsx from "clsx";
import "./TripDetails.css";

import routesResponse from "../../mocks/routesResponse.json";
import SubtractIcon from "../../assets/icons/small/SubtractIcon";

const trainInfo = routesResponse.items[0];

export default function TripDetails() {
    const [openForth, setOpenForth] = useState(false);
    const [openBack, setOpenBack] = useState(false);

    return (
        <div className="trip-details">
            <Title className="trip-details__title" as="h3" uppercase={true}>
                Детали поездки
            </Title>
            <div className="trip-details__direction trip-details__direction--forth">
                <div
                    className={clsx(
                        "trip-details__direction-box",
                        openForth && "is-open",
                    )}
                >
                    <Title className="trip-details__direction-title" as="h3">
                        <SubtractIcon />
                        Туда
                    </Title>
                    <Button
                        className={clsx(
                            "trip-details__collapse-btn",
                            openForth && "active",
                        )}
                        variant="openner"
                        onClick={() => setOpenForth((prev) => !prev)}
                    />
                </div>
                <Collapse className="trip-details__collapse" isOpen={openForth}>
                    <div className="trip-details__collapse-box">

                    </div>
                    <div className="trip-details__collapse-box">

                    </div>
                </Collapse>
            </div>
            <div className="trip-details__direction trip-details__direction--back">
                <div
                    className={clsx(
                        "trip-details__direction-box",
                        openForth && "is-open",
                    )}
                >
                    <Title className="trip-details__direction-title" as="h3">
                        <SubtractIcon />
                        Обратно
                    </Title>
                    <Button
                        className={clsx(
                            "trip-details__collapse-btn",
                            openBack && "active",
                        )}
                        variant="openner"
                        onClick={() => setOpenBack((prev) => !prev)}
                    />
                </div>
                <Collapse className="trip-details__collapse" isOpen={openBack}>
                    <div className="trip-details__collapse-box">

                    </div>
                    <div className="trip-details__collapse-box">

                    </div>
                </Collapse>
            </div>
        </div>
    );
}
