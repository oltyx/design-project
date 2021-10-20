import React from 'react';
import { useHistory, withRouter  } from "react-router-dom";
import { Button, Container, Row, Col, Label} from 'reactstrap'

import EvCar from '../../assets/ev_car.svg';
import { GlobalButton } from '../styled/Button';
import Stats from '../widgets/Stats';
import ProgressBar from '../widgets/ProgressBar';
import '../../styles/chargingSession.scss';


// Page for the charging session as it goes on ("Session Page" on Figma)
export default function ChargingSession() {
    let history = useHistory();

    function handleClick() {
        history.push("/feedback");
    }
    return(
    <Container className="chargingSession">
        <Row>
            <Col>
                <Label className="chargingTitle">Departure at 13 : 15</Label>
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
                <GlobalButton text={"Stop"} onClick={handleClick}/>
            </Col>
        </Row>
    </Container>
    );
};