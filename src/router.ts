import { createHashRouter } from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import BookingPage from "./pages/BookingPage/BookingPage";
import AllVievComponents from "./AllVievComponents";
import OrderSuccessPage from "./pages/OrderSuccessPage/OrderSuccessPage";

export const router = createHashRouter([
    {
        path: "/",
        Component: App,
        children: [
            {index: true, Component: HomePage},
            {path: "booking", Component: BookingPage},
            {path: "order/success", Component: OrderSuccessPage} // /:id добаить позже
        ],
    },
    {
        path: "/uikit", 
        Component: AllVievComponents
    }
]);