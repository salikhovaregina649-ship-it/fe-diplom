import { useState } from "react";
import StarIcon from "../../../assets/icons/small/StarIcon";
import "./Rating.css";
import clsx from "clsx";

type RatingProps = {
    className?: string;
    max?: number;
};

export default function Rating({ className, max = 5 }: RatingProps) {
    const [rating, setRating] = useState<number>(0);

    return (
        <div className={clsx("rating", className)}>
            {[...Array(max)].map((_, index) => {
                const starValue = index + 1;

                return (
                    <StarIcon
                        key={starValue}
                        filled={starValue <= rating}
                        onClick={() => setRating(starValue)}
                    />
                );
            })}
        </div>
    );
}
