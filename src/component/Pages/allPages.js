import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Contact from '../Home/Contact/Contact';
import Home from '../Home/Home/Home';
import Navbar from '../Home/Navbar/Navbar';
import Portfolio from '../Home/Portfolio/Portfolio';
import Reviews from '../Home/Reviews/Reviews';
  
const allPages = () => {
    return (
        <div>
            <Navbar>
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/OurPortfolio" component={Portfolio}/>
                    <Route exact path="/OurTeam" component={Reviews}/>
                    <Route exact path="/ContactUs" component={Contact}/>
                </Switch>
            </Router>
            </Navbar>
            
        </div>
    );
};

export default allPages;