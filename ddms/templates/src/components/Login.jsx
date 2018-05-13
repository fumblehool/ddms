import React, { Component } from 'react';
import {Row, Navbar, Nav, NavItem, FormControl, FormGroup, Button, ControlLabel, Modal, Grid } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { getCookie, setCookie } from './../utils';
import DocApi from './../Api/api';

class Login extends Component {

    state = {
        username: '',
        password: '',
        redirect: false
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

        DocApi.loginUser(body)
          .then((r)=> r.json())
          .then((r)=> {
            if(r['csrf']){
                setCookie('csrftoken', r['csrf']);
                this.setState({
                    redirect: true
                })
            }
            alert(r);
          })
          .catch((error)=>{
              console.log(error);
          })
    }

    validateForm = () => {
        return (this.state.username.length && this.state.password.length);
    }

    render() {
        return(
            <Grid>
                {(()=>{
                    if (this.state.redirect) {
                        return <Redirect to='/docs'/>;
                    }
                })()}
  
            <div className="Login">
            <form onSubmit={this.onSubmit}>
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
                    type="submit"
                >
                    Login
                </Button>
                </form>
            </div>







            </Grid>
        )
    }
}

export default Login;