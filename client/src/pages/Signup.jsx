import { SignupMain } from '../components/signup/SignupMain'
import {Header} from '/src/components/header/Header'
import {Helmet} from 'react-helmet-async'

export function Signup(){
    return (
        <>
            <Helmet>
                <title>Login page</title>
                <meta name='description' content='Create new account to create new offers for buying or renting a home. ' />
            </Helmet>
            <Header />
            <SignupMain />
        </>
    )
}