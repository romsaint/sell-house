import { useState } from 'react';
import {apiRequest} from '/src/utils/apiRequest'
import {useNavigate} from 'react-router-dom'


async function handleFormSubmit(e, navigate) {
    e.preventDefault();
    const data = new FormData(e.target);
    const allDataValue = [];

    data.forEach((v, k) => {
        allDataValue.push(v);
    });

    navigate(`/all-offers?propertyPolicy=${allDataValue[0]}&city=${allDataValue[1]}&minprice=${allDataValue[2]}&maxprice=${allDataValue[3]}`);
}


export function HomeMain(){
    const navigate = useNavigate();
    
   
    return (
        <main className="main">
            <div className="hero-main">
                <div className="hero-text">
                    <h1 className="hero-text-title">Find Real Estate & Get Your Dream Place</h1>
                    <p className="hero-text-additional-info">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates deleniti quis iusto qui debitis! Laborum aut tenetur consectetur labore illo reiciendis omnis sunt odio architecto.
                    </p>
                </div>
                <div className="hero-action">
                    <form onSubmit={e => handleFormSubmit(e, navigate)} action="/all-house" method='post' className="hero-action-filter-form">
                        <div className="hero-action-radio-filter">
                            <input type="radio" id="buy" name="purchaseType" className="radio-button" value={'buy'} defaultChecked/>
                            <label htmlFor="buy" className="radio-label">Buy</label>

                            <input type="radio" id="rent" name="purchaseType" className="radio-button" value={'rent'}/>
                            <label htmlFor="rent" className="radio-label">Rent</label>
                        </div>
                        <div className="hero-action-search-filter">
                            <input type="text" name='city' className='hero-action-search-filter-input hero-action-search-filter-input-1' placeholder='City'/>
                            <input type="text" name='minprice' className='hero-action-search-filter-input hero-action-search-filter-input-2' placeholder='Min price'/>
                            <input type="text" name='maxprice' className='hero-action-search-filter-input hero-action-search-filter-input-3' placeholder='Max price'/>
                            <button type='submit' className='hero-action-search-filter-submit-btn'>
                                <img src="/src/assets/search-svgrepo-com.svg"  className='hero-action-search-filter-submit-btn-svg' alt="" />
                            </button>
                        </div>
                    </form>
                </div>
                <div className="hero-advantages">
                    <div className="first-advantage">
                        <h1 className="title-advantage">16+</h1>
                        <p className="subtitle-advantage">
                            Years of Experience
                        </p>
                    </div>
                    <div className="second-advantage">
                        <h1 className="title-advantage">198+</h1>
                        <p className="subtitle-advantage">
                            Award Gained
                        </p>
                    </div>
                    <div className="third-advantage">
                        <h1 className="title-advantage">5640+</h1>
                        <p className="subtitle-advantage">
                            Property Ready
                        </p>
                    </div>
                </div> 
            </div>
            <div className="hero-images">
                <div className="text-hero-images">
                    <h1>Our elite house</h1>
                </div>
                <img className='hero-images-image hero-images-image-1'src="https://d1e00ek4ebabms.cloudfront.net/production/055ea6c4-1a54-44df-bf6a-5a746931e95f.jpg" alt="" />
                <img className='hero-images-image hero-images-image-2' src="https://gas-kvas.com/grafic/uploads/posts/2024-01/gas-kvas-com-p-oboi-domov-nyu-yorka-44.jpg"   alt="" />

                <img className='hero-images-image hero-images-image-3' src="/src/assets/Group 427320330.svg"   alt="" />
                <img className='hero-images-image hero-images-image-4' src="/src/assets/Group 427320330.svg"   alt="" />
            </div>
        </main>
    )
}