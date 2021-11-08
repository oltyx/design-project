import React from 'react';
import { Button, ButtonProps } from 'reactstrap';

import '../../styles/lightMode.scss';


/**
 * Types of the Global Button Props.
 */
interface GlobalButtonProps {
    /**
     * Type of the Button Text. Optional.
     */
    text?: string,
    /**
     * Type of ClassName. Optional.
     */
    className?: string,
    /**
     * Type of the Action on Click. Optional.
     */
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    /**
     * Type of the Button. Optional.
     */
    type?: "submit" | "reset" | "button" | undefined,
    /**
     * Type of Style to apply on the Button. Optional.
     */
    style?: object, 
    /**
     * Type of Any other props. Optional.
     */
    [x: string]: any
}

/**
 * Global Green Button that is used on every page of the application.
 * @param onClick       - OnClick Action
 * @returns             - Global Green Button
 */
export const GlobalButton = ({ onClick, ...props}: GlobalButtonProps) => {
    return(
        <Button className={`${props.className} globalButton`} type={props.type} style={props.style} onClick={onClick}>
            <h1 className={"globalButtonText"} {...props}>{props.text}</h1>
        </Button>
    );
}
