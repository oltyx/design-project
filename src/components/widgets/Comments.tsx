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
                        {values.map((value, index) => 
                            <FormControlLabel
                            key={index}
                            value={value}
                            control={<Radio size={"medium"} classes={{root: "radioboxStyle", checked: "radioboxStyle:checked"}} />}
                            label={value}
                        />)}
                    </RadioGroup>
                )}
            />
    )
}