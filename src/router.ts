import { createHashRouter } from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import BookingPage from "./pages/BookingPage/BookingPage";
import AllVievComponents from "./AllVievComponents";

export const router = createHashRouter([
    {
        path: "/",
        Component: App,
        children: [
            {index: true, Component: HomePage},
            {path: "booking", Component: BookingPage},
        ],
    },
    {
        path: "/uikit", 
        Component: AllVievComponents
    }
]);