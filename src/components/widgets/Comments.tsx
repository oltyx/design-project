import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

import '../../styles/feedback.scss';

/**
 * Types for the Comments Component Props.
 */
interface CommentsProps {
    /**
     * Type of array of the values passed to the Radioboxes. Required.
     */
    values: Array<string>,
    /**
     * Types of Any other Props. Optional.
     */
    [x: string]: any,
}

/**
 * Suggested Commments Component for the User to choose one out of four suggested comments.
 * Constructed via {@link https://mui.com/api/radio-group/ | RadioGroup}
 * @param props     - Props
 * @returns         - Controlled Comments Components with four radio boxes (via {@link https://react-hook-form.com/api/usecontroller/controller | Controller})
 */
export default function Comments({ values }: CommentsProps) {
    /**
     * Form context passed via {@link https://react-hook-form.com/api/useformcontext | Form Provider}.
     */
    const context = useFormContext();
    return(
            <Controller
                name={"suggestedComment"}
                control={context.control}
                render={({ field }) => (
                    <RadioGroup {...field}>
                        <FormControlLabel
                            value={values[0]}
                            control={<Radio size={"medium"} classes={{root: "radioboxStyle", checked: "radioboxStyle:checked"}} />}
                            label={values[0]}
                        />
                        <FormControlLabel
                            value={values[1]}
                            control={<Radio classes={{root: "radioboxStyle", checked: "radioboxStyle:checked"}} />}
                            label={values[1]}
                        />
                        <FormControlLabel
                            value={values[2]}
                            control={<Radio classes={{root: "radioboxStyle", checked: "radioboxStyle:checked"}} />}
                            label={values[2]}
                        />
                        <FormControlLabel
                            value={values[3]}
                            control={<Radio classes={{root: "radioboxStyle", checked: "radioboxStyle:checked"}} />}
                            label={values[3]}
                        />
                    </RadioGroup>
                )}
            />
    )
}