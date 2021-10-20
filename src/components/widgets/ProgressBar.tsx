import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Progress, Container, Row, Col } from 'reactstrap';

import '../../styles/lightMode.scss';
import '../../styles/chargingSession.scss';
// Progress bar for the charging
export default function ProgressBar() {

    const iconStyle = { backgroundColor: "red" }

    return(
        <Container className="progressBarContainer">
            <Row className="w-100">
                <Col className="progressBar">
                    <Progress barStyle={iconStyle} value={44}/>
                </Col>
                 <Col>
                    <div>44%</div>
                </Col> 
            </Row>
        </Container>
    );
};