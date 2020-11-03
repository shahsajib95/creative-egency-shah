import React from 'react';
import bgImage from '../../../images/logos/Frame.png';
import './Banner.css';
import { useSpring, animated } from 'react-spring'

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const Banner = () => {
    const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
    return (
        <div className="bg-warning banner" id="home">
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
                        
                        <animated.img 
                        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
                        onMouseLeave={() => set({ xys: [0, 0, 1] })}
                        className="w-100" src={bgImage} alt="" 
                        style={{ transform: props.xys.interpolate(trans) }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;