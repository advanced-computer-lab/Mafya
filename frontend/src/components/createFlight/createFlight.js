import  React ,{useState,useEffect} from 'react';
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
import { Container , AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import MainScreen from "../../components/MainScreen";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Loading from "../../components/Loading";



export default function CreateFlight({history}) {

  const userInfo  = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const [loading, setLoading]=useState(false);
  const [loadingEffect,setLoadingEffect]=useState(false);


  useEffect(() => {
    if(!userInfo  || !userInfo.isAdmin){
      history.push('/homepage')
    }
  });
    
    const [flight,setFlight]= useState({
        Flight_No:'',
        From:'',
        To:'',
        DateD:'',
        DateA:'',
        FirstSeats:'',
        BusinessSeats:'',
        EconomySeats:'',
        FirstPrice:'',
        BusinessPrice:'',
        EconomyPrice:'',
        BaggageAllowanceFirst:'',
        BaggageAllowanceBusiness:'',
        BaggageAllowanceEconomy:''
    });

    const createFlight =() =>{
      setLoading(true);
      const config = {
        headers:{
          "Content-type":"application/json",
          Authorization: `Bearer ${userInfo.token}`
  
        }
      }
      
         axios.post('http://localhost:8000/flights/createFlights',flight,config).then((res)=>{
          setLoading(false);
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
      {loading && <Loading />}
<MainScreen title="Create Flight">
    <TableContainer sx={{width: '85ch' }} component={Paper}>
    <Table  sx={{width: '85ch' }} aria-label="simple table">
      <TableRow>
      </TableRow>
      <TableRow>
      <TextField id="outlined-basic"  label="Flight_No" sx={{ m: 1, width: '82.5ch' }} type="number" value={flight.Flight_No} onChange={(event) =>{
          setFlight({...flight, Flight_No:event.target.value})
      }} />
      </TableRow>

      <TableRow>
      <TextField id="outlined-basic" label="From" variant="outlined" sx={{ m: 1, width: '40ch' }} value={flight.From} onChange={(event) =>{
          setFlight({...flight, From:event.target.value})
      }} />
      

      <TextField id="outlined-basic" label="To" variant="outlined" sx={{ m: 1, width: '40ch' }} value={flight.To} onChange={(event) =>{
          setFlight({...flight, To:event.target.value})
      }} />
      </TableRow>
 
      <TableRow>
<LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} sx={{ m: 1, width: '40ch' }}/>}
        label="Departure Date"
        value={flight.DateD}
        
        onChange={(newValue) =>{
          setFlight({...flight, DateD:newValue})
      }} 
      />
    </LocalizationProvider>
      
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} sx={{ m: 1, width: '40ch' }} />}
        label="Arrival Date"
        value={flight.DateA}
        onChange={(newValue) =>{
          setFlight({...flight, DateA:newValue})
      }}
      />
    </LocalizationProvider>
    </TableRow>

    <TableRow>
       


    <TextField id="outlined-basic" label="First Seats" variant="outlined" sx={{ m: 1, width: '26ch' }} value={flight.FirstSeats} type='Number' onChange={(event) =>{
                setFlight({...flight, FirstSeats:event.target.value})
            }} InputProps={{ inputProps: { min: 0 } }} />
      <TextField id="outlined-basic" label="FirstPrice" variant="outlined" sx={{ m: 1, width: '26ch' }} value={flight.FirstPrice} type='Number' onChange={(event) =>{
          setFlight({...flight, FirstPrice:event.target.value})
      }} InputProps={{ inputProps: { min: 0} }} />
            <TextField id="outlined-basic" label="Baggage allowance first" variant="outlined" sx={{ m: 1, width: '26ch' }}value={flight.BaggageAllowanceFirst} type='Number' onChange={(event) =>{
          setFlight({...flight, BaggageAllowanceFirst:event.target.value})
      }} InputProps={{ inputProps: { min: 0 } }}  />

      </TableRow>


      <TableRow>
        
      <TextField id="outlined-basic" label="BusinessSeats" variant="outlined" sx={{ m: 1, width: '26ch' }} value={flight.BusinessSeats} type='Number' onChange={(event) =>{
                setFlight({...flight, BusinessSeats:event.target.value})
            }} InputProps={{ inputProps: { min: 0 } }} />

        <TextField id="outlined-basic" label="BusinessPrice" variant="outlined" sx={{ m: 1, width: '26ch' }} value={flight.BusinessPrice} type='Number' onChange={(event) =>{
                setFlight({...flight, BusinessPrice:event.target.value})
            }} InputProps={{ inputProps: { min: 0} }} />
            
        <TextField id="outlined-basic" label="Baggage allowance business" variant="outlined" sx={{ m: 1, width: '26ch' }} value={flight.BaggageAllowanceBusiness} type='Number' onChange={(event) =>{
                setFlight({...flight, BaggageAllowanceBusiness:event.target.value})
            }} InputProps={{ inputProps: { min: 0} }} />

      </TableRow>

      <TableRow>

       <TextField id="outlined-basic" label="EconomySeats" variant="outlined" sx={{ m: 1, width: '26ch' }}value={flight.EconomySeats} type='Number' onChange={(event) =>{
        setFlight({...flight, EconomySeats:event.target.value})
    }} InputProps={{ inputProps: { min: 0} }} />
    
       <TextField id="outlined-basic" label="EconomyPrice" variant="outlined" sx={{ m: 1, width: '26ch' }} value={flight.EconomyPrice} type='Number' onChange={(event) =>{
        setFlight({...flight, EconomyPrice:event.target.value})
    }} InputProps={{ inputProps: { min: 0} }} />

    <TextField id="outlined-basic" label="Baggage allowance economy" variant="outlined" sx={{ m: 1, width: '26ch' }} value={flight.BaggageAllowanceEconomy} type='Number' onChange={(event) =>{
        setFlight({...flight, BaggageAllowanceEconomy:event.target.value})
    }} InputProps={{ inputProps: { min: 0} }} />


   </TableRow>

      <TableRow>
      <Button variant="contained" onClick={createFlight} style={{left:'200px'}}sx={{ m: 1, width: '20ch' }}> Save</Button>
      </TableRow>
      
   



      </Table>
      </TableContainer>
    </MainScreen>
    </>

    


  );
  
}

