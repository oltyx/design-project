import React, {useCallback} from 'react';
import { useHistory, withRouter  } from "react-router-dom";
import { Button, Col, Container, Row } from 'reactstrap';
import EvCar from '../../assets/ev_car.svg';
import '../../styles/lightMode.scss';
import '../../styles/start.scss';
import { GlobalButton } from '../styled/Button';

interface StartProps {name?: string}

// Landing page
export default function Start({name, ...props}:StartProps) {
    const history = useHistory();

    const handleClick = useCallback( () => {
        history.push("/schedule");
    }, [history]);

    return(
        <Container className={"startPage"} fluid={true}>
            <Row >
                <Col>
                    <h1 className={"responsiveTitle"}>
                        Hello, {name}!
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
            </Row>
            <Row className={"startRow4"}>
                <Col>
                    <GlobalButton text={"Set"} onClick={handleClick}/>
                </Col>
            </Row>
        </Container>
    )
}