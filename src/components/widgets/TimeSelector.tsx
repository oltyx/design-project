import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import { useFormContext } from 'react-hook-form';

import '../../styles/timeSelector.scss';

export interface TimeSelectorProps {

}

const DEFAULT_TIME = {hour: 17, minutes: 30};

export default function TimeSelector({ ...props}: TimeSelectorProps) {
    const context = useFormContext();
    const [hour , setHour] = useState<number>(DEFAULT_TIME.hour);
    const [minutes, setMinutes] = useState<number>(DEFAULT_TIME.minutes);

    const hrUpRef = useRef() as MutableRefObject<HTMLDivElement>;
    const hrDownRef = useRef() as MutableRefObject<HTMLDivElement>;
    const minUpRef = useRef() as MutableRefObject<HTMLDivElement>;
    const minDownRef = useRef() as MutableRefObject<HTMLDivElement>;
    const hourInputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const minutesInputRef = useRef() as MutableRefObject<HTMLInputElement>;

    const hourUp = () => {
        setHour((((hour + 1) % 24) + 24) % 24);
    };

    const hourDown = () => {
        setHour((((hour - 1) % 24) + 24) % 24);
    };

    const minutesUp = () => {
        setMinutes((((minutes + 15) % 60) + 60) % 60);
    };

    const minutesDown = () => {
        setMinutes((((minutes - 15) % 60) + 60) % 60);
    };

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
        hourInputRef.current.value = formatTime(hour);
    },[hour])

    useEffect(() => {
        minutesInputRef.current.value = formatTime(minutes)
    }, [minutes])

    const formatTime = (time: number): string => {
        if(time < 10){
            return '0' + time.toString();
        }
        return time.toString();
    };

    useEffect(() => {
        const date = new Date();
        const departure: string = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T${hour.toString()}:${minutes.toString()}:00`;
        context.setValue("departure", new Date(departure));
    }, [context.setValue, hour, minutes])

    return (
        <div className="time-picker">
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