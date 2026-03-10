import Popup from "../uikit/Popup/Popup";

interface PopupInfoProps {
    handleClose: () => void;
}

export default function PopupInfo({ handleClose }: PopupInfoProps) {
    return (
        <Popup
            variant="info"
            onClose={handleClose}
        >
            <p>
                Таким образом консультация с широким активом в значительной
                степени обуславливает создание модели развития.
            </p>
            <p>
                Повседневная практика показывает, что сложившаяся структура
                организации играет важную роль в формировании существенных
                финансовых и административных
            </p>
        </Popup>
    );
}