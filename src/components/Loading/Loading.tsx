import "./Loading.css";
import LoadingTrainIcon from "../../assets/icons/small/LoadingTrainIcon.tsx";
import LoadingLineIcon from "../../assets/icons/small/LoadingLineIcon.tsx";
import Title from "../uikit/Title/Title";

export default function Loading() {
    return(
        <div className="loading">
            <div className="container">
                <Title as="h4" className="loading__title" uppercase={true}>идет поиск</Title>
                <div className="loading__train">
                    <LoadingTrainIcon />
                </div>
                <div className="loading__line">
                    <LoadingLineIcon />
                </div>
            </div>
        </div>
    )
}