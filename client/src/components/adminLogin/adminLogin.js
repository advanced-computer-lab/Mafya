import  React ,{useState} from 'react';
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
import { Container , AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useHistory } from "react-router-dom";



export default function AdminLogin() {

   

 
    const [admin,setAdmin]= useState({
        userName:'',
        password:''
    });
    const history = useHistory();
    const adminLogin =() =>{
      
      axios.post('http://localhost:8000/flights/',admin).then((res)=>{
        if(res.data=="login"){
          let path = `/showFlights`;
          
          history.push(path);

        }
        else{
           confirmAlert({
           title: 'messege',
           message: res.data,
           buttons: [
             {
               label: 'ok',
             }
           ]
         })}
       
   
        });

    }

  return (
  

    
      <>
      <Grid  container direction="column" justify="center" alignContent="center" >
      
      <h1>Login</h1>

      <TextField id="outlined-basic" label="User Name" variant="outlined"   value={admin.userName} onChange={(event) =>{
          setAdmin({...admin, userName:event.target.value})
      }} />
      <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={admin.password} onChange={(event) =>{
          setAdmin({...admin, password:event.target.value})
      }} />
     

       
      <Button variant="contained" onClick={adminLogin}>log in</Button>
      </Grid>
   
    </>
  );
  
}
