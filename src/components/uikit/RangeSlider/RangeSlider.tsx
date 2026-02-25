import { useState } from "react";
import Slider from "rc-slider";
import type { SliderProps } from "rc-slider";
import React from "react";
import "rc-slider/assets/index.css";
import "./RangeSlider.css";
import clsx from "clsx";

interface RangeSliderProps {
    className?: string;
    modifier?: string;
    min: number;
    max: number;
    step: number;
    value?: [number, number];
    onChange?: (value: [number, number]) => void;
    renderValue?: (value: number) => React.ReactNode;
}

export default function RangeSlider({className, modifier, min, max, step, value, onChange, renderValue}: RangeSliderProps) {
    const [internalValue, setInternalValue] = useState<[number, number]>([min, max]);
    const currentValue = value ?? internalValue;

    const handleChange: SliderProps["onChange"] = (val) => {
        if (Array.isArray(val)) {
            if (onChange) {
                onChange([val[0], val[1]]);
            } else {
                setInternalValue([val[0], val[1]]);
            }
        }
    };

    return(
        <div 
            className={
                clsx(
                    "range-slider", 
                    className, 
                    modifier && `range-slider--${modifier}`
                )
            }
        >
            <Slider 
                range
                min={min}
                max={max}
                value={currentValue}
                step={step}
                onChange={handleChange}
                allowCross={false}
                pushable={false}
                handleRender={(node, props) => (
                    <div className="range-slider__handle-wrapper">
                        {React.cloneElement(node, {}, (
                            <>
                                {node.props.children}
                                <div className="range-slider__handle-value">
                                    {renderValue ? renderValue(props.value) : props.value}
                                </div>
                            </>
                        ))}
                    </div>
                )}
            />
        </div>
    )
}