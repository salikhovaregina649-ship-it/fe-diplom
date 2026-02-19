import "./App.css";
import { Outlet } from "react-router";
import Header from "./components/Header/Header";

function App() {
    return (
        <div>
            <Header />
            <div className="page">
                <Outlet />
            </div>
        </div>
    )
}

export default App;