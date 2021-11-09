/**
 * @module
 * Used for selecting the required energy with a slider.
 */
import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../../assets/profile-steering/Conversion';
import { WhToKm } from "../../assets/profile-steering/Conversion";
import '../../styles/schedule.scss';
import { useFormContext, useWatch } from 'react-hook-form';
import StyledSlider from '../styled/StyledSlider';
import {MdAutorenew} from "react-icons/all";
import * as Types from "../../App";


interface EnergySelectorProps {
    settings: Types.SessionType;
    setSettings: React.Dispatch<React.SetStateAction<Types.SessionType>>,
}
/**
 * 
 * @returns 
 */
export default function EnergySelector() {
    const context = useFormContext();
    const energy = useWatch({control: context.control, name: "desiredEnergy"});
    // The component body
    return(
        <Container className="energySelector">
            <Row className="energyBar" style={{width: "100%"}}>
                <Col>
                    <StyledSlider
                        name={"desiredEnergy"} 
                        className="slider" 
                        step={500} 
                        min={0} 
                        max={100000}/>
                </Col>
            </Row>
            <Row className="conversionText" style={{marginBottom: "1rem"}}>
                <Col>
                    {energy/1000} kWh <MdAutorenew/> {Math.round(WhToKm(energy))} km
                </Col>
            </Row>
        </Container>
    );
};
