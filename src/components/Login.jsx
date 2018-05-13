import React, { Component } from 'react';
import {Row, Navbar, Nav, NavItem, FormControl, FormGroup, Button, ControlLabel, Modal, Grid } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { getCookie, setCookie } from './../utils';
import DocApi from './../Api/api';

import NavBar from './NavBar';

class Login extends Component {

    state = {
        username: '',
        password: '',
        redirect: false,
        error: ''
	};

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit = () => {
        DocApi.loginUser(this.state.username, this.state.password)
          .then((r)=> r.json())
          .then((r)=> {
            if(r['token']){
                this.props.setCookie(r['token']);
                this.setState({
                    redirect: true
                })
                window.location.reload();
            }
            if(r['non_field_errors']){
                this.setState({
                    error: r['non_field_errors']
                });
            }
          })
          .catch((error)=>{
          })
    }

    validateForm = () => {
        return (this.state.username.length && this.state.password.length);
    }

    render() {
        return(
            <div>
                <NavBar/>
            <Grid>
                {(()=>{
                    if (this.state.redirect) {
                        return <Redirect to='/docs'/>;
                    }
                })()}
  
            <div className="Login">
            <h1 className="text-center">Login</h1>
            <form>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Username</ControlLabel>
                    <FormControl
                    autoFocus
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    type="password"
                    />
                </FormGroup>
                <Button
                    block
                    bsSize="large"
                    disabled={!this.validateForm()}
                    type="button"
                    onClick={this.onSubmit}
                >
                    Login
                </Button>
                {(()=>{
                    if(this.state.error.length>0){
                        return(
                            <p className="danger">
                                {this.state.error}
                            </p>
                        );
                    } 
                })()}
                </form>
            </div>
            </Grid>
            </div>
        )
    }
}

export default Login;