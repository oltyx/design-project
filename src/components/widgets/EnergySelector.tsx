/**
 * @module
 * Used for selecting the required energy with a slider.
 */
import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../../assets/profile-steering/Conversion';
import { WhToKm } from "../../assets/profile-steering/Conversion";
import '../../styles/schedule.scss';
import { useFormContext } from 'react-hook-form';
import StyledSlider from '../styled/StyledSlider';
import {MdAutorenew} from "react-icons/all";


/**
 * 
 * @returns 
 */
export default function EnergySelector() {
    const context = useFormContext();
    const energy = context.getValues("desiredEnergy")
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
