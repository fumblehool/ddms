import fetch from 'isomorphic-fetch';

import ApiConstants from '../constants/Api';

import queryString from 'query-string';

const { API_HOST } = ApiConstants;
import { getCookie } from './../utils';

export default {
    fetchDocsList(){
        debugger;
        return fetch(`${API_HOST}/api/list/`, {
            'credentials': 'include',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': getCookie('csrftoken')
            },
        })
    },

    loginUser(body){
        return fetch(`${API_HOST}/api/login/`, {
            'credentials': 'include',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': getCookie('csrftoken')
            },
            'body': queryString.stringify(body)
        })
    },

    RegisterUser(body){
        return fetch(`${API_HOST}/api/register/`, {
            'credentials': 'include',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': getCookie('csrftoken')
            },
            'body': queryString.stringify(body)
        })
    },

    uploadFile(file, docType){
        var formData  = new FormData();
        formData.append('filename', file);
        formData.append('doctype', docType);

        return fetch(`${API_HOST}/api/docs/`, {
            'credentials': 'include',
            'method': 'POST',
            'headers': {
                'Content-Type': 'multipart/form-data',
                'X-CSRFToken': getCookie('csrftoken')
            },
            'body': formData
        })
    }
};