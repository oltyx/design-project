import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import '../../styles/lightMode.scss';

interface StepIconProps {
    step: string,
    text: string,
    [x: string]: any,
}

export default function StepIcon({text, step, ...props}: StepIconProps) {
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