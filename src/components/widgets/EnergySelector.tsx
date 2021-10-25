import React from 'react';
import Slider from '@mui/material/Slider';
import { Container, Row, Col } from 'reactstrap';

import '../../assets/profile-steering/Conversion';
import { WhToKm } from "../../assets/profile-steering/Conversion";
import '../../styles/schedule.scss';
import { useFormContext } from 'react-hook-form';

interface Energy {energy: number, setEnergy: (newValue: number) => void};

// Slider for km and kWh, with conversion from Conversion.ts
export default function EnergySelector({energy, setEnergy}:Energy) {
    return(
        <Container className="energySelector">
            <Row className="energyBar" style={{width: "100%"}}>
                <Col>
                    <Slider className="slider" defaultValue={energy} step={500} min={0} max={100000} onChange={
                        (event: Event, newValue: number | number[]) => {
                        setEnergy(newValue as number);
                        }
                    }/>
                </Col>
            </Row>
            <Row className="conversionText" style={{marginBottom: "1rem"}}>
                <Col>
                    {energy / 1000} kWh = {Math.round(WhToKm(energy))} km
                </Col>
            </Row>

        </Container>
    );
};
