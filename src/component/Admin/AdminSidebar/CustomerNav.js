import { faBezierCurve, faCommentDots, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const CustomerNav = () => {
    return (
        <div>
            <Link className="side" to="/orders" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faShoppingCart} /> Order</Link>

            <Link className="side" to="/serviceList" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faBezierCurve} /> Service List</Link>

            <Link className="side" to="/addReview" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faCommentDots} /> Review</Link>
        </div>
    );
};

export default CustomerNav;