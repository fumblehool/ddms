import React, { Component } from 'react';
import {Row, Navbar, Nav, NavItem, FormControl, FormGroup, Button, Modal } from 'react-bootstrap';

class Header extends Component {

    state = {
		showModal: false
	};

    handleInputChange = (e) => {
        console.log('changed');
    };

    checkEnterKey = (e) => {
        console.log(e);
    }

    showModalDialog = () => {
		this.setState({
			showModal: true
		});
	}

	closeModalDialog = () => {
		this.setState({
			showModal: false
		});
	}

    ComponentModal = () => {
		return (
			<Modal className="black-text" show={this.state.showModal} onHide={this.closeModalDialog}>
				<Modal.Header closeButton>
					<Modal.Title>
						File Upload
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>
						<input type="file"/>
                        <Button></Button>
					</p>
				</Modal.Body>
			</Modal>
		);
	}

    render() {
        return(
            <Row>
                {this.ComponentModal()}
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
                    <Button className="pull-right" bsStyle="primary" onClick={this.showModalDialog}>
                        Upload
                    </Button>
                    </Navbar.Form>
                    
                </Navbar.Collapse>
            </Navbar>
            </Row>
        )
    }
}

export default Header;