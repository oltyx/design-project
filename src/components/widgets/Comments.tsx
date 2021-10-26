import React, { useCallback, useEffect, useState } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';

import '../../styles/feedback.scss';
import TextField from '../styled/TextField';
import { Radiobox } from '../styled/Radiobox';
import { useFormContext } from 'react-hook-form';


interface CommentsProps {
    submitted?: boolean,
    [x: string]: any,
}

export default function Comments({submitted, ...props}: CommentsProps) {
    const context = useFormContext();
    const list = [
        "I love it!",
        "Easy to use",
        "Annoying",
        "Too much graphics"
    ]
    const [selected, setSelected] = useState('');

    const onChange =useCallback((e) => {
        setSelected(e.target.value)
      }, [selected]);

    useEffect(() => {
        context.setValue("suggestedComment", selected)
    }, [context, selected])

    return(
        <Container className="commentsContainer">
            <Row>
                <Col>
                    <Radiobox checked={selected === "I love it!"} onChange={(e: any) => onChange(e)} style={{marginBottom: "2rem"}} value={"I love it!"} text={"I love it!"}></Radiobox>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Radiobox checked={selected === "Easy to use"} onChange={(e: any) => onChange(e)} style={{marginBottom: "2rem"}} value={"Easy to use"} text={"Easy to use"}></Radiobox>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Radiobox checked={selected === "Annoying"} onChange={(e: any) => onChange(e)} style={{marginBottom: "2rem"}} value={"Annoying"} text={"Annoying"}></Radiobox>  
                </Col>
            </Row>
            <Row>
                <Col>
                    <Radiobox checked={selected === "Too much graphics"} onChange={(e: any) => onChange(e)} style={{marginBottom: "2rem"}} value={"Too much graphics"} text={"Too much graphics"}></Radiobox>
                </Col>
            </Row>
            <Row style={{marginBottom: "5rem"}}>
                <Col>
                    <TextField name={"openComment"}/>
                </Col>
            </Row>
        </Container>
    );
}