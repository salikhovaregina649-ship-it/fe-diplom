import "./TrainSelectionPage.css";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import Search from "../../components/Search/Search";

export default function TrainSelectionPage() {

    return(
        <div className="train-selection">
            <Hero className="train-selection">
                <div className="container">
                    <Search className="train-selection" />
                </div>
            </Hero>
            
            <Footer />
        </div>
    )
}