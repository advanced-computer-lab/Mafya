import  React  from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DateFnsUtils from '@date-io/date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import axios from 'axios';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Stack from '@mui/material/Stack';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
//import Airports from '/airports.js'
import Autocomplete from '@mui/material/Autocomplete';
import { Component, useState,useEffect,useParams } from 'react';
import { Container , AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

//import TextField from '@material-ui/core/TextField';
//import createFlight from '../'




{/**Function must start with upper case */}
export default function CreateFlight(props) {




  useEffect(() => {

           
    axios.get(`http://localhost:8000/flights/updateFlights/${props.match.params.id}`).then((res)=>{
      setFlight(res.data)
  
    })
         
  },[]);

    

    
    const [flight,setFlight]= useState({
        Flight_No:'',
        From:'',
        To:'',
        DateD:'',
        DateA:'',
        FirstSeats:'',
        BusinessSeats:'',
        EconomySeats:''
    });

    const updateFlight =() =>{
         axios.post(`http://localhost:8000/flights/doUpdateFlights/${props.match.params.id}`,flight).then((res)=>{
           console.log()
          confirmAlert({
              title: 'messege',
              message: res.data,
              buttons: [
                {
                  label: 'ok',
                  
                }
              ]
          });
          
      
        })

    }

  return (
  

    
      <>
      <Grid  container direction="column" justify="center" alignContent="center" >
      
      <h1>Update Flight</h1>
      <Link to={'/showFlights'} className="btn btn-outline-warning float-right">
              <h4> Show All Flights</h4>
      </Link>

      <TextField id="outlined-basic" label="Flight_No" variant="outlined" type="number" value={flight.Flight_No} onChange={(event) =>{
          setFlight({...flight, Flight_No:event.target.value})
      }} />
      <TextField id="outlined-basic" label="From" variant="outlined" value={flight.From} onChange={(event) =>{
          setFlight({...flight, From:event.target.value})
      }} />
      <TextField id="outlined-basic" label="To" variant="outlined" value={flight.To} onChange={(event) =>{
          setFlight({...flight, To:event.target.value})
      }} />




            <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Departure Date"
        value={flight.DateD}
        onChange={(newValue) =>{
          setFlight({...flight, DateD:newValue})
      }} 
      />
    </LocalizationProvider>
      
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Arrival Date"
        value={flight.DateA}
        onChange={(newValue) =>{
          setFlight({...flight, DateA:newValue})
      }}
      />
    </LocalizationProvider>
       
    



        



     

     
      <TextField id="outlined-basic" label="FirstSeats" variant="outlined" value={flight.FirstSeats} type='Number' onChange={(event) =>{
          setFlight({...flight, FirstSeats:event.target.value})
      }} InputProps={{ inputProps: { min: 0, max: 50 } }} />

        <TextField id="outlined-basic" label="BusinessSeats" variant="outlined" value={flight.BusinessSeats} type='Number' onChange={(event) =>{
                setFlight({...flight, BusinessSeats:event.target.value})
            }} InputProps={{ inputProps: { min: 0, max: 50 } }} />

        <TextField id="outlined-basic" label="EconomySeats" variant="outlined" value={flight.EconomySeats} type='Number' onChange={(event) =>{
                setFlight({...flight, EconomySeats:event.target.value})
            }} InputProps={{ inputProps: { min: 0, max: 50 } }} />


       
      <Button variant="contained" onClick={updateFlight}>update</Button>
 

    </Grid>
    </>

    


  );
  
}

