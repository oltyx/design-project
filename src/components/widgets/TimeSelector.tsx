import React, {useState} from 'react';
import {Box} from "@mui/material";

type Time = {hours: number, minutes: number};

const DEFAULT_TIME : Time = {hours: 17, minutes: 30};

export default function TimeSelector() {
    const [{hours, minutes}, setHoursMinutes] = useState<Time>(DEFAULT_TIME);

    return (

        <div className="time-picker" data-time="00:00">
            <div className="hour">
                <div className="hr-up"></div>
                    <input disabled type="number" className="hr" value={hours}/>
                <div className="hr-down"></div>
            </div>

            <div className="separator">:</div>

            <div className="minute">
                <div className="min-up"></div>
                    <input disabled type="number" className="min" value={minutes}/>
                <div className="min-down"></div>
            </div>
        </div>

    );
}