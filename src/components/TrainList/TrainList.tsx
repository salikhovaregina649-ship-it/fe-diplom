import { useState } from "react";
import CustomSelect from "../uikit/CustomSelect/CustomSelect";
import Radio from "../uikit/Radio/Radio";
import "./TrainList.css";
import Train from "../Train/Train";

interface TrainListProps {

}

const foundResult = 20;
const options = [
    { value: "time", label: "времени" },
    { value: "cost", label: "стоимости" },
    { value: "duration", label: "длительности" },
];

export default function TrainList({}: TrainListProps) {
    const [selectedValue, setSelectedValue] = useState<string>(options[0].label);
    const [perPage, setPerPage] = useState("5");

    return(
        <div className="train-list">
            <div className="train-list__row">
                <div className="train-list__found-result">найдено {foundResult}</div>
                <div className="train-list__controls">
                    <div className="train-list__sorting">
                        <span className="train-list__sorting__label">сортировать по:</span>
                        <CustomSelect className="train-list__sorting-select" options={options} value={selectedValue} onChange={(val) => setSelectedValue(val)} />
                    </div>
                    
                    <div className="train-list__per-page">
                        <span className="train-list__per-page-label">показывать по:</span>
                        <Radio className="train-list__per-page-item" name="per-page" id="perPage5" value="5" label="5" checked={perPage === "5"} onChange={setPerPage} />
                        <Radio className="train-list__per-page-item" name="per-page" id="perPage10" value="10" label="10" checked={perPage === "10"} onChange={setPerPage} />
                        <Radio className="train-list__per-page-item" name="per-page" id="perPage20" value="20" label="20" checked={perPage === "20"} onChange={setPerPage} />
                    </div>
                </div>
            </div>
            <div className="train-list__wrapper">
                <ul className="train-list__list">
                    {/**все train-list__item через .map*/}
                    <li className="train-list__item">
                        <Train />
                    </li>
                </ul>
            </div>
        </div>
    )
}