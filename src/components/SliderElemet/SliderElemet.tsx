import "./SliderElemet.css";

interface SlideProps {
    url: string;
    name: string;
    text:  string;
}

export default function SliderElement({url, name, text}: SlideProps) {
    return(
        <div className="slide">
            <div className="slide__photo-box">
                <img className="slide__photo" src={url} alt="" />
            </div>
            <div className="slide__content">
                <h4 className="slide__autor">{name}</h4>
                <p className="slide__text"><span>“</span>{text}<span>„</span></p>
            </div>
        </div>
    )
}