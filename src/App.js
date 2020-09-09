import React, { useState } from 'react';
import './App.css';
import Days from './Days';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodSearchPage from './FoodSearchPage';
import { getUserFromLocalStorage } from './SignIn';
import HomePage from './HomePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(getUserFromLocalStorage());

  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL} >
        <Route exact path="/" render={() => <HomePage setAuthenticated={setIsAuthenticated} />} />
        {!isAuthenticated &&
          <span>
            <Redirect to="/" />
          </span>
        }
        {isAuthenticated &&
          <span>
            <Route path="/days" render={() => <Days setAuthenticated={setIsAuthenticated} />} />
            <Route path="/foodsearch" render={() => <FoodSearchPage setAuthenticated={setIsAuthenticated} />} />
          </span>
        }
      </Router>
    </div>
  );
}

export default App;
