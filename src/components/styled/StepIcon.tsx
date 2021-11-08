import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import '../../styles/lightMode.scss';


/**
 * Types of Step Icon Props.
 */
interface StepIconProps {
    /**
     * Type of the Step. Required.
     */
    step: string,
    /**
     * Type of the Icon Text. Required.
     */
    text: string,
    /**
     * Type of Any Other props. Optional.
     */
    [x: string]: any,
}


/**
 * Step Icon is used on the Schedule page of the web application (3 steps to schedule chargfing session).
 * @param text     - Step instructions
 * @param step     - Step counter
 * @returns        - StepIcon component
 */
export default function StepIcon({ text, step }: StepIconProps) {
    return(
        <Container style={{padding: "0", marginBottom: "0.5rem"}}>
            <Row style={{alignItems: "center"}}>
                <Col style={{maxWidth: "10%"}}>
                    <div className="numberCircle"><p style={{margin: "0", padding: "0"}}>{step}</p></div>
                </Col>
                <Col style={{maxWidth: "90%"}}>
                    {text}
                </Col>
            </Row>
        </Container>
    );
}