import React, {useState} from 'react';
import {Box} from "@mui/material";

type Time = {hours: number, minutes: number};

const DEFAULT_TIME : Time = {hours: 17, minutes: 0};

export default function TimeSelector() {
    const [{hours, minutes}, setHoursMinutes] = useState<Time>(DEFAULT_TIME);

    return (<Box sx={{ width: 200 }}>
        {hours} : {minutes}
    </Box>
    );
}