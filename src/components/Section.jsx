import React, { Component } from 'react';
import { Row, Col, Table } from 'react-bootstrap';

const fieldNames = ["Title", "Category"];


class Section extends Component {
    onDocClick = (media_id) => {
        this.props.ChangeselectedDoc(media_id);
    }
    
    render() {
        return(
            <Row>
                <div className="fixedContainer">
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