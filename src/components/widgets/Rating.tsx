import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import {BsLightningChargeFill} from "react-icons/bs"

import '../../styles/feedback.scss';
import { useFormContext } from 'react-hook-form';


interface RatingProps {
    [x: string]: any,
}

export default function Rating({...props}: RatingProps) {
    const [rating, setRating] = useState(0);
    const context = useFormContext();

    useEffect(() => {
            context.setValue('rating', rating)
    }, [rating, context])
    
    return(
        <Container>
            <Row>
                <Col>
                    <Button className={`${rating >= 1 ? "ratedButton" : "unratedButton"}`} onClick={() => setRating(1)}><BsLightningChargeFill style={{height:"4vh", width: "3vh"}}/></Button>
                    <Button className={`${rating >= 2 ? "ratedButton" : "unratedButton"}`} onClick={() => setRating(2)}><BsLightningChargeFill style={{height:"4vh", width: "3vh"}}/></Button>
                    <Button className={`${rating >= 3 ? "ratedButton" : "unratedButton"}`} onClick={() => setRating(3)}><BsLightningChargeFill style={{height:"4vh", width: "3vh"}}/></Button>
                    <Button className={`${rating >= 4 ? "ratedButton" : "unratedButton"}`} onClick={() => setRating(4)}><BsLightningChargeFill style={{height:"4vh", width: "3vh"}}/></Button>
                    <Button className={`${rating === 5 ? "ratedButton" : "unratedButton"}`} onClick={() => setRating(5)}><BsLightningChargeFill style={{height:"4vh", width: "3vh"}}/></Button>
                </Col>
            </Row>  
        </Container>
    );
}