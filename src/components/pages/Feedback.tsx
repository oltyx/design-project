import React, { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, FormProvider, useForm } from "react-hook-form";
import { Alert, Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';
import { BsX } from 'react-icons/bs';
import { useHistory } from 'react-router';

import '../../styles/feedback.scss';
import '../../styles/lightMode.scss';
import '../styled/Checkbox';
import '../widgets/CustomRating';
import '../styled/TextField';
import CustomRating from '../widgets/CustomRating';
import Comments from '../widgets/Comments';
import { GlobalButton } from '../styled/Button';
import TextField from '../styled/TextField';


interface FeedbackProps {
    user?: {
        name?: string,
        surname?: string,
    }
    sessionId?: number,
    [x: string]: any
}

type FeedbackInput = {
    sessionId: number,
    rating: number,
    suggestedComment: string,
    openComment: string,
}

export default function Feedback({...props}: FeedbackProps) {
    const history = useHistory();
    const initialValues = {
        sessionId: props.sessionId,
        rating: 0,
        suggestedComment: '',
        openComment: '',
    }
    const values = [
        "I love it!",
        "Easy to use",
        "Annoying",
        "Too much graphics"
    ]

    const form = useForm({
        defaultValues: { ...initialValues },
        mode: "onBlur",
    });

    const [alertText, setAlertText] = useState<string>("Please rate us next time! Your feedback is very important for us :)")

    const onSubmit: SubmitHandler<FeedbackInput> = useCallback((data) => {
        console.log(data);
        setTimeout(() => {history.push("/")}, 3000);
    },[history])

    const quit = useCallback(() => {
        setTimeout(() => {history.push("/")}, 3000);
    }, [history]);

    const hasFeedback = form.formState.isDirty && Object.keys(form.formState.touchedFields).length !== 0;

    useEffect(() => {
        if (hasFeedback) {
            setAlertText("Thank you for our feedback!")
        }
    }, [form, alertText, hasFeedback])

    return (
        <Container className="feedback p-0">
            <Alert className={hasFeedback ? "feedbackAlert" : "feedbackAlertBad"} isOpen={form.formState.isSubmitted} color={hasFeedback ? "success" : "danger"}>{alertText}</Alert>
            <Row className={"w-100"}>
                <Col className="p-0">
                    <Button className="exitButton" onClick={quit}><BsX style={{height: "8vh", width: "8vh"}}/></Button>
                </Col>
            </Row>
            <Row className={"h-100"}>
                <Col style={{alignSelf: "center", height: "100%"}}>
                    <FormProvider {...form}>
                        <Form className={"feedbackForm"} onSubmit={form.handleSubmit(onSubmit)}>
                            <h1 className={"responsiveText"}>Hey {props.user?.name}, please rate us!</h1>                            
                            <FormGroup>   
                                <CustomRating name={"rating"}/>
                            </FormGroup>
                            <FormGroup style={{marginTop: "3rem", marginBottom: "3rem"}}>
                                <Comments name={"suggestedComment"} values={values}/>
                            </FormGroup>
                            <FormGroup>
                                <TextField name={"openComment"}/>
                            </FormGroup>
                            <GlobalButton text={"Submit"} type={"submit"} style={{marginTop: "auto"}}/> 
                        </Form>
                    </FormProvider>
                </Col>
            </Row>
        </Container> 
    );
}
