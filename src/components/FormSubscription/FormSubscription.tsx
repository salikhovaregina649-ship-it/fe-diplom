import Button from "../Button/Button";
import "./FormSubscription.css";

export default function FormSubscription () {

    return (
        <form className="form-subscription">
            <label className="form-subscription__label" htmlFor="subscription-email">Будьте в курсе событий</label>
            <div className="form-subscription__controls">
                <input 
                    className="form-subscription__input" 
                    id="subscription-email" 
                    type="email" 
                    placeholder="e-mail" 
                />
                <Button className="form-subscription__btn" variant="dark" uppercase={true} type="submit">
                    Отправить
                </Button>
            </div>
        </form>
    )
}