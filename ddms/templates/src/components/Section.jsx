import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class Section extends Component {
    onDocClick = (index) => {
        this.props.ChangeselectedDoc(this.props.docs[index]['media_id']);
    }
    
    render() {
        return(
            <Row>
            {(()=>{
                if(this.props.docs.length ===0){
                    return (
                        <div className="text-center">
                            No Document Available
                        </div>
                    )
                }

                return this.props.docs.map((doc, index)=> {
                    let name = "facts-card ";
                    if(doc['media_id'] === this.props.selectedDoc){
                        name += "selected-card"
                    }
                    return (
                        <Col key={index} xs={12} md={3} className={name}>
                            <div className="text-center cursor" onClick={()=>{this.onDocClick(index)}}>
                                <h1>
                                    {doc.media_title}
                                </h1>
                                <h2>
                                    {doc.media_type}
                                </h2>
                            </div>
                        </Col>
                    );
                });
            })()}
            </Row>
        )
    }
}

export default Section;