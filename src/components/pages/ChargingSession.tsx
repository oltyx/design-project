import React, {useCallback, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import EvCar from '../../assets/ev_car.svg';
import { GlobalButton } from '../styled/Button';
import Stats from '../widgets/Stats';
import ProgressBar from '../widgets/ProgressBar';
import '../../styles/chargingSession.scss';
import useProgress from "../../hooks/useProgress.js";
import * as Types from "../../App";


interface ChargingSessionProps {
    settings: Types.SessionType;
    setSettings: React.Dispatch<React.SetStateAction<Types.SessionType>>,
}


// Page for the charging session as it goes on ("Session Page" on Figma)
export default function ChargingSession({ settings, setSettings }: ChargingSessionProps) {
    const [modal, setModal] = useState(false);
    const handleYes = () => {
        setModal(!modal);
        history.push("/feedback");
    }
    const handleCancel = () => setModal(!modal);

    const [sessionTitle, setSessionTitle] = useState<string>("Departure at ");
    const [button, setButton] = useState<string>("Stop");
    const [time, setTime] = useState<string>(settings.hour + " : " + settings.minutes);
    const { progress, getProgress } = useProgress();
    const [finished, setFinished] = useState<boolean>(false);

    const today = new Date();

    const history = useHistory();

    const handleClick = useCallback(() => {
        if (finished) {
            history.push("/feedback");
        }  else {
            setModal(!modal);
        }
    }, [history, button, today]);

    useEffect(() => {
        getProgress();
        const interval = setInterval(() =>
            getProgress(), 250)
        return () => {
            clearInterval(interval);
        }
    }, [progress])

    useEffect(() => {
        if(progress === 100){
            setFinished(true);
            setTime("");
            setSessionTitle("Charging it's done!");
            setButton("Finish");
        }
    }, [progress, finished, time, sessionTitle, button])

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
                        alt="Generic car"/>
                </Col>
            </Row>
            <Row className={"w-100"}>
                <Col>
                    <ProgressBar
                        value={progress}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Stats mode={settings.mode}/>
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
                            <Button className="yesButton" onClick={handleYes}>Yes</Button>
                            <Button className="cancelButton" onClick={handleCancel}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
        </Container>
    );
};