import React from 'react';
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Container, Row, Col, Button, Form, FormGroup, ButtonGroup, Input, Label } from 'reactstrap';
import { BsX } from 'react-icons/bs';

import '../../styles/feedback.scss';
import '../../styles/lightMode.scss';
import '../styled/Checkbox';
import '../widgets/Rating';
import '../styled/TextField';
import Rating from '../widgets/Rating';
import Comments from '../widgets/Comments';
import { GlobalButton } from '../styled/Button';


type Inputs = {
    rating: number,
    comment: string,
    optional: string,
  };

interface FeedbackProps {
    user?: {
        name?: string,
        surname?: string,
    }
}


export default function Feedback(props: FeedbackProps) {
    const form = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log("data");

    return (
        <Container className="feedback">
            <Row className={"feedbackRow1"}>
                <Col>
                    <Button className="exitButton"><BsX style={{height:"5vh", width: "5vh"}}/></Button>
                </Col>
            </Row>
            <Row className={"feedbackRow2"}>
                <Col className={"flexbox"} style={{height: "100%"}}>
                    <FormProvider {...form}>
                    <Form className={"flexbox"} style={{height: "100%"}}onSubmit={form.handleSubmit(onSubmit)}>                            
                            <FormGroup className={"flexbox"}>
                                <h1 className={"responsiveText"}>Hey {props.user?.name}, please rate us!</h1>
                                <Rating></Rating>
                            </FormGroup>
                            <FormGroup className={"flexbox"}>
                                <Comments/>
                            </FormGroup>
                    </Form>
                </FormProvider>
                </Col>
            </Row>
            <Row>
                <Col>
                    <GlobalButton text={"Submit"} onClick={form.handleSubmit(onSubmit)}/>
                </Col>
            </Row>
        </Container>
        
       
    );
}
