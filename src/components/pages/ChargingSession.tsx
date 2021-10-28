import React, {useCallback, useState} from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import EvCar from '../../assets/ev_car.svg';
import { GlobalButton } from '../styled/Button';
import Stats from '../widgets/Stats';
import ProgressBar from '../widgets/ProgressBar';
import '../../styles/chargingSession.scss';

interface ChargingSessionProps {
    hour: number,
    setHour: (hour: number) => void,
    minutes: number,
    setMinutes: (hour: number) => void
}

// Page for the charging session as it goes on ("Session Page" on Figma)
export default function ChargingSession({ hour, setHour, minutes, setMinutes}: ChargingSessionProps) {
    const [modal, setModal] = useState(false);
    const handleYes = () => {
        setModal(!modal);
        setTime(hour + ' : ' + minutes);
        setSessionTitle("Aborted at ");
        setButton("Finish");
        setStyle("linear-gradient(to bottom, #F07878 0%, #9D1616 100%)");
    }
    const handleCancel = () => setModal(!modal);

    const [sessionTitle, setSessionTitle] = useState("Departure at ");
    const [button, setButton] = useState("Stop");
    const [time, setTime] = useState(hour + " : " + minutes);
    const [style, setStyle] = useState("linear-gradient(to bottom, #9AE09A 0%, #44BE44 100%)");

    const today = new Date();

    const history = useHistory();

    const handleClick = useCallback(() => {
        if (button==="Stop") {
            setModal(true);
        } else {
            history.push("/feedback");
        }
    }, [history, button, today]);

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
                    <ProgressBar style={style}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Stats/>
                </Col>
            </Row>
            <Row style={{marginBottom: "1rem"}}> 
                <Col>
                    <GlobalButton text={button} onClick={handleClick}/>
                </Col>
            </Row>
            {/* <Row> 
                <Col > */}
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
                {/* </Col>
            </Row> */}
        </Container>
    );
};