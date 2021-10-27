import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Button, Input } from 'reactstrap';

import '../../styles/lightMode.scss';

// Checkbox feedback element, consisting of the box and associated text


interface GlobalButtonProps {
    text?: string,
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    [x: string]: any
}

interface ModeButton {
    name: string,
    text?: string,
    className?: string,
    style?: any,
    disabled?: boolean,
    [x: string]: any
}



export const GlobalButton = ({ text, onClick, className, type, ...props}: GlobalButtonProps) => {
    return(
        <Button className={`${className} globalButton`} type={type} onClick={onClick}><h1 className={"globalButtonText"} {...props}>{text}</h1></Button>
    );
}
