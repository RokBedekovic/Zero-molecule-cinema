import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from './Login/Login';
import EmptyScreen from './EmptyScreen/EmptyScreen';
import CreateNewMovie from './CreateNewMovie/CreateNewMovie';

class App extends Component {  

  render() {
    return (
      <div>
        <Router>
            <Switch>
              <Route exact path="/login" component={Login} />              
              <Route exact path="/empty" component={EmptyScreen} />
              <Route exact path="/createNewMovie" component={CreateNewMovie} />
              <Redirect to="/login"></Redirect>
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
