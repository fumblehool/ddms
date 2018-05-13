import fetch from 'isomorphic-fetch';

import ApiConstants from '../constants/Api';

import queryString from 'query-string';

const { API_HOST } = ApiConstants;
import { getCookie } from './../utils';

export default {
    fetchDocsList(){
        return fetch(`${API_HOST}/api/list/`, {
            'credentials': 'include',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X_TOKEN': getCookie('token')
            },
        })
    },

    loginUser(username, password){
        const body = {
            username,
            password,
            'csrftoken': getCookie('csrftoken')
        }
        return fetch(`${API_HOST}/api/login/`, {
            'credentials': 'include',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X_TOKEN': getCookie('token'),
                'X-CSRFToken': getCookie('csrftoken')
            },
            'body': queryString.stringify(body)
        })
    },

    logoutUser(){
        return fetch(`${API_HOST}/api/logout/`, {
            'credentials': 'include',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X_TOKEN': getCookie('token'),
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
    },

    RegisterUser(body){
        return fetch(`${API_HOST}/api/register/`, {
            'credentials': 'include',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X_TOKEN': getCookie('token'),
                'X-CSRFToken': getCookie('csrftoken')
            },
            'body': queryString.stringify(body)
        })
    },

    uploadFile(file, docType){
        var formData  = new FormData();
        formData.append('file', file);
        formData.append('doctype', docType);

        return fetch(`${API_HOST}/api/docs/`, {
            'credentials': 'include',
            'method': 'POST',
            'headers': {
                'X_TOKEN': getCookie('token')
            },
            'body': formData
        })
    },

    deleteDoc(doc_id){
        return fetch(`${API_HOST}/api/docs/${doc_id}/`, {
            'credentials': 'include',
            'method': 'DELETE',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X_TOKEN': getCookie('token')
            },
        })
    }
};