import "./HomePage.css";
import AllVievComponents from "../AllVievComponents";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import How from "../components/How/How";
import Reviews from "../components/Reviews/Reviews";

export default function HomePage() {

    return(
        <div className="home">
            <Hero className="home">
                <div className="container">
                    <h1 className="title">
                        Вся жизнь - <br/>
                        <span>путешествие!</span>
                    </h1>
                    {/**Виджет поиска билетов, их 2 вида*/}
                </div>
            </Hero>
            <About />
            <How />
            <Reviews />
            <Footer />
            <AllVievComponents />
        </div>
    )
}