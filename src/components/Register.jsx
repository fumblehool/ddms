import React, { Component } from 'react';
import {Row, Modal, Button, ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import DocApi from './../Api/api';
import { getCookie } from './../utils';
import NavBar from './NavBar';

class Login extends Component {

    state = {
        username: '',
        password: ''
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
        const body = {
            username: this.state.username,
            password: this.state.password
        };

        DocApi.RegisterUser(body)
        .then((r)=> r.json())
        .then((r)=> {
            if(r['error']){
                this.setState({
                    error: r['error']
                });
            }
            else{
                window.location.pathname = "/login"
            }
        })

    }

    getCookie = (name) => {
        if (!document.cookie) {
          return null;
        }
        const token = document.cookie.split(';')
          .map(c => c.trim())
          .filter(c => c.startsWith(name + '='));
    
        if (token.length === 0) {
          return null;
        }
        return decodeURIComponent(token[0].split('=')[1]);
    }

    validateForm = () => {
        return (this.state.username.length && this.state.password.length);
    }

    render() {
        return(
            <div>
            <NavBar/>
            <Grid>
                <div className="Login">
                <h1 className="text-center"> Register </h1>
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
                    </form>
                </div>
            </Grid>
            </div>
        )
    }
}

export default Login;