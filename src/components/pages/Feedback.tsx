import React, { useCallback, useEffect, useState } from 'react';
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
        rating: null,
        suggestedComment: '',
        openComment: '',
    }
    const form = useForm({
        defaultValues: {...initialValues},
    });

    //const [alertText, setAlertText] = useState<string>("Please rate us next time! Your feedback is very important for us :)")

    const onSubmit: SubmitHandler<FeedbackInput> = useCallback((data) => {
        // console.log(data);
        setTimeout(() => {history.push("/")}, 3000);
    },[history])

    const quit = useCallback(() => {
        setTimeout(() => {history.push("/")}, 3000);
    }, [history]);

    // const hasFeedback = form.formState.isDirty || form.formState.touchedFields !== {};

    // useEffect(() => {
    //     if (hasFeedback) {
    //         setAlertText("Thank you for our feedback!")
    //     }
    // }, [form, alertText, hasFeedback])

    return (
        <Container className="feedback p-0">
            <Alert className={"feedbackAlert"} isOpen={form.formState.isSubmitted} color={"success"}>Thank you for our feedback!</Alert>
            <Row className={"w-100"}>
                <Col className="p-0">
                    <Button className="exitButton" onClick={quit}><BsX style={{height: "5vh", width: "5vh"}}/></Button>
                </Col>
            </Row>
            <Row className={"h-100"}>
                <Col style={{alignSelf: "center"}}>
                    <FormProvider {...form}>
                        <Form className={"feedbackForm"} onSubmit={form.handleSubmit(onSubmit)}>                            
                                <FormGroup className={"centerFlexbox"}>
                                    <h1 className={"responsiveText"}>Hey {props.user?.name}, please rate us!</h1>
                                    <Rating/>
                                    <Comments/>
                                </FormGroup>
                                <GlobalButton text={"Submit"} type={"submit"}/>
                        </Form>
                    </FormProvider>
                </Col>
            </Row>
        </Container> 
    );
}
