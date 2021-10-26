import React from 'react';
import { useFormContext, Controller } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Label } from 'reactstrap';

import '../../styles/lightMode.scss';

// Checkbox feedback element, consisting of the box and associated text

interface CheckboxProps {
    name: string,
    text?: string,
    className?: string,
    style?: any,
    disabled?: boolean,
    [x: string]: any
}

export const Checkbox=({name, text, className, style, disabled, ...props}: CheckboxProps) => {
    const context = useFormContext();
    return(
        <Controller
        control={context.control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
            <Label check className={"responsiveText"}>
                <Input
                    className={`${className} checkboxStyle`}
                    type={"checkbox"} 
                    ref={ref}
                    onChange={onChange} 
                    onBlur={onBlur}
                    name={name} 
                    value={value}
                    style={style}
                    disabled={disabled}
                    {...props} 
                    checked={value}/>{text}
            </Label>
        )}
        ></Controller>
    );
}