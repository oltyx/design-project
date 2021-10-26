import React from 'react';
import { useFormContext, Controller } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Label } from 'reactstrap';

import '../../styles/lightMode.scss';

// Checkbox feedback element, consisting of the box and associated text

interface RadioboxProps {
    text?: string,
    className?: string,
    style?: any,
    disabled?: boolean,
    [x: string]: any
}

export const Radiobox=({text, className, style, disabled, ...props}: RadioboxProps) => {
    return(
        <Label check className={"responsiveText"}>
            <Input
                className={`${className} radioboxStyle`}
                type={"radio"} 
                ref={props.ref}
                onChange={props.onChange} 
                onBlur={props.onBlur}
                name={props.name} 
                value={props.value}
                style={style}
                disabled={disabled}
                {...props} 
                checked={props.checked}/>{text}
        </Label>
    );
}