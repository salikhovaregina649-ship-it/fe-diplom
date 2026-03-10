import Popup from "../uikit/Popup/Popup";

interface PopupErrorProps {
    handleClose: () => void;
}

export default function PopupError({ handleClose }: PopupErrorProps) {
    return (
        <Popup
            variant="error"
            onClose={handleClose}
            title="Таким образом консультация с широким активом в значительной степени обуславливает создание модели развития."
        >
            <p>
                Повседневная практика показывает, что сложившаяся структура
                организации играет важную роль в формировании существенных
                финансовых и административных
            </p>
        </Popup>
    );
}
