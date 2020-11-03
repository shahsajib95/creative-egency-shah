import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { PurchaseContext } from '../../../App';
import green from '@material-ui/core/colors/green';
import { CircularProgress } from '@material-ui/core';

const CustomerOrder = () => {
    const color = green[50];
    const [purchaseService, setPurchaseService] = useContext(PurchaseContext)
    const { register, handleSubmit, errors } = useForm();
    const [success, setSuccess] = useState(null);
    const [preloader, setPreloader] = useState(false);

    const onSubmit = data => {
        setPreloader(true)
        const title = purchaseService.title;
        const description = purchaseService.description;
        const photo = purchaseService.image ? purchaseService.image : null;
        const status = { status: 'pending' }
        const allInfo = { ...status, title, description, photo, ...data };
        
        fetch('http://localhost:5000/placedOrders', {
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify(allInfo)
        })
            .then(res => res.json())
            .then(result => {
                setSuccess(result) 
                window.location.reload()
                setPreloader(false)
                
            })
    }
    const handleFile = () => {

    }
    return (
        <div className="content">
            <div className="sidebar-head">
                <h5>Order</h5>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4">

                {preloader && <div className="alert alert-warning mt-2" role="alert">
                    <CircularProgress color={color} />
                    Placing Order
                    </div>}

                {success &&
                    <div className="alert alert-success" role="alert">
                        Order Placed Successfully
                    </div>}

                <input name="name" className="form-control w-50" placeholder="Your Name/Company Name" ref={register({ required: true })} />
                {errors.name && <span><p>This field is required</p></span>}

                <input name="email" className="form-control mt-3 w-50" placeholder="Email Adress" ref={register({ required: true })} />
                {errors.email && <span><p>This field is required</p></span>}

                <input name="job" className="form-control mt-3 w-50" placeholder="Graphics Design" ref={register({ required: true })} />
                {errors.job && <span><p>This field is required</p></span>}

                <textarea rows="3" name="description" className="form-control mt-3 w-50" placeholder="Project Details" ref={register({ required: true })} />
                {errors.description && <span><p>This field is required</p></span>}

                <div className="form-row">
                    <div className="form-group col-md-2">
                        <input name="price" className="form-control mt-3" placeholder="Price" ref={register({ required: true })} />
                        {errors.price && <span><p>This field is required</p></span>}
                    </div>
                    <div className="form-group col-md-2">
                        <div className="file-field mt-3">
                            <div className="btn btn-upload pl-4 pr-4 float-left waves-effect waves-light">
                                <span> <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Image</span>
                                <input type="file" onChange={handleFile} name="file" ref={register({ required: true })} />
                            </div>
                            {errors.file && <span><p>Select a image</p></span>}
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-row bd-highlight mb-3">
                        {preloader ? <button disabled type="submit" className="btn main-btn mt-2">submit</button>
                        :
                        <button type="submit" className="btn main-btn mt-2">submit</button>
                    }
                </div>
            </form>
        </div>
    );
};

export default CustomerOrder;