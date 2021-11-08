import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.scss';
import './components/widgets/TimeSelector';
import Feedback from './components/pages/Feedback';
import Start from './components/pages/Start';
import ChargingSession from './components/pages/ChargingSession';
import Schedule from './components/pages/Schedule';
import {ChargingMode} from "./data/models/ChargingMode";

/**
 * Default deaprture time: 17:30
 */
const DEFAULT_TIME = {hour: 17, minutes: 30};
/**
 * Default chargind mode: none (unselected)
 */
const DEFAULT_MODE: ChargingMode | null = null;

export interface SessionType {
  /**
   * Type of the mode of the charging session: either fast or solar power mode; null is default.
   */
  mode: ChargingMode | null,
  /**
   * Type of the hour of expected departure time.
   */
  hour: number,
    /**
   * Type of the minutes of expected departure time.
   */
  minutes: number,
  /**
   * Type of the price of the charging session.
   */
  price: number,
  /**
   * Type of the hour of expected departure time.
   */
  CO2: number,
}

/**
 * Defines the charging settings: mode, departure time, price and CO2 emmissions.
 * @returns   - Router with paths to all main components.
 */
export default function App() {
  /**
   * Default values for the charging settings.
   */
  const defaultState: SessionType = {
    /**
     * Default hour is 5.
     */
    hour: DEFAULT_TIME.hour,
    /**
     * Default minutes are 30.
     */
    minutes: DEFAULT_TIME.minutes,
    /**
     * Default mode is unselected (null).
     */
    mode: DEFAULT_MODE,
    /**
     * Price is 0 by default.
     */
    price: 0,
    /**
     * CO2 are 0 by default.
     */
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

