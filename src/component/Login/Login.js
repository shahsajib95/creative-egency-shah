import React, { useContext } from 'react';
import './Login.css';
import logo from '../../images/logo.png';
import google from '../../images/logos/googlelogin.png'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { googleSignIn, initializeFirebaseApp } from './auth';
import { UserContext } from '../../App';

const Login = () => {
    
    initializeFirebaseApp()
    const [loggedIn, setLoggedIn] = useContext(UserContext);
    let history = useHistory(); 
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/addService" } };

    const logInWithGoogle = () =>{
        googleSignIn()
        .then(res=>{
            setLoggedIn(res)
            history.replace(from);
        })
    }
    

    return (
        <div className="login">
            <div className="d-flex justify-content-center">
                <Link to="/"><img src={logo} alt=""/></Link>
            </div>
            <div className="login-box p-5 mt-5">
                        <h3 className="text-center">Login With</h3>
                        <span onClick={()=> logInWithGoogle()} style={{cursor: "pointer"}} className="google-btn form-control mt-5 ml-auto"><img src={google} alt=""/><span className="ml-5">Continue with Google</span></span>
                        <p className="mt-2">Don’t have an account? <u style={{color: '#3F90FC', cursor: 'pointer'}}>Create an account</u></p>
            </div>
         </div>
    );
};

export default Login;