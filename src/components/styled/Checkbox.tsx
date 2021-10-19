import React from 'react';
import { useFormContext, Controller } from "react-hook-form";
import { Container, Row, Col, Button, Form, FormGroup, ButtonGroup, Input, Label } from 'reactstrap';

import '../../styles/lightMode.scss';

// Checkbox feedback element, consisting of the box and associated text

interface CheckboxProps {
    name: string,
    text?: string,
}


export const Checkbox= ({name, text, ...props}: CheckboxProps) => {
    const checkBoxStyle = {
        borderColor: "red",
        fontSize: "5vh",
    }
    const context = useFormContext();
    return(
        <Controller
        control={context.control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
            <Label check className={"responsiveText"}>
                <Input
                    style={checkBoxStyle}
                    type={"checkbox"} 
                    ref={ref}
                    onChange={onChange} 
                    onBlur={onBlur}
                    name={name} 
                    value={value}
                    {...props} 
                    checked={value}/>{text}
            </Label>
        )}
        ></Controller>
    );
}