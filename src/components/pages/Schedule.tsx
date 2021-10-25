import React, {useCallback, useState} from 'react';
import { Container, Row, Col} from 'reactstrap';

import '../widgets/TimeSelector';
import '../widgets/EnergySelector';
import '../widgets/ModeSelector';
import ModeSelector from "../widgets/ModeSelector";
import TimeSelector from "../widgets/TimeSelector";
import EnergySelector from "../widgets/EnergySelector";
import Graph from '../widgets/Graph';
import {ChargingMode} from "../../data/models/ChargingMode";
import {GlobalButton} from "../styled/Button";
import {useHistory} from "react-router-dom";
import {getEmissions, getPrice} from "../../assets/profile-steering/PriceEmissions";
import '../../styles/schedule.scss';

const DEFAULT_TIME = {hour: 17, minutes: 30};
const DEFAULT_CHARGE: number = 0;
const DEFAULT_MODE: ChargingMode | null = null;

// Scheduling page
export default function Schedule() {
    const history = useHistory();

    const handleClick = useCallback(() => {
        history.push("/session");
    }, [history])

    const [hour , setHour] = useState<number>(DEFAULT_TIME.hour);
    const [minutes, setMinutes] = useState<number>(DEFAULT_TIME.minutes);
    const [energy, setEnergy] = useState<number>(DEFAULT_CHARGE);
    const [mode, setMode] = useState<ChargingMode | null>(DEFAULT_MODE);
    const [price, setPrice] = useState<number>(0);
    const [emissions, setEmissions] = useState<number>(0);

    return(
        <Container className="schedule">
            <Row>
                <Col>
                    Select Departure Time
                    <TimeSelector hour={hour} setHour={setHour} minutes={minutes} setMinutes={setMinutes} />
                </Col>
            </Row>
            <Row className="energyRow">
                <Col>
                    Select Energy Consumption
                    <EnergySelector energy={energy} setEnergy={setEnergy}/>
                </Col>
            </Row>
            <Row className="modeRow">
                <Col>
                    Select Charging Mode
                    <ModeSelector mode={mode} setMode={setMode}/>
                </Col>
            </Row>
            <Row className="graphRow">
                <Col>
                    Charging Schedule
                    <Graph chargeRequired={energy} endHr={hour} endMin={minutes} mode={mode} setPrice={setPrice} setEmissions={setEmissions}/>
                </Col>
            </Row>
            <Row className="goButtonRow">
                <Col>
                    <GlobalButton text={"Go"} onClick={handleClick}/>
                </Col>
            </Row>
        </Container>
    );
};
