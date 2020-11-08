import React, { useContext, useEffect, useState } from 'react';
import './AdminServicelist.css'
import { UserContext } from '../../../../App';
import Preloader from '../../../Preloader/Preloader';

const Adminservicelist = () => {

    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const removeUserToken = () =>{
        sessionStorage.removeItem('user')
        setLoggedIn()
        window.location = '/'
    }
    const [allOrders, setAllOrders] = useState([])
    const [selctStatus, setSelectStatus] = useState(null)
    const [preloaderVisibility, setPreloaderVisibility] = useState(true)
    useEffect(() => {
        (async () => {
            await fetch('https://pure-harbor-44563.herokuapp.com/allOrders?email=' + loggedIn.email, {
                method: 'GET',
                headers: { 'Content-Type': 'Application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    setAllOrders(data)
                    setPreloaderVisibility(false)
                })
        })()
    }, [loggedIn.email])

    const handleChange = (status) => {
        const data = { id: selctStatus._id, status }
        fetch(`https://pure-harbor-44563.herokuapp.com/updateStatus`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {

            })

    }


    return (
        <div className="content">
            <div className="sidebar-head d-flex justify-content-between">
                <h5>Service List</h5>
                <button className="btn btn-warning" onClick={()=>removeUserToken()}>Sign Out</button>
            </div>
            <div className="table-container mt-3">
                {preloaderVisibility ? <Preloader />
                    :
                    <table className="table">
                        <thead className="table-header">
                            <tr>
                                <th scope="col">name</th>
                                <th scope="col">Email ID</th>
                                <th scope="col">Service</th>
                                <th scope="col">Project Details</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allOrders.map(orders =>
                                <tr key={orders._id}>
                                    <td>{orders.name}</td>
                                    <td>{orders.email}</td>
                                    <td>{orders.job}</td>
                                    <td>{orders.description}</td>
                                    <td>
                                        <div className="dropdown">
                                            <select className="btn btn-outlined-danger" name="status" onClick={() => setSelectStatus(orders)} onChange={e => handleChange(e.target.value)}>
                                                <option selected={orders.status == "pending"} className="text-danger" value="Pending">Pending</option>
                                                <option selected={orders.status == "Ongoing"} className="text-warning" value="Ongoing">Ongoing</option>
                                                <option selected={orders.status == "Done"} className="text-success" value="Done">Done</option>
                                            </select>
                                        </div>

                                    </td>
                                </tr>)}
                        </tbody>
                    </table>}
            </div>
        </div>
    );
};

export default Adminservicelist;