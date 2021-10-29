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
    mode: ChargingMode | null,
    setMode: (mode: ChargingMode | null) => void,
    form: UseFormReturn<{
        arrival: Date;
        departure: Date;
        finished: Date;
        isAborted: boolean;
        mode: ChargingMode | null;
        price: number;
        desiredEnergy: number;
        actualEnergy: number;
    }, object>,
    // hour: number,
    // setHour: (hour: number) => void,
    // minutes: number,
    // setMinutes: (hour: number) => void
}

const DEFAULT_TIME = {hour: 17, minutes: 30};

// Scheduling page
export default function Schedule({mode, setMode, form, ...props}: ScheduleProps) {
    const history = useHistory();

    const [price, setPrice] = useState<number>(0);
    const [emissions, setEmissions] = useState<number>(0);
    const [alert, setAlert] = useState<boolean>(false);
    const [timeAlert, setTimeAlert] = useState<boolean>(false);
    const [hour , setHour] = useState<number>(DEFAULT_TIME.hour);
    const [minutes, setMinutes] = useState<number>(DEFAULT_TIME.minutes);
    console.log(hour, minutes)

    const onSubmit: SubmitHandler<ScheduleInput> = useCallback((data) => {
        if (form.formState.isValid && mode != null && !timeAlert) {
            console.log(data);
            history.push("/session"); 
        } else if (!form.formState.isValid || mode === null) {
            setAlert(true);
            setTimeout(()=>{setAlert(false)},2000);
        } else {
            console.log(form.formState.errors);
        }
    }, [history, form, mode, timeAlert])

    useEffect(() => {
        const date = new Date();
        const departure: string = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T${hour.toString()}:${minutes.toString()}:00`;
        form.setValue("departure", new Date(departure));
    }, [form, hour, minutes])

    return(
        <Container className="schedule">
            <Navbar className={"navbarSchedule"} light sticky={"top"}>
                <Nav style={{width: "100%"}} navbar>
                    <NavItem>
                        <Container>
                            <Row>
                                <Col style={{paddingLeft: "2rem"}}><h4 style={{fontSize: "2vh"}}>Price: €{price.toFixed(2)}</h4></Col>
                                <Col style={{textAlign: "center"}}><h4 style={{fontSize: "2vh"}}>CO2: {emissions.toFixed(1)}g </h4></Col>
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
                                <TimeSelector 
                                    alert={timeAlert} 
                                    setAlert={setTimeAlert} 
                                    hour={hour} 
                                    minutes={minutes}
                                    setMinutes={setMinutes}
                                    setHour={setHour}/>
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
                                <Graph 
                                    mode={mode} 
                                    setPrice={setPrice} 
                                    setEmissions={setEmissions}
                                    endHr={hour} 
                                    endMin={minutes}/>
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
