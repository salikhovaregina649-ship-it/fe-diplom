import Slider from "../Slider/Slider";
import Title from "../uikit/Title/Title";
import "./Reviews.css";

export default function Reviews() {
    return(
        <section className="reviews" id="reviews">
            <div className="container">
                <Title as="h2" className="reviews__title" uppercase={true}>Отзывы</Title>
                <div className="reviews__slider">
                    <Slider />
                </div>
            </div>
        </section>
    )
}