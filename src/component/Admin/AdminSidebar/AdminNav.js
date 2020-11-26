import { faBezierCurve, faPlus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminNav = () => {
    return (
        <div>
            <Link className="side" to="/addService" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faPlus} /> Add Service</Link>

            <Link className="side" to="/serviceList" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faBezierCurve} /> Service List</Link>

            <Link className="side" to="/makeAdmin" style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faUserPlus} /> Make Admin</Link>
        </div>
    );
};

export default AdminNav;