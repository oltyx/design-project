import React from 'react';
import Slider from '@mui/material/Slider';

import '../../assets/profile-steering/Conversion';
import '../../styles/schedule.scss';
import { Controller, useFormContext } from 'react-hook-form';


interface SliderProps {
    name: string,
    step: number,
    min: number,
    max: number,
    [x: string]: any,
}


export default function StyledSlider({name, className, step, min, max, ...props}: SliderProps) {
    const context = useFormContext();

    return(
        <Controller
        control={context.control}
        name={name}
        defaultValue={0}
        render={({ field }) => (
            <Slider {...field}
                className={className} 
                name={name} 
                defaultValue={field.value} 
                step={step} 
                min={min} 
                max={max}
                value={field.value} />
        )}
        />
    );
}