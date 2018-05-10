import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Row, Grid } from 'react-bootstrap';

import Header from './Header';
import Section from './Section';
import Login from './Login';

import Home from './Home';




class App extends Component {
  render() {
    debugger;
    return (
      <BrowserRouter>
      <div>
        <Header />
        {/* <Section docs={docs}/> */}
        <Grid>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/docs" component={Home} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/player" component={Player} />
            <Route exact path="/" render={() => (<Redirect to="/home" />)} /> */}
            
          </Switch>
        </Grid>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
