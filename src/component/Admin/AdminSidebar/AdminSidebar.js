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
        <div className="sidebar">
                        <Link className="navbar-brand side" to="/"><img src={logo} alt="Logo" /></Link>
               
                        {!admin &&
                            <Link className="side" to="/orders" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faShoppingCart}/> Order</Link>}

                            <Link className="side" to="/serviceList" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faBezierCurve}/> Service List</Link>

                        {!admin &&
                    
                            <Link className="side" to="/addReview" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faCommentDots}/> Review</Link>
                        }
                        {admin &&
                        <>
                        
                            <Link className="side" to="/addService" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faPlus}/> Add Service</Link>
                       
                       
                            <Link className="side" to="/makeAdmin" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faUserPlus}/> Make Admin</Link>

                        </>}
                    
                </div>
    );
};

export default AdminSidebar;