import React, {useCallback, useState} from 'react';
import { Container, Row, Col, Form, FormGroup} from 'reactstrap';

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
import { FieldValues, FormProvider, useForm, UseFormReturn } from 'react-hook-form';


export type Inputs = {
    arrival: Date,
    departure: Date,
    finished: Date,
    isAborted: boolean,
    mode: string,
    price: number,
    desiredEnergy: number,
    actualEnergy: number,
    rating: number,
    comment: string,
    optional: string,
  };

interface ScheduleProps {
}

const DEFAULT_TIME = {hour: 17, minutes: 30};
const DEFAULT_CHARGE: number = 0;
const DEFAULT_MODE: ChargingMode = ChargingMode.Smart;



// Scheduling page
export default function Schedule({...props}: ScheduleProps) {
    const history = useHistory();
    const form = useForm();

    const handleClick = useCallback(() => {
        history.push("/session");
    }, [history])

    const [hour , setHour] = useState<number>(DEFAULT_TIME.hour);
    const [minutes, setMinutes] = useState<number>(DEFAULT_TIME.minutes);
    const [energy, setEnergy] = useState<number>(DEFAULT_CHARGE);
    const [mode, setMode] = useState<ChargingMode>(DEFAULT_MODE);
    const [price, setPrice] = useState<number>(0);
    const [emissions, setEmissions] = useState<number>(0);

    return(
        <Container className="schedule" fluid={true}>
            <Row>
                <Col>
                    <FormProvider {...form}>
                        <Form>                            
                            <FormGroup>
                                Select Departure Time
                                <TimeSelector hour={hour} setHour={setHour} minutes={minutes} setMinutes={setMinutes} />
                            </FormGroup>
                            <FormGroup>
                                Select Energy Consumption
                                <EnergySelector energy={energy} setEnergy={setEnergy}/>
                            </FormGroup>
                            <FormGroup>
                                Select Charging Mode
                                <ModeSelector mode={mode} setMode={setMode}/>
                            </FormGroup>
                            <FormGroup>
                                Charging Schedule
                                <Graph chargeRequired={energy} endHr={hour} endMin={minutes} mode={mode} setPrice={setPrice} setEmissions={setEmissions}/>
                            </FormGroup>
                            <FormGroup style={{textAlign: "center"}}>
                                <GlobalButton text={"Go"} onClick={handleClick}/>
                            </FormGroup>
                        </Form>
                    </FormProvider>
                </Col>
            </Row>
        </Container>
    );
};
