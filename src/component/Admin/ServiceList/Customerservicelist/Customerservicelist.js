import React from 'react';

const Customerservicelist = ({ myOrders }) => {

    return (
        <div>
            <div className="row">
                {myOrders.map(pd =>
                    <div key={pd._id} className="col-md-5 offset-md-1 bg-white p-5" style={{ borderRadius: '20px' }}>
                        <div className="d-flex justify-content-between align-items-start">
                            <img className="w-25 mb-3" src={`data:image/png;base64,${pd.photo.img}`} alt="" />
                            <button className="btn-sm btn btn-outline-danger ml-5" role="alert">{pd.status}</button>
                        </div>
                        <h5>{pd.title}</h5>
                        <p>{pd.description}</p>
                    </div>)}
            </div>
        </div>
    );
};

export default Customerservicelist;