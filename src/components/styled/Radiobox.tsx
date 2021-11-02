import React from 'react';
import { useFormContext, Controller } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Label } from 'reactstrap';

import '../../styles/lightMode.scss';

//unused

interface RadioboxProps {
    text?: string,
    className?: string,
    style?: any,
    disabled?: boolean,
    name: string,
    id: string,
    [x: string]: any
}

export const Radiobox=({text, className, style, disabled, name, id, ...props}: RadioboxProps) => {
    const context = useFormContext();

    return(
        <Controller
        control={context.control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
        <Label className={"responsiveText"} for={id}>
            <Input
                className={`${className} radioboxStyle`}
                type={"radio"}
                id={id} 
                innerRef={ref}
                onChange={onChange} 
                onBlur={onBlur}
                name={name} 
                value={value}
                style={style}
                disabled={disabled}
                {...props} 
                checked={value}/>{text}
        </Label>
    )} />
    )
}