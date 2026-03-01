import { useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import Aside from "../Aside/Aside";
import Button from "../uikit/Button/Button";
import Passenger from "../Passenger/Passenger";
import "./PassengerStep.css";
import TripDetails from "../TripDetails/TripDetails";

//Моки
const initialQuantityTickets = 3;

export default function PassengerStep() {
    const [quantityTickets, setQuantityTickets] = useState(initialQuantityTickets);

    const navigate = useNavigate();

    const handleThen = () => {
        navigate("/booking/payment");
    };

    const removePassenger = () => {
        setQuantityTickets((prev) => Math.max(prev - 1, 0)); // уменьшаем на 1, но не меньше 0
    };

    const addPassenger = () => {
        setQuantityTickets((prev) => prev + 1);
    };

    return (
        <div className="passenger-step">
            <div className="container">
                <div className="passenger-step__aside-wrapper">
                    <Aside className="passenger-step__aside">
                        <TripDetails />
                    </Aside>
                </div>
                <div className="passenger-step__main">
                    {Array.from({ length: quantityTickets }, (_, index) => (
                        <Passenger 
                            key={uuidv4()} 
                            number={index + 1}
                            onDelete={removePassenger}
                        />
                    ))}

                    <div className="passenger-step__append">
                        <p className="passenger-step__append-text">Добавить пассажира</p>
                        <Button
                            className="passenger-step__append-btn"
                            type="button"
                            variant="light"
                            onClick={addPassenger}
                        >
                            + {/** или Иконка плюса*/}
                        </Button>
                    </div>
                    
                    <Button
                        className="passenger-step__then-btn"
                        type="button"
                        variant="yellow"
                        onClick={handleThen}
                    >
                        Далее
                    </Button>
                </div>
            </div>
        </div>
    );
}
