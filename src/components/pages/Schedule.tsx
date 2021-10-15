import React from 'react';

import '../widgets/TimeSelector';
import '../widgets/EnergySelector';
import '../widgets/ModeSelector';
import ModeSelector from "../widgets/ModeSelector";
import TimeSelector from "../widgets/TimeSelector";
import EnergySelector from "../widgets/EnergySelector";
import Graph from '../widgets/Graph';

// Scheduling page
export default function Schedule() {
    return(<body>
        Select Departure Time
        <TimeSelector/>
        Select Energy Consumption
        <EnergySelector/>
        Select Charging Mode
        <ModeSelector/>
        Charging Schedule
        <Graph/>
    </body>)
}