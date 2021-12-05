import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./InquiryScreen.css"
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DateFnsUtils from '@date-io/date-fns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { width } from "@mui/system";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


function SearchScreen({ history }) {
  const [search, setSearch] = useState({
    From:'',
    To:'',
    DateD:'',
    DateA:'',
    FirstNumberOfSeats1:'0',
    BusinessNumberOfSeats1:'0',
    EconomyNumberOfSeats1:'0',


  });
  const [error, setError] = useState(false);
  const [loading, setLoading]=useState(false);
  const [userInfo, setUserInfo]=useState("");



  const submitHandler = async(e) => {
    e.preventDefault();
    setLoading(true);
    const x = (search.DateD==''&&search.DateA=='')||(search.DateD==''&&formatDate(search.DateA).getDate()>=new Date().getDate())||
    (search.DateA==''&&formatDate(search.DateD).getDate()>=new Date().getDate())||
     (formatDate(search.DateD).getDate()<=formatDate(search.DateA).getDate()&&formatDate(search.DateD).getDate()>=new Date().getDate())

    if(x){
      setLoading(false);
      history.push('/showInquiry')
    }
    else{
      setLoading(false);
      confirmAlert({
        title: 'Error',
        message: "invalid Dates",
        buttons: [
          {
            label: 'Ok',
          }
        ]
      });
    }
    
  };

  return (
    <MainScreen>
      <div className="searchContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
          
            <TextField id="outlined-basic" sx={{ m: 2, width: '60ch' }} label="From" variant="outlined" value={search.From} onChange={(event) =>{
          setSearch({...search, From:event.target.value})
      }} />
      <TextField id="outlined-basic" sx={{ m: 2, width: '60ch' }}sx={{ m: 2, width: '60ch' }}label="To" variant="outlined" value={search.To} onChange={(event) =>{
          setSearch({...search, To:event.target.value})
      }} />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
          
          <TextField id="outlined-basic" sx={{ m: 2, width: '38.5ch' }} label="First Number Of Seats " variant="outlined" type='Number' value={search.FirstNumberOfSeats1} onChange={(event) =>{
        setSearch({...search, FirstNumberOfSeats1:event.target.value})
    }} />

        
        
          
          <TextField id="outlined-basic" sx={{ m: 2, width: '38.5ch' }} label="Business Number Of Seats" variant="outlined" type='Number'value={search.BusinessNumberOfSeats1} onChange={(event) =>{
        setSearch({...search, BusinessNumberOfSeats1:event.target.value})
    }} />

          
          <TextField id="outlined-basic" sx={{ m: 2, width: '38.5ch' }} label="Economy Number Of Seats" variant="outlined" type='Number' value={search.EconomyNumberOfSeats1} onChange={(event) =>{
        setSearch({...search, EconomyNumberOfSeats1:event.target.value})
    }} />

        </Form.Group>
          

          <Form.Group controlId="formBasicPassword">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        renderInput={(props) => <TextField {...props}  sx={{ m: 2, width: '60ch' }}/>}
        label="Departure Date"
        value={search.DateD}
        onChange={(newValue) =>{
          setSearch({...search, DateD:newValue})
      }} 
      />
    </LocalizationProvider>
      
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        renderInput={(props) => <TextField {...props} sx={{ m: 2, width: '60ch' }}  />}
        label="Arrival Date"
        value={search.DateA}
        onChange={(newValue) =>{
          setSearch({...search, DateA:newValue})
      }}
      />
    </LocalizationProvider>
          </Form.Group>

          <Form.Group >
          
          <Button variant="primary" type="submit" style={{position: 'absolute' ,left: '610px' , width:"40ch",height:'40px'}} 
            onClick={()=> sessionStorage.setItem('inquiryFlights',JSON.stringify(search))}
           >
            Search
          </Button>
          </Form.Group>
        </Form>
  
      </div>
    </MainScreen>
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

  return new Date(sYear,sMonth,sDay,sHour,sMinute ,0);
}
function padValue(value) {
  return (value < 10) ? "0" + value : value;
}

export default SearchScreen;
