import React, {useState} from 'react';

import '../widgets/TimeSelector';
import '../widgets/EnergySelector';
import '../widgets/ModeSelector';
import ModeSelector from "../widgets/ModeSelector";
import TimeSelector from "../widgets/TimeSelector";
import EnergySelector from "../widgets/EnergySelector";
import Graph from '../widgets/Graph';

const DEFAULT_TIME = {hour: 17, minutes: 30};

// Scheduling page
export default function Schedule() {
    const [hour , setHour] = useState<number>(DEFAULT_TIME.hour);
    const [minutes, setMinutes] = useState<number>(DEFAULT_TIME.minutes);
    return(<body>
        Select Departure Time
        <TimeSelector hour={hour} setHour={setHour} minutes={minutes} setMinutes={setMinutes} />
        Select Energy Consumption
        <EnergySelector/>
        Select Charging Mode
        <ModeSelector/>
        Charging Schedule
        <Graph/>
    </body>)
}