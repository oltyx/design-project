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
     * Type of the Checkbox text. Optional.
     */
    text?: string,
    /**
     * ClassName. Optional.
     */
    className?: string,
    /**
     * Type of the style object. Optional.
     */
    style?: object,
    /**
     * Type of the disabled (if the button should be disabled/clickable). Optional.
     */
    disabled?: boolean,
    /**
     * Types of Any other Props. Optional.
     */
    [x: string]: any
}


/**
 * Checkbox to select one or more suggested comments on the Feedback Page.
 * @param name  - Name of the registered Input 
 * @returns     - Controlled Checkbox Component (via {@link https://react-hook-form.com/api/usecontroller/controller | Controller}).
 */
export const Checkbox=({name, ...props}: CheckboxProps) => {
    /**
     * Form context passed via {@link https://react-hook-form.com/api/useformcontext | Form Context Hook}.
     */
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