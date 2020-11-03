import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';
import logo from '../../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {faBezierCurve , faUserPlus, faCommentDots, faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../../App';


const AdminSidebar = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const [admin, setAdmin] = useState(false)
    console.log(admin)

    useEffect(()=>{
        (async()=>{
            await fetch('https://pure-harbor-44563.herokuapp.com/isAdmin',{
                method: "POST",
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({email: loggedIn.email})
            })
            .then(res=>res.json())
            .then(data=>setAdmin(data))
        })()
    }, [])

    return (
        <div className="side-bar">
            <div className="navbar navbar-expand-lg  fixed-top">
                <Link className="navbar-brand" to="/"><img src={logo} alt="Logo" /></Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto sidenav p-2 mb-5" id="navAccordion">
                        {!admin &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/orders" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faShoppingCart}/> Order</Link>
                        </li>}
                        <li className="nav-item">
                            <Link className="nav-link" to="/serviceList" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faBezierCurve}/> Service List</Link>
                        </li>
                        {!admin &&
                        <li className="nav-item">
                            <Link className="nav-link" to="/addReview" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faCommentDots}/> Review</Link>
                        </li>}
                        {admin &&
                        <div>
                        <li className="nav-item">
                            <Link className="nav-link" to="/addService" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faPlus}/> Add Service</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/makeAdmin" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faUserPlus}/> Make Admin</Link>
                        </li>
                        </div>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;