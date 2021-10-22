import React from 'react';
import { useHistory, withRouter  } from "react-router-dom";
import { Button, Col, Container, Row } from 'reactstrap';
import EvCar from '../../assets/ev_car.svg';
import '../../styles/lightMode.scss';
import '../../styles/start.scss';
import { GlobalButton } from '../styled/Button';

// Landing page
export default function Start() {
    
  const history = useHistory();

  function handleClick() {
    history.push("/schedule");
  }
    return(
        <Container className={"startPage"} fluid={true}>
            <Row >
                <Col>
                    <h1 className={"responsiveTitle"}>
                        Hello, Jos!
                    </h1>
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
            <Row className={"startRow3"}>
                <Col>
                    <h4 className={"responsiveSubtitle"}>
                        Ready?
                    </h4>
                </Col>
                <Col>
                    <GlobalButton text={"Set"} onClick={handleClick}/>
                </Col>
            </Row>
        </Container>
    )
}