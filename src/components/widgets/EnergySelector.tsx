import React, { useCallback } from 'react';
import { Container, Row, Col } from 'reactstrap';

import '../../assets/profile-steering/Conversion';
import { WhToKm } from "../../assets/profile-steering/Conversion";
import '../../styles/schedule.scss';
import { useFormContext } from 'react-hook-form';
import StyledSlider from '../styled/StyledSlider';


interface Energy {energy?: number, setEnergy?: (newValue: number) => void};

// Slider for km and kWh, with conversion from Conversion.ts
export default function EnergySelector({...props}: Energy) {
    
    const context = useFormContext();
    const energy = context.watch("desiredEnergy")
    console.log(energy)

    return(
        <Container className="energySelector">
            <Row className="energyBar" style={{width: "100%"}}>
                <Col>
                    <StyledSlider 
                        name={"desiredEnergy"} 
                        energy={energy} 
                        className="slider" 
                        defaultValue={energy} 
                        step={500} 
                        min={0} 
                        max={100000}/>
                </Col>
            </Row>
            <Row className="conversionText" style={{marginBottom: "1rem"}}>
                <Col>
                    {energy} kWh = {Math.round(WhToKm(energy))} km
                </Col>
            </Row>

        </Container>
    );
};
