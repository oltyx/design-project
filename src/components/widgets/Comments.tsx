import React, { useState } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';

import '../../styles/feedback.scss';
import TextField from '../styled/TextField';
import { Checkbox } from '../styled/Checkbox';


export default function Comments() {
    const [canCheck, setCanCheck] = useState(true);

    return(
        <Container className="commentsContainer">
            <Row>
                <Col>
                    <Checkbox name={"option1"} text={"I love it!"}></Checkbox>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Checkbox name={"option2"} text={"Easy to use"}></Checkbox>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Checkbox name={"option3"} text={"Annoying"}></Checkbox>  
                </Col>
            </Row>
            <Row>
                <Col>
                    <Checkbox name={"option4"} text={"Too much graphics"}></Checkbox>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextField name={"optional"}/>
                </Col>
            </Row>
        </Container>
    );
}