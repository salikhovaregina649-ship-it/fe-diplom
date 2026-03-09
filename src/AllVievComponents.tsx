import { useRef, useState } from 'react';
import Button from "./components/uikit/Button/Button";
import YoutubeIcon from "./assets/icons/social/YoutubeIcon";
import Title from "./components/uikit/Title/Title";
import Checkbox from "./components/uikit/Checkbox/Checkbox";
import Popover from "./components/uikit/Popover/Popover";

export default function AllVievComponents() {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);

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
                <Checkbox name="test" value="test checkbox" label="" />
                <Checkbox name="test" value="test checkbox 2" label="" />
                {/* <Popover>Поповер</Popover> */}
            </div>
            <div style={{ padding: '100px' }}>
                <button
                    ref={buttonRef}
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    Открыть popover
                </button>

                <Popover anchorRef={buttonRef} trigger="manual" isOpen={isOpen}>
                    Это содержимое popover
                </Popover>
            </div>
        </>
    )
}