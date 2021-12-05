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
import { color, height } from '@mui/system';
import Loading from "../../components/Loading";



export default function BasicTable({history}) {




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

  const[firstId,setFirstId]=useState("");
  const[secondId,setSecondId]=useState("");
  const[flights,setFlight]=useState([]);
  const[flights2,setFlight2]=useState([]);

  const deleteFlight=(id)=>{
   
    axios.delete(`http://localhost:8000/flights/deleteFlights/${id}`).then(()=>{
      
      window.location.reload(false);
    })
  }

  const [loading, setLoading]=useState(false);
  const [loadingEffect,setLoadingEffect]=useState(false);

  const color1=(id)=>{
  if(firstId==id)
      return '#C0C0C0'

  }

  const color2=(id)=>{
    if(secondId==id)
        return '#C0C0C0'
  
    }






  useEffect(() => {

    if(JSON.parse(sessionStorage.getItem("clientFlights"))){
      const flightSearch1 ={
        From:JSON.parse(sessionStorage.getItem("clientFlights")).From,
        To:JSON.parse(sessionStorage.getItem("clientFlights")).To,
        DateD:JSON.parse(sessionStorage.getItem("clientFlights")).DateD,
        DateA:'',
        FirstSeats:JSON.parse(sessionStorage.getItem("clientFlights")).FirstNumberOfSeats1,
        BusinessSeats:JSON.parse(sessionStorage.getItem("clientFlights")).BusinessNumberOfSeats1,
        EconomySeats:JSON.parse(sessionStorage.getItem("clientFlights")).EconomyNumberOfSeats1
      }
      axios.post('http://localhost:8000/flights/getBookingFlights',flightSearch1).then((res)=>{
        setFlight(res.data)
      })

    }
      else{
        const flightSearch1 ={
        From:'',
        To:'',
        DateD:'',
        DateA:'',
        FirstSeats:'',
        BusinessSeats:'',
        EconomySeats:''
      }
      axios.post('http://localhost:8000/flights/getBookingFlights',flightSearch1).then((res)=>{
        setFlight(res.data)
      })
    }

    if(JSON.parse(sessionStorage.getItem("clientFlights"))){
      const flightSearch2 ={
        From:JSON.parse(sessionStorage.getItem("clientFlights")).To,
        To:JSON.parse(sessionStorage.getItem("clientFlights")).From,
        DateD:JSON.parse(sessionStorage.getItem("clientFlights")).DateA,
        DateA:'',
        FirstSeats:JSON.parse(sessionStorage.getItem("clientFlights")).FirstNumberOfSeats2,
        BusinessSeats:JSON.parse(sessionStorage.getItem("clientFlights")).BusinessNumberOfSeats2,
        EconomySeats:JSON.parse(sessionStorage.getItem("clientFlights")).EconomyNumberOfSeats2
      }
      axios.post('http://localhost:8000/flights/getBookingFlights',flightSearch2).then((res)=>{
        setFlight2(res.data)
      })

    }
      else{
        const flightSearch2 ={
        From:'',
        To:'',
        DateD:'',
        DateA:'',
        FirstSeats:'',
        BusinessSeats:'',
        EconomySeats:''
      }
      axios.post('http://localhost:8000/flights/getBookingFlights',flightSearch2).then((res)=>{
        setFlight2(res.data)
      })
      setLoadingEffect(false);

    }





  },[]);

  const book=()=>{
    if(firstId==""||secondId==""){
      confirmAlert({
        message: 'You have to choose two flights',
        buttons: [
          {
            label: 'ok',
          }
        ]
      });
    }
    else{
    sessionStorage.setItem('flightsBook',JSON.stringify({'firstId':firstId,'secondId':secondId}));
    history.push('/book')
    }
  
    }



  return (
      <>

 <h1 className="heading">Available Flights</h1>
 {loadingEffect && <Loading />}

<div style={{position:'absolute',top:'150px'}}>

<Button variant="contained"style={{width:'100px',  position: 'related',left: '1400px'}} 
    onClick={()=> book()}
    > Book >></Button>  
<h6 style={{left: '15px' ,top:'20px', position: 'absolute'}} >Choose two flights on from each table</h6>
<TableContainer style={{width:'1500px' }}  sx={{m:1}}component={Paper}>
<Table  style={{width:'1500px'}} aria-label="simple table">
<TableRow>
    <TableContainer style={{width:'740px' ,float:'left' }}  component={Paper}>
      <Table  style={{width:'740px'}}  aria-label="simple table">
        <TableHead style={{ backgroundColor:'black',color:'white'}}>

          <TableRow >
            <TableCell style={{color:'white'}} align="right" >From</TableCell>
            <TableCell style={{color:'white'}} align="right">To</TableCell>
            <TableCell style={{color:'white'}} align="right">Departure Date</TableCell>
            <TableCell style={{color:'white'}} align="right">Arrival Date</TableCell>
            <TableCell style={{color:'white'}} align="right">First $ </TableCell>
            <TableCell style={{color:'white'}} align="right">Economy $</TableCell>
            <TableCell style={{color:'white'}} align="right">Business $</TableCell>
            <TableCell style={{color:'white'}} align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight,key) => (
            <TableRow
              key={flight._id}
              style={{ backgroundColor:color1(flight._id)}}
            >

              <TableCell align="right">{flight.From}</TableCell>
              <TableCell align="right">{flight.To}</TableCell>

              <TableCell align="right">{formatDate(flight.DateD)}</TableCell>
              <TableCell align="right">{formatDate(flight.DateA)}</TableCell>

              <TableCell align="right">{flight.FirstPrice}$</TableCell>
              <TableCell align="right">{flight.BusinessPrice}$</TableCell>
              <TableCell align="right">{flight.EconomyPrice}$</TableCell>
              

              <TableCell align="right">
              
  
              <Button  aria-label="edit" size="small"  onClick={()=> setFirstId(flight._id)}>
                    <EditIcon fontSize="small" />
                </Button>   
              
             
             
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <TableContainer style={{width:'740px' ,float:'right'}} component={Paper}>
      <Table  style={{width:'740px'}} aria-label="simple table">
        <TableHead >

          <TableRow style={{ backgroundColor:'black'}}>
            <TableCell style={{color:'white'}} align="right" >From</TableCell>
            <TableCell style={{color:'white'}} align="right">To</TableCell>
            <TableCell style={{color:'white'}} align="right">Departure Date</TableCell>
            <TableCell style={{color:'white'}} align="right">Arrival Date</TableCell>
            <TableCell style={{color:'white'}} align="right">First $ </TableCell>
            <TableCell style={{color:'white'}} align="right">Economy $</TableCell>
            <TableCell style={{color:'white'}}align="right">Business $</TableCell>
            <TableCell style={{color:'white'}} align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights2.map((flight,key) => (
            <TableRow
              key={flight._id}
              style={{ backgroundColor:color2(flight._id)}}
            >

              <TableCell align="right">{flight.From}</TableCell>
              <TableCell align="right">{flight.To}</TableCell>

 
              <TableCell align="right">{formatDate(flight.DateD)}</TableCell>
              <TableCell align="right">{formatDate(flight.DateA)}</TableCell>
              <TableCell align="right">{flight.FirstPrice}$</TableCell>
              <TableCell align="right">{flight.BusinessPrice}$</TableCell>
              <TableCell align="right">{flight.EconomyPrice}$</TableCell>

              <TableCell align="right">
              
  
              <Button  aria-label="edit" size="small"  onClick={()=> setSecondId(flight._id)}>
                    <EditIcon fontSize="small" />
                </Button>   
              
             
             
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </TableRow>
    </Table>
    </TableContainer>

    </div>
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