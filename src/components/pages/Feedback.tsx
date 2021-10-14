import React from 'react';
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Container, Row, Col, Button, Form, FormGroup, ButtonGroup, Input, Label } from 'reactstrap';
import { FaTimes } from 'react-icons/fa';

import '../../styles/feedback.scss';
import '../../styles/lightMode.scss';
import '../styled/Checkbox';
import '../widgets/Rating';
import '../styled/TextField';
import Rating from '../widgets/Rating';
import Comments from '../widgets/Comments';


type Inputs = {
    rating: number,
    comment: string,
    optional: string,
  };

type FeedbackProps = {
    user?: {
        name?: string,
        surname?: string,

    }
}


export default function Feedback(props: FeedbackProps) {
    const form = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  
    return (
        <Container className="feedback">
            <Row className="exitRow">
                <Col>
                    <Button className="exitButton"><FaTimes/></Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormProvider {...form}>
                        <Form onSubmit={form.handleSubmit(onSubmit)}>
                        <Label>Hey {props.user?.name}, please rate us!</Label>
                            <FormGroup>
                                <Rating></Rating>
                            </FormGroup>
                            <FormGroup>
                                <Comments/>
                            </FormGroup>
                            <Button className="globalButton" onClick={form.handleSubmit(onSubmit)}>Submit</Button>
                        </Form>  
                    </FormProvider> 
                </Col>
            </Row>
        </Container>
    );
}