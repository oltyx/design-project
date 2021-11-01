import React from 'react';
import {BsLightningChargeFill} from "react-icons/bs"
import { Rating } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import '../../styles/feedback.scss';


interface RatingProps {
    [x: string]: any,
}

export default function CustomRating({...props}: RatingProps) {
    const context = useFormContext();

    const ratingStyles = {
        width: "2vh",
        height: "2vh"
    }
    
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