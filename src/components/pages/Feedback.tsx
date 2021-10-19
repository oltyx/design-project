import React from 'react';
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Alert, Container, Row, Col, Button, Form, FormGroup, ButtonGroup, Input, Label } from 'reactstrap';
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
    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data);
    }

    return (
        <Container className="feedback p-0">
            {form.formState.isSubmitSuccessful ?
            <Row><Col>
            <Alert color="success"> Thank you for your feedback!</Alert>
            </Col></Row>    
            : null}
            <Row className={"w-100"}>
                <Col className="p-0">
                    <Button className="exitButton"><BsX style={{height:"5vh", width: "5vh"}}/></Button>
                </Col>
            </Row>
            <Row styles={{height: "100%"}}>
                <Col className={"formFlexbox"}>
                    <FormProvider {...form}>
                    <Form className={"feedbackForm"} onSubmit={form.handleSubmit(onSubmit)}>                            
                            <FormGroup className={"centerFlexbox"}>
                                <Label className={"responsiveText"}>Hey {props.user?.name}, please rate us!</Label>
                                <Rating></Rating>
                                <Comments/>
                            </FormGroup>
                            {/* <FormGroup>
                                <Comments/>
                            </FormGroup> */}
                            <GlobalButton text={"Submit"}/>
                    </Form>
                </FormProvider>
                </Col>
            </Row>
        </Container>
        
       
    );
}
