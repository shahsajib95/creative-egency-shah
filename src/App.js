import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createContext, useEffect, useState } from 'react';
import Login from './component/Login/Login';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import Navbar from './component/Home/Navbar/Navbar';
import Banner from './component/Home/Banner/Banner';
import Partners from './component/Home/Partners/Partner';
import Portfolio from './component/Home/Portfolio/Portfolio';
import Reviews from './component/Home/Reviews/Reviews';
import Contact from './component/Home/Contact/Contact';
import Services from './component/Home/Services/Services';
import Admin from './component/Admin/Admin/Admin';

export const ServiceContext = createContext();
export const UserContext = createContext();
export const PurchaseContext = createContext();

function App() {

  const [allservices, setAllServices] = useState([]);
  const [loggedIn, setLoggedIn] = useState({
    name: '',
    email: '',
    photo: ''
  });
  const [purchaseService, setPurchseService] = useState([])

  useEffect(()=>{
    (async () => {
      await fetch('http://localhost:5000/allservices')
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        setAllServices(data)
      })
    })()
  }, [])

  const handleService = (service) =>{
    setPurchseService(service)
  } 

  return (
    <>
    <PurchaseContext.Provider value={[purchaseService, setPurchseService]}>
    <ServiceContext.Provider value={[allservices, setAllServices]}>
    <UserContext.Provider value={[loggedIn, setLoggedIn]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Banner />
            <Partners />
            <Services handleService={handleService} />
            <Portfolio />
            <Reviews />
            <Contact />
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <PrivateRoute>
            <Admin/>
          </PrivateRoute>
        </Switch>
      </Router>
      </UserContext.Provider>
      </ServiceContext.Provider>
      </PurchaseContext.Provider>
    </>
  );
}

export default App;
