import React from 'react';
import { useForm } from "react-hook-form";
import './Contact.css'

const Contact = () => {

    const { register, handleSubmit, errors } = useForm();
    const onSubmit = () => {

    }
    return (
        <div className="bg-warning p-5" id="contact">
            <div className="container contact">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Let us handle your project, professionally.</h1>
                        <p>With well written codes, we build amazing apps for all platforms, mobile and web apps in general.</p>
                    </div>
                    <div className="col-md-6">

                        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
                            <input name="name" className="form-control" placeholder="Your Name" ref={register({ required: true })} />
                            {errors.name && <span><p>This field is required</p></span>}

                            <input name="company" className="form-control mt-3" placeholder="Designation, Company Name" ref={register({ required: true })} />
                            {errors.company && <span><p>This field is required</p></span>}

                            <textarea rows="3" name="description" className="form-control mt-3" placeholder="Description" ref={register({ required: true })} />
                            {errors.description && <span><p>This field is required</p></span>}
                            <div className="d-flex flex-row bd-highlight mb-3">
                                <button type="submit" className="btn main-btn mt-2">submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <p className="text-center">Copyright Orange Labs {new Date().getFullYear()}</p>
        </div>
    );
};

export default Contact;