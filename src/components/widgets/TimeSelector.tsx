import React, {MutableRefObject, useCallback, useEffect, useRef} from 'react';
import { Input } from 'reactstrap';

import '../../styles/timeSelector.scss';

export interface TimeSelectorProps {
    hour: number,
    setHour: (hour: number) => void,
    minutes: number,
    setMinutes: (hour: number) => void
}

export default function TimeSelector({ hour, setHour, minutes, setMinutes, ...props}: TimeSelectorProps) {

    // const hrUpRef = useRef() as MutableRefObject<HTMLDivElement>;
    // const hrDownRef = useRef() as MutableRefObject<HTMLDivElement>;
    // const minUpRef = useRef() as MutableRefObject<HTMLDivElement>;
    // const minDownRef = useRef() as MutableRefObject<HTMLDivElement>;
    // const hourInputRef = useRef() as MutableRefObject<HTMLInputElement>;
    // const minutesInputRef = useRef() as MutableRefObject<HTMLInputElement>;

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

    // useEffect(() => {
    //     hrUpRef.current.addEventListener('click', hourUp);
    //     hrDownRef.current.addEventListener('click', hourDown);
    //     minUpRef.current.addEventListener('click', minutesUp);
    //     minDownRef.current.addEventListener('click', minutesDown);
    //     return () => {
    //         hrUpRef.current.removeEventListener('click', hourUp)
    //         hrDownRef.current.removeEventListener('click', hourDown);
    //         minUpRef.current.removeEventListener('click', minutesUp);
    //         minDownRef.current.removeEventListener('click', minutesDown);
    //     };
    // }, [hrUpRef, hrDownRef, minUpRef, minDownRef]);

    // useEffect(() => {
    //     hourInputRef.current.value = formatTime(hour);
    // },[hour])

    // useEffect(() => {
    //     minutesInputRef.current.value = formatTime(minutes)
    // }, [minutes])

    const formatTime = useCallback((time: number): string => {
        if(time < 10){
            return '0' + time.toString();
        }
        return time.toString();
    }, []);

    return (

        <div className="time-picker">
            <div className="hour">
                
                {/* <div ref={hrUpRef} className="hr-up"/> */}
                    <Input disabled
                        //    ref={hourInputRef}
                           type="number"
                           className="hr"
                           value={hour}/>
                {/* <div ref={hrDownRef} className="hr-down"/> */}
            </div>

            <div className="separator">:</div>

            <div className="minute">
                {/* <div ref={minUpRef} className="min-up"/> */}
                    <Input disabled
                        //    ref={minutesInputRef}
                           type="number"
                           className="min"
                           value={minutes}/>
                {/* <div ref={minDownRef} className="min-down"/> */}
            </div>
        </div>

    );
}