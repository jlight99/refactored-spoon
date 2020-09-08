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
import { getUserFromLocalStorage } from './SignIn';
import TestHome from './TestHome';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path="/" component={TestHome} />
          <Route path="/signin" component={SignIn} />
          {/* {!getUserFromLocalStorage() &&
            <span>
              <Redirect to="/signin" />
            </span>
          } */}
          {getUserFromLocalStorage() &&
            <span>
              <Route path="/days" component={Days} />
              <Route path="/foodsearch" component={FoodSearchPage} />
            </span>
          }
        </div>
      </Router>
    </div>
  );
}

export default App;
