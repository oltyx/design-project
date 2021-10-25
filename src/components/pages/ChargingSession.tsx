import React, {useCallback, useState} from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import EvCar from '../../assets/ev_car.svg';
import { GlobalButton } from '../styled/Button';
import Stats from '../widgets/Stats';
import ProgressBar from '../widgets/ProgressBar';
import '../../styles/chargingSession.scss';

      
// Page for the charging session as it goes on ("Session Page" on Figma)
export default function ChargingSession() {

    const [modal, setModal] = useState(false);
    const handleYes = () => {
        setModal(!modal);
        setTime(today.getHours() + ' : ' + today.getMinutes());
        setSessionTitle("Aborted at ");
        setButton("Finish");
        setStyle("linear-gradient(to bottom, #F07878 0%, #9D1616 100%)");
    }
    const handleCancel = () => setModal(!modal);

    const [sessionTitle, setSessionTitle] = useState("Departure at ");
    const [button, setButton] = useState("Stop");
    const [time, setTime] = useState("13 : 15");
    const [style, setStyle] = useState("linear-gradient(to bottom, #9AE09A 0%, #44BE44 100%)");

    const today = new Date();

    const history = useHistory();

    const handleClick = useCallback(() => {
        if (button==="Stop") {
            setModal(true);
        } else {
            history.push("/feedback");
        }
    }, [history, style, sessionTitle, button, time]);

    return(
        <Container className="chargingSession">
            <Row>
                <Col>
                    <Label className="chargingTitle">{sessionTitle} {time}</Label>
                </Col>
            </Row>
            <Row className={"carRow"}>
                <Col>
                    <img className={"carStyle"}
                        src={EvCar}
                        alt="Generic car"
                    />
                </Col>
            </Row>
            <Row className={"w-100"}>
                <Col>
                    <ProgressBar style={style}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Stats/>
                </Col>
            </Row>
            <Row className="buttonRow"> 
                <Col>
                    <GlobalButton text={button} onClick={handleClick}/>
                </Col>
            </Row>
            <Row> 
                <Col >
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
                </Col>
            </Row>
        </Container>
    );
};