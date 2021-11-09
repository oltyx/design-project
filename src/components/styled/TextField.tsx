import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../styles/lightMode.scss';


/**
 * Types for the Text Field Props.
 */
interface TextFieldProps {
    /**
     * Type of the field name to be registered in Controller. Required.
     */
    name: string,
    /**
     * ClassName. Optional.
     */
    className?: string,
    /**
     * Types of Any other Props. Optional.
     */
    [x: string]: any
}


/**
 * Text Field for the User's additional comment/remarks on the Feedback page.
 * @param name          - Name of the registered Input
 * @param props         - Other props 
 * @returns             - Registered Text Input component (via {@link https://react-hook-form.com/api/usecontroller/controller | Controller})
 */
export default function TextField({ name, ...props }: TextFieldProps) {
    /**
     * Form context passed via {@link https://react-hook-form.com/api/useformcontext | Form Context Hook}.
     */
    const context = useFormContext();
    return(
        <Controller
        control={context.control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
            <Label check className={"w-100 responsiveText"}>
                <Input
                    className={`${props.className} textFieldStyle`}
                    type={"text"} 
                    innerRef={ref}
                    onChange={onChange} 
                    onBlur={onBlur}
                    name={name} 
                    value={value}
                    rows={4}
                    placeholder={"Other..."}
                    {...props} />
            </Label>
        )}
        ></Controller>
    );
}