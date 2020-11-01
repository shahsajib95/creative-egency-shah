import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { UserContext } from '../../../App';
import AdminData from '../AdminData/AdminData';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import '../AdminSidebar/AdminSidebar.css'
import CustomerOrder from '../CustomerOrder/CustomerOrder';
import CustomerReview from '../CustomerReview/CustomerReview';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import Servicelist from '../ServiceList/Servicelist';

const Admin = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext);
    const [admin, setAdmin] = useState(false)

    useEffect( ()=>{
    (async()=>{
        await fetch('http://localhost:5000/isAdmin',{
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({email: loggedIn.email})
        })
        .then(res=>res.json())
        .then(data=>setAdmin(data))
    })()
}, [])

    return(
        <div>
            <AdminSidebar/>
                <Switch>
                    <Route path="/serviceList">
                        <Servicelist/>
                    </Route>
                    {admin ?
                    <>
                    <Route path="/addService">
                    <AdminData/>
                    </Route>
                    <Route path="/makeAdmin">
                        <MakeAdmin/>
                    </Route>
                    </>
                    :
                    <>
                    <Route path="/orders">
                        <CustomerOrder/>
                    </Route>
                    <Route path="/addReview">
                        <CustomerReview/>
                    </Route>
                    </>}
                </Switch>
         </div>
    );
};

export default Admin;