import React from 'react';
import { useFormContext, Controller } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Input, Label } from 'reactstrap';

import '../../styles/lightMode.scss';


/**
 * Unused component. Currently the suggested comments are operation on RadiboxGroup, which only allows to selected one comment. 
 * If in the future, it will be necessary to allow the users to choose 1+ commments, checkboxes should used instead.
 */

/**
 * Types for the Checkbox component.
 */
interface CheckboxProps {
    /**
     * Type of the name to be registered in the Controller. Required.
     */
    name: string,
    /**
     * Type of the
     */
    text?: string,
    /**
     * 
     */
    className?: string,
    /**
     * 
     */
    style?: object,
    /**
     * 
     */
    disabled?: boolean,
    /**
     * 
     */
    [x: string]: any
}

/**
 * 
 * @param name  - Name of the registered Input. 
 * @returns 
 */
export const Checkbox=({name, ...props}: CheckboxProps) => {
    const context = useFormContext();
    return(
        <Controller
        control={context.control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
            <Label check className={"responsiveText"}>
                <Input
                    className={`${props.className} checkboxStyle`}
                    type={"checkbox"} 
                    innerRef={ref}
                    onChange={onChange} 
                    onBlur={onBlur}
                    name={name} 
                    value={value}
                    style={props.style}
                    disabled={props.disabled}
                    {...props} 
                    checked={value}/>{props.text}
            </Label>
        )}
        ></Controller>
    );
}