import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import { UserContext } from '../../../App';
import AddService from '../AddService/AddService';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import '../AdminSidebar/AdminSidebar.css'
import CustomerOrder from '../CustomerOrder/CustomerOrder';
import CustomerReview from '../CustomerReview/CustomerReview';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import Adminservicelist from '../ServiceList/Adminservicelist/Adminservicelist';
import Customerservicelist from '../ServiceList/Customerservicelist/Customerservicelist';

const Admin = () => {
    const [loggedIn, setLoggedIn] = useContext(UserContext);
    const [admin, setAdmin] = useState(false)
    useEffect( ()=>{
    (async()=>{
        await fetch('https://pure-harbor-44563.herokuapp.com/isAdmin',{
            method: "POST",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({email:  loggedIn.email})
        })
        .then(res=>res.json())
        .then(data=>setAdmin(data))
    })()
}, [loggedIn.email])

    return(
        <div>
            <AdminSidebar/>
                <Switch>
                   
                    {admin ?
                    <>
                     <Route path="/ServiceList">
                       <Adminservicelist/>
                    </Route>
                    <Route path="/addService">
                    <AddService/>
                    </Route>
                    <Route path="/makeAdmin">
                        <MakeAdmin/>
                    </Route>
                    </>
                    :
                    <>
                    <Route path="/ServiceList">
                       <Customerservicelist/>
                    </Route>
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