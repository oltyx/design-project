import React from 'react';
import Slider from '@mui/material/Slider';

import '../../assets/profile-steering/Conversion';
import '../../styles/schedule.scss';
import { Controller, useFormContext } from 'react-hook-form';

interface SliderProps {
    name: string,
    energy: number,
    step: number,
    min: number,
    max: number,
    [x: string]: any,
}

export default function StyledSlider({name, className, energy, step, min, max, ...props}: SliderProps) {
    const context = useFormContext();

    return(
        <Controller
        control={context.control}
        name={name}
        defaultValue={energy}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
            <Slider
                className={className} 
                name={name} 
                defaultValue={value} 
                step={step} 
                min={min} 
                max={max}
                ref={ref}
                onChange={onChange} 
                onBlur={onBlur}
                value={value} />
        )}
        />
    );
}