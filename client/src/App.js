import React, { Component } from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import { Container , AppBar, Typography, Grow, Grid } from '@material-ui/core';
import './App.css'; 


import ShowFlights from './components/showFlight/showFlight'
import CreateFlight from './components/createFlight/createFlight'
import UpdateFlight from './components/updateFlight/updateFlight'
import AdminLogin from './components/adminLogin/adminLogin';
function App() { 

    return (
      <div className="App">

      <Routes>
        <div>
        <Route exact path='/' component={AdminLogin } />
        <Route exact path='/showFlights' component={ShowFlights } />
        <Route path='/createFlight' component={CreateFlight } />
        <Route path='/updateFlight/:id' component={UpdateFlight } />
        </div>
      </Routes>


    </div>
    )};

export default App;