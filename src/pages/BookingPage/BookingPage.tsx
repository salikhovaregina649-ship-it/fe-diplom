import { useMemo } from "react";
import { Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";
import Hero from "../../components/Hero/Hero";
import Search from "../../components/Search/Search";
import StepsMenu from "../../components/StepsMenu/StepsMenu";
import Loading from "../../components/Loading/Loading";
import { useGetRoutesQuery } from "../../store/api/api";
import { getRouteParams } from "../../utils/getRouteParams";
import type { RootState } from "../../store/store";
import "./BookingPage.css";

export default function BookingPage() {
    const location = useLocation();

    const getCurrentStep = () => {
        if (location.pathname.includes("train")) return 1;
        if (location.pathname.includes("passengers")) return 2;
        if (location.pathname.includes("payment")) return 3;
        if (location.pathname.includes("verify")) return 4;
        return 1;
    };

    const searchState = useSelector((state: RootState) => state.search);
    const routesState = useSelector((state: RootState) => state.routes);
    const routeParams = useMemo(() => getRouteParams(searchState, routesState), [searchState, routesState]);
    const { isLoading } = useGetRoutesQuery(routeParams!, {skip: !routeParams});

    return (
        <div className="booking">
            <Hero className="booking__hero">
                <div className="container">
                    <Search className="booking__search" />
                </div>
            </Hero>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <StepsMenu currentStep={getCurrentStep()} />
                    <Outlet />
                </>
            )}
            
        </div>
    );
}
