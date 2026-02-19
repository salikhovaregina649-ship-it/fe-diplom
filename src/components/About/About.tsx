import "./About.css";

export default function About() {
    return (
        <section className="about" id="about">
            <div className="container">
                <h2 className="about__title">О нас</h2>
                <div className="about__content-box">
                    <p className="about__paragraph">
                        Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем<br/> 
                        все больше людей заказывают жд билеты через интернет.
                    </p>
                    <p className="about__paragraph">
                        Сегодня можно заказать железнодорожные билеты онлайнвсего в 2 клика, но стоит ли это делать?<br/>
                        Мы расскажем о преимуществах заказа через интернет.
                    </p>
                    <p className="about__paragraph about__paragraph--bold">
                        Покупать жд билеты дешево можно за 90 суток до отправления поезда.<br/>
                        Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.
                    </p>
                </div>
            </div>
        </section>
    );
}
