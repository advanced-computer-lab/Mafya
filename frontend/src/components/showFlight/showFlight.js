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
import Loading from "../../components/Loading";



export default function BasicTable({history}) {
  const userInfo  = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;


  const [loading, setLoading]=useState(false);
  const [loadingEffect,setLoadingEffect]=useState(false);



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
    setLoading(true);
    const config = {
      headers:{
        "Content-type":"application/json",
        Authorization: `Bearer ${userInfo.token}`

      }
    }
   
    axios.delete(`http://localhost:8000/flights/deleteFlights/${id}`,config).then(()=>{
      setLoading(false);
      window.location.reload(false);
    })
  }
  
  

  useEffect(() => {
    if(!userInfo  || !userInfo.isAdmin||!sessionStorage.getItem('adminSearch')){
      setLoadingEffect(false);
      history.push('/homepage')
    }
    else{
      setFlightSearch(JSON.parse(sessionStorage.getItem('adminSearch')));
      const config = {
      headers:{
        "Content-type":"application/json",
        Authorization: `Bearer ${userInfo.token}`

      }
    }
    axios.post('http://localhost:8000/flights/getFlights',flightSearch,config).then((res)=>{
      setLoadingEffect(false);
      setFlight(res.data)
    })

  }
  },[]);

  const [flightSearch,setFlightSearch]= useState({
    Flight_No:'',
    From:'',
    To:'',
    DateD:'',
    DateA:'',
    FirstSeats:'',
    BusinessSeats:'',
    EconomySeats:'',
    ReservedFirstSeats:'',
    ReservedBusinessSeats:'',
    ReservedEconomySeats:'',
    FirstPrice:'',
    BusinessPrice:'',
    EconomyPrice:'',
});


  return (
      <>
      
      {/* <h1><Link to={'/createFlight/'} >
      <Button variant="contained" size='medium' style={{left:'635px'}} >create Flight</Button> 
      </Link>
        </h1> */}

   <h1 className="heading">Flights</h1>
   {loadingEffect && <Loading />}
    <div style={{position:'absolute',top:'150px'}}>
    <TableContainer  component={Paper}>
      <Table aria-label="simple table">
      <TableHead>
      
          <TableRow style={{ backgroundColor:'black',color:'white'}}>
            <TableCell style={{color:'white'}} align="right" >Flight_No</TableCell>

            <TableCell style={{color:'white'}} align="right" >From</TableCell>
            <TableCell style={{color:'white'}} align="right">To</TableCell>

            <TableCell style={{color:'white'}} align="right">Departure Date</TableCell>
            <TableCell style={{color:'white'}} align="right">Arrival Date</TableCell>

            <TableCell style={{color:'white'}} align="right">First_Seats</TableCell>
            <TableCell style={{color:'white'}} align="right">Reseved First Seats</TableCell>
            <TableCell style={{color:'white'}} align="right">First Price</TableCell>

            <TableCell style={{color:'white'}} align="right">Business Seats</TableCell>
            <TableCell style={{color:'white'}} align="right">Reseved Business Seats</TableCell>
            <TableCell style={{color:'white'}} align="right">Business Price</TableCell>

            <TableCell style={{color:'white'}} align="right">Economy Seats</TableCell>
            <TableCell style={{color:'white'}} align="right">Reseved Economy Seats</TableCell>
            <TableCell style={{color:'white'}} align="right">Economy Price</TableCell>

            <TableCell style={{color:'white'}} align="right">Delete</TableCell>
            <TableCell style={{color:'white'}} align="right">Edit</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight,key) => (
            <TableRow
              key={flight._id}
              
            >
              <TableCell align="right">{flight.Flight_No}</TableCell>

              <TableCell align="right">{flight.From}</TableCell>
              <TableCell align="right">{flight.To}</TableCell>

              <TableCell align="right">{formatDate(flight.DateD)}</TableCell>
              <TableCell align="right">{formatDate(flight.DateA)}</TableCell>

              <TableCell align="right">{flight.FirstSeats}</TableCell>
              <TableCell align="right">{flight.ReservedFirstSeats}</TableCell>
              <TableCell align="right">{flight.FirstPrice}</TableCell>

              <TableCell align="right">{flight.BusinessSeats}</TableCell>
              <TableCell align="right">{flight.ReservedBusinessSeats}</TableCell>
              <TableCell align="right">{flight.BusinessPrice}</TableCell>

              <TableCell align="right">{flight.EconomySeats}</TableCell>
              <TableCell align="right">{flight.ReservedEconomySeats}</TableCell>
              <TableCell align="right">{flight.EconomyPrice}</TableCell>

              <TableCell align="right">
              <Button aria-label="delete" size="small"  onClick={()=> deleteconf(flight._id)}>
                    <DeleteIcon fontSize="small" />
                  </Button>
                  
              </TableCell>
              <TableCell align="right">
              <Link to={`/updateFlight/${flight._id}`} >
              <Button aria-label="edit" size="small" >
                    <EditIcon fontSize="small" />
                </Button>   
              </Link>           
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    {loading && <Loading />}
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