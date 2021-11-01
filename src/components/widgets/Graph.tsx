/**
 * @module
 * Graph which is displayed on the schedule page.
 */
import React, {useEffect, useMemo} from 'react';
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area, ResponsiveContainer
} from "recharts";
import '../../assets/profile-steering/ProfileSteering';
import {ChargingData} from "../../data/models/ChargingData";
import {planEV} from "../../assets/profile-steering/ProfileSteering";
import {ChargingMode} from "../../data/models/ChargingMode";
import {getEmissions, getPrice} from "../../assets/profile-steering/PriceEmissions";
import { useFormContext } from 'react-hook-form';

/**
 * Settings that the graph has to plan with.
 * @field endHr         Hour part of departure time
 * @field endMin        Minute part of departure time
 * @field mode          Charging mode, or null if not selected
 * @field setPrice      Setter for the price on the containing page
 * @field setEmissions  Setter for the emissions on the containing page
 */
interface Settings { endHr: number
                   , endMin: number
                   , mode: ChargingMode | null
                   , setPrice: (newValue: number) => void
                   , setEmissions: (newValue: number) => void
                   }

// Graph with result from ProfileSteering.ts, plus price and CO2 emissions
export default function Graph({endHr, endMin, mode, setPrice, setEmissions}: Settings) {
    const context = useFormContext();
    const energy = context.getValues("desiredEnergy");

    // Put a template for the elements here, result of planning algo should go in charge
    const data: ChargingData[] = useMemo<ChargingData[]>(() => {
        return planEV(energy, [endHr, endMin], mode)
            .map(({name: name, pv: pv, charge: charge}) => {
                // Convert W to kW
                return {name: name, pv: Math.round(pv / 1000), charge: Math.round(charge / 1000)
                }
            });
    }, [energy, endHr, endMin, mode]);

    // Perform these action every time one of the dependencies changes
    useEffect(() => {
        setPrice(getPrice(data));
        setEmissions(getEmissions(data));
    }, [energy, endHr, endMin, mode, data])

    // Body of the component
    return(<div>
    <ResponsiveContainer aspect={500/400}>
        <ComposedChart
        data={data}
        margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 20
        }}
    >
        <defs>
            <linearGradient id="colorCharge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ddee00" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#acb80d" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00b100" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#166016" stopOpacity={0.8} />
            </linearGradient>
        </defs>

        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
            dataKey="name"
            // label={{ value: "Hour", position: "insideBottomRight", offset: -10 }}
            scale="band"
        />
        <YAxis /*label={{ value: "PV", angle: -90, position: "insideLeft" }}*/ />
        <Tooltip />
        <Legend />
        <Area
            type="monotone"
            dataKey="pv"
            stroke="#d0de10"
            fillOpacity={1}
            fill="url(#colorCharge)"
        />
        <Bar dataKey="charge" barSize={500/data.length} fill="url(#colorPv)" />
    </ComposedChart>
    </ResponsiveContainer></div>);
}