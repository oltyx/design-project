import React from 'react';
import { Table, Container, Row, Col, Label } from 'reactstrap'

import '../../styles/chargingSession.scss';

// Charging stats table
export default function Stats() {
    return(
    <Container className="statsContainer">
        <Row>
            <Col>
                <Label className="statsTitle">Predicted finish time</Label>
            </Col>
        </Row> 
        <Row>
            <Col>
                <Label className="finishTime">12 : 50</Label>
            </Col>
        </Row>    
        <Row>
            <Col>
                <Table className="table">
                    <tbody>
                    <tr>
                        <td>kWh charged . . . . . . . .</td>
                        <td>13.2 out of 30</td>
                    </tr>
                    <tr>
                        <td>km charged . . . . . . . . .</td>
                        <td>22 out of 50</td>
                    </tr>
                    <tr>
                        <td>Mode . . . . . . . . . . . . . . .</td>
                        <td>Solar power</td>
                    </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>);
};