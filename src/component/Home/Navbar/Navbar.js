import React from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';
import logo from '../../../images/logo.png';

const Navbar = () => {

    return (
        <div className="bg-warning">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light pt-3">
                    <Link to="/" className="navbar-brand" ><img src={logo} alt="" /></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={{cursor: 'pointer'}} to="portfolio" smooth={true} duration={1000} className="nav-link ml-3" >Our Portfolio</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={{cursor: 'pointer'}} to="ourteam" smooth={true} duration={1000} className="nav-link ml-3" >Our Team</Link>
                            </li>
                            <li className="nav-item">
                                <Link style={{cursor: 'pointer'}} to="contact" smooth={true} duration={1000} className="nav-link ml-3" >Contact us</Link>
                            </li>
                        </ul>
                        <Link to="/login"><button className="btn main-btn ml-3">Login</button></Link>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;