import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Container, Row, Col, Input, Label } from 'reactstrap';


type TextFieldProps = {
    name: string,
}


export default function TextField({name, ...props}: TextFieldProps) {
    const context = useFormContext();
    return(
        <Controller
        control={context.control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
            <Label check className={"responsiveText"}>
                <Input
                    className={"feedbackTextField"}
                    type={"text"} 
                    ref={ref}
                    onChange={onChange} 
                    onBlur={onBlur}
                    name={name} 
                    value={value}
                    placeholder={"Other..."}
                    {...props} />
            </Label>
        )}
        ></Controller>
    );
}