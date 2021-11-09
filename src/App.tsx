import React, {useCallback, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const firebaseConfig = {
  apiKey: "AIzaSyAQckdYeatXEj2BAA-D-7p_IM6RAId9P08",
  authDomain: "design-project-c4242.firebaseapp.com",
  projectId: "design-project-c4242",
  storageBucket: "design-project-c4242.appspot.com",
  messagingSenderId: "61399143585",
  appId: "1:61399143585:web:fef93464a561a110280ce0",
  measurementId: "G-CL6CR3FFGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
  energy: number,
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
    energy: 0,
  }

  const [settings, setSetting] = useState<SessionType>(defaultState);

  const setSettings = (values: SessionType) => {
    setSetting({
      ...settings,
      hour: values.hour,
      minutes: values.minutes,
      mode: values.mode,
      price: values.price,
      energy: values.energy,
      CO2: values.CO2,
    })
  };

  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route path="/session">
            <ChargingSession 
              settings={settings}/>
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

