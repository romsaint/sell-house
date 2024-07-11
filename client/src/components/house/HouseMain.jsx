import styles from '/public/House.module.css'
import {apiRequest} from '/src/utils/apiRequest'
import { useEffect, useMemo, useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom'


export function HouseMain(){
    const [url, setUrl] = useState(new URL(location.href))
    const [data, setData] = useState(null)

    async function getData(){
        try{
            const res = await apiRequest(url.pathname)
            setData(res.data.house)
        }catch(e){
            console.log(e.response.data)
        }
    }

    useEffect(() => {
        getData()
    })

    return (
        <main className={styles.main}>
            <div className={styles.cardImages}>
                {data 
                ?   data.images.map((v, i) => {
                        return (
                            <img key={i} className={`${styles.cardImage}  ${styles[`cardImage${i + 1}`]}`} loading='lazy' src={v} alt="House image" />
                        )
                    }) 
                : <div className={styles.sceletonImage}></div>}
            </div>
            <div className={styles.card}>
                <div className={styles.textCard}>
                    <center>
                        <h1 className={styles.titleCard}>{data ? data.title : 'Loading...'}</h1>
                    </center>
                    <p className={styles.descriptionCard}>{data ? data.description : 'Loading...'}</p>
                    <div className={styles.exactAddress}>
                        <div className={styles.addressContainer}>
                            <img className={styles.placeMarker} src="/src/assets/place-marker-svgrepo-com.svg" alt="" />
                            <p className="addressCard">{data ? data.address : 'Loading...'}</p>
                        </div>
                        <div className={styles.cityContainer}>
                            <img className={styles.citySvg} src="/src/assets/city-svgrepo-com.svg" alt="" />
                            <p className="cityCard">{data ? data.city : 'Loading...'}</p>
                        </div>
                    </div>
                    <div className={styles.centerCard}>
                        <div className={styles.policyContainer}>
                            <p>Pet policy:  </p>
                            <h2>{data ? data.petPolicy : 'Loading...'}</h2>
                        </div>
                        <div className={styles.policyContainer}>
                            <p>Type:  </p>
                            <h2>{data ? data.propertyPolicy : 'Loading...'}</h2>
                        </div>
                        <p className={styles.sizeCard}>Size: {data ? data.totalSize : 'Loading...'}M</p>
                    </div>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.roomsRightSection}>
                        <div className={styles.bedroomContainer}>
                            <img src="/src/assets/bed-svgrepo-com.svg" alt="" />
                            <p className={styles.bedroomCard}>{data ? data.bedroom : 'Loading...'}</p>
                        </div>
                        <div className={styles.bathroomContainer}>
                            <img src="/src/assets/bath-tube-svgrepo-com (1).svg" alt="" />
                            <p className={styles.bathroomCard}>{data ? data.bathroom : 'Loading...'}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.priceActionCard}>
                    <div className={styles.priceContainer}>
                        <p className="priceCard">${data ? data.price : 'Loading...'}</p>
                    </div>
                    <div className={styles.favoriteContainerRightSection}>
                        <button className={styles.favorite}>
                            <img src="/src/assets/favorite-svgrepo-com.svg" alt="" />
                        </button>
                        <button className={styles.message}>
                            <img src="/src/assets/message-square-dots-svgrepo-com.svg" alt="" />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}