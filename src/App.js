import React from 'react';
import './App.css';
import SignIn from './SignIn';
import TestComponent from './TestComponent';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path="/" component={SignIn} />
          <Route path="/home" component={TestComponent} />
        </div>
      </Router>
    </div>
  );
}

export default App;
