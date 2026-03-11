import { Outlet } from "react-router";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ScrollManager } from "./ScrollManager";

function App() {
    return (
        <div>
            <ScrollManager />
            <Header />
            <div className="page">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default App;
