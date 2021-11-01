import React from 'react';
import {BsLightningChargeFill} from "react-icons/bs"
import { Rating } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import '../../styles/feedback.scss';


interface RatingProps {
    [x: string]: any,
}

export default function CustomRating({...props}: RatingProps) {
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
        name={props.name}
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