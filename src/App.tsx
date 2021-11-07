import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.scss';
import './components/widgets/TimeSelector';
import Feedback from './components/pages/Feedback';
import Start from './components/pages/Start';
import ChargingSession from './components/pages/ChargingSession';
import Schedule from './components/pages/Schedule';
import {ChargingMode} from "./data/models/ChargingMode";


const DEFAULT_TIME = {hour: 17, minutes: 30};
const DEFAULT_MODE: ChargingMode | null = null;

export interface SessionType {
  mode: ChargingMode | null,
  hour: number,
  minutes: number,
  price: number,
  CO2: number,
}


export default function App() {

  const defaultState: SessionType = {
    hour: DEFAULT_TIME.hour,
    minutes: DEFAULT_TIME.minutes,
    mode: DEFAULT_MODE,
    price: 0,
    CO2: 0,
  }

  const [settings, setSettings] = useState<SessionType>(defaultState);

  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route path="/session">
            <ChargingSession 
              settings={settings}
              setSettings={setSettings}/>
          </Route>
          <Route path="/schedule">
            <Schedule 
              settings={settings}
              setSettings={setSettings}/>
          </Route>
          <Route path="/feedback">
            <Feedback/>
          </Route>
        </Switch>
    </Router>
  );
}

