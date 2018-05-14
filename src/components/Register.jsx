import React, { Component } from 'react';
import { Button, ControlLabel, FormControl, FormGroup, Grid } from 'react-bootstrap';
import DocApi from './../Api/api';
import NavBar from './NavBar';


class Register extends Component {
    state = {
        username: '',
        password: '',
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
        const body = {
            username: this.state.username,
            password: this.state.password
        };

        DocApi.RegisterUser(body)
        .then((r)=> r.json())
        .then((r)=> {
            if(r['error']){
                this.setState({
                    error: "User already exists"
                });
            }
            else{
                window.location.pathname = "/login"
            }
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
                        SignUp
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

export default Register;