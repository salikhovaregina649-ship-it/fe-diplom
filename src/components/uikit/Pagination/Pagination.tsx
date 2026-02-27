import { useEffect } from "react";
import clsx from "clsx";
import ArrowLineIcon from "../../../assets/icons/small/ArrowLineIcon";
import "./Pagination.css";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange?: (page: number) => void;
}

export default function Pagination({
    totalPages,
    currentPage,
    onPageChange,
}: PaginationProps) {
    const handleClick = (page: number) => {
        if (page < 1 || page > totalPages) return; // защита от выхода за пределы
        if (onPageChange) onPageChange(page);
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [currentPage]);

    const renderPages = () => {
        const pages = [];

        if (totalPages <= 3) {
            // Показываем все страницы, если их мало
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        className={clsx(
                            "pagination-button",
                            i === currentPage && "pagination-button--active",
                        )}
                        key={i}
                        onClick={() => handleClick(i)}
                    >
                        {i}
                    </button>,
                );
            }
        } else {
            // Всегда первая страница
            pages.push(
                <button
                    className={clsx(
                        "pagination-button",
                        currentPage === 1 && "pagination-button--active",
                    )}
                    key={1}
                    onClick={() => handleClick(1)}
                >
                    1
                </button>,
            );

            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            // Коррекция, если текущая страница 1 или 2
            if (currentPage === 1) {
                startPage = 2;
                endPage = 3;
            } else if (currentPage === 2) {
                startPage = 2;
                endPage = 3;
            }

            // Коррекция, если текущая страница последняя или предпоследняя
            if (currentPage === totalPages) {
                startPage = totalPages - 2;
                endPage = totalPages - 1;
            } else if (currentPage === totalPages - 1) {
                startPage = totalPages - 2;
                endPage = totalPages - 1;
            }

            // Левое многоточие
            if (startPage > 2) {
                pages.push(
                    <span key="left-ellipsis" className="pagination-ellipsis">
                        ...
                    </span>,
                );
            }

            // Соседние страницы
            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <button
                        className={clsx(
                            "pagination-button",
                            i === currentPage && "pagination-button--active",
                        )}
                        key={i}
                        onClick={() => handleClick(i)}
                    >
                        {i}
                    </button>,
                );
            }

            // Правое многоточие
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="right-ellipsis" className="pagination-ellipsis">
                        ...
                    </span>,
                );
            }

            // Последняя страница
            pages.push(
                <button
                    className={clsx(
                        "pagination-button",
                        currentPage === totalPages &&
                            "pagination-button--active",
                    )}
                    key={totalPages}
                    onClick={() => handleClick(totalPages)}
                >
                    {totalPages}
                </button>,
            );
        }

        return pages;
    };

    return (
        <div className="pagination">
            <button
                className={clsx("pagination-button", "pagination-button--left")}
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ArrowLineIcon />
            </button>
            {renderPages()}
            <button
                className={clsx(
                    "pagination-button",
                    "pagination-button--right",
                )}
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ArrowLineIcon />
            </button>
        </div>
    );
}
