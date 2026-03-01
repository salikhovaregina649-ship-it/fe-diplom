import { Outlet, useLocation } from "react-router";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Search from "../../components/Search/Search";
import StepsMenu from "../../components/StepsMenu/StepsMenu";
import Loading from "../../components/Loading/Loading";
import "./BookingPage.css";

export default function BookingPage() {
    const location = useLocation();

    const getCurrentStep = () => {
        if (location.pathname.includes("")) return 1;
        if (location.pathname.includes("passengers")) return 2;
        if (location.pathname.includes("payment")) return 3;
        if (location.pathname.includes("verify")) return 4;
        return 1;
    };

    return(
        <div className="booking">
            <Hero className="booking__hero">
                <div className="container">
                    <Search className="booking__search" />
                </div>
            </Hero>
                {/* <Loading /> */}
                <StepsMenu currentStep={getCurrentStep()} />
                <Outlet />
            <Footer />
        </div>
    )
}