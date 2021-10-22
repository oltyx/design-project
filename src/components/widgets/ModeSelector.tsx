import React, {useState} from 'react';

import {ChargingMode} from "../../data/models/ChargingMode";
import {Button} from "reactstrap";
import {MdOfflineBolt, MdWbSunny} from "react-icons/all";
import { Container, Row, Col } from 'reactstrap';
import '../../styles/schedule.scss';

interface Mode {mode: ChargingMode, setMode: (newValue: ChargingMode) => void};

// Selector for Fast mode or Smart mode
export default function ModeSelector({mode, setMode}: Mode) {

    // Set a class based on being selected or deselected
    let fast: string = mode === ChargingMode.Fast? "selected" : "deselected";
    let smart: string = mode === ChargingMode.Smart? "selected" : "deselected";

    return(
        <Container className="modeSelector">
            <Row>
                <Col className="fastCol">
                    <Button className={fast} onClick={() => setMode(ChargingMode.Fast)}>
                        <MdOfflineBolt className={fast} style={{height: "2vh", width: "5vh"}}/>
                        <h4>Fast Charging</h4>
                    </Button>
                </Col>
                <Col className="solarCol" >
                    <Button className={smart} onClick={() => setMode(ChargingMode.Smart)}>
                        <MdWbSunny className={smart} style={{height: "2vh", width: "5vh"}}/>
                        <h4>Solar Power</h4>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}