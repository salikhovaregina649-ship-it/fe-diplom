import { useState } from "react";
import CustomSelect from "../uikit/CustomSelect/CustomSelect";
import Radio from "../uikit/Radio/Radio";
import { v4 as uuidv4 } from "uuid";
import Train from "../Train/Train";
import Pagination from "../uikit/Pagination/Pagination";
import "./TrainList.css";

import routesResponse from "../../mocks/routesResponse.json";

//Моки
const options = [
    { value: "time", label: "времени" },
    { value: "cost", label: "стоимости" },
    { value: "duration", label: "длительности" },
];
const trainInfo = routesResponse; //Для заполнения

export default function TrainList() {
    const [selectedValue, setSelectedValue] = useState<string>(options[0].label);
    const [perPage, setPerPage] = useState("5");
    const [currentPage, setCurrentPage] = useState(1);

    const perPageNumber = Number(perPage);
    const totalPages = Math.ceil(trainInfo.items.length / perPageNumber);
    const startIndex = (currentPage - 1) * perPageNumber;
    const endIndex = startIndex + perPageNumber;
    const paginatedItems = trainInfo.items.slice(startIndex, endIndex);

    const handlePerPageChange = (value: string) => {
        setPerPage(value);
        setCurrentPage(1);
    };

    return(
        <div className="train-list">
            <div className="train-list__row">
                <div className="train-list__found-result">найдено {trainInfo.total_count}</div>
                <div className="train-list__controls">
                    <div className="train-list__sorting">
                        <span className="train-list__sorting__label">сортировать по:</span>
                        <CustomSelect className="train-list__sorting-select" options={options} value={selectedValue} onChange={(val) => setSelectedValue(val)} />
                    </div>
                    
                    <div className="train-list__per-page">
                        <span className="train-list__per-page-label">показывать по:</span>
                        <Radio className="train-list__per-page-item" name="per-page" id="perPage5" value="5" label="5" checked={perPage === "5"} onChange={handlePerPageChange} />
                        <Radio className="train-list__per-page-item" name="per-page" id="perPage10" value="10" label="10" checked={perPage === "10"} onChange={handlePerPageChange} />
                        <Radio className="train-list__per-page-item" name="per-page" id="perPage20" value="20" label="20" checked={perPage === "20"} onChange={handlePerPageChange} />
                    </div>
                </div>
            </div>
            <div className="train-list__wrapper">
                <ul className="train-list__list">
                    {paginatedItems.map((item) => (
                        <li className="train-list__item" key={uuidv4()}>
                            <Train trainInfo={item} />
                        </li>
                    ))}
                </ul>
            </div>
            <div className="train-list__pagination">
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />           
            </div>
        </div>
    )
}