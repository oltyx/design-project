import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Label} from 'reactstrap';

import EvCar from '../../assets/ev_car.svg';
import { GlobalButton } from '../styled/Button';
import Stats from '../widgets/Stats';
import ProgressBar from '../widgets/ProgressBar';
import '../../styles/chargingSession.scss';


// Page for the charging session as it goes on ("Session Page" on Figma)
export default function ChargingSession() {

    const[sessionTitle, setSessionTitle] = useState("Departure at ");
    const[button, setButton] = useState("Stop");
    const[time, setTime] = useState("13 : 15");
    var today = new Date();

    let history = useHistory();

    function handleClick() {
        if (button==="Stop") {
            setTime(today.getHours() + ' : ' + today.getMinutes());
            setSessionTitle("Aborted at ");
            setButton("Finish");
        } else {
            history.push("/feedback");
        }
    };

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
        <Row>
            <Col>
                <ProgressBar/>
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
    </Container>
    );
};