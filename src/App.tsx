import "./App.css";
import { Outlet } from "react-router";
import Menu from "./components/Menu";

function App() {
    return (
        <div>
            <Menu />
            <div className="page">
                <Outlet />
            </div>
        </div>
    )
}

export default App;