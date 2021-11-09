/**
 * Schedule page, allows the user to set their preferences for the charging session.
 */
import React, {useCallback, useEffect, useState} from 'react';
import { Container, Row, Col, Form, FormGroup, Alert, Navbar, Nav, NavItem} from 'reactstrap';
import { FormProvider, SubmitHandler, useForm, useWatch} from 'react-hook-form';

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
import * as Types from "../../App";

/**
 * TODO add docs
 */
type ScheduleInput = {
    arrival: Date,
    departure: Date,
    finished: Date,
    isAborted: boolean,
    mode: ChargingMode | null ,
    price: number,
    CO2: number,
    desiredEnergy: number,
    actualEnergy: number,
  };

/**
 * TODO add docs
 */
interface ScheduleProps {
    settings: Types.SessionType;
    setSettings: (values: Types.SessionType) => void,
}

/**
 * Constructs the page.
 * @param settings         Seetings of the charging session: mode, departure time and etc. (defined in App.tsx)
 * @param setSettings      Setter for the state
 */
export default function Schedule({settings, setSettings}: ScheduleProps) {
    const history = useHistory();
    /**
     * Default values of the selectors.
     */
    const initialValues = {
        arrival: new Date(),
        departure: new Date(),
        finished: new Date(),
        isAborted: false,
        mode: null,
        price: 0,
        CO2: 0,
        desiredEnergy: 0,
        actualEnergy: 0,
    }
    const form = useForm({
        defaultValues: {...initialValues},
    });

    const [alert, setAlert] = useState<boolean>(false);
    
    const price = useWatch({control: form.control, name: "price"});
    const CO2 = useWatch({control: form.control, name: "CO2"});

    useEffect(() => {
        const values = {
            hour: form.getValues("departure").getHours(),
            minutes: form.getValues("departure").getMinutes(),
            mode: form.getValues("mode"),
            price: form.getValues("price"),
            energy: form.getValues("desiredEnergy"),
            CO2: form.getValues("CO2"),
        }
        setSettings({...values})
    }, [form]);

    // Actions when submitting the form
    const onSubmit: SubmitHandler<ScheduleInput> = useCallback((data) => {
        if (form.getValues("desiredEnergy") !== 0 && form.getValues("mode") != null) {
            console.log(data, form);
            history.push("/session"); 
        } else {
            console.log(form)
            setAlert(true);
            setTimeout(()=>{setAlert(false)},2000);
        }
    }, [history, form])

    // Resulting page
    return(
        <Container className="schedule">
            <Navbar className={"navbarSchedule"} light sticky={"top"}>
                <Nav style={{width: "100%"}} navbar>
                    <NavItem>
                        <Container>
                            <Row>
                                <Col style={{paddingLeft: "2rem"}}><h4 style={{fontSize: "2vh"}}>Price: €{ price ? price.toFixed(2) : 0}</h4></Col>
                                <Col style={{textAlign: "center"}}><h4 style={{fontSize: "2vh"}}>CO2: {CO2 ? CO2.toFixed(1) : 0}g </h4></Col>
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
                                <TimeSelector/>
                            </FormGroup>
                            <FormGroup style={{marginTop: "1rem"}}>
                                <StepIcon step={"2"} text={"Select Desired Energy"}/>
                                <EnergySelector/>
                            </FormGroup>
                            <FormGroup style={{marginTop: "1rem"}}>
                                <StepIcon step={"3"} text={"Select Charging Mode"}/>
                                <ModeSelector/>
                            </FormGroup>
                            <FormGroup style={{marginTop: "1rem"}}>
                                <StepIcon step={"4"} text={"Checkout the schedule!"}/>
                                <Graph/>
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
