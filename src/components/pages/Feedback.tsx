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


/**
 * Types for Feedback component props.
 */
interface FeedbackProps {
    /**
     * Types of details of the current User. Optional.
     */
    user?: {
        name?: string,
        surname?: string,
    }
    /**
     * Type of the current Charging Session ID. Optional.
     */
    sessionId?: number,
    /**
     * Types for any other props passing to the Feedback component. Optional.
     */
    [x: string]: any
}

/**
 * Types for the react-hook-form form.
 * 
 * @remarks
 * See {@link https://react-hook-form.com/| react-hook-form documentation} for more details.
 */
type FeedbackInput = {
    /**
     * Type of Unique ID of the current charging session. Required.
     */
    sessionId: number,
    /**
     * Type of Rating must be between 1 to 5 if rated; 0 by default. Required.
     */
    rating: number,
    /**
     * Type of Four comments are suggested, only one needs to be chosen. Required.
     */
    suggestedComment: string,
    /**
     * Type of any additional comments/remarks that the User may have. Required.
     */
    openComment: string,
}

/**
 * Feedback component of the web application. All fields of the Feedback Form are optional.
 * Constructed using {@link https://react-hook-form.com/api/useformcontext | Form Provider} to pass form context to nested components.
 * @param user          - Current User details
 * @param sessionId     - Current session ID
 * @returns             - Returns Feedback Form with the following widgets:
 *                          1. {@link src\components\widgets\CustomRating.tsx | "5-bolt" Rating }
 *                          2. {@link src\components\widgets\Comments.tsx | Suggested Comments }
 *                          3. {@link src\components\styled\TextField.tsx | Text Field for remarks}
 */
export default function Feedback({ ...props }: FeedbackProps) {
    const history = useHistory();

    /**
     * Default values for the feedback form.
     */
    const initialValues = {
        sessionId: props.sessionId,
        rating: 0,
        suggestedComment: '',
        openComment: '',
    }

    /**
     * List of Suggested Comments.
     */
    const commentValues = [
        "I love it!",
        "Easy to use",
        "Annoying",
        "Too much graphics"
    ]

    /**
     * React-hook-form.
     * @param defaultValues     - initial value for each of the fields to be submited; ensures proper form validation
     * @param mode              - onBlur runs form validation whenever the input loses focus.
     */
    const form = useForm({
        defaultValues: { ...initialValues },
        mode: "onBlur",
    });

    /**
     * State of the Alert text: 
     *  case 1 - User submits feedback; 
     *  case 2 - User does not submit feedback
     */
    const [alertText, setAlertText] = useState<string>("Please rate us next time! Your feedback is very important for us :)")

    /**
     * Submits the Feedback Form. Automatically transfers the User to {@link src\components\pages\Start.tsx | Start page} after timeout.
     * @param data  - data inputed in the form
     */
    const onSubmit: SubmitHandler<FeedbackInput> = useCallback((data) => {
        setTimeout(() => {history.push("/")}, 3000);
    },[history])

    /**
     * Exits the Feedback Form without submission. Automatically transfers the User to {@link src\components\pages\Start.tsx | Start page} after timeout.
     */
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
                                <Comments name={"suggestedComment"} values={commentValues}/>
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
