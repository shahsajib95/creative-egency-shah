import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../App';
import Preloader from '../../../Preloader/Preloader';
import image from '../../../../images/icons/service1.png'


const Customerservicelist = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const removeUserToken = () =>{
        sessionStorage.removeItem('user')
        setLoggedIn()
        window.location = '/'
    }
    const [preloaderVisibility, setPreloaderVisibility] = useState(true);
    const [myorders, setMyOrders] = useState([]);
    useEffect(() => {
        (async () => {
            await fetch('https://pure-harbor-44563.herokuapp.com/myOrders?email=' + loggedIn.email, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'Application/json',
                    authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
            })
                .then(res => res.json())
                .then(data => {
                    setMyOrders(data)
                    console.log(data)
                    setPreloaderVisibility(false)
                })
                .catch(() => console.log("Can’t access  response. Blocked by browser?"))

        })()
    }, [])


    return (
        <div className="content">
             <div className="sidebar-head d-flex justify-content-between">
            <h5>Service List</h5>
            <button className="btn btn-warning" onClick={()=>removeUserToken()}>Sign Out</button>
            </div>

                {preloaderVisibility ?  <Preloader/>
                :
                <div className="row mt-3 d-flex justify-content-around ">
                    {myorders.map(pd =>
                        <div key={pd._id} className="col-md-5 bg-white p-4 mt-3" style={{ borderRadius: '20px' }}>
                            <div className="d-flex justify-content-between align-items-start">
                                {pd.photo === null ? <img className="w-25 mb-3" src={image} alt="" /> 
                                 : <img className="w-25 mb-3" src={`data:image/png;base64,${pd.photo.img}`} alt="" />}
                                <button className="btn-sm btn btn-outline-danger ml-5" role="alert">{pd.status}</button>
                            </div>
                            <h5>{pd.job}</h5>
                            <p>{pd.description}</p>
                        </div>)}
                        {!myorders.length  &&
                <div className="alert alert-warning" role="alert">
                    You have No services on list
                </div>}
                </div>}
               
               
            </div>
    );
};

export default Customerservicelist;