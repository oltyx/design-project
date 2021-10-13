import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, ButtonGroup, Input, Label } from 'reactstrap';

import '../../styles/feedback.scss';
import TextField from '../styled/TextField';


export default function Comments() {
    return(
        <Container className="commentsContainer">
            <Row>
                <Col className="commentsCol">
                    <Button color="primary">One</Button>
                    <Button color="primary">Two</Button>
                    <Button color="primary">Three</Button>
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