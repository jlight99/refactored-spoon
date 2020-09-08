import React, { useState } from 'react';
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(getUserFromLocalStorage());

  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL} >
        <div>
          <Route exact path="/" render={() => <SignIn setAuthenticated={setIsAuthenticated} />} />
          <Route path="/signin" render={() => <SignIn setAuthenticated={setIsAuthenticated} />} />
          {!isAuthenticated &&
            <span>
              <Redirect to="/signin" />
            </span>
          }
          {isAuthenticated &&
            <span>
              <Route path="/days" render={() => <Days setAuthenticated={setIsAuthenticated} />} />
              <Route path="/foodsearch" render={() => <FoodSearchPage setAuthenticated={setIsAuthenticated} />} />
            </span>
          }
        </div>
      </Router>
    </div>
  );
}

export default App;
