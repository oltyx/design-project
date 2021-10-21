import React, {MutableRefObject, useEffect, useRef} from 'react';

import '../../styles/timeSelector.scss';

export interface TimeSelectorProps {
    hour: number,
    setHour: (hour: number) => void,
    minutes: number,
    setMinutes: (hour: number) => void
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ hour, setHour, minutes, setMinutes}) => {

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
        hrUpRef.current.addEventListener('click', hourUp);
        hrDownRef.current.addEventListener('click', hourDown);
        minUpRef.current.addEventListener('click', minutesUp);
        minDownRef.current.addEventListener('click', minutesDown);
        return () => {
            hrUpRef.current.removeEventListener('click', hourUp)
            hrDownRef.current.removeEventListener('click', hourDown);
            minUpRef.current.removeEventListener('click', minutesUp);
            minDownRef.current.removeEventListener('click', minutesDown);
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

export default TimeSelector;