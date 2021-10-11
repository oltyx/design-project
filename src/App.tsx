import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import './components/widgets/TimeSelector';
import Feedback from './components/pages/Feedback';
import Start from './components/pages/Start';
import ChargingSession from './components/pages/ChargingSession';
import Schedule from './components/pages/Schedule';

export default function App() {

  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route path="/session">
            <ChargingSession />
          </Route>
          <Route path="/schedule">
            <Schedule />
          </Route>
          <Route path="/feedback">
            <Feedback />
          </Route>
        </Switch>
    </Router>
  );
}

