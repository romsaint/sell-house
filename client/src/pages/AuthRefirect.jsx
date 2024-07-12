import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {AuthContext} from '../contexts/authContext'
import {apiRequest} from '../utils/apiRequest'

export function AuthRefirect(){
    const [user, setUser] = useState(null);


    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log('code')
    console.log(code)
    if (code) {
    apiRequest.post('/api/auth/github/callback', { code })
        .then(response => {
        console.log('response.data')
        console.log(response.data)
        setUser(response.data);
        })
        .catch(error => {
        console.error(error);
        });
    }


    return (
        <>
            52
        </>
    )
}