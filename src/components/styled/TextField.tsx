import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../styles/lightMode.scss';

interface TextFieldProps {
    name: string,
    className?: string,
}


export default function TextField({name, className,...props}: TextFieldProps) {
    const context = useFormContext();
    return(
        <Controller
        control={context.control}
        name={name}
        render={({ field: { onChange, onBlur, value, ref } }) => (
            <Label check className={"w-100 responsiveText"}>
                <Input
                    className={`${className} textFieldStyle`}
                    type={"text"} 
                    ref={ref}
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