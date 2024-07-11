import {Header} from '/src/components/header/Header'
import {LoginMain} from '/src/components/login/LoginMain'
import {Helmet} from 'react-helmet-async'

export function Login(){
    return (
        <>
            <Helmet>
                <title>Login page</title>
                <meta name='description' content='log in to your account to create new offers for buying or renting a home. ' />
            </Helmet>
            <Header />
            <LoginMain />
        </>
    )
}