import  React  from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loading from "../../components/Loading";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export default function CreateFlight(props) {

  const theme = useTheme();
  const history = props.history;

  const userInfo  = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const [loading, setLoading]=useState(false);
  const [loadingEffect,setLoadingEffect]=useState(false);

  const [flight,setFlight]= useState({
    From:'',
    To:'',
    DateD:'',
    FirstNumberOfSeats:'0',
    BusinessNumberOfSeats:'0',
    EconomyNumberOfSeats:'0',
    children:0,
  });
  useEffect(() => {
    setFlight({
        From:JSON.parse(sessionStorage.getItem("editFlightsClient")).From,
        To:JSON.parse(sessionStorage.getItem("editFlightsClient")).To,
        DateD:JSON.parse(sessionStorage.getItem("editFlightsClient")).DateD,
        FirstNumberOfSeats:JSON.parse(sessionStorage.getItem("editFlightsClient")).FirstNumberOfSeats,
        BusinessNumberOfSeats:JSON.parse(sessionStorage.getItem("editFlightsClient")).BusinessNumberOfSeats,
        EconomyNumberOfSeats:JSON.parse(sessionStorage.getItem("editFlightsClient")).EconomyNumberOfSeats,
        children:JSON.parse(sessionStorage.getItem("editFlightsClient")).children,

    })
     
  },[]);
  const search=(flight)=>{
   
    //sessionStorage.setItem('editFlightsClient',JSON.stringify(x));
    console.log(flight.FirstNumberOfSeats)
    sessionStorage.setItem('changeDpFlight',JSON.stringify(flight))
    history.push("/changeDpFlight");

  }


  const[DseatsF,setDseatsF]=useState([]);
  const[DseatsB,setDseatsB]=useState([]);
  const[DseatsE,setDseatsE]=useState([]);

  const[DseatsFR,setDseatsFR]=useState([]);
  const[DseatsBR,setDseatsBR]=useState([]);
  const[DseatsER,setDseatsER]=useState([]);

        


    const updateFlight =() =>{
      setLoading(true);
      try{

        const config = {
          headers:{
            "Content-type":"application/json",
            Authorization: `Bearer ${userInfo.token}`
    
          }
        }
        handleDiff();
        
           axios.post(`http://localhost:8000/flights/doUpdateFlights/${props.match.params.id}`,flight,config).then((res)=>{
            setLoading(false);
            confirmAlert({
                title: 'messege',
                message: res.data,
                buttons: [
                  {
                    label: 'ok',
                    onClick: () =>window.location.reload(false)
                    
                  }
                ]
            });
            
        
          })

      }
      catch(error){
        setLoading(false);;
        confirmAlert({
          title: 'messege',
          message: error.message,
          buttons: [
            {
              label: 'ok',
              onClick: () =>window.location.reload(false)
              
            }
          ]
      });
      
      
      }



    }
    const handleDiff=()=>{
      diffSets(flight.FirstSeatsNumbers,DseatsF);
      diffSets(flight.ReservedFirstSeatsNumbers,DseatsFR);
      diffSets(flight.BusinessSeatsNumbers,DseatsB);
      diffSets(flight.ReservedBusinessSeatsNumbers,DseatsBR);
      diffSets(flight.EconomySeatsNumbers,DseatsE);
      diffSets(flight.ReservedEconomySeatsNumbers,DseatsER);

    }

    const diffSets=(arr1,arr2)=>{
      let n = arr2.length;
        let i = 0;
        for (i = 0; i < n; i++) {
          arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    
        return arr1;

    }
    const rest=()=>{
      const config = {
        headers:{
          "Content-type":"application/json",
          Authorization: `Bearer ${userInfo.token}`
  
        }
      }
             
      axios.get(`http://localhost:8000/flights/updateFlights/${props.match.params.id}`,config).then((res)=>{
        setFlight(res.data) 
      })  
    }

  return (
  

    
      <>
      {loadingEffect && <Loading />}
      {loading && <Loading />}
      <MainScreen title="Change Flight">

      <TableContainer sx={{width: '85ch' }} component={Paper}>
    <Table  sx={{width: '85ch' }} aria-label="simple table">
    <TableRow>
      </TableRow>


      <TableRow>
       <TextField id="outlined-basic" label="From" variant="outlined"  sx={{ m: 1, width: '40ch' }}value={flight.From}  />
      <TextField id="outlined-basic" label="To" variant="outlined" sx={{ m: 1, width: '40ch' }} value={flight.To}  /> 
      </TableRow>


      <TableRow>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        renderInput={(props) => <TextField {...props} sx={{ m: 1, width: '40ch' }} />}
        label="Departure Date"
        value={flight.DateD}
        onChange={(newValue) =>{
          setFlight({...flight, DateD:newValue})
      }} 
      />
    </LocalizationProvider>
    <TextField id="outlined-basic" label="numberOfChildern" variant="outlined"  sx={{ m: 1, width: '40ch' }}value={flight.children} onChange={(event) =>{
          setFlight({...flight, children:event.target.value})
      }} />
   
    </TableRow>

    <TableRow>
        <TextField id="outlined-basic" label="FirstNumberOfSeats" variant="outlined"  sx={{ m: 1, width: '25ch' }}value={flight.FirstNumberOfSeats} onChange={(event) =>{
          setFlight({...flight, FirstNumberOfSeats:event.target.value})
      }} />
      <TextField id="outlined-basic" label="BusinessNumberOfSeats" variant="outlined"  sx={{ m: 1, width: '25ch' }}value={flight.BusinessNumberOfSeats} onChange={(event) =>{
          setFlight({...flight, BusinessNumberOfSeats:event.target.value})
      }} />
      <TextField id="outlined-basic" label="EconomyNumberOfSeats" variant="outlined"  sx={{ m: 1, width: '25ch' }}value={flight.EconomyNumberOfSeats} onChange={(event) =>{
          setFlight({...flight, EconomyNumberOfSeats:event.target.value})
      }} />
      
    </TableRow>
    
    <TableRow>
      <Button variant="contained" style={{left:'200px'}}sx={{ m: 1, width: '20ch' }}
      onClick={()=> search(flight)}>Search</Button>
      </TableRow>
 
      </Table>
      </TableContainer>
      </MainScreen>
    </>

    


  );
  
}

