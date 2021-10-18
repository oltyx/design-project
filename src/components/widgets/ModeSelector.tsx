import React, {useState} from 'react';

import {ChargingMode} from "../../data/models/ChargingMode";
import {Button} from "reactstrap";
import {MdOfflineBolt, MdWbSunny} from "react-icons/all";
import {Box} from "@mui/material";

// Selector for Fast mode or Smart mode
export default function ModeSelector() {
    // Set default setting to Smart Charging
    const [mode, setMode] = useState<ChargingMode>(ChargingMode.Smart);

    // Set a class based on being selected or deselected
    let fast: string = mode === ChargingMode.Fast? "selected" : "deselected";
    let smart: string = mode === ChargingMode.Smart? "selected" : "deselected";

    return(<Box sx={{ width: 200 }}>
        <Button className={fast} onClick={() => setMode(ChargingMode.Fast)}>
            <MdOfflineBolt className={fast}/>
            <br/>Fast Charging
        </Button>
        <Button className={smart} onClick={() => setMode(ChargingMode.Smart)}>
            <MdWbSunny className={smart}/>
            <br/>Smart Charging
        </Button>
    </Box>);
}