import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Aside from "../Aside/Aside";
import Button from "../uikit/Button/Button";
import TripDetails from "../TripDetails/TripDetails";
import FormPayment from "../FormPayment/FormPayment";
import { useGetRoutesQuery } from "../../store/api/api";
import { getRouteParams } from "../../utils/getRouteParams";
import type { RootState } from "../../store/store";
import "./PaymentStep.css";

export default function PaymentStep() {
    const searchState = useSelector((state: RootState) => state.search);
    const routesState = useSelector((state: RootState) => state.routes);
    const seatsState = useSelector((state: RootState) => state.seats);
    const {selectedRouteId} = useSelector((state: RootState) => state.booking);

    const routeParams = useMemo(() => getRouteParams(searchState, routesState), [searchState, routesState]);
    const { data: routesData } = useGetRoutesQuery(routeParams!, {skip: !routeParams});
    const ticketInfo = routesData?.items?.find((item) => item.departure._id === selectedRouteId);

    const navigate = useNavigate();
    const handleThen = () => {
        navigate("/booking/verify");
    };

    return (
        <div className="payment-step">
            <div className="container">
                <div className="payment-step__aside-wrapper">
                    <Aside className="payment-step__aside">
                        <TripDetails ticketInfo={ticketInfo!} seatsInfo={seatsState} />
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