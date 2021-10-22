import React, {useState} from 'react';

import '../widgets/TimeSelector';
import '../widgets/EnergySelector';
import '../widgets/ModeSelector';
import ModeSelector from "../widgets/ModeSelector";
import TimeSelector from "../widgets/TimeSelector";
import EnergySelector from "../widgets/EnergySelector";
import Graph from '../widgets/Graph';
import {ChargingMode} from "../../data/models/ChargingMode";
import {GlobalButton} from "../styled/Button";
import {useHistory} from "react-router-dom";
import {getEmissions, getPrice} from "../../assets/profile-steering/PriceEmissions";

const DEFAULT_TIME = {hour: 17, minutes: 30};
const DEFAULT_CHARGE: number = 0;
const DEFAULT_MODE: ChargingMode = ChargingMode.Smart;

// Scheduling page
export default function Schedule() {
    const history = useHistory();

    function handleClick() {
        history.push("/session");
    }

    const [hour , setHour] = useState<number>(DEFAULT_TIME.hour);
    const [minutes, setMinutes] = useState<number>(DEFAULT_TIME.minutes);
    const [energy, setEnergy] = useState<number>(DEFAULT_CHARGE);
    const [mode, setMode] = useState<ChargingMode>(DEFAULT_MODE);
    const [price, setPrice] = useState<number>(0);
    const [emissions, setEmissions] = useState<number>(0);

    return(<body>
        <div>Price: €{price.toFixed(2)}    Emissions: {emissions.toFixed(0)}g CO2</div>
        Select Departure Time
        <TimeSelector hour={hour} setHour={setHour} minutes={minutes} setMinutes={setMinutes} />
        Select Energy Consumption
        <EnergySelector energy={energy} setEnergy={setEnergy}/>
        Select Charging Mode
        <ModeSelector mode={mode} setMode={setMode}/>
        Charging Schedule
        <Graph chargeRequired={energy} endHr={hour} endMin={minutes} mode={mode} setPrice={setPrice} setEmissions={setEmissions}/>
        <GlobalButton text={"Go"} onClick={handleClick}/>
    </body>)
}