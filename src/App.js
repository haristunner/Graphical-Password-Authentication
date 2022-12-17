import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/home/home";
import Dashboard from "./Components/dashboard/Dashboard";

function App() {
  return (
    <Router className="app">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
;