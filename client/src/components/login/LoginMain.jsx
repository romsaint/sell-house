import styles from '/public/Login.module.css'
import { AuthContext } from '../../contexts/authContext'
import { useNavigate, useLocation } from 'react-router-dom';

import { apiRequest } from '/src/utils/apiRequest'
import { useContext, useEffect, useState } from 'react';

async function auth() {
    try {
        const res = await apiRequest.post('/oauth');
        const data = res.data; // res.data.url
        localStorage.removeItem('user')

        window.location.href = data.url;
    } catch (error) {
        console.error('Error during authentication:', error);
    }
}


export function LoginMain() {
    return (
        <>
            <div className={styles.loginContainer}>
                <div className={styles.githubLogin}>
                    <div>
                        <button onClick={auth}>Login with Google</button>
                    </div>
                </div>
                <form method='post' action='/signin' className={styles.loginForm}>
                    <h2>Login</h2>
                    <input type="text" placeholder="Username" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
}