import React, {useCallback, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import EvCar from '../../assets/ev_car.svg';
import { GlobalButton } from '../styled/Button';
import Stats from '../widgets/Stats';
import ProgressBar from '../widgets/ProgressBar';
import '../../styles/chargingSession.scss';
import {ChargingMode} from "../../data/models/ChargingMode";
import useProgress from "../../hooks/useProgress.js";
import { UseFormReturn } from 'react-hook-form';

interface ChargingSessionProps {
    mode: ChargingMode | null,
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

// Page for the charging session as it goes on ("Session Page" on Figma)
export default function ChargingSession({ mode, form, ...props}: ChargingSessionProps) {
    const hour = form.getValues("departure").getHours();
    const minutes = form.getValues("departure").getMinutes();

    const [modal, setModal] = useState(false);
    const [sessionTitle, setSessionTitle] = useState("Departure at ");
    const [button, setButton] = useState("Stop");
    const [time, setTime] = useState(hour + " : " + minutes);
    const [style, setStyle] = useState("linear-gradient(to bottom, #9AE09A 0%, #44BE44 100%)");
    const [progress, getProgress] = useProgress();

    const handleYes = () => {
        setModal(!modal);
        setTime(hour + ' : ' + minutes);
        setSessionTitle("Aborted at ");
        setButton("Finish");
        setStyle("linear-gradient(to bottom, #F07878 0%, #9D1616 100%)");
    }
    const handleCancel = () => setModal(!modal);

    const today = new Date();

    const history = useHistory();

    const handleClick = useCallback(() => {
        if (button==="Stop") {
            setModal(true);
        } else {
            history.push("/feedback");
        }
    }, [history, button, today]);


    // const [alerts, setAlerts] = useState([])

    useEffect(() => {
        // @ts-ignore
        getProgress();
        const interval = setInterval(() =>
            //@ts-ignore
            getProgress(), 700)
        return () => {
            clearInterval(interval);
        }
    }, [])

    const yesButtonStyle = {
        backgroundImage: "linear-gradient(to bottom, #7ACD7A 0%, #337433 100%)",
        border: "none",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    }

    const cancelButtonStyle = {
        backgroundImage: "linear-gradient(#F07878 0%, #9D1616 100%)",
        border: "none",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    }

    return(
        <Container className="chargingSession">
            <Row style={{marginTop: "2rem"}}>
                <Col>
                    <h1 className="chargingTitle">{sessionTitle} {time}</h1>
                </Col>
            </Row>
            <Row style={{alignContent: "center", width: "100%"}}>
                <Col>
                    <img className={"carStyle"}
                        src={EvCar}
                        alt="Generic car"
                    />
                </Col>
            </Row>
            <Row className={"w-100"}>
                <Col>
                    <ProgressBar
                        //@ts-ignore
                        value={progress}
                        style={style}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Stats mode={mode}/>
                </Col>
            </Row>
            <Row style={{marginBottom: "1rem"}}> 
                <Col>
                    <GlobalButton text={button} onClick={handleClick}/>
                </Col>
            </Row>
                <Modal isOpen={modal}>
                    <ModalHeader style={{background: "rgba(255, 255, 255, 0.5)"}}>Confirmation</ModalHeader>
                    <ModalBody style={{background: "rgba(255, 255, 255, 0.5)"}}>
                        Are you sure you want to abort the charging session?
                    </ModalBody>
                    <ModalFooter style={{background: "rgba(255, 255, 255, 0.5)"}}>
                        <Button onClick={handleYes} style={yesButtonStyle}>Yes</Button>
                        <Button onClick={handleCancel} style={cancelButtonStyle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
        </Container>
    );
};