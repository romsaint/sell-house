import { useContext, useState } from 'react'
import styles from '/public/Signup.module.css'

import { AuthContext } from '../../contexts/authContext'
import { useNavigate } from 'react-router-dom';

import {apiRequest} from '/src/utils/apiRequest'


async function handleSubmit(e, setUser, setErr, navigate) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
        const response = await apiRequest.post('/signup', {
            username, password
        });

        localStorage.setItem('user', response.data.user)
        setUser(response.data.user);
        navigate('/');
    } catch (e) {
        setErr(e.response.data.message);
    }
}

export function SignupMain(){
    const navigate = useNavigate()

    const [isPasswordValid, setIsPasswordValid] = useState('')
    const [err, setErr] = useState(false)
    const {user, setUser} = useContext(AuthContext)

    return (
        <>
            <div className={styles.signupContainer}>
                {err
                    ?   <div className={styles.alert}>
                            <div className={styles.alertMsg}>{err}</div>
                        </div>
                    :   ''
                }
                <form onSubmit={(e) => handleSubmit(e, setUser, setErr, navigate)} method='post' action='/signup' className={styles.signupForm}>
                    <center>
                        <h2>Sign up</h2>
                    </center>
                    <input type="text" placeholder="Username" name='username'/>
                    <input type="password" onChange={e => setIsPasswordValid(e.target.value)} placeholder="Password" name='password'/>
                    {isPasswordValid.length < 3 && isPasswordValid.length !== 0
                        ?   <span className={styles.alertText}>Password not valid</span>
                        : ''
                    }
                    {isPasswordValid.length < 3 && isPasswordValid.length !== 0
                         ?  <button type="submit" disabled className={styles.btnSignupDisabled}>Sign up</button> 
                         :  <button type="submit" className={styles.btnSignup}>Sign up</button> 
                        
                    }
                </form>
            </div>
        </>
    )
}