import React, { useCallback, useState } from 'react';
import { SubmitHandler, FormProvider, useFormContext, UseFormReturn, FieldValues, useForm } from "react-hook-form";
import { Alert, Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';
import { BsX } from 'react-icons/bs';

import '../../styles/feedback.scss';
import '../../styles/lightMode.scss';
import '../styled/Checkbox';
import '../widgets/Rating';
import '../styled/TextField';
import Rating from '../widgets/Rating';
import Comments from '../widgets/Comments';
import { GlobalButton } from '../styled/Button';
import { useHistory } from 'react-router';
import {Inputs} from '../pages/Schedule';


interface FeedbackProps {
    user?: {
        name?: string,
        surname?: string,
    }
    sessionId?: number,
    [x: string]: any
}

export default function Feedback({...props}: FeedbackProps) {
    const history = useHistory();
    const initialValues = {
        sessionId: props.sessionId,
        rating: null,
        suggestedComment: '',
        openComment: '',
    }
    const form = useForm({
        defaultValues: {...initialValues},
    });

    const [submitted, setSubmitted] = useState(false);
    const onSubmit: SubmitHandler<Inputs> = useCallback((data) => {
        console.log(data);
        setSubmitted(true)
        setTimeout(() => {history.push("/")}, 3000);
    },[history])

    const handleClick = useCallback(() => {
        setTimeout(() => {history.push("/")}, 3000);
    }, [history]);

    return (
        <Container className="feedback p-0">
            {submitted ?
            <Row><Col>
            <Alert color="success"> Thank you for your feedback!</Alert>
            </Col></Row>    
            : null}
            <Row className={"w-100"}>
                <Col className="p-0">
                    <Button className="exitButton" onClick={handleClick}><BsX style={{height: "5vh", width: "5vh"}}/></Button>
                </Col>
            </Row>
            <Row className={"h-100"}>
                <Col style={{alignSelf: "center"}}>
                    <FormProvider {...form}>
                        <Form className={"feedbackForm"} onSubmit={form.handleSubmit(onSubmit)}>                            
                                <FormGroup className={"centerFlexbox"}>
                                    <h1 className={"responsiveText"}>Hey {props.user?.name}, please rate us!</h1>
                                    <Rating></Rating>
                                    <Comments submitted={submitted}/>
                                </FormGroup>
                                <GlobalButton text={"Submit"} type={"submit"}/>
                        </Form>
                    </FormProvider>
                </Col>
            </Row>
        </Container> 
    );
}
