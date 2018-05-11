import React, { Component } from 'react';
import {Row, Navbar, Nav, NavItem, FormControl, FormGroup, Button, Modal } from 'react-bootstrap';

import { getCookie } from './../utils';
import DocApi from './../Api/api';

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
        DocApi.loginUser(body)
          .then((r)=> {
              debugger;
          })
    }

    render() {
        return(
            <Row>
                <input type="text" name="username" value={this.state.username}
                    onChange={this.handleUsernameChange}/>
                <input type="password" name="username" value={this.state.password}
                    onChange={this.handlePasswordChange}/>
                <button onClick={this.onSubmit}> Submit </button>
            </Row>
        )
    }
}

export default Login;