import React from 'react';
import "../styles/components/Home_FeatureCard_RT.scss"

const Home_FeatureCard_RT = ({ title, description, imgSrc }) => {
    return (
        <section className='feature__section_RT'>
            <div className='feature__text_RT'>
                <div>
                    <h3 className='feature__heading_RT'>
                        {title}
                    </h3>
                </div>
                <div>
                    <p className='feature__description_RT'>
                        {description}
                    </p>
                </div>
            </div>
            <div className='feature__img_RT'>
                <img src={imgSrc}></img>
            </div>
        </section>
    );
};

export default Home_FeatureCard_RT;
