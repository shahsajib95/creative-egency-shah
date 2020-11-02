import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../App';

const CustomerReview = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const { register, handleSubmit, errors } = useForm();
    const [success, setSuccess] = useState(null)
    const onSubmit = data => {

        const photo = loggedIn.photo;
        const allInfo = { ...data, photo };
        fetch('http://localhost:5000/addreview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(allInfo)
        })
            .then(data => {
                setSuccess(data)
            })

    }
    return (
        <div className="content-wrapper">
            <div className="container-fluid">
                {success && <div class="alert alert-warning" role="alert">
                    Thanks For Feedback
                    </div>}
                <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                    <input name="name" className="form-control w-50" placeholder="Your Name" ref={register({ required: true })} />
                    {errors.name && <span><p>This field is required</p></span>}

                    <input name="company" className="form-control mt-3 w-50" placeholder="Designation, Company Name" ref={register({ required: true })} />
                    {errors.company && <span><p>This field is required</p></span>}

                    <textarea rows="3" name="description" className="form-control mt-3 w-50" placeholder="Description" ref={register({ required: true })} />
                    {errors.description && <span><p>This field is required</p></span>}
                    <div className="d-flex flex-row bd-highlight mb-3">
                        <button type="submit" className="btn main-btn mt-2">submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerReview;