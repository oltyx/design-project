import React from 'react';
import { Table, Container, Row, Col } from 'reactstrap'

import '../../styles/chargingSession.scss';
import {ChargingMode} from "../../data/models/ChargingMode";

/**
 * Type for the Stats Component Props.
 */
interface StatsProps {

    /**
     * Types of ChargingMode and null for the Stats mode.
     * ChargingMode has Fast Charging and Solar Power.
     */
    mode: ChargingMode | null
}

/**
 * Charging Stats Table, containing predicted finish time, kWh, km, price, CO2 emissions, and the charging mode.
 * @param mode ChargingMode set in the Schedule page.
 */
export default function Stats({ mode }: StatsProps) {
    return(
    <Container className="statsContainer">
        <Row>
            <Col>
                <h1 className={"statsTitle"} style={{fontSize: "2.5vh"}} >Predicted finish time</h1>
            </Col>
        </Row> 
        <Row>
            <Col>
                <h1 className="finishTime" style={{fontSize: "4.5vh"}}>12 : 50</h1>
            </Col>
        </Row>    
        <Row>
            <Col>
                <Table>
                    <tbody>
                    <tr>
                        <td style={{fontSize: "1.5vh"}}>kWh charged . . . . . . . .</td>
                        <td style={{fontSize: "1.5vh"}}>13.2 out of 30</td>
                    </tr>
                    <tr>
                        <td style={{fontSize: "1.5vh"}}>km charged . . . . . . . . .</td>
                        <td style={{fontSize: "1.5vh"}}>22 out of 50</td>
                    </tr>
                    <tr>
                        <td style={{fontSize: "1.5vh"}}>Mode . . . . . . . . . . . . . . .</td>
                        <td style={{fontSize: "1.5vh"}}>{mode}</td>
                    </tr>
                    <tr>
                        <td style={{fontSize: "1.5vh"}}>Price . . . . . . . .</td>
                        <td style={{fontSize: "1.5vh"}}>4.20 euros</td>
                    </tr>
                    <tr>
                        <td style={{fontSize: "1.5vh"}}>CO2 emmisions . . . . . . . . .</td>
                        <td style={{fontSize: "1.5vh"}}>57</td>
                    </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>);
};