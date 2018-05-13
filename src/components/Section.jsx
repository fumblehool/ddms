import React, { Component } from 'react';
import { Row, Col, Table, Modal, FormControl, FormGroup, Button, DropdownButton, MenuItem} from 'react-bootstrap';
import moment from 'moment';
import DocApi from '../Api/api';


const fieldNames = ["Title", "Category", "Created At", "Last Edited"];


class Section extends Component {
    state = {
        showModal: false,
        docType: 'financial',
    }

    onDocClick = (media_id) => {
        this.props.ChangeselectedDoc(media_id);
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

    onChange = (e) => {
        this.setState({
            file:e.target.files[0]
        })
    }

    handleTypeSelect = (e) => {
        this.setState({
            docType: e
        });
    }

    handleSubmit = (e) => {
        DocApi.uploadFile(this.state.file, this.state.docType)
        .then((r)=> r.json())
        .then((r)=> {
            alert("Upload Successful!");
            this.props.addNewUpload(r);
            this.closeModalDialog();
        })
        .catch((e)=> { console.log(e)})
    }

    ComponentModal = () => {
		return (
			<Modal className="black-text" show={this.state.showModal} onHide={this.closeModalDialog}>
				<Modal.Header closeButton>
					<Modal.Title>
						File Upload
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="text-center">
					<form>
                        <FormGroup controlId="formBasicFile">
                            <FormControl
                                type="file"
                                onChange={this.onChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <DropdownButton
                                bsSize="medium"
                                bsStyle="primary"
                                title={this.state.docType}
                                id="dropdown-size-large"
                                onSelect={this.handleTypeSelect}
                            >
                                <MenuItem eventKey="financial">Financial</MenuItem>
                                <MenuItem eventKey="marketing">Marketing</MenuItem>
                                <MenuItem eventKey="technical">Technical</MenuItem>
                            </DropdownButton>
                        </FormGroup>
                        <Button onClick={this.handleSubmit}> Submit </Button>
					</form>
				</Modal.Body>
			</Modal>
		);
    }

    
    render() {
        return(
            <Row>
            {this.ComponentModal()}
                <div className="fixedContainer" onClick={this.showModalDialog}>
                    Upload
                </div>
            {(()=>{
                if(this.props.docs.length ===0){
                    return (
                        <div className="text-center">
                            No Document Available
                        </div>
                    )
                }

                return(
                    <div>
                        <Table responsive>
                            <thead>
                    <tr>
                    {(() => {
                        return fieldNames.map((field, index) => {
                        return (
                            <th key={index} className="publish__table__header">
                            <b>{field}</b>
                            </th>
                        );
                        });
                    })()}
                    </tr>
                    </thead>
                    <tbody>
                    {(()=>{
                        return this.props.docs.map((doc, index)=>{
                            if(doc.media_type === this.props.filterBy || this.props.filterBy === 'all'){
                                let classes = "doclist-tr ";
                                if(doc['media_id'] == this.props.selectedDoc){
                                    classes += "selected-row";
                                }
                                return (
                                    <tr key={index} className={classes} onClick={()=>{this.onDocClick(doc['media_id'])}}>
                                    <td>{doc.media_title}</td>
                                    <td>{doc.media_type}</td>
                                    <td>{moment(doc.created_at).format('MMM Do YYYY, h:mm A')}</td>
                                    <td>{moment(doc.last_edited_at).format('MMM Do YYYY, h:mm A')}</td>
                                    </tr>
                                )
                            } 
                        })
                    })()}
                    </tbody>
                        </Table>
                        </div>
                );
            })()}
            </Row>
        )
    }
}

export default Section;