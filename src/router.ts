import { createHashRouter } from "react-router";
import App from "./App";
import HomePage from "./pages/HomePage";

export const router = createHashRouter([
    {
        path: "/",
        Component: App,
        children: [
            {index: true, Component: HomePage},
        ],
    }
]);