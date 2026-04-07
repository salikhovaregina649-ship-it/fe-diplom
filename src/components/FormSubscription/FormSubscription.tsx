import { useState } from "react";
import Button from "../uikit/Button/Button";
import PopupEmail from "../Popups/PopupEmail";
import { useGetSubscribeMutation } from "../../store/api/api";
import "./FormSubscription.css";

export default function FormSubscription () {
    const [email, setEmail] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [subscribe, {isLoading}] = useGetSubscribeMutation();

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        try {
            await subscribe(email).unwrap();
            setEmail("");
            setIsPopupOpen(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleClose = () => {
        setIsPopupOpen(false);
    };

    return (
        <form className="form-subscription" onSubmit={handleSubmit}>
            <label className="form-subscription__label" htmlFor="subscription-email">Будьте в курсе событий</label>
            <div className="form-subscription__controls">
                <input 
                    className="form-subscription__input" 
                    id="subscription-email" 
                    type="email" 
                    placeholder="e-mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button className="form-subscription__btn" variant="transparent" uppercase={true} type="submit" disabled={isLoading}>
                    Отправить
                </Button>
            </div>
            {isPopupOpen && <PopupEmail handleClose={handleClose}/>}
        </form>
    )
}