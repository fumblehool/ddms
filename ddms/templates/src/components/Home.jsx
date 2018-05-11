import React, { Component } from 'react';

import Section from './Section';
import Header from './Header';

import DocApi from './../Api/api';


const docs = [{
    'title': 'abc',
    'type': 'image',
  }]
  import Cookies from 'js-cookie';
  
class Home extends Component {
    state = {
        docs: []
    }

    componentWillMount(){
        DocApi.fetchDocsList()
          .then((r)=> r.json())
          .then((r) => {
              this.setState({
                  docs: r
              })
          })
          .catch((e)=>{
          })
    }
    render(){
        return (
            <div>
                <Header />
                <Section docs={this.state.docs}/>
            </div>
        )
    }
}

export default Home;