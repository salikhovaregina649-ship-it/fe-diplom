import "./Reviews.css";
import Slider from "../Slider/Slider";


export default function Reviews() {
    return(
        <section className="reviews" id="reviews">
            <div className="container">
                <h2 className="reviews__title">Отзывы</h2>
                <div className="reviews__slider">
                    <Slider />
                </div>
            </div>
        </section>
    )
}