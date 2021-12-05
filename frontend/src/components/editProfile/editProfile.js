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
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";

//import TextField from '@material-ui/core/TextField';
//import createFlight from '../'




{/**Function must start with upper case */}
export default function CreateFlight({history}) {

  const userInfo  = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
  const [loading, setLoading]=useState(false);
  const [loadingEffect,setLoadingEffect]=useState(false);

  useEffect(() => {
    if(userInfo){
      const config = {
          headers:{
                "Content-type":"application/json",
                  Authorization: `Bearer ${userInfo.token}`

                }
              }
    axios.get('http://localhost:8000/flights/getProfile/',config).then((res)=>{
      setLoadingEffect(false);
      setPassenger(res.data)
    })   
  }
  else{
    setLoadingEffect(false);
    history.push('/homePage');
  }
  },[]);
        

    const [passenger,setPassenger]= useState({
        name:'',
        email:'',
        passport:'',
        age:''
    });

    const update =() =>{
      setLoading(true);
      
      const config = {
        headers:{
              "Content-type":"application/json",
                Authorization: `Bearer ${userInfo.token}`

              }
            }
      axios.post('http://localhost:8000/flights/updateProfile/',passenger,config).then((res)=>{
        if(res.data == 'User updated successfully'){
          userInfo.name=passenger.name;
          userInfo.email=passenger.email;
          userInfo.age=passenger.age;
          userInfo.passport=passenger.passport;
          localStorage.removeItem("userInfo");
          localStorage.setItem('userInfo',JSON.stringify(userInfo))
        }
        setLoading(false);
       confirmAlert({
           title: 'messege',
           message: res.data,
           buttons: [
             {
               label: 'ok',
               onClick: () => window.location.reload(false)
               
             }
           ]
       });
       
   
     })

 }



  return (
  

    
      <>
      {loadingEffect && <Loading />}
      {loading && <Loading />}
      <MainScreen title="My Profile">
      <Grid  container direction="column" >
      <Grid>
      </Grid>

      <TextField id="outlined-basic" label="Name" variant="outlined"  sx={{m:1 ,width:'60ch'}} value={passenger.name} 
      onChange={(event) =>{setPassenger({...passenger, name:event.target.value})}}
     />

      <TextField id="outlined-basic" label="Passport Number" variant="outlined"  sx={{m:1 ,width:'60ch'}} value={passenger.passport} 
      onChange={(event) =>{setPassenger({...passenger, passport:event.target.value})}}
       /> 
     
      <TextField id="outlined-basic" label="Email" variant="outlined"  sx={{m:1 ,width:'60ch'}} value={passenger.email} 
      onChange={(event) =>{setPassenger({...passenger, email:event.target.value})}}
     /> 
      <TextField id="outlined-basic" label="Age" variant="outlined"  sx={{m:1 ,width:'60ch'}} value={passenger.age} 
      onChange={(event) =>{setPassenger({...passenger, age:event.target.value})}}
       /> 
     
    </Grid>
    <Button variant="contained" size='large' sx={{m:1}} onClick={update} >update</Button>
    </MainScreen>
    </>

    


  );
  
}

