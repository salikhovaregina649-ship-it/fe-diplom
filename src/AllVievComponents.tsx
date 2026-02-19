import Button from "./components/Button/Button";
import YoutubeIcon from "./assets/icons/social/YoutubeIcon";

export default function AllVievComponents() {

    return (
        <div>
            <Button variant="yellow">
                <YoutubeIcon />
            </Button>
            <Button variant="dark" uppercase={true} type="submit">
                Темная
            </Button>
            <Button variant="light" uppercase={false}>
                Светлая
            </Button>
            <Button uppercase={false}>
                Стандарт
            </Button>
            <Button disabled>
                Темная
            </Button>
        </div>
    )
}