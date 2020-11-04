import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from '../../Payment/SimpleCardForm';
import { UserContext } from '../../../App';
const stripePromise = loadStripe('pk_test_pS06V8JIFXeKVNV03PxEcd3Y00uNbBWVhq');

const CustomerOrder = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const { register, handleSubmit, errors } = useForm();
    const [success, setSuccess] = useState(false);
    const [orderInfo, setorderInfo] = useState(null);
    
    const onSubmit = data => {
        // setPreloader(true)
        setorderInfo(data)
       
    }
    const handleFile = () => {
    }

    return (
        <div className="content">
            <div className="sidebar-head">
                <h5>Order</h5>
            </div>
            
                <div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-4" style={{display: !orderInfo ? 'block' : 'none' }}>

                    <input name="name" className="form-control w-50" placeholder="Your Name/Company Name" ref={register({ required: true })} />
                    {errors.name && <span><p>This field is required</p></span>}

                    <input disabled name="email" className="form-control mt-3 w-50" value={loggedIn.email} placeholder={loggedIn.email} ref={register({ required: true })} />
                    {errors.email && <span><p>This field is required</p></span>}

                    <input name="job" className="form-control mt-3 w-50" placeholder="Graphics Design" ref={register({ required: true })} />
                    {errors.job && <span><p>This field is required</p></span>}

                    <textarea rows="3" name="description" className="form-control mt-3 w-50" placeholder="Project Details" ref={register({ required: true })} />
                    {errors.description && <span><p>This field is required</p></span>}

                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <input name="price" type="number" className="form-control mt-3" placeholder="Price" ref={register({ required: true })} />
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
                        <button type="submit" onClick={()=> setSuccess(true)} className="btn main-btn mt-2">submit</button>
                    </div>
                </form>
                </div>

 
            <div style={{display: !orderInfo ? 'none' : 'block'}}>
                    <Elements stripe={stripePromise}>
                        <SimpleCardForm orderInfo={orderInfo}/>
                    </Elements>
            </div>
        </div>
    );
};

export default CustomerOrder;