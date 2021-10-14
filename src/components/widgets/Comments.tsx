import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, ButtonGroup, Input, Label } from 'reactstrap';

import '../../styles/feedback.scss';
import TextField from '../styled/TextField';
import { Checkbox } from '../styled/Checkbox';


export default function Comments() {
    return(
        <Container className="commentsContainer">
            <Row className="commentsRow">
                <Col className="commentsCol">
                    <Checkbox name={"option1"} text={"I love it!"}></Checkbox>
                    <Checkbox name={"option2"} text={"Easy to use"}></Checkbox>
                    <Checkbox name={"option3"} text={"Annoying"}></Checkbox>
                    <Checkbox name={"option4"} text={"Too much graphics"}></Checkbox>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextField/>
                </Col>
            </Row>

        </Container>
    );
}