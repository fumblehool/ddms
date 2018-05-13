import React, { Component } from 'react';

import { Table } from 'react-bootstrap';



class DocsView extends Component {
	render(){
		return (
			<div>
			<Table responsive condensed className="mt-10">
				<thead>
        <tr>
          {(() => {
            return this.props.fieldNames.map((field, index) => {
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
              
                let name = "facts-card ";
                if(doc['media_id'] === this.props.selectedDoc){
                    name += "selected-card"
                }
                
                if(doc.media_type === this.props.filterBy || this.props.filterBy === 'all'){
                    return (
                        <tr key={index}>
                          <td>{player.media_title}</td>
                          <td>{player.media_type}</td>
                        </tr>
                    )
                } 
            })
          })()}
        </tbody>
			</Table>
			</div>
		);
	}
}

export default DocsView;