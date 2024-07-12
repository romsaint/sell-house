import {apiRequest} from '/src/utils/apiRequest'
import styles from '/public/Offers.module.css'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '/src/contexts/authContext'



export function MainOffers(){
    const [favorite, setFavorite] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [minprice, setMinprice] = useState('Loading...')
    const {user, setUser} = useContext(AuthContext)
    const [maxprice, setMaxprice] = useState('Loading...')
    const [city, setCity] = useState('Loading...')
    const [propertyPolicy, setPropertyPolicy] = useState('Loading...')
    const [petPolicy, setPetPolicy] = useState(false)
    const [url, setUrl] = useState(new URL(location.href))
    
    const cityNow = url.searchParams.get('city')


    const [data, setData] = useState(false)

    function handleSearchForm(e, navigate){
        e.preventDefault();
        const data = new FormData(e.target);

        navigate(`/all-offers?propertyPolicy=${data.get('propertyPolicy') === null ? '' : data.get('propertyPolicy')}&city=${data.get('location') === null ? '' : data.get('location')}&petPolicy=${data.get('petPolicy') === null ? '' : data.get('petPolicy')}&minprice=${data.get('minprice') === null ? '0' : data.get('minprice')}&maxprice=${data.get('maxprice') === null ? '99999999' : data.get('maxprice')}`);
        setUrl(new URL(location.href))
    }
    
    async function getData(){
        try{
            const res = await apiRequest.get(location.href.replace('http://localhost:5173', ''))
            
            setMinprice(url.searchParams.get('minprice'))
            setMaxprice(url.searchParams.get('maxprice'))
            setCity(url.searchParams.get('city'))
            setPropertyPolicy(url.searchParams.get('propertyPolicy'))
            setPetPolicy(url.searchParams.get('petPolicy'))
    
            setData(res.data.houses)

            const buy = document.getElementById('property_policy_yes')
            const rent = document.getElementById('property_policy_no')

            if(url.searchParams.get('propertyPolicy') === 'buy'){
                buy.checked = true
            }else{
                rent.checked = true
            }
            const petYes = document.getElementById('pet_policy_yes')
            const petNo = document.getElementById('pet_policy_no')
            if(url.searchParams.get('petPolicy')){
                if(url.searchParams.get('petPolicy') === 'allow'){
                    petYes.checked = true
                }
                if(url.searchParams.get('petPolicy') === 'reject'){
                    petNo.checked = true
                }
            }
            
  
        }catch(e){
            alert(e.message)
        }
    }
   
    useEffect(() => {
        getData() 
    }, [url])
    
    
    const navigate = useNavigate()

    async function setFavoriteF(e, id){
        e.preventDefault()
        const res = await apiRequest(`/set-favorite/${id}`) 
        if(res.data.ok){
            setFavorite(prev => !prev)
            getData()
        }
    }

    return (
        <>
            <div className={styles.offersContainer}>
                <div className={styles.searchForm}>
                    <p className={styles.searchFormText}>Search results for: <strong>{cityNow}</strong></p>
                </div>
                <form action="/all-offers" onSubmit={(e) => handleSearchForm(e, navigate)} method="get" className={styles.formSearch}>
                    <div className={styles.searchInputContainer}>
                        <label htmlFor="locationSearch">Location</label>
                        <input type="text" id='locationSearch' name='city' className={styles.locationSearch} onChange={(e) => setCity(e.target.value)} value={city} />
                    </div>
                    <div className={styles.flexSearchParams}>
                        <div className="propertyContainer">
                            <label className={styles.policyLabel}>Property:</label>
                            <div className={`${styles.policyInputContainer} ${styles.policyInputContainer1}`}>
                                <input type="radio" id="property_policy_yes" value='buy' name="propertyPolicy"required/>
                                <label className={styles.policyInnerLabel} htmlFor="property_policy_yes">Buy</label>
                            </div>
                            <div className={`${styles.policyInputContainer} ${styles.policyInputContainer2}`}>
                                <input type="radio" id="property_policy_no"   value='rent' name="propertyPolicy"required/>
                                <label className={styles.policyInnerLabel} htmlFor="property_policy_no">Rent</label>
                            </div>
                        </div>
                        <div className={styles.petContainer}>
                            <label className={styles.policyLabel}>Pet Policy:</label>
                            <div className={styles.policyInputContainer}>
                                <input type="radio" id="pet_policy_yes" value='allow'  name="petPolicy" />
                                <label className={styles.policyInnerLabel} htmlFor="pet_policy_yes">ALlow</label>
                            </div>
                            <div className={`${styles.policyInputContainer} ${styles.policyInputContainer1}`}>
                                <input type="radio" id="pet_policy_no" name="petPolicy" value='reject' />
                                <label className={`${styles.policyInnerLabel} ${styles.policyInnerLabel2}`} htmlFor="pet_policy_no">Reject</label>
                            </div>
                        </div>
                        <div className={styles.minpriceContainer}>
                            <label htmlFor="minPrice">Min price</label>
                            <input type="number" id='minPrice' name='minprice' onChange={(e => setMinprice(e.target.value))} value={minprice} />
                        </div>
                        <div className={styles.maxpriceContainer}>
                            <label htmlFor="maxPrice">Max price</label>
                            <input type="number" id='maxPrice' name='maxprice' onChange={(e => setMaxprice(e.target.value))} value={maxprice} />
                        </div>
                        <button type='submit' className='hero-action-search-filter-submit-btn'>
                            <img src="/src/assets/search-svgrepo-com.svg"  className='hero-action-search-filter-submit-btn-svg' alt="" />
                        </button>
                    </div>
                </form>
                <div className="cards">
                    {data
                        ? data.map((v, i) => {
                            return (
                                <a key={i}  href={`/house/${v._id}`}>
                                    <div className={styles.card}>
                                        <div className={styles.leftSection}>
                                            <img src={v.images[0]} alt="House image" />
                                        </div>
                                        <div className={styles.rightSection}>
                                            <h1>{v.title}</h1>
                                            <div className={styles.addressContainerRightSection}>
                                                <img className={styles.placeMarker} src="/src/assets/place-marker-svgrepo-com.svg" alt="" />
                                                <p className={styles.rightSectionAddress}>{v.address}</p>
                                            </div>
                                            <p className={styles.priceRightSection}>${v.price}</p>
                                            <div className={styles.roomsRightSection}>
                                                <div className={styles.bedroomContainer}>
                                                    <img src="/src/assets/bed-svgrepo-com.svg" alt="" />
                                                    <p className={styles.bedroomRightSection}>{v.bedroom}</p>
                                                </div>
                                                <div className={styles.bathroomContainer}>
                                                    <img src="/src/assets/bath-tube-svgrepo-com (1).svg" alt="" />
                                                    <p className={styles.bathroomRightSection}>{v.bathroom}</p>
                                                </div>
                                                <div className={styles.favoriteContainerRightSection}>
                                                    <a href='/set-favorite' onClick={(e) => setFavoriteF(e, v._id)} className={`${styles.favorite} ${styles[`favorite${v._id}`]}`}>
                                                        {/* {user.id}
                                                        <br />
                                                        {v.user_id}
                                                        {user 
                                                            ?  user.id === 
                                                            : <img src="/src/assets/favorite-svgrepo-com.svg" alt="" />
                                                        } */}
                                                    </a>
                                                    <a href='/message' className={styles.message}>
                                                        <img src="/src/assets/message-square-dots-svgrepo-com.svg" alt="" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )
                        })

                        : (
                            <div className={styles.card}>
                                <div className={styles.leftSectionSceleton}>
                                   
                                </div>
                                <div className={styles.rightSectionSceleton}>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}