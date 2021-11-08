import React from 'react';
import Slider from '@mui/material/Slider';

import '../../assets/profile-steering/Conversion';
import '../../styles/schedule.scss';
import { Controller, useFormContext } from 'react-hook-form';

/**
 * 
 */
interface SliderProps {
    /**
     * 
     */
    name: string,
    /**
     * 
     */
    step: number,
    /**
     * 
     */
    min: number,
    /**
     * 
     */
    max: number,
    /**
     * 
     */
    [x: string]: any,
}

/**
 * 
 * @param param0 
 * @returns 
 */
export default function StyledSlider({ name, className, step, min, max, ...props }: SliderProps) {
    const context = useFormContext();
    return(
        <Controller
        control={context.control}
        name={name}
        defaultValue={0}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value, ref }  }) => (
            <Slider
                name={name} 
                defaultValue={value}
                ref={ref}
                onChange={onChange}
                onBlur={onBlur} 
                step={step} 
                min={min} 
                max={max}
                value={value} />
        )}
        />
    );
}