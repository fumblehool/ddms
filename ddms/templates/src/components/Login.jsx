import React, { Component } from 'react';
import {Row, Navbar, Nav, NavItem, FormControl, FormGroup, Button, Modal } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

class Header extends Component {

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

        return fetch(`localhost:8000/login/`, {
            'credentials': 'include',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            'body': queryString.stringify(body)
          })
          .then((r)=> {
              debugger;
          })
    }

    render() {
        return(
            <Row>
                <form method="POST">
                    <input type="text" name="username" value={this.state.username}
                        onChange={this.handleUsernameChange}/>
                    <input type="password" name="username" value={this.state.password}
                        onChange={this.handlePasswordChange}/>
                    <button onClick={this.onSubmit}> Submit </button>    
                </form>
            </Row>
        )
    }
}

export default Header;