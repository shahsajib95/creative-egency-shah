import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../App';
import Preloader from '../../../Preloader/Preloader';
import image from '../../../../images/icons/service1.png'


const Customerservicelist = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const [preloaderVisibility, setPreloaderVisibility] = useState(true);
    const [myorders, setMyOrders] = useState([]);
    useEffect(() => {
        (async () => {
            await fetch('http://localhost:5000/myOrders?email=' + loggedIn.email, {
                method: 'GET',
                headers: { 'Content-Type': 'Application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    setMyOrders(data)
                    console.log(data)
                    setPreloaderVisibility(false)
                })
        })()
    }, [])


    return (
        <div className="content-wrapper">
            <div className="container-fluid">
                {preloaderVisibility ?  <Preloader/>
                :
                <div className="row">
                    {myorders.map(pd =>
                        <div key={pd._id} className="col-md-5 offset-md-1 bg-white p-5 mt-3" style={{ borderRadius: '20px' }}>
                            <div className="d-flex justify-content-between align-items-start">
                                {pd.photo.img === undefined ? <img className="w-25 mb-3" src={image} alt="" /> 
                                :  <img className="w-25 mb-3" src={`data:image/png;base64,${pd.photo.img}`} alt="" />}
                                <button className="btn-sm btn btn-outline-danger ml-5" role="alert">{pd.status}</button>
                            </div>
                            <h5>{pd.title}</h5>
                            <p>{pd.description}</p>
                        </div>)}
                </div>}
            </div>
        </div>
    );
};

export default Customerservicelist;