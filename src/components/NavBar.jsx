import React, { Component } from 'react';
import {Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


class NavBar extends Component {
    render() {
        return(
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                <Navbar.Brand>
                    <a className="cursor">DDocs</a>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                <Nav>
                    <LinkContainer to="/login">
                    <NavItem eventKey={1}>Login</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/register">
                        <NavItem eventKey={2}>Signup</NavItem>
                    </LinkContainer>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar;