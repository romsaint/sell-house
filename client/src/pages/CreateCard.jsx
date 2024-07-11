import {CreateCardMain} from '../components/createCard/CreateCardMain'
import {Header} from '../components/header/Header'
import {Helmet} from 'react-helmet-async'


export function CreateCard(){
    return (
        <>
            <Helmet>
                <title>Create sell  offer</title>
                <meta name='description' content='Create a real estate offer quickly and easily on our website - Lama Estate.'></meta>
            </Helmet>

            <Header/>
            <CreateCardMain/>
        </>
    )
}