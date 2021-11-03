/**
 * @module
 * Schedule page, allows the user to set their preferences for the charging session.
 */
import React, {useCallback, useState} from 'react';
import { Container, Row, Col, Form, FormGroup, Alert, Navbar, Nav, NavItem} from 'reactstrap';
import { FormProvider, SubmitHandler, useForm} from 'react-hook-form';

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
    desiredEnergy: number,
    actualEnergy: number,
  };

/**
 * TODO add docs
 */
interface ScheduleProps {
    // mode: ChargingMode | null,
    // setMode: (mode: ChargingMode | null) => void,
    // hour: number,
    // setHour: (hour: number) => void,
    // minutes: number,
    // setMinutes: (hour: number) => void
    state: Types.SessionType;
    setState: React.Dispatch<React.SetStateAction<Types.SessionType>>,
}

/**
 * Constructs the page.
 * @param mode          Current charging mode
 * @param setMode       Setter for the mode field
 * @param hour          Current hour part of the departure time
 * @param setHour       Setter for the hour field
 * @param minutes       Current minutes part of the departure time
 * @param setMinutes    Setter for the minutes field
 * @param props         Any other properties, currently not used
 */
export default function Schedule({state, setState, ...props}: ScheduleProps) {
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
        desiredEnergy: 0,
        actualEnergy: 0,
    }
    const form = useForm({
        defaultValues: {...initialValues},
    });


    // const [price, setPrice] = useState<number>(0);
    // const [emissions, setEmissions] = useState<number>(0);
    const [alert, setAlert] = useState<boolean>(false);

    // Actions when submitting the form
    const onSubmit: SubmitHandler<ScheduleInput> = useCallback((data) => {
        if (form.formState.isValid && state.mode != null) {
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
    }, [history, form, state.mode])

    // Resulting page
    return(
        <Container className="schedule">
            <Navbar className={"navbarSchedule"} light sticky={"top"}>
                <Nav style={{width: "100%"}} navbar>
                    <NavItem>
                        <Container>
                            <Row>
                                <Col style={{paddingLeft: "2rem"}}><h4 style={{fontSize: "2vh"}}>Price: €{ state.price ? state.price.toFixed(2) : 0}</h4></Col>
                                <Col style={{textAlign: "center"}}><h4 style={{fontSize: "2vh"}}>CO2: {state.CO2 ? state.CO2.toFixed(1) : 0}g </h4></Col>
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
                                <TimeSelector state={state} setState={setState} />
                            </FormGroup>
                            <FormGroup style={{marginTop: "1rem"}}>
                                <StepIcon step={"2"} text={"Select Energy Consumption"}/>
                                <EnergySelector/>
                            </FormGroup>
                            <FormGroup style={{marginTop: "1rem"}}>
                                <StepIcon step={"3"} text={"Select Charging Mode"}/>
                                <ModeSelector state={state} setState={setState} />
                            </FormGroup>
                            <FormGroup style={{marginTop: "1rem"}}>
                                <StepIcon step={"4"} text={"Checkout the schedule!"}/>
                                <Graph state={state} setState={setState}/>
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
