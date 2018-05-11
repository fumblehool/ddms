import React, { Component } from 'react';

import Section from './Section';
import Header from './Header';

import DocApi from './../Api/api';


class Home extends Component {
    state = {
        docs: [],
        organisedDocs: [],
        searchText: '',
        docSelected: false,
        selectedDoc: '',
        filterBy: 'all'
    }

    componentWillMount(){
        DocApi.fetchDocsList()
          .then((r)=> r.json())
          .then((r) => {
              this.setState({
                  docs: r,
                  organisedDocs: r
              })
          })
          .catch((e)=>{
          })
    }

    searchTextChange = (searchText) => {
        const filterText = searchText.toLowerCase();

        const organisedDocs = this.state.docs.filter((doc)=> doc['media_title'].indexOf(filterText) !== -1);
        this.setState({
            organisedDocs,
            searchText
        });
    }

    ChangeselectedDoc = (selectedDoc) => {
        this.setState({
            selectedDoc,
            docSelected: true
        });
    }

    deleteSelectedDoc = () => {
        DocApi.deleteDoc(this.state.selectedDoc)
        .then((r)=> r.json())
        .then((r) => {
            this.setState({
                docs: this.state.docs.filter((doc) => doc['media_id'] !== this.state.selectedDoc),
                organisedDocs: this.state.organisedDocs.filter((doc) => doc['media_id'] !== this.state.selectedDoc),
                selectedDoc: {}
            })
        })
    }

    handleFilterChange = (filterBy) => {
        this.setState({
            filterBy
        });
    }

    render(){
        return (
            <div>
                <Header
                    searchTextChange={this.searchTextChange}
                    docSelected={this.state.docSelected}
                    deleteSelectedDoc={this.deleteSelectedDoc}
                    handleFilterChange={this.handleFilterChange}
                />
                <Section
                    docs={this.state.organisedDocs}
                    selectedDoc={this.state.selectedDoc}
                    ChangeselectedDoc={this.ChangeselectedDoc}
                    filterBy={this.state.filterBy}
                />
            </div>
        )
    }
}

export default Home;