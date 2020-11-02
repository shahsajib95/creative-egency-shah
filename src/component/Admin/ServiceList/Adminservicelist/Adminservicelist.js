import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../App';
import Preloader from '../../../Preloader/Preloader';

const Adminservicelist = () => {

    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const [allOrders, setAllOrders] = useState([])
    const [selctStatus, setSelectStatus] = useState(null)
    const [preloaderVisibility, setPreloaderVisibility] = useState(true)

    useEffect(() => {
        (async () => {
            await fetch('http://localhost:5000/allOrders?email=' + loggedIn.email, {
                method: 'GET',
                headers: { 'Content-Type': 'Application/json' }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setAllOrders(data)
                    setPreloaderVisibility(false)
                })
        })()
    }, [loggedIn.email])

    const handleChange = (status) => {
        const data = { id: selctStatus._id, status }

        console.log(data)
        fetch(`http://localhost:5000/updateStatus`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })

    }


    return (
        <div className="content-wrapper">
            <div className="container-fluid">
                <div className="table-container">
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
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Adminservicelist;