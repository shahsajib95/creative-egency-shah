import React, { useContext, useState } from 'react';
import './AddService.css'
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { CircularProgress } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import { UserContext } from '../../../App';

const AdminData = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext)
    const removeUserToken = () =>{
        sessionStorage.removeItem('user')
        setLoggedIn()
        window.location = '/'
    } 
    const [success, setSuccess] = useState(null);
    const [preloader, setPreloader] = useState(false);
    const [file, setFile] = useState(null);
    const color = green[50];
    const { register, handleSubmit, errors } = useForm();

    const handleFile = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile)
    }
    const onSubmit = data => {
        setPreloader(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('title', data.title)
        formData.append('description', data.description)
        fetch('https://pure-harbor-44563.herokuapp.com/addService', {
            method: 'POST',
            body: formData
        })
            .then(result => {
                setPreloader(false)
                setSuccess(result)
                window.location.reload()

            })
    }



    return (
        <div className="content">
            <div className="sidebar-head d-flex justify-content-between">
                <h5>Add Services</h5>
                <button className="btn btn-warning" onClick={()=>removeUserToken()}>Sign Out</button>
            </div>
            
            <div className="service-form">
                {preloader && <div className="alert alert-warning mt-2" role="alert">
                    <CircularProgress color={color} />
                    Adding Service
                    </div>}

                {success &&
                    <div className="alert alert-success mt-2" role="alert">
                        Service Added Successfully
                    </div>}

                <form onSubmit={handleSubmit(onSubmit)} className="p-4 mt-3" style={{ backgroundColor: 'white', borderRadius: '10px' }}>
                    <div className="form-row">
                        <div className="form-group col-md-6">

                            <label>Service Title</label>
                            <input name="title" className="form-control" placeholder="Enter Title" ref={register({ required: true })} />
                            {errors.title && <span><p>This field is required</p></span>}

                            <label className="mt-4">Description</label>
                            <textarea name="description" className="form-control" placeholder="Enter Title" ref={register({ required: true })} />
                            {errors.description && <span><p>This field is required</p></span>}

                        </div>
                        <div className="form-group col-md-6">
                            <label>Icon</label><br></br>
                            <div className="file-field">
                                <div className="btn btn-upload pl-4 pr-4 float-left waves-effect waves-light">
                                    <span> <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Image</span>
                                    <input type="file" onChange={handleFile} name="image" ref={register({ required: true })} />
                                </div>
                                {errors.image && <span><p>Select a image</p></span>}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row bd-highlight mb-3">
                        {preloader ?
                            <button disabled type="submit" className="btn btn-success mt-2 ml-auto">submit</button>
                            :
                            <button type="submit" className="btn btn-success mt-2 ml-auto">submit</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminData;