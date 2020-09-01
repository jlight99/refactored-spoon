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
import FoodSearchPage from './FoodSearchPage';

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
          <Route path="/foodsearch" component={FoodSearchPage} />
        </div>
      </Router>
    </div>
  );
}

export default App;
