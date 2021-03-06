import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { UserContext } from '../../../App';
import green from '@material-ui/core/colors/green';
import { CircularProgress } from '@material-ui/core';

const CustomerReview = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const removeUserToken = () =>{
        sessionStorage.removeItem('user')
        setLoggedIn()
        window.location = '/'
    }
    const { register, handleSubmit, errors } = useForm();
    const [success, setSuccess] = useState(null)
    const [preloader, setPreloader] = useState(false)
    const color = green[50];

    const onSubmit = data => {
        setPreloader(true)
        const photo = loggedIn.photo;
        const allInfo = { ...data, photo };
        fetch('https://pure-harbor-44563.herokuapp.com/addreview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(allInfo)
        })
            .then(data => {
                setSuccess(data)
                setPreloader(false)
                window.location.reload()
            })

    }
    return (
        <div className="content">
            <div className="sidebar-head d-flex justify-content-between">
            <h5>Review</h5>
            <button className="btn btn-warning" onClick={()=>removeUserToken()}>Sign Out</button>
            </div>
                {preloader && <div className="alert alert-warning mt-2" role="alert">
                    <CircularProgress color={color} />Submitting Feedback
                    </div>}
                {success && <div className="alert alert-success" role="alert">
                    Thanks For Feedback
                    </div>}
                <form onSubmit={handleSubmit(onSubmit)} className="p-4 mt-3">
                    <input name="name" className="form-control w-50" placeholder="Your Name" ref={register({ required: true })} />
                    {errors.name && <span><p>This field is required</p></span>}

                    <input name="company" className="form-control mt-3 w-50" placeholder="Designation, Company Name" ref={register({ required: true })} />
                    {errors.company && <span><p>This field is required</p></span>}

                    <textarea rows="3" name="description" className="form-control mt-3 w-50" placeholder="Description" ref={register({ required: true })} />
                    {errors.description && <span><p>This field is required</p></span>}
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

export default CustomerReview;