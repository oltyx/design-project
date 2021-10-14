import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, ButtonGroup, Input, Label } from 'reactstrap';

import '../../styles/feedback.scss';
import TextField from '../styled/TextField';
import { Checkbox } from '../styled/Checkbox';


export default function Comments() {
    return(
        <Container className="commentsContainer">
            <Row>
                <Col className="commentsCol">
                    <Checkbox name={"option1"} text={"Good graphics"}></Checkbox>
                    <Checkbox name={"option2"} text={"Good graphics"}></Checkbox>
                    <Checkbox name={"option3"} text={"Good graphics"}></Checkbox>
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