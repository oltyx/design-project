import React, {useCallback, useState} from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';

import EvCar from '../../assets/ev_car.svg';
import { GlobalButton } from '../styled/Button';
import Stats from '../widgets/Stats';
import ProgressBar from '../widgets/ProgressBar';
import '../../styles/chargingSession.scss';


// Page for the charging session as it goes on ("Session Page" on Figma)
export default function ChargingSession() {
    const [sessionTitle, setSessionTitle] = useState("Departure at ");
    const [button, setButton] = useState("Stop");
    const [time, setTime] = useState("13 : 15");
    const [style, setStyle] = useState("linear-gradient(to bottom, #9AE09A 0%, #44BE44 100%)")

    const today = new Date();

    const history = useHistory();

    const handleClick = useCallback(() => {
        if (button==="Stop") {
            setTime(today.getHours() + ' : ' + today.getMinutes());
            setSessionTitle("Aborted at ");
            setButton("Finish");
            setStyle("linear-gradient(to bottom, #F07878 0%, #9D1616 100%)")
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
        </Container>
    );
};