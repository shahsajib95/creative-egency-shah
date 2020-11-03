import React from 'react';
import './Portfolio.css';
import InfiniteCarousel from 'react-leaf-carousel';
import imageOne from '../../../images/carousel-1.png'
import imageTwo from '../../../images/carousel-2.png'
import imageFour from '../../../images/carousel-4.png'
import imageFive from '../../../images/carousel-5.png'

const Portfolio = () => {

    return (
        <div className="portfolio-section text-center p-5" id="portfolio">
            <div className="container">
                <h1 className="text-white mb-5">Here are some of <span className="text-success">our works</span></h1>


                <InfiniteCarousel
                    breakpoints={[
                        {
                            breakpoint: 500,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            },
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            },
                        },
                    ]}
                    dots={true}
                    showSides={true}
                    sidesOpacity={.5}
                    sideSize={.1}
                    slidesToScroll={2}
                    slidesToShow={2}
                    scrollOnDevice={true}
                >
                    <div>
                        <img className="w-100" src={imageOne} alt="imagecarousel" />
                    </div>
                    <div>
                         <img className="w-100" src={imageTwo} alt="imagecarousel" />
                    </div>
                    <div>
                        <img className="w-100" src={imageFour} alt="imagecarousel" />
                    </div>
                    <div>
                        <img className="w-100" src={imageFive} alt="imagecarousel" />
                    </div>
                </InfiniteCarousel>

            </div>
        </div>
    );
};

export default Portfolio;