import { useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import Aside from "../Aside/Aside";
import Button from "../uikit/Button/Button";
import Passenger from "../Passenger/Passenger";
import "./PassengerStep.css";
import TripDetails from "../TripDetails/TripDetails";
import Title from "../uikit/Title/Title";

interface PassengerItem {
  id: string;
}

//Моки
const initialQuantityTickets = 3;

export default function PassengerStep() {
    const [passengers, setPassengers] = useState<PassengerItem[]>(
        Array.from({ length: initialQuantityTickets }, () => ({
            id: uuidv4(),
        }))
    );

    const navigate = useNavigate();

    const handleThen = () => {
        navigate("/booking/payment");
    };

    const removePassenger = (id: string) => {
        setPassengers(prev => prev.filter(p => p.id !== id));
    };

    const addPassenger = () => {
        setPassengers(prev => [...prev, { id: uuidv4() }]);
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
                    {passengers.map((passenger, index) => (
                        <Passenger 
                            key={passenger.id} 
                            className="passenger-step__passenger"
                            number={index + 1}
                            onDelete={() => removePassenger(passenger.id)}
                        />
                    ))}

                    <div className="passenger-step__append">
                        <Title as="h3" className="passenger-step__append-title">Добавить пассажира</Title>
                        <Button
                            className="passenger-step__append-btn"
                            type="button"
                            variant="light"
                            onClick={addPassenger}
                        >
                            <span />
                        </Button>
                    </div>
                    
                    <Button
                        className="passenger-step__then-btn"
                        type="button"
                        variant="yellow"
                        onClick={handleThen}
                        uppercase={true}
                    >
                        Далее
                    </Button>
                </div>
            </div>
        </div>
    );
}
