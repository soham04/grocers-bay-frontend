// src/components/Body.js
import React from 'react';
import "../styles/components/Body.scss"
import Home_FeatureCard_LT from '../components/Home_FeatureCard_LT'
import Home_FeatureCard_RT from '../components/Home_FeatureCard_RT'

const Body = () => {

    const features = [
        {
            title: 'Freshness Guaranteed!',
            description: 'We start cultivaitng the food at the time you place your order and you get it fresh the time you need it.',
            imgSrc: 'https://www.southernliving.com/thmb/nWsK9qPoNTSlIK4Vy3FcCfZYYCw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1131453124-674dccd2e3c3406c814379d9f7ba3abf.jpg'
        }, {
            title: 'Nutrient Navigator',
            description: 'Navigate our aisles with confidence using our Nutrient Navigator, providing comprehensive nutritional information to help you make informed and health-conscious choices.',
            imgSrc: 'https://www.cdc.gov/diabetes/images/managing/food-labels.png?_=10226'
        },
        {
            title: 'AI Recipe Suggestor',
            description: 'Unleash your inner chef with Chef\'s Palette, our AI Recipe Suggestor! Personalized recipes at your fingertips, making every meal a masterpiece. [Powered by ChatGPT]',
            imgSrc: 'https://uploads-ssl.webflow.com/636d05d634d44a6b9954e354/63c67e91dcb5964966b31876_Recipe%20Creation%20ChatGPT%20AI%20home%20professional%20cooks.webp'
        }
    ]

    return (
        <div className="body">
            <section className="slogan-section">
                <div className='part1'>
                    <div className="slogan">
                        <p className="delivery-text">- Get your groceries delivered</p>
                        <h2 className="groceries-heading">The Best Way to Get Your Groceries.</h2>
                    </div>

                    <img className="slogan-image" src="https://www.bain.com/contentassets/fdd696aed78b42b18c916545661709e0/18615-fresh-grocery-strategy-1440x810-v1.jpg" alt="Description of the image"></img>
                </div>
                <p className="convenience-text">Discover the convenient way to shop at your convenience</p>

            </section>

            <div className='line'></div>

            {features.map((feature, index) => {
                console.log(feature);
                if (index % 2 == 0)
                    return <Home_FeatureCard_RT key={index} {...feature} />
                else
                    return <Home_FeatureCard_LT key={index} {...feature} />

            })}
        </div>

    );
};

export default Body;
