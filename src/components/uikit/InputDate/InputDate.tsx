import "./InputDate.css";
import clsx from "clsx";

interface InputDateProps {
    className?: string;
    id?: string;
    Icon?: React.ElementType;
}

export default function InputDate({className, id, Icon}: InputDateProps) {
    return(
        <>
            <input 
                className={clsx("input-date", className)} 
                id={id} 
                type="date" 
                placeholder="ДД.ММ.ГГ" 
            />
            {Icon && <Icon />}
        </>
    )
}