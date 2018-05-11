import React, { Component } from 'react';
import {Row, Navbar, Nav, NavItem, FormControl, FormGroup, Button, Modal, MenuItem, DropdownButton } from 'react-bootstrap';

import DocApi from './../Api/api';

class Header extends Component {

    state = {
        showModal: false,
        docType: '',
        text: ''
	};

    handleInputChange = (e) => {
        this.props.searchTextChange(e.target.value);
        this.setState({
            text: e.target.value
        });
    };

    checkEnterKey = (e) => {
        if(e.key == 'Enter'){
            
        }
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
    
    handleTypeSelect = (e) => {
        this.setState({
            docType: e
        });
    }

    handleSubmit = () => {
        const file = this.state.file;
        const docType = this.state.docType;

        DocApi.uploadFile(file, docType)
        .then((r)=> r.json())
        .then((r)=> { alert(e)})
        .catch((e)=> { console.log(e)})
    }
    onChange(e) {
        this.setState({file:e.target.files[0]})
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
                        <FormGroup
                            controlId="formBasicFile"
                            >
                            <FormControl
                                type="file"
                                onChange={this.onChange}
                            />

                            <DropdownButton
                                bsSize="large"
                                title="Doc Type"
                                id="dropdown-size-large"
                                onSelect={this.handleTypeSelect}
                            >
                                <MenuItem eventKey="economic">Economic</MenuItem>
                                <MenuItem eventKey="personal">Personal</MenuItem>
                                <MenuItem eventKey="something">Something</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey="somethingelse">Separated else</MenuItem>
                            </DropdownButton>
                            <Button onClick={this.handleSubmit}> Submit </Button>

                        </FormGroup>


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

                    {(()=>{
                        if(this.props.docSelected){
                            return(
                                <Button className="pull-right m-l-lg" bsStyle="primary" onClick={this.props.deleteSelectedDoc}>
                                    Delete
                                </Button>
                            )
                        }
                    })()}
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