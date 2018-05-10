import React, { Component } from 'react';
import {Row, Navbar, Nav, NavItem, FormControl, FormGroup, Button, Modal } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

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
        const csrftoken = this.getCookie('csrftoken')
        const a = fetch(`http://dev.ddms.com:8000/api/register/`, {
            'credentials': 'include',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrftoken
            },
            'body': queryString.stringify(body)
          })
          .then((r)=> {
              debugger;
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