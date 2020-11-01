import React from 'react';
import './AdminServicelist.css'
const Adminservicelist = ({ allOrders }) => {
    console.log(allOrders)
    return (
        <div>
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
                                <td>{orders.status}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Adminservicelist;