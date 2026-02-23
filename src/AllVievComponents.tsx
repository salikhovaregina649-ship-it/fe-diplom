import Button from "./components/uikit/Button/Button";
import YoutubeIcon from "./assets/icons/social/YoutubeIcon";
import Title from "./components/uikit/Title/Title";

export default function AllVievComponents() {

    return (
        <>
            <div style={{backgroundColor: "#c0c0c0", display: "flex", gap: "20px"}}>
                <Button variant="yellow">
                    <YoutubeIcon />
                </Button>
                <Button variant="transparent" uppercase={true} type="submit">
                    Прозрачная
                </Button>
                <Button variant="light" uppercase={false}>
                    Светлая
                </Button>
                <Button uppercase={false}>
                    Стандарт
                </Button>
                <Button disabled>
                    Неактивная
                </Button>
            </div>
            <div>
                <Title as="h2">Заголовок</Title>
            </div>
        </>
    )
}