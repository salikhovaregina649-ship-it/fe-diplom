import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Search from "../../components/Search/Search";
import TicketStep from "../../components/TicketStep/TicketStep";
import "./BookingPage.css";
import StepsMenu from "../../components/StepsMenu/StepsMenu";

export default function BookingPage() {
    const [step, setStep] = useState(1);

    const renderStep = () => {
        switch (step) {
            case 1: return <TicketStep onNext={() => setStep(2)} />;
            // case 2: return <PassengerStep onNext={() => setStep(3)} onBack={() => setStep(1)} />;
            // case 3: return <PaymentStep onNext={() => setStep(4)} onBack={() => setStep(2)} />;
            // case 4: return <VerifyStep onBack={() => setStep(3)} />;
        }
    }

    return(
        <div className="booking">
            <Hero className="booking__hero">
                <div className="container">
                    <Search className="booking__search" />
                </div>
            </Hero>
                <StepsMenu currentStep={step} />
                {renderStep()}
            <Footer />
        </div>
    )
}