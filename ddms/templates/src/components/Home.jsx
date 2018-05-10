import React, { Component } from 'react';

import Section from './Section';

const docs = [{
    'title': 'abc',
    'type': 'image',
  }]

class Home extends Component {
    render(){
        return (
            <div>
            <Section docs={docs}/>
            </div>
        )
    }
}