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
  //setMode: (mode: ChargingMode | null) => void,
  hour: number,
  //setHour: (hour: number) => void,
  minutes: number,
  price: number,
  CO2: number,
  //setMinutes: (hour: number) => void
}

// interface StateType {
//   state: SessionType,
//   setState: React.Dispatch<React.SetStateAction<SessionType>>,
// }



export default function App() {

  const defaultState: SessionType = {
    hour: DEFAULT_TIME.hour,
    minutes: DEFAULT_TIME.minutes,
    mode: DEFAULT_MODE,
    price: 0,
    CO2: 0,
  }

  const [state, setState] = useState<SessionType>(defaultState);

  // const [hour , setHour] = useState<number>(DEFAULT_TIME.hour);
  // const [minutes, setMinutes] = useState<number>(DEFAULT_TIME.minutes);
  // const [mode, setMode] = useState<ChargingMode | null>(DEFAULT_MODE);

  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route path="/session">
            <ChargingSession 
              state={state}
              setState={setState}
              // mode={mode}
              // hour={hour}
              // setHour={setHour}
              // minutes={minutes}
              // setMinutes={setMinutes}
              />
          </Route>
          <Route path="/schedule">
            <Schedule 
              state={state}
              setState={setState}/>
          </Route>
          <Route path="/feedback">
            <Feedback/>
          </Route>
        </Switch>
    </Router>
  );
}

