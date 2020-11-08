import { CircularProgress } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import green from '@material-ui/core/colors/green';
import { UserContext } from '../../../App';

const MakeAdmin = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const removeUserToken = () =>{
        sessionStorage.removeItem('user')
        setLoggedIn()
        window.location = '/'
    }
    const color = green[50];
    const { register, handleSubmit, errors } = useForm();
    const [success, setSuccess] = useState(null);
    const [preloader, setPreloader] = useState(false);

    const onSubmit = data => {
        setPreloader(true)
        fetch('https://pure-harbor-44563.herokuapp.com/makeAdmin',{
            method: 'POST',
            headers: {'Content-Type' : 'Application/json'},
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(result=>{
            setSuccess(result) 
            window.location.reload()
            setPreloader(false)
            
        })
    }
    return (
        <div className="content">
            <div className="sidebar-head d-flex justify-content-between">
            <h5>Make Admin</h5>
            <button className="btn btn-warning" onClick={()=>removeUserToken()}>Sign Out</button>
            </div>
                <div className="service-form mt-3">
                {preloader && <div className="alert alert-warning mt-2" role="alert">
                    <CircularProgress color={color} />
                    Adding Admin
                    </div>}

                    {success && 
                    <div className="alert alert-success mt-2" role="alert">
                    Admin Added Successfully
                    </div>}
                <form onSubmit={handleSubmit(onSubmit)} className="p-4" style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                    
                                <input name="email" className="form-control w-50" placeholder="join@gmail.com" ref={register({ required: true })} />
                                {errors.email && <span><p>This field is required</p></span>}
                            {preloader ? 
                                <button disabled type="submit" className="btn btn-success mt-2">submit</button>
                                :
                                <button type="submit" className="btn btn-success mt-2">submit</button>
                            }
                    </form>
                </div>
            </div>
    );
};

export default MakeAdmin;