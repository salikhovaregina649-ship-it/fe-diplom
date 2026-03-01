import Aside from "../Aside/Aside";
import "./PaymentStep.css";

export default function PaymentStep() {
    return (
        <div className="payment-step">
            <div className="container">
                <div className="payment-step__aside-wrapper">
                    <Aside className="payment-step__aside">
                        aside
                    </Aside>
                </div>
                <div className="payment-step__main">

                </div>
            </div>
        </div>
    );
}