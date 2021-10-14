import React from 'react';
import { useFormContext, Controller } from "react-hook-form";
import { Container, Row, Col, Button, Form, FormGroup, ButtonGroup, Input, Label } from 'reactstrap';

import '../../styles/lightMode.scss';

// Checkbox feedback element, consisting of the box and associated text

type GlobalButtonProps = {
    name?: string,
    text?: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
}


export const GlobalButton = ({ text, onClick, ...props}: GlobalButtonProps) => {
    return(
        <Button className="globalButton" onClick={onClick}><h1 className={"globalButtonText"} {...props}>{text}</h1></Button>
    );
}