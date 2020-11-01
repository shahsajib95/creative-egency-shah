import React from 'react';
import { useForm } from "react-hook-form";

const MakeAdmin = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        fetch('http://localhost:5000/makeAdmin',{
            method: 'POST',
            headers: {'Content-Type' : 'Application/json'},
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })

        console.log(data)
    }
    return (
        <div className="content-wrapper">
            <div className="container-fluid">
                <div className="service-form">
                <form onSubmit={handleSubmit(onSubmit)} className="p-4" style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                                <input name="email" className="form-control w-50" placeholder="join@gmail.com" ref={register({ required: true })} />
                                {errors.email && <span><p>This field is required</p></span>}
                            <button type="submit" className="btn btn-success mt-2">submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;