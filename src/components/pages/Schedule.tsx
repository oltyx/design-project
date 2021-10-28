import React, {useCallback, useEffect, useState} from 'react';
import { Container, Row, Col, Form, FormGroup, Alert, Navbar, Nav, NavItem} from 'reactstrap';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';

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
import '../../styles/schedule.scss';
import StepIcon from '../styled/StepIcon';



type ScheduleInput = {
    arrival: Date,
    departure: Date,
    finished: Date,
    isAborted: boolean,
    mode: ChargingMode | null ,
    price: number,
    desiredEnergy: number,
    actualEnergy: number,
  };

interface ScheduleProps {
}

const DEFAULT_TIME = {hour: 17, minutes: 30};
//const DEFAULT_CHARGE: number = 0;
const DEFAULT_MODE: ChargingMode | null = null;

// Scheduling page
export default function Schedule({...props}: ScheduleProps) {
    const history = useHistory();
    const initialValues = {
        arrival: new Date(),
        departure: new Date(),
        finished: new Date(),
        isAborted: false,
        mode: DEFAULT_MODE,
        price: 0,
        desiredEnergy: 0,
        actualEnergy: 0,
    }
    const form = useForm({
        defaultValues: {...initialValues},
    });

    const [hour , setHour] = useState<number>(DEFAULT_TIME.hour);
    const [minutes, setMinutes] = useState<number>(DEFAULT_TIME.minutes);
    const [mode, setMode] = useState<ChargingMode | null>(DEFAULT_MODE);
    const [price, setPrice] = useState<number>(0);
    const [emissions, setEmissions] = useState<number>(0);
    const [alert, setAlert] = useState<boolean>(false);

    console.log("valid: ", form.formState.isValid, alert)

    const onSubmit: SubmitHandler<ScheduleInput> = useCallback((data) => {
        if (form.formState.isValid && mode != null) {
            console.log(data);
            history.push("/session"); 
        } else {
            setAlert(true);
            setTimeout(()=>{setAlert(false)},2000);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
              });
            console.log(form.formState.errors);
        }
    }, [history, form, mode])

    return(
        <Container className="schedule">
            <Navbar className={"navbarSchedule"} light sticky={"top"}>
                <Nav style={{width: "100%"}} navbar>
                    <NavItem>
                        <Container>
                            <Row>
                                <Col style={{paddingLeft: "2rem"}}><h4 style={{fontSize: "2vh"}}>Price: €{price.toFixed(2)}</h4></Col>
                                <Col style={{textAlign: "center"}}><h4 style={{fontSize: "2vh"}}>CO2 Emissions: {emissions.toFixed(1)}g </h4></Col>
                            </Row>
                        </Container>
                    </NavItem>
                </Nav>
            </Navbar>
            <Alert className={"scheduleAlert"} isOpen={alert} color="danger"> Energy and mode are required</Alert>
            <Row style={{marginRight: "1rem", marginLeft: "1rem"}}>
                <Col>
                    <FormProvider {...form}>
                        <Form onSubmit={form.handleSubmit(onSubmit)}>                            
                            <FormGroup style={{marginTop: "1rem"}}>
                                <StepIcon step={"1"} text={"Select Departure Time"}/>
                                <TimeSelector hour={hour} setHour={setHour} minutes={minutes} setMinutes={setMinutes} />
                            </FormGroup>
                            <FormGroup style={{marginTop: "1rem"}}>
                                <StepIcon step={"2"} text={"Select Energy Consumption"}/>
                                <EnergySelector/>
                            </FormGroup>
                            <FormGroup style={{marginTop: "1rem"}}>
                                <StepIcon step={"3"} text={"Select Charging Mode"}/>
                                <ModeSelector mode={mode} setMode={setMode}/>
                            </FormGroup>
                            <FormGroup style={{marginTop: "1rem"}}>
                                <StepIcon step={"4"} text={"Checkout the schedule!"}/>
                                <Graph endHr={hour} endMin={minutes} mode={mode} setPrice={setPrice} setEmissions={setEmissions}/>
                            </FormGroup>
                            <FormGroup style={{textAlign: "center"}}>
                                <GlobalButton text={"Go"} type={"submit"}/>
                            </FormGroup>
                        </Form>
                    </FormProvider>
                </Col>
            </Row>
        </Container>
    );
};
