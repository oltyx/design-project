import React from 'react';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area
} from "recharts";
import '../../assets/profile-steering/ProfileSteering';

// Graph with result from ProfileSteering.ts, plus price and CO2 emissions
export default function Graph() {
    // Put a template for the elements here, result of planning algo should go in uv
    let data = [{name: "08:00", pv: 1500, uv: 2000}, {name: "08:15", pv: 2000, uv: 1000}];

    return(<ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
            top: 20,
            right: 80,
            bottom: 20,
            left: 20
        }}
    >
        <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
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
            dataKey="uv"
            stroke="#d0de10"
            fillOpacity={1}
            fill="url(#colorUv)"
        />
        <Bar dataKey="pv" barSize={40} fill="url(#colorPv)" />
    </ComposedChart>);
}