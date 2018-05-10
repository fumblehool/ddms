import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Row, Grid } from 'react-bootstrap';

import Header from './Header';
import Section from './Section';

const docs = [{
  'title': 'abc',
  'type': 'image',
}]


class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/docs/">
      <div>
        <Header />
        <Grid>
        <Section docs={docs}/>
        </Grid>
        {/* <Row>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/team" component={Team} />
            <Route exact path="/player" component={Player} />
            <Route exact path="/" render={() => (<Redirect to="/home" />)} />
            <Route component={NotFound} />
          </Switch>
        </Row> */}
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
