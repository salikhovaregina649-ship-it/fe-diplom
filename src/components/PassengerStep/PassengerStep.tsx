import Aside from "../Aside/Aside";
import "./PassengerStep.css";

export default function PassengerStep() {
    return (
        <div className="passenger-step">
            <div className="container">
                <div className="passenger-step__aside-wrapper">
                    <Aside className="passenger-step__aside">
                        aside
                    </Aside>
                </div>
                <div className="passenger-step__main">

                </div>
            </div>
        </div>
    );
}