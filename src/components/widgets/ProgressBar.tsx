import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Progress, Container, Row, Col } from 'reactstrap';

import '../../styles/lightMode.scss';
import '../../styles/chargingSession.scss';


interface ProgressBarProps {
    style: string,
}
// Progress bar for the charging
export default function ProgressBar({style, ...props}: ProgressBarProps) {

    const iconStyle = { backgroundImage: style, width: "100%", borderColor: "black" }

    return(
        <Container className="progressBarContainer">
            <Row className="w-100 progressBarRow">
                <Col className="barCol">
                    <Progress barStyle={iconStyle} className={"progressBar"} value={44}/>
                </Col>
                 <Col className={"percentageCol"}>
                    <div>44%</div>
                </Col> 
            </Row>
        </Container>
    );
};