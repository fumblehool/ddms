import React, { Component } from 'react';
import {Navbar, Nav, NavItem, FormControl, FormGroup, Button } from 'react-bootstrap';

class Header extends Component {

    handleInputChange = (e) => {
        console.log('changed');
    };

    checkEnterKey = (e) => {
        console.log(e);
    }

    render() {
        return(
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
            <Navbar.Brand>
                <a className="cursor">Docs</a>
            </Navbar.Brand>
            <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Navbar.Form pullLeft className="w-100">
                <FormGroup className="input-field">
                    <FormControl onChange={this.handleInputChange} onKeyPress={this.checkEnterKey} type="text" placeholder="Search" />
                </FormGroup>
                <Button className="pull-right" bsStyle="primary">
                    Upload
                </Button>
                </Navbar.Form>
                
            </Navbar.Collapse>



        </Navbar>
        )
    }
}

export default Header;