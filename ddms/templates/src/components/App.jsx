import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Row, Grid } from 'react-bootstrap';

import Header from './Header';
import Login from './Login';

import Home from './Home';
import NotFound from './NotFound';
import Register from './Register';

import { getCookie } from './../utils';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Grid>

          {(()=>{
            if(getCookie('csrftoken')){
              return (
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/docs" component={Home} />
                  <Route exact path="/login" render={() => (<Redirect to="/docs" />)} />
                  <Route exact path="/register" render={() => (<Redirect to="/docs" />)} />
                  <Route component={NotFound} />
                </Switch>
              );
            }
            return (
              <Switch>
                <Route exact path="/" render={()=> (<Redirect to="/login" />)} />
                <Route exact path="/docs" render={()=> (<Redirect to="/login" />)} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route component={NotFound} />
              </Switch>
            )
          })()}



          
        </Grid>
      </BrowserRouter>
    );
  }
}

export default App;
