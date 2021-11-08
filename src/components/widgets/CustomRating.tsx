import React from 'react';
import {BsLightningChargeFill} from "react-icons/bs"
import { Rating } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import '../../styles/feedback.scss';

/**
 * Types for the Comments Component Props.
 */
interface RatingProps {
    /**
     * Type of the name to be registered in the Controller. Required.
     */
    name: string
    /**
     * Type of Any other Props. Optional.
     */
    [x: string]: any,
}


/**
 * "5-bolt" Rating used in the Feedback Form. 
 * @param name - Name of the registered Input
 * @returns    - Custom Rating Controlled Component (via {@link https://react-hook-form.com/api/usecontroller/controller | Controller})
 */
export default function CustomRating({ name }: RatingProps) {
    /**
     * Form context passed via {@link https://react-hook-form.com/api/useformcontext | Form Provider}.
     */
    const context = useFormContext();

    /**
     * Controlled Rating component.
     */
    return(
        <Controller
        control={context.control}
        name={name}
        render={({ field }) => (
            <Rating {...field}
                size={"large"}
                defaultValue={0}
                precision={1}
                icon={<BsLightningChargeFill className={"ratedButton"} fontSize="inherit" />}
                emptyIcon={<BsLightningChargeFill className={"unratedButton"} fontSize="inherit" />}
            />
        )}/>
    )
}