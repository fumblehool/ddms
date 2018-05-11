import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class Section extends Component {
    onDocClick = (index) => {
        console.log('onDocClick');
    }
    
    render() {
        return(
            <Row>
            {(()=>{
                return this.props.docs.map((doc, index)=> {
                    return (
                        <Col key={index} xs={12} md={3} className="facts-card">
                            <div className="text-center cursor" onClick={()=>{this.onDocClick(index)}}>
                            hello - doc
                            {doc.media_title} of type {doc.media_type}
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