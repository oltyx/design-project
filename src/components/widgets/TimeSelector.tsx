/**
 * @module
 * Selector for departure time.
 */
import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from 'react';

import '../../styles/timeSelector.scss';
import * as Types from "../../App";
import { isContext } from 'vm';
import { useFormContext } from 'react-hook-form';

/**
 * State of the component.
 * @field hour          Hour part of the time selector
 * @field setHour       Setter for hour
 * @field minutes       Minute part of the time selector
 * @field setMinutes    Setter for minutes
 */
export interface TimeSelectorProps {
    settings: Types.SessionType;
    setSettings: React.Dispatch<React.SetStateAction<Types.SessionType>>,
}

export default function TimeSelector() {
    const context = useFormContext();

    const hrUpRef = useRef() as MutableRefObject<HTMLDivElement>;
    const hrDownRef = useRef() as MutableRefObject<HTMLDivElement>;
    const minUpRef = useRef() as MutableRefObject<HTMLDivElement>;
    const minDownRef = useRef() as MutableRefObject<HTMLDivElement>;
    const hourInputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const minutesInputRef = useRef() as MutableRefObject<HTMLInputElement>;

    const [time, setTime] = useState({hour: 0, minutes: 0});

    useEffect(() => {
        let d = new Date();
        d.setHours(time.hour);
        d.setMinutes(time.minutes);
        context.setValue("departure", d);
    }, [context, time, setTime]);

    const hourUp = useCallback(() => {
        // setSettings({
        //     ...settings,
        //     hour: ((((settings.hour + 1) % 24) + 24) % 24),
        // })
        setTime({
            ...time,
            hour: ((((time.hour + 1) % 24) + 24) % 24),
        })
    }, [time, setTime])

    const hourDown = useCallback(() => {
        // setSettings({
        //     ...settings,
        //     hour: ((((settings.hour - 1) % 24) + 24) % 24),
        // })
        setTime({
            ...time,
            hour: ((((time.hour - 1) % 24) + 24) % 24),
        })
    }, [time, setTime])

    const minutesUp = useCallback(() => {
        // setSettings({
        //     ...settings,
        //     minutes: ((((settings.minutes + 15) % 60) + 60) % 60),
        // })
        setTime({
            ...time,
            minutes: ((((time.minutes + 15) % 60) + 60) % 60),
        })
    }, [time, setTime])

    const minutesDown = useCallback(() => {
        // setSettings({
        //     ...settings,
        //     minutes: ((((settings.minutes - 15) % 60) + 60) % 60),
        // })
        setTime({
            ...time,
            minutes: ((((time.minutes - 15) % 60) + 60) % 60),
        })
    }, [time, setTime])

    useEffect(() => {
        let hrUpRefCurrent = hrUpRef.current;
        let hrDownRefCurrent = hrDownRef.current;
        let minUpRefCurrent = minUpRef.current;
        let minDownRefCurrent = minDownRef.current;

        hrUpRefCurrent.addEventListener('click', hourUp);
        hrDownRefCurrent.addEventListener('click', hourDown);
        minUpRefCurrent.addEventListener('click', minutesUp);
        minDownRefCurrent.addEventListener('click', minutesDown);

        return () => {
            hrUpRefCurrent.removeEventListener('click', hourUp)
            hrDownRefCurrent.removeEventListener('click', hourDown);
            minUpRefCurrent.removeEventListener('click', minutesUp);
            minDownRefCurrent.removeEventListener('click', minutesDown);
        };
    });

    useEffect(() => {
        hourInputRef.current.value = formatTime(time.hour);
    },[time.hour, hourInputRef])

    useEffect(() => {
        minutesInputRef.current.value = formatTime(time.minutes)
    }, [time.minutes, minutesInputRef])

    const formatTime = (time: number): string => {
        if(time < 10){
            return '0' + time.toString();
        }
        return time.toString();
    };

    // Body of the component
    return (
        <div className="time-picker">
            <div className="hour">
                <div ref={hrUpRef} className="hr-up"/>
                <input disabled
                       ref={hourInputRef}
                       type="number"
                       className="hr"
                       value={time.hour}/>
                <div ref={hrDownRef} className="hr-down"/>
            </div>

            <div className="separator">:</div>

            <div className="minute">
                <div ref={minUpRef} className="min-up"/>
                <input disabled
                       ref={minutesInputRef}
                       type="number"
                       className="min"
                       value={time.minutes}/>
                <div ref={minDownRef} className="min-down"/>
            </div>
        </div>

    );
}