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
    const fast: string = mode === ChargingMode.Fast? "selected" : "deselected";
    const smart: string = mode === ChargingMode.Smart? "selected" : "deselected";

    return(
        <Container className="modeSelector">
            <Row>
                <Col className="fastCol">
                    <Button className={fast} onClick={() => setMode(ChargingMode.Fast)} style={{borderTopRightRadius: "0", borderBottomRightRadius: "0"}}>
                        <MdOfflineBolt className={"modeIcon"}/>
                        <h4 className={"modeText"}>Fast Charging</h4>
                    </Button>
                </Col>
                <Col className="solarCol" >
                    <Button className={smart} onClick={() => setMode(ChargingMode.Smart)} style={{borderTopLeftRadius: "0", borderBottomLeftRadius: "0"}}>
                        <MdWbSunny className={"modeIcon"}/>
                        <h4 className={"modeText"}>Solar Power</h4>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}