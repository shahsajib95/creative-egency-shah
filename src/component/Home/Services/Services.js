import React, { useContext } from 'react';
import './services.css'
import {  ServiceContext } from '../../../App';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const Services = ({handleService}) => {
    const [allservices, setAllServices] = useContext(ServiceContext)
    return (
        <div className="text-center container py-5">
            <h1>Provide awesome <span className="text-success">services</span></h1>
           
           {allservices.length === 0 ? <CircularProgress color="secondary" /> 
           :
           <div className="row mt-5">
                {allservices.map(service=>
                    <div style={{cursor: 'pointer'}} key={service._id} className="col-md-4 service-card py-5" onClick={()=> handleService(service)}>
                        <Link to="/orders">
                        <img className="w-25 mb-3" src={`data:image/png;base64,${service.image.img}`} alt=""/>
                         <h5>{service.title}</h5>
                        <p>{service.description}</p>
                        </Link>
                    </div>)}
            </div>}
        </div>
    );
};

export default Services;