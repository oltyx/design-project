import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';

import '../../styles/feedback.scss';
import TextField from '../styled/TextField';
import { Checkbox } from '../styled/Checkbox';
import { useFormContext } from 'react-hook-form';


interface CommentsProps {
    submitted?: boolean,
}

export default function Comments({submitted, ...props}: CommentsProps) {
    const [checked, setChecked] = useState(false);
    const context = useFormContext();

    return(
        <Container className="commentsContainer">
            <Row>
                <Col>
                    <Checkbox disabled={checked} onChange={() => checked ? setChecked(false) : setChecked(true)} name={"option1"} style={{marginBottom: "2rem"}} text={"I love it!"}></Checkbox>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Checkbox disabled={checked} onChange={() => checked ? setChecked(false) : setChecked(true)} name={"option2"} style={{marginBottom: "2rem"}} text={"Easy to use"}></Checkbox>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Checkbox disabled={checked} onChange={() => checked ? setChecked(false) : setChecked(true)} name={"option3"} style={{marginBottom: "2rem"}} text={"Annoying"}></Checkbox>  
                </Col>
            </Row>
            <Row>
                <Col>
                    <Checkbox disabled={checked} onChange={() => checked ? setChecked(false) : setChecked(true)} name={"option4"} style={{marginBottom: "2rem"}} text={"Too much graphics"}></Checkbox>
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