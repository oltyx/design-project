import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../../styles/feedback.scss';
import TextField from '../styled/TextField';
import { Checkbox } from '../styled/Checkbox';


interface CommentsProps {
    submitted: boolean,
}

export default function Comments({submitted, ...props}: CommentsProps) {
    const [canCheck, setCanCheck] = useState(true);

    return(
        <Container className="commentsContainer">
            <Row>
                <Col>
                    <Checkbox name={"option1"} style={{marginBottom: "2rem"}} text={"I love it!"}></Checkbox>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Checkbox name={"option2"} style={{marginBottom: "2rem"}} text={"Easy to use"}></Checkbox>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Checkbox name={"option3"} style={{marginBottom: "2rem"}} text={"Annoying"}></Checkbox>  
                </Col>
            </Row>
            <Row>
                <Col>
                    <Checkbox name={"option4"} style={{marginBottom: "2rem"}} text={"Too much graphics"}></Checkbox>
                </Col>
            </Row>
            <Row style={{marginBottom: "5rem"}}>
                <Col>
                    <TextField name={"optional"}/>
                </Col>
            </Row>
        </Container>
    );
}