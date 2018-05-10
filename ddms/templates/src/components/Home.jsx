import React, { Component } from 'react';

import Section from './Section';
import fetch from 'isomorphic-fetch';
const docs = [{
    'title': 'abc',
    'type': 'image',
  }]
  import Cookies from 'js-cookie';
  
class Home extends Component {
    componentDidMount(){
        const a = fetch(`http://dev.ddms.com:8000/api/list/`, {
            'credentials': 'include'
          })
          .then((r)=> {
              debugger;
          })
          .catch((e)=>{
              debugger;
          })
    }
    render(){
        return (
            <div>
            <Section docs={docs}/>
            </div>
        )
    }
}

export default Home;