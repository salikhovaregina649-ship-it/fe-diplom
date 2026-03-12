import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SliderElement from "../SliderElemet/SliderElemet";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.css";

import img1 from "../../assets/images/review-img1.jpg";
import img2 from "../../assets/images/rewiew-img2.jpg";

interface Review {
    url: string;
    name: string;
    text: string;
}

const reviews: Review[] = [
    {
        url: img1,
        name: "Екатерина Вальнова",
        text: "Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.",
    },
    {
        url: img2,
        name: "Евгений Стрыкало",
        text: "СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.",
    },
    {
        url: img1,
        name: "1",
        text: "Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.",
    },
    {
        url: img2,
        name: "2",
        text: "СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.",
    },
    {
        url: img1,
        name: "3",
        text: "Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.",
    },
    {
        url: img2,
        name: "4",
        text: "СМС-сопровождение до посадки Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.",
    },
];

export default function Slider() {
    return (
        <div className="slider">
            <Swiper
                modules={[Pagination]}
                pagination={{clickable: true}}
                spaceBetween={85}
                slidesPerView={2}
            >
                {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <SliderElement
                            url={review.url}
                            name={review.name}
                            text={review.text}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
