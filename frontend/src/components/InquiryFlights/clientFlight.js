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
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { color, height } from '@mui/system';



export default function BasicTable({history}) {






  const[firstId,setFirstId]=useState("");
  const[secondId,setSecondId]=useState("");
  const[flights,setFlight]=useState([]);
  const [loading, setLoading]=useState(false);
  const [loadingEffect,setLoadingEffect]=useState(false);










  useEffect(() => {
    if(JSON.parse(sessionStorage.getItem("inquiryFlights"))){
    const flightSearch1 ={
      From:JSON.parse(sessionStorage.getItem("inquiryFlights")).From,
      To:JSON.parse(sessionStorage.getItem("inquiryFlights")).To,
      DateD:JSON.parse(sessionStorage.getItem("inquiryFlights")).DateD,
      DateA:JSON.parse(sessionStorage.getItem("inquiryFlights")).DateA,
      FirstSeats:JSON.parse(sessionStorage.getItem("inquiryFlights")).FirstNumberOfSeats1,
      BusinessSeats:JSON.parse(sessionStorage.getItem("inquiryFlights")).BusinessNumberOfSeats1,
      EconomySeats:JSON.parse(sessionStorage.getItem("inquiryFlights")).EconomyNumberOfSeats1
    }
    axios.post('http://localhost:8000/flights/getBookingFlights',flightSearch1).then((res)=>{
      setLoadingEffect(false);
      setFlight(res.data)
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
      setLoadingEffect(false);
      setFlight(res.data)
    })
  }

  },[]);





  return (
      <>
      {loadingEffect && <Loading />}
     <MainScreen title="Flights ">
    <TableContainer  style={{width:'1300px' , float:'left'}}  component={Paper}>
      <Table   style={{width:'1300px' }} aria-label="simple table">
        <TableHead style={{ backgroundColor:'black',color:'white'}}>

          <TableRow>
            <TableCell style={{color:'white'}} align="right" >From</TableCell>
            <TableCell style={{color:'white'}} align="right">To</TableCell>
            <TableCell style={{color:'white'}} align="right">Departure Date</TableCell>
            <TableCell style={{color:'white'}} align="right">Arrival Date</TableCell>
            <TableCell style={{color:'white'}} align="right">First $ </TableCell>
            <TableCell style={{color:'white'}} align="right">First Available seats </TableCell>
            <TableCell style={{color:'white'}} align="right">Baggage Allowance First </TableCell>
            <TableCell style={{color:'white'}} align="right">Economy $</TableCell>
            <TableCell style={{color:'white'}} align="right">Economy Available seats </TableCell>
            <TableCell style={{color:'white'}} align="right">Baggage Allowance Business </TableCell>
            <TableCell style={{color:'white'}} align="right">Business $</TableCell>
            <TableCell style={{color:'white'}} align="right">Business Available seats </TableCell>
            <TableCell style={{color:'white'}} align="right">Baggage Allowance Economy </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight,key) => (
            <TableRow
              key={flight._id}>

              <TableCell align="right">{flight.From}</TableCell>
              <TableCell align="right">{flight.To}</TableCell>

              <TableCell align="right">{formatDate(flight.DateD)}</TableCell>
              <TableCell align="right">{formatDate(flight.DateA)}</TableCell>

              <TableCell align="right">{flight.FirstPrice}$</TableCell>
              <TableCell align="right">{flight.FirstSeats}</TableCell>
              <TableCell align="right">{flight.BaggageAllowanceFirst}</TableCell>

              <TableCell align="right">{flight.BusinessPrice}$</TableCell>
              <TableCell align="right">{flight.BusinessSeats}</TableCell>
              <TableCell align="right">{flight.BaggageAllowanceBusiness}</TableCell>

              <TableCell align="right">{flight.EconomyPrice}$</TableCell>
              <TableCell align="right">{flight.EconomySeats}</TableCell>
              <TableCell align="right">{flight.BaggageAllowanceEconomy}</TableCell>
              

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    </MainScreen>
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