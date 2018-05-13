import React, { Component } from 'react';
import {Row, Navbar, Nav, NavItem, FormControl, FormGroup, Button, Modal, MenuItem, DropdownButton } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import DocApi from './../Api/api';
import { removeCookie } from './../utils';

class Header extends Component {

    state = {
        showModal: false,
        docType: 'financial',
        text: '',
        filterBy: 'all',
        redirect: false,
        redirectUrl: '/docs',
        confirmModal: false,
        modalTitle: '',
        modalType: ''
	};

    deleteDoc = () => {
        this.props.deleteSelectedDoc();
        this.setState({
            confirmModal: false
        });
    }

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

    handleFilterChange = (filterBy) => {
        this.setState({
            filterBy
        });
        this.props.handleFilterChange(filterBy);
    }

    logoutUser = () => {
        removeCookie('token');
        this.setState({
            redirectUrl: '/login',
            redirect: true
        })
        window.location.reload();
    }
    
    confirmationModal = () => {
        return (
			<Modal className="black-text" show={this.state.confirmModal} onHide={this.closeConirmationModal}>
				<Modal.Header closeButton>
					<Modal.Title>
						{this.state.modalTitle}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center">
					<p>
                        {(()=>{
                            if(this.state.modalType === 'delete'){
                                return(
                                    <div>
                                    <p>Delete?</p>
                                    <Button bsStyle="danger" onClick={this.deleteDoc}> Confirm </Button>
                                    <Button className="m-l-lg" onClick={this.closeConirmationModal}> Close </Button>
                                    </div>
                                );
                            }
                            return(
                                <div>
                                    <p>Logout?</p>
                                    <Button bsStyle="danger" onClick={this.logoutUser}> Confirm </Button>
                                    <Button className="m-l-lg" onClick={this.closeConirmationModal}> Close </Button>
                                </div>
                            )
                        })()}
					</p>
				</Modal.Body>
			</Modal>
		);
    }

    confirmLogOut = () => {
        this.setState({
            modalType: 'logout',
            modalTitle: 'Logout',
            confirmModal: true
        });
    }

    confirmDelete = () => {
        this.setState({
            modalType: 'delete',
            modalTitle: 'Delete',
            confirmModal: true
        });
    }


    showConirmationModal = () => {
		this.setState({
			confirmModal: true
		});
	}

	closeConirmationModal = () => {
		this.setState({
			confirmModal: false
		});
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirectUrl}/>;
        }
        
        return(
            <Row>
                {this.confirmationModal()}
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
                        <FormControl className="w-r-20" onChange={this.handleInputChange} onKeyPress={this.checkEnterKey} type="text" placeholder="Search" />
                        <DropdownButton
                                bsSize="primary"
                                bsStyle="medium"
                                title={this.state.filterBy}
                                id="dropdown-size-large"
                                onSelect={this.handleFilterChange}
                                className="m-l-lg"
                            >
                                <MenuItem eventKey="all">All</MenuItem>
                                <MenuItem eventKey="financial">Financial</MenuItem>
                                <MenuItem eventKey="marketing">Marketing</MenuItem>
                                <MenuItem eventKey="technical">Technical</MenuItem>
                            </DropdownButton>
                    </FormGroup>

                    {(()=>{
                        if(this.props.docSelected){
                            return(
                                <Button className="m-l-lg" bsStyle="primary" onClick={this.confirmDelete}>
                                    Delete
                                </Button>
                            )
                        }
                    })()}
                    
                    <Button className="pull-right m-l-lg" bsStyle="danger" onClick={this.confirmLogOut}>
                        LogOut
                    </Button>    
                    </Navbar.Form>
                    
                </Navbar.Collapse>

            </Navbar>
            
            </Row>
        )
    }
}

export default Header;