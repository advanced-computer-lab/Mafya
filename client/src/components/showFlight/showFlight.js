import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Component, useState,useEffect } from 'react';
import axios from 'axios'
import  IconButton  from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import DateAdapter from '@mui/lab/AdapterDateFns';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DateFnsUtils from '@date-io/date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



export default function BasicTable() {


  const deleteconf = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this Flight',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteFlight(id)
        },
        {
          label: 'No',
        }
      ]
    });
  };


  const[flights,setFlight]=useState([]);

  const deleteFlight=(id)=>{
   
    axios.delete(`http://localhost:8000/flights/deleteFlights/${id}`).then(()=>{
      
      window.location.reload(false);
    })
  }
  

  const updateFlight=(id)=>{
    axios.put(`http://localhost:5000/flights/${id}`).then(()=>{
      window.location.reload(false);
    })
  }

  useEffect(() => {
    axios.get('http://localhost:8000/flights/getFlights').then((res)=>{
      setFlight(res.data)
    })
         
  },[]);

  const [flightSearch,setFlightSearch]= useState({
    Flight_No:'',
    From:'',
    To:'',
    DateD:'',
    DateA:'',
    FirstSeats:'',
    BusinessSeats:'',
    EconomySeats:''
});
const filterFlight =() =>{
  axios.post('http://localhost:8000/flights/getFlights',flightSearch).then((res)=>{
    setFlight(res.data)
  })

}

  return (
      <>
      <h1>All Flights</h1>
      <Link to={'/createFlight/'} className="btn btn-outline-warning float-right">
      <Button variant="contained" >create Flight</Button> 
      </Link>

      
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1080 }} aria-label="simple table">
        <TableHead >
        <TableRow >

      <TableCell style ={{width: '100px'}}><TextField id="outlined-basic"  variant="outlined" type="number"  value={flightSearch.Flight_No}
      onChange={(event) =>{setFlightSearch({...flightSearch, Flight_No:event.target.value}) }}
      />
        </TableCell>
      <TableCell style ={{width: '100px'}}><TextField id="outlined-basic"  variant="outlined"   value={flightSearch.From}
      onChange={(event) =>{setFlightSearch({...flightSearch, From:event.target.value}) }} /></TableCell>
      <TableCell style ={{width: '100px'}}><TextField id="outlined-basic"  variant="outlined"   value={flightSearch.To}
      onChange={(event) =>{setFlightSearch({...flightSearch, To:event.target.value}) }} /></TableCell>
      <TableCell style ={{width: '320px'}}>
         <LocalizationProvider dateAdapter={AdapterDateFns}>
           <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
      
           value={flightSearch.DateD}
           onChange={(newValue) =>{
            setFlightSearch({...flightSearch, DateD:newValue})
        }}


        />
        </LocalizationProvider>
      </TableCell>
      <TableCell style ={{width: '320px'}}>
         <LocalizationProvider dateAdapter={AdapterDateFns}>
           <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
          
           value={flightSearch.DateA}
           onChange={(newValue) =>{
            setFlightSearch({...flightSearch, DateA:newValue})
        }}

        />
        </LocalizationProvider>
      </TableCell>
      <TableCell style ={{width: '100px'}}><TextField id="outlined-basic"  variant="outlined"  type="number"  value={flightSearch.FirstSeats}
      onChange={(event) =>{setFlightSearch({...flightSearch, FirstSeats:event.target.value}) }}
      /></TableCell>
      <TableCell style ={{width: '100px'}}><TextField id="outlined-basic" variant="outlined"  type="number" value={flightSearch.BusinessSeats}
      onChange={(event) =>{setFlightSearch({...flightSearch, BusinessSeats:event.target.value}) }}/></TableCell>
      <TableCell style ={{width: '100px'}}><TextField id="outlined-basic"  variant="outlined"  type="number" value={flightSearch.EconomySeats}
      onChange={(event) =>{setFlightSearch({...flightSearch, EconomySeats:event.target.value}) }} /></TableCell>
      <TableCell style ={{width: '100px'}}><Button variant="contained" onClick={filterFlight} >Filter</Button></TableCell>
      </TableRow>
      
          <TableRow>
            <TableCell>Flight_No</TableCell>
            <TableCell align="right" >From</TableCell>
            <TableCell align="right">To</TableCell>
            <TableCell align="right">Departure Date</TableCell>
            <TableCell align="right">Arrival Date</TableCell>
            <TableCell align="right">FirstSeats</TableCell>
            <TableCell align="right">BusinessSeats</TableCell>
            <TableCell align="right">EconomySeats</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight,key) => (
            <TableRow
              key={flight._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{flight.Flight_No}</TableCell>
              <TableCell align="right">{flight.From}</TableCell>
              <TableCell align="right">{flight.To}</TableCell>
              <TableCell align="right">{formatDate(flight.DateD)}</TableCell>
              <TableCell align="right">{formatDate(flight.DateA)}</TableCell>
              <TableCell align="right">{flight.FirstSeats}</TableCell>
              <TableCell align="right">{flight.BusinessSeats}</TableCell>
              <TableCell align="right">{flight.EconomySeats}</TableCell>
              <TableCell align="right">
              <IconButton aria-label="delete" size="small"  onClick={()=> deleteconf(flight._id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  
              </TableCell>
              <TableCell align="right">
              <div className="col-md-11" item xs={3} sm={5}>
              <Link to={`/updateFlight/${flight._id}`} className="btn btn-outline-warning float-right">
              <IconButton aria-label="edit" size="small" >
                    <EditIcon fontSize="small" />
                </IconButton>   
              </Link>
             
              </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
function formatDate(dateVal) {
  var newDate = new Date(dateVal);

  var sMonth = padValue(newDate.getMonth() + 1);
  var sDay = padValue(newDate.getDate());
  var sYear = newDate.getFullYear();
  var sHour = newDate.getHours();
  var sMinute = padValue(newDate.getMinutes());
  var sAMPM = "AM";

  var iHourCheck = parseInt(sHour);

  if (iHourCheck > 12) {
      sAMPM = "PM";
      sHour = iHourCheck - 12;
  }
  else if (iHourCheck === 0) {
      sHour = "12";
  }

  sHour = padValue(sHour);

  return sMonth + "/" + sDay + "/" + sYear + " " + sHour + ":" + sMinute + " " + sAMPM;
}

function padValue(value) {
  return (value < 10) ? "0" + value : value;
}