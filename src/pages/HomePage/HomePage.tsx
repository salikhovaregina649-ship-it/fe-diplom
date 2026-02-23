import "./HomePage.css";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import How from "../../components/How/How";
import Reviews from "../../components/Reviews/Reviews";
import Search from "../../components/Search/Search";
import Title from "../../components/uikit/Title/Title";

export default function HomePage() {

    return(
        <div className="home">
            <Hero className="home__hero">
                <div className="container">
                    <Title as="h1" className="home__title">
                        Вся жизнь - <br/>
                        <span>путешествие!</span>
                    </Title>
                    <Search className="home__search" />
                </div>
            </Hero>
            <About />
            <How />
            <Reviews />
            <Footer />
        </div>
    )
}