import React, { Component } from 'react';
import {Row, Navbar, Nav, NavItem, ControlLabel, FormControl, Glyphicon, FormGroup, Button, Modal, MenuItem, DropdownButton } from 'react-bootstrap';
import { removeCookie } from './../utils';

class Header extends Component {

    state = {
        showModal: false,
        docType: 'financial',
        text: '',
        filterBy: 'all',
        confirmModal: false,
        modalTitle: '',
        modalType: '',
        editModal: false
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

    onChange = (e) => {
        this.setState({
            docName: e.target.value
        })
    }
    
    handleEditDocName = () => {
        this.props.handleEditDocName(this.state.docName);
        this.closeEditModal();
    }

    editModal = () => {
        return (
			<Modal className="black-text" show={this.state.editModal} onHide={this.closeEditModal}>
				<Modal.Header closeButton>
					<Modal.Title>
						Edit Doc
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center">
                    <form>
                        <FormGroup controlId="formBasicInput">
                            <ControlLabel>Enter New Name: </ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.docName}
                                onChange={this.onChange}
                            />
                        </FormGroup>
                        <Button onClick={this.handleEditDocName}> Submit </Button>
                        <Button className="m-l-lg" onClick={this.closeEditModal}> Close </Button>
					</form>
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

    showEditModal = () => {
        this.setState({
            editModal: true
        });
    }

    closeEditModal = () => {
        this.setState({
            editModal: false
        })
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
        return(
            <Row>
                {this.confirmationModal()}
                {this.editModal()}
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                <Navbar.Brand>
                    <a className="cursor">Docs</a>
                </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form>
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
                                <div className="in-blk">
                                <Button className="m-l-lg" bsStyle="primary" onClick={this.confirmDelete}>
                                    <Glyphicon glyph="trash" />
                                    Delete
                                </Button>
                                <Button className="m-l-lg" bsStyle="primary" onClick={this.showEditModal}>
                                    <Glyphicon glyph="edit" />
                                    Edit
                                </Button>
                                </div>
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