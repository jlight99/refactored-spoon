import React from 'react';
import './App.css';
import SignIn from './SignIn';
import Days from './Days';
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
          <Route path="/home" component={Days} />
        </div>
      </Router>
    </div>
  );
}

export default App;
