import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { PurchaseContext } from '../../../App';

const CustomerOrder = () => {
    const [purchaseService, setPurchaseService] = useContext(PurchaseContext)
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        const title = purchaseService.title;
        const description = purchaseService.description;
        const photo = purchaseService.image;
        const status = {status: 'pending'} 
        const allInfo = { ...status, title, description, photo, ...data}
        console.log(allInfo)
        fetch('http://localhost:5000/placedOrders', {
            method: 'POST',
            headers: {'Content-Type' : 'Application/json'},
            body: JSON.stringify(allInfo)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('Order Placed')
        })
    }
    const handleFile = () => {

    }
    return (
        <div className="content-wrapper">
            <div className="container-fluid">
                <form onSubmit={handleSubmit(onSubmit)} className="p-4">
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
                        <button type="submit" className="btn main-btn mt-2">submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerOrder;