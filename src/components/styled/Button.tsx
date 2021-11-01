import React from 'react';
import { Button } from 'reactstrap';

import '../../styles/lightMode.scss';


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



export const GlobalButton = ({ text, onClick, className, type, style, ...props}: GlobalButtonProps) => {
    return(
        <Button className={`${className} globalButton`} type={type} style={style} onClick={onClick}><h1 className={"globalButtonText"} {...props}>{text}</h1></Button>
    );
}
