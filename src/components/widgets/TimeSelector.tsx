/**
 * @module
 * Selector for departure time.
 */
import React, {MutableRefObject, useCallback, useEffect, useRef} from 'react';

import '../../styles/timeSelector.scss';
import * as Types from "../../App";

/**
 * State of the component.
 * @field hour          Hour part of the time selector
 * @field setHour       Setter for hour
 * @field minutes       Minute part of the time selector
 * @field setMinutes    Setter for minutes
 */
export interface TimeSelectorProps {
    // hour: number,
    // setHour: (hour: number) => void,
    // minutes: number,
    // setMinutes: (hour: number) => void
    state: Types.SessionType;
    setState: React.Dispatch<React.SetStateAction<Types.SessionType>>,
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ state, setState }) => {

    const hrUpRef = useRef() as MutableRefObject<HTMLDivElement>;
    const hrDownRef = useRef() as MutableRefObject<HTMLDivElement>;
    const minUpRef = useRef() as MutableRefObject<HTMLDivElement>;
    const minDownRef = useRef() as MutableRefObject<HTMLDivElement>;
    const hourInputRef = useRef() as MutableRefObject<HTMLInputElement>;
    const minutesInputRef = useRef() as MutableRefObject<HTMLInputElement>;

    const hourUp = useCallback(() => {
        setState({
            ...state,
            hour: ((((state.hour + 1) % 24) + 24) % 24),
        })
    }, [state, setState])

    const hourDown = useCallback(() => {
        setState({
            ...state,
            hour: ((((state.hour - 1) % 24) + 24) % 24),
        })
    }, [state, setState])

    const minutesUp = useCallback(() => {
        setState({
            ...state,
            hour: ((((state.minutes + 15) % 60) + 60) % 60),
        })
    }, [state, setState])

    const minutesDown = useCallback(() => {
        setState({
            ...state,
            hour: ((((state.minutes - 15) % 60) + 60) % 60),
        })
    }, [state, setState])

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
        hourInputRef.current.value = formatTime(state.hour);
    },[state.hour])

    useEffect(() => {
        minutesInputRef.current.value = formatTime(state.minutes)
    }, [state.minutes])

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
                       value={state.hour}/>
                <div ref={hrDownRef} className="hr-down"/>
            </div>

            <div className="separator">:</div>

            <div className="minute">
                <div ref={minUpRef} className="min-up"/>
                <input disabled
                       ref={minutesInputRef}
                       type="number"
                       className="min"
                       value={state.minutes}/>
                <div ref={minDownRef} className="min-down"/>
            </div>
        </div>

    );
}

export default TimeSelector;