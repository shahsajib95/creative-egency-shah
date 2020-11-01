import React, { useContext, useEffect, useState } from 'react';
import { ServiceContext, UserContext } from '../../../App';
import Preloader from '../../Preloader/Preloader';
import CustomerOrder from '../CustomerOrder/CustomerOrder';
import Adminservicelist from './Adminservicelist/Adminservicelist';
import Customerservicelist from './Customerservicelist/Customerservicelist';

const Servicelist = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const [myorders, setMyOrders] = useState([])
    const [allOrders, setAllOrders] = useState([])
    const [preloaderVisibility, setPreloaderVisibility] = useState(true)

    useEffect(() => {
        (async () => {
            await fetch('http://localhost:5000/myOrders?email=' + loggedIn.email,{
                method: 'GET',
                headers: {'Content-Type': 'Application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    setMyOrders(data)
                    console.log(data)
                    setPreloaderVisibility(false)
                })
        })()
    }, [])

    useEffect(() => {
        (async () => {
            await fetch('http://localhost:5000/allOrders?email=' + loggedIn.email,{
                method: 'GET',
                headers: {'Content-Type': 'Application/json'}
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setAllOrders(data)
                    setPreloaderVisibility(false)
                })
        })()
    }, [])

    return (

        <div className="content-wrapper">
            <div className="container-fluid">
                    <Customerservicelist myOrders={myorders}/>
                    <Adminservicelist allOrders={allOrders}/>
            </div>
        </div>
    );
};

export default Servicelist;