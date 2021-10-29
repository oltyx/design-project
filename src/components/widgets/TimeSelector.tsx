import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from 'react';
import { useFormContext } from 'react-hook-form';
import { Alert } from 'reactstrap';

import '../../styles/timeSelector.scss';

export interface TimeSelectorProps {
    alert: boolean,
    setAlert: React.Dispatch<React.SetStateAction<boolean>>,
    hour: number,
    minutes: number,
    setHour: React.Dispatch<React.SetStateAction<number>>,
    setMinutes: React.Dispatch<React.SetStateAction<number>>,
}

export default function TimeSelector({ alert, setAlert, hour, setHour, minutes, setMinutes, ...props}: TimeSelectorProps) {
    const hrUpRef = useRef() as MutableRefObject<HTMLDivElement>;
    const hrDownRef = useRef() as MutableRefObject<HTMLDivElement>;
    const minUpRef = useRef() as MutableRefObject<HTMLDivElement>;
    const minDownRef = useRef() as MutableRefObject<HTMLDivElement>;
    const hourInputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const minutesInputRef = useRef() as MutableRefObject<HTMLInputElement>;

    useEffect(() => {
        const now = new Date();
        if (hour < now.getHours() || (hour === now.getHours() && minutes < now.getMinutes())) {
            setAlert(true);
        } else {
            setAlert(false);
        }
    }, [alert, setAlert, hour, minutes])


    const hourUp = useCallback(() => {
        setHour((((hour + 1) % 24) + 24) % 24);
    }, [hour, setHour]);

    const hourDown = useCallback(() => {
        setHour((((hour - 1) % 24) + 24) % 24);
    }, [hour, setHour]);

    const minutesUp = useCallback(() => {
        setMinutes((((minutes + 15) % 60) + 60) % 60);
    }, [minutes, setMinutes]);

    const minutesDown = useCallback(() => {
        setMinutes((((minutes - 15) % 60) + 60) % 60);
    }, [minutes, setMinutes]);

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
    }, [hrUpRef, hrDownRef, minUpRef, minDownRef, hourUp, hourDown, minutesDown, minutesUp]);

    const formatTime = useCallback((time: number): string => {
        if(time < 10){
            return '0' + time.toString();
        }
        return time.toString();
    }, []);

    useEffect(() => {
        hourInputRef.current.value = formatTime(hour);
    },[hourInputRef, hour, formatTime])

    useEffect(() => {
        minutesInputRef.current.value = formatTime(minutes);
    }, [minutesInputRef, minutes, formatTime])

    return (
        
        <div className="time-picker">
            <Alert className={"scheduleAlert"} isOpen={alert} color="danger"> <h4> Departure time should be later than now </h4> </Alert>
            <div className="hour">
                <div ref={hrUpRef} className="hr-up"/>
                <input disabled
                       ref={hourInputRef}
                       type="number"
                       className="hr"
                       value={hour}/>
                <div ref={hrDownRef} className="hr-down"/>
            </div>

            <div className="separator">:</div>

            <div className="minute">
                <div ref={minUpRef} className="min-up"/>
                <input disabled
                       ref={minutesInputRef}
                       type="number"
                       className="min"
                       value={minutes}/>
                <div ref={minDownRef} className="min-down"/>
            </div>
        </div>

    );
}