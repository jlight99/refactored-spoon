import React from 'react';
import './App.css';
import SignIn from './SignIn';
import Days from './Days';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodSearch from './FoodSearch';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path="/">
            <Redirect to="/signin" />
          </Route>
          <Route path="/signin" component={SignIn} />
          <Route path="/days" component={Days} />
          <Route path="/foodsearch" component={FoodSearch} />
        </div>
      </Router>
    </div>
  );
}

export default App;
