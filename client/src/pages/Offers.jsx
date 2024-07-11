import {Header} from '../components/header/Header'
import {MainOffers} from '../components/offers/MainOffers'
import {Helmet} from 'react-helmet-async'

export function Offers(){
    return (
        <>
            <Helmet>
                <title>Offers page</title>
                <meta name='description' content='Search your beautiful house to buy or rent ' />
            </Helmet>
            
            <Header />
            <MainOffers />
        </>
    )
}