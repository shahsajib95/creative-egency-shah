import React from 'react';
import bgImage from '../../../images/logos/Frame.png';
import './Banner.css'
const Banner = () => {
    return (
        <div className="bg-warning banner">
            <div className="container">
                <div className="row d-flex align-items-center">
                    <div className="col-md-6">
                        <h1 style={{ fontWeight: '700' }}>Let’s Grow Your<br></br>
                        Brand To The<br></br>
                        Next Level</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur<br></br> adipiscing elit. Purus commodo ipsum duis<br></br>laoreet maecenas. Feugia</p>
                        <button className="btn main-btn pl-5 pr-5">Hire us</button>
                    </div>
                    <div className="col-md-6">
                        <img className="w-100" src={bgImage} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;