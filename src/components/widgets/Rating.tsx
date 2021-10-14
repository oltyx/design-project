import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {BsLightningChargeFill} from "react-icons/bs"

import '../../styles/feedback.scss';
import { set } from 'react-hook-form';


export default function Rating() {
    const [rating, setRating] = useState(0);

    const onClick = (value: number) => {
        setRating(value);
    }

    return(
        <div className="iconRatingContainer">
            <Button className={"iconRatingButton"} onClick={() => setRating(1)}><BsLightningChargeFill style={{height:"4vh", width: "3vh"}}/></Button>
            <Button className={"iconRatingButton"} onClick={() => setRating(2)}><BsLightningChargeFill style={{height:"4vh", width: "3vh"}}/></Button>
            <Button className={"iconRatingButton"} onClick={() => setRating(3)}><BsLightningChargeFill style={{height:"4vh", width: "3vh"}}/></Button>
            <Button className={"iconRatingButton"} onClick={() => setRating(4)}><BsLightningChargeFill style={{height:"4vh", width: "3vh"}}/></Button>
            <Button className={"iconRatingButton"} onClick={() => setRating(5)}><BsLightningChargeFill style={{height:"4vh", width: "3vh"}}/></Button>
        </div>
    );
}