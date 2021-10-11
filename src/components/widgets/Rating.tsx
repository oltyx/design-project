import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {BsLightningChargeFill} from "react-icons/bs"

import '../../styles/feedback.scss';


export default function Rating() {
    const iconStyle = { color: "#166016" }

    return(
        <div>
            <Label>Hey Jos, please rate us!</Label>
            <div className="iconRatingContainer">
                <BsLightningChargeFill style={iconStyle}/>
                <BsLightningChargeFill style={iconStyle}/>
                <BsLightningChargeFill style={iconStyle}/>
                <BsLightningChargeFill style={iconStyle}/>
                <BsLightningChargeFill style={iconStyle}/>
            </div>
        </div>
    );
}