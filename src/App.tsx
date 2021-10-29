import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.scss';
import './components/widgets/TimeSelector';
import Feedback from './components/pages/Feedback';
import Start from './components/pages/Start';
import ChargingSession from './components/pages/ChargingSession';
import Schedule from './components/pages/Schedule';
import {ChargingMode} from "./data/models/ChargingMode";
import { useForm } from 'react-hook-form';

// const DEFAULT_TIME = {hour: 17, minutes: 30};
const DEFAULT_MODE: ChargingMode | null = null;

export default function App() {

  // const [hour , setHour] = useState<number>(DEFAULT_TIME.hour);
  // const [minutes, setMinutes] = useState<number>(DEFAULT_TIME.minutes);
  const [mode, setMode] = useState<ChargingMode | null>(DEFAULT_MODE);
  const initialValues = {
    arrival: new Date(),
    departure: new Date(),
    finished: new Date(),
    isAborted: false,
    mode: mode,
    price: 0,
    desiredEnergy: 0,
    actualEnergy: 0,
}
const form = useForm({
    defaultValues: {...initialValues},
});

  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route path="/session">
            <ChargingSession mode={mode} form={form} />
          </Route>
          <Route path="/schedule">
            <Schedule mode={mode} setMode={setMode} form={form}/>
          </Route>
          <Route path="/feedback">
            <Feedback/>
          </Route>
        </Switch>
    </Router>
  );
}

