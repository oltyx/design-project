import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Progress, Container, Row, Col } from 'reactstrap';

import '../../styles/lightMode.scss';
import '../../styles/chargingSession.scss';

/**
 * Types for the ProgressBar Component Props.
 */
interface ProgressBarProps {

    /**
     * Type of string for the progress bar style.
     */
    style?: string,

    /**
     * Type of number of the progress bar value.
     */
    value: number
}
export default function ProgressBar({value, ...props}: ProgressBarProps) {
   
    /**
     * Default progress bar style.
     */
    const iconStyle = { backgroundImage: "linear-gradient(to bottom, #9AE09A 0%, #44BE44 100%)", width: "100%", borderColor: "black" }

    return(
        <Container className="progressBarContainer">
            <Row className="w-100 progressBarRow">
                <Col className="barCol">
                    <Progress barStyle={iconStyle} className={"progressBar"} value={value}/>
                </Col>
                 <Col className={"percentageCol"}>
                    <div>{value}%</div>
                </Col> 
            </Row>
        </Container>
    );
};