import React, { Component } from 'react';
import Section from './Section';
import Header from './Header';
import DocApi from './../Api/api';
import { Alert } from 'react-bootstrap';

class Home extends Component {
    state = {
        docs: [],
        organisedDocs: [],
        searchText: '',
        docSelected: false,
        selectedDoc: '',
        filterBy: 'all',
        show: false,
        showText: ''
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

        const organisedDocs = this.state.docs.filter((doc)=> doc['media_title'].toLowerCase().indexOf(filterText) !== -1);
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
            if(r['status'] === 'successful'){
                this.setState({
                    show: true,
                    showText: "Document Deleted Successfully",
                    docs: this.state.docs.filter((doc) => doc['media_id'] !== this.state.selectedDoc),
                    organisedDocs: this.state.organisedDocs.filter((doc) => doc['media_id'] !== this.state.selectedDoc),
                    selectedDoc: {}
                })
            }
        })
    }

    handleFilterChange = (filterBy) => {
        this.setState({
            filterBy
        });
    }

    addNewUpload = (doc) => {
        const filterText = this.state.searchText.toLowerCase();
        let docs = this.state.docs;
        docs = docs.concat(doc);
        const organisedDocs = docs.filter((doc)=> doc['media_title'].toLowerCase().indexOf(filterText) !== -1);

        this.setState({
            docs,
            organisedDocs
        })
    }

    handleEditDocName = (docName) => {
        DocApi.updateDoc(this.state.selectedDoc, 'media_title', docName)
        .then((r)=> r.json())
        .then((r) => {
            if(r['status'] === 'successful'){
                let docs = this.state.docs.map((doc)=>{
                    if(doc['media_id'] === this.state.selectedDoc){
                        doc['media_title'] = docName;
                        doc['last_edited_at'] = r['last_edited_at'];
                    }
                    return doc;
                })

                let organisedDocs = this.state.organisedDocs.map((doc)=> {
                    if(doc['media_id'] === this.state.selectedDoc){
                        doc['media_title'] = docName;
                        doc['last_edited_at'] = r['last_edited_at'];
                    }
                    return doc;
                })

                this.setState({
                    show: true,
                    showText: "Document updated successfully!",
                    docs,
                    organisedDocs
                })
            }
        })
    }

    handleDismiss = () => {
        this.setState({
            show: false,
            showText: ''
        });
    }

    showAlert = () => {
        if (this.state.show) {
            setTimeout(() => {
                this.setState({
                    show: false,
                    showText: ''
                });
              }, 3000);
            return (
              <Alert bsStyle="success" onDismiss={this.handleDismiss}>
                <strong>{this.state.showText}</strong>
              </Alert>
            );
        }
    }


    render(){
        return (
            <div>
                <Header
                    searchTextChange={this.searchTextChange}
                    docSelected={this.state.docSelected}
                    deleteSelectedDoc={this.deleteSelectedDoc}
                    handleFilterChange={this.handleFilterChange}
                    handleEditDocName={this.handleEditDocName}
                />
                {this.showAlert()}
                <Section
                    docs={this.state.organisedDocs}
                    selectedDoc={this.state.selectedDoc}
                    ChangeselectedDoc={this.ChangeselectedDoc}
                    filterBy={this.state.filterBy}
                    addNewUpload={this.addNewUpload}
                />
            </div>
        )
    }
}

export default Home;