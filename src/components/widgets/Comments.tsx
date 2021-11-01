import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

import '../../styles/feedback.scss';


interface CommentsProps {
    [x: string]: any,
}

export default function Comments({...props}: CommentsProps) {
    const context = useFormContext();

    return(
            <Controller
                name={"suggestedComment"}
                control={context.control}
                render={({ field }) => (
                    <RadioGroup {...field}>
                        <FormControlLabel
                            value={props.values[0]}
                            control={<Radio size={"medium"} classes={{root: "radioboxStyle", checked: "radioboxStyle:checked"}} />}
                            label={props.values[0]}
                        />
                        <FormControlLabel
                            value={props.values[1]}
                            control={<Radio classes={{root: "radioboxStyle", checked: "radioboxStyle:checked"}} />}
                            label={props.values[1]}
                        />
                        <FormControlLabel
                            value={props.values[2]}
                            control={<Radio classes={{root: "radioboxStyle", checked: "radioboxStyle:checked"}} />}
                            label={props.values[2]}
                        />
                        <FormControlLabel
                            value={props.values[3]}
                            control={<Radio classes={{root: "radioboxStyle", checked: "radioboxStyle:checked"}} />}
                            label={props.values[3]}
                        />
                    </RadioGroup>
                )}
            />
    )
}