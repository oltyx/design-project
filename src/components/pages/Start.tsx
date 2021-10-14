import React from 'react';
import { useHistory, withRouter  } from "react-router-dom";
import { Button, Col, Container, Row } from 'reactstrap';
import EvCar from '../../assets/ev_car.svg';
import '../../styles/lightMode.scss';
import '../../styles/start.scss';

// Landing page
export default function Start() {
    
  let history = useHistory();

  function handleClick() {
    history.push("/schedule");
  }
    return(
        <Container className={"startPage"} fluid={true}>

            <Row >
                <Col>
                    <h1>
                        Hello, Jos!
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    <img className={"carStyle"} src={EvCar} alt="Generic car" />
                </Col>
            </Row>

            <Row>
                <Col>
                    <h4>
                        Ready?
                    </h4>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button className={"globalButton"} onClick={() => handleClick()}>
                        Set
                    </Button>
                </Col>
            </Row>

        </Container>
    )
}