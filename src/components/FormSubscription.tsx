export default function FormSubscription () {

    return (
        <form className="form-subscription">
            <label className="form-subscription__label" htmlFor="subscription-email">Будьте в курсе событий</label>
            <input className="form-subscription__input" 
                id="subscription-email" 
                type="email" 
                placeholder="e-mail" 
            />
            <button className="form-subscription__btn">Отправить</button>
        </form>
    )
}