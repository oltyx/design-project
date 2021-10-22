import React, {useState} from 'react';
//import Slider from '@mui/material/Slider';

import '../../assets/profile-steering/Conversion';
import {WhToKm} from "../../assets/profile-steering/Conversion";
//import {Box} from "@mui/material";

interface Energy {energy: number, setEnergy: (newValue: number) => void};

// Slider for km and kWh, with conversion from Conversion.ts
export default function EnergySelector({energy, setEnergy}:Energy) {
    return(<></>)

    // return(<Box sx={{ width: 200 }}>
    //     <Slider defaultValue={energy} step={500} min={0} max={100000} onChange={
    //         (event: Event, newValue: number | number[]) => {
    //         setEnergy(newValue as number);
    //         }
    //     }/>
    //     {energy / 1000} kWh = {Math.round(WhToKm(energy))} km
    // </Box>);
}