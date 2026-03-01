import { createHashRouter, redirect } from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import BookingPage from "./pages/BookingPage/BookingPage";
import AllVievComponents from "./AllVievComponents";
import OrderSuccessPage from "./pages/OrderSuccessPage/OrderSuccessPage";
import TicketStep from "./components/TicketStep/TicketStep";
import TrainList from "./components/TrainList/TrainList";
import TicketSeats from "./components/TicketSeats/TicketSeats";
import PassengerStep from "./components/PassengerStep/PassengerStep";
import PaymentStep from "./components/PaymentStep/PaymentStep";
import VerifyStep from "./components/VerifyStep/VerifyStep";

export const router = createHashRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: HomePage },
            {
                path: "booking",
                Component: BookingPage,
                children: [
                    {
                        index: true,
                        loader: () => {
                            throw redirect("trains");
                        },
                    },
                    {   
                        path: "trains",
                        Component: TicketStep,
                        children: [
                            { index: true, Component: TrainList },
                            { path: "seats/:trainId", Component: TicketSeats },
                        ],
                    },
                    { path: "passengers", Component: PassengerStep },
                    { path: "payment", Component: PaymentStep },
                    { path: "verify", Component: VerifyStep },
                ],
            },
            { path: "order/success", Component: OrderSuccessPage }, // /:id добаить позже
        ],
    },
    {
        path: "/uikit",
        Component: AllVievComponents,
    },
]);
