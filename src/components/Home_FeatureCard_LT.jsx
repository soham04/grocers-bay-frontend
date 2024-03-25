import React from 'react';
import "../styles/components/Home_FeatureCard_LT.scss"

const Home_FeatureCard_LT = ({ title, description, imgSrc }) => {
    return (
        <section className='feature__section_LT'>
            <div className='feature__text_LT'>
                <div>
                    <h3 className='feature__heading_LT'>
                        {title}
                    </h3>
                </div>
                <div>
                    <p className='feature__description_LT'>
                        {description}
                    </p>
                </div>
            </div>
            <div className='feature__img_LT'>
                <img src={imgSrc} ></img>
            </div>
        </section>
    );
};

export default Home_FeatureCard_LT;
