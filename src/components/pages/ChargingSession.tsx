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

/**
 * Type for ChargingSession component props.
 */
interface ChargingSessionProps {
    settings: Types.SessionType;
}

/**
 * ChargingSession component of the web application. 
 * @param settings Type of Charging Session based on the user input from Schedule page.
 */
export default function ChargingSession({ settings }: ChargingSessionProps) {
    const history = useHistory();

    /**
     * Default value of pop-up.
     */
    const [modal, setModal] = useState(false);
    const mode = settings.mode;

    /**
     * The user confirms the abortion of the session.
     */
    const handleYes = useCallback(() => {

        /**
         * Modal is set to default value.
         */
        setModal(!modal);

        /**
         * The user goes to Feedback page.
         */
        history.push("/feedback");
    }, [modal, setModal, history]);

    /**
     * The user cancels the abortion and remains on ChargingSession page.
     */
    const handleCancel = useCallback(() => setModal(!modal), [modal, setModal]);
    
    /**
     * Default values of elements from ChargingSession page.
     */
    const [sessionTitle, setSessionTitle] = useState<string>("Departure at ");
    const [button, setButton] = useState<string>("Stop");
    const [finished, setFinished] = useState<boolean>(false);
    
    /**
     * Departure time
     * @param settings.hour     Hour set by user for departure.
     * @param settings.minutes  Minutes set by user for departure.
     */
    const [time, setTime] = useState<string>(settings.hour + " : " + settings.minutes);
    
    /**
     * Value of progress bar set.
     */
    const { progress, getProgress } = useProgress();


    const handleClick = useCallback(() => {
        
        /**
         * if button===finished, the user goes to Feedback page.
         */
        if (finished) {
            history.push("/feedback");
        }  else {

            /**
             * Modal becomes true, pop-up appears.
             */
            setModal(!modal);
        }
    }, [history, finished, modal]);

    /**
     * Updates the value of progress bar.
     */
    useEffect(() => {
        getProgress();
        const interval = setInterval(() =>
            getProgress(), 250)
        return () => {
            clearInterval(interval);
        }
    }, [progress, getProgress])

    /**
     * Progress bar is at 100%, the charging has finished.
     */
    useEffect(() => {
        if(progress === 100){
            setFinished(true);
            setTime("");
            setSessionTitle("Charging is done!");
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
                            <Button className="yesButton" onClick={handleYes}>Yes</Button>
                            <Button className="cancelButton" onClick={handleCancel}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
        </Container>
    );
};