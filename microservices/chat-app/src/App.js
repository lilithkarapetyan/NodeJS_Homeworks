import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from "./Components/Navigation/PrivateRoute/PrivateRoute"

import NavLayout from './Containers/NavLayout/NavLayout';
import AuthContainer from './Containers/Auth/Auth';
import ProfileContainer from './Containers/Profile/Profile';

class App extends Component {
  render() {
    return (
      <div style={{height: "100%"}}>
          <Switch>
            <Route path="/auth" component={AuthContainer} />
            <NavLayout>
              <PrivateRoute path="/profile" component={ProfileContainer}/>
            </NavLayout>
            <Route path="/" render={() => (
              <Redirect to="/auth" />
            )} />
          </Switch>
      </div>
    );
  }
}

export default App;
