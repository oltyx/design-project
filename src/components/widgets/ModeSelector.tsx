/**
 * @module
 * Selector for the charging mode.
 */
import React, { useEffect } from 'react';

import {ChargingMode} from "../../data/models/ChargingMode";
import {Button} from "reactstrap";
import {MdOfflineBolt, MdWbSunny} from "react-icons/all";
import { Container, Row, Col } from 'reactstrap';
import '../../styles/schedule.scss';
import { useFormContext } from 'react-hook-form';
import * as Types from "../../App";

/**
 * State of the selector.
 * @field mode      Charging mode, or null if not selected
 * @field setMode   Setter for mode
 */
interface Mode {
    // mode: ChargingMode | null, 
    // setMode: (newValue: ChargingMode | null) => void
    state: Types.SessionType;
    setState: React.Dispatch<React.SetStateAction<Types.SessionType>>,
}

// Selector for Fast mode or Smart mode
export default function ModeSelector({state, setState}: Mode) {
    const context = useFormContext();

    // Perform this action every time one of the dependencies changes
    useEffect(() => {
        context.setValue("mode", state.mode)
    }, [state.mode, context]) 

    // Set a CSS class based on being selected or deselected
    const fast: string = state.mode === ChargingMode.Fast? "selected" : "deselected";
    const smart: string = state.mode === ChargingMode.Smart? "selected" : "deselected";

    // Body of the component
    return(
        <Container className="modeSelector">
            <Row>
                <Col className="fastCol">
                    <Button 
                        className={fast} 
                        onClick={() => setState({
                            ...state,
                            mode: ChargingMode.Fast,
                        })} 
                        style={{borderTopRightRadius: "0", borderBottomRightRadius: "0"}}>
                        <MdOfflineBolt className={"modeIcon"}/>
                        <h4 className={"modeText"}>Fast Charging</h4>
                    </Button>
                </Col>
                <Col className="solarCol" >
                    <Button 
                        className={smart} 
                        onClick={() => setState({
                            ...state,
                            mode: ChargingMode.Smart,
                        })}  
                        style={{borderTopLeftRadius: "0", borderBottomLeftRadius: "0"}}>
                        <MdWbSunny className={"modeIcon"}/>
                        <h4 className={"modeText"}>Solar Power</h4>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}