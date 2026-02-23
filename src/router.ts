import { createHashRouter } from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage/HomePage";
import TrainSelectionPage from "./pages/TrainSelectionPage/TrainSelectionPage";
import AllVievComponents from "./AllVievComponents";

export const router = createHashRouter([
    {
        path: "/",
        Component: App,
        children: [
            {index: true, Component: HomePage},
            {
                path: "cities", 
                Component: TrainSelectionPage,
                children: [
                    // Шаги бронирования
                ]
            },
        ],
    },
    {
        path: "/uikit", 
        Component: AllVievComponents
    }
]);