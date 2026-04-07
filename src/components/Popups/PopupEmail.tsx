import Popup from "../uikit/Popup/Popup";

interface PopupEmailProps {
    handleClose: () => void;
}

export default function PopupEmail({ handleClose }: PopupEmailProps) {
    return (
        <Popup
            variant="info"
            onClose={handleClose}
        >
            <p>
                Вы успешно подписались!
            </p>
            <p>
                Спасибо за интерес к нашим новостям. Мы будем держать вас в курсе всех событий и обновлений. Ожидайте наших писем с полезной информацией и эксклюзивными предложениями!
            </p>
        </Popup>
    );
}