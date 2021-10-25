import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.scss';
import './components/widgets/TimeSelector';
import Feedback from './components/pages/Feedback';
import Start from './components/pages/Start';
import ChargingSession from './components/pages/ChargingSession';
import Schedule from './components/pages/Schedule';
import { useForm } from 'react-hook-form';

export default function App() {
  const form = useForm();

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
            <Schedule form={form} />
          </Route>
          <Route path="/feedback">
            <Feedback form={form} />
          </Route>
        </Switch>
    </Router>
  );
}

