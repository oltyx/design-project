import React, { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Col, Container, Input, Row } from 'reactstrap';

import '../../styles/timeSelector.scss';

export interface TimeSelectorProps {
    hour: number,
    setHour: (hour: number) => void,
    minutes: number,
    setMinutes: (hour: number) => void
}

export default function TimeSelector({ hour, setHour, minutes, setMinutes, ...props}: TimeSelectorProps) {
    const context = useFormContext();

    useEffect(() => {
        context.setValue("departure", hour.toString() + minutes.toString());
    }, [context, hour, minutes])

    // const hrUpRef = useRef() as MutableRefObject<HTMLDivElement>;
    // const hrDownRef = useRef() as MutableRefObject<HTMLDivElement>;
    // const minUpRef = useRef() as MutableRefObject<HTMLDivElement>;
    // const minDownRef = useRef() as MutableRefObject<HTMLDivElement>;
    // const hourInputRef = useRef() as MutableRefObject<HTMLInputElement>;
    // const minutesInputRef = useRef() as MutableRefObject<HTMLInputElement>;

    // const hourUp = useCallback(() => {
    //     setHour((((hour + 1) % 24) + 24) % 24);
    // }, [hour, setHour]);

    // const hourDown = useCallback(() => {
    //   setHour((((hour - 1) % 24) + 24) % 24);
    // }, [hour, setHour]);

    // const minutesUp = useCallback(() => {
    //   setMinutes((((minutes + 15) % 60) + 60) % 60);
    // }, [minutes, setMinutes]);

    // const minutesDown = useCallback(() => {
    //     setMinutes((((minutes - 15) % 60) + 60) % 60);
    // }, [minutes, setMinutes]);

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
        <Container className="time-picker">
            <Row className="hour">
                <Col>
                    <Input disabled
                        type="number"
                        className="hr"
                        value={hour}/>
                </Col>
                <Col>
                <div className="separator">:</div>
                </Col>
                <Col>
                <div className="minute">
                    <Input disabled
                           type="number"
                           className="min"
                           value={minutes}/>
                           </div>
                </Col>            
            </Row>
        </Container>

    );
}