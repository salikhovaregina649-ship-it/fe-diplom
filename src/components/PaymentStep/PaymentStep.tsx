import { useNavigate } from "react-router";
import Aside from "../Aside/Aside";
import Button from "../uikit/Button/Button";
import TripDetails from "../TripDetails/TripDetails";
import FormPayment from "../FormPayment/FormPayment";
import "./PaymentStep.css";

export default function PaymentStep() {
    const navigate = useNavigate();

    const handleThen = () => {
        navigate("/booking/verify");
    };

    return (
        <div className="payment-step">
            <div className="container">
                <div className="payment-step__aside-wrapper">
                    <Aside className="payment-step__aside">
                        <TripDetails />
                    </Aside>
                </div>
                <div className="payment-step__main">
                    <FormPayment />

                    <Button
                        className="payment-step__then-btn "
                        type="button"
                        variant="yellow"
                        onClick={handleThen}
                        uppercase={true}
                    >
                        Купить билеты
                    </Button>
                </div>
            </div>
        </div>
    );
}