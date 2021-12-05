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


  useEffect(() => {
    

    if(!userInfo  || !userInfo.isAdmin){
      setLoadingEffect(false);
      history.push('/homepage')
    }
    else{

    const config = {
      headers:{
        "Content-type":"application/json",
        Authorization: `Bearer ${userInfo.token}`

      }
    }
           
    axios.get(`http://localhost:8000/flights/updateFlights/${props.match.params.id}`,config).then((res)=>{
      setLoadingEffect(false);
      setFlight(res.data) 
    })  
  }       
  },[]);



  const[DseatsF,setDseatsF]=useState([]);
  const[DseatsB,setDseatsB]=useState([]);
  const[DseatsE,setDseatsE]=useState([]);

  const[DseatsFR,setDseatsFR]=useState([]);
  const[DseatsBR,setDseatsBR]=useState([]);
  const[DseatsER,setDseatsER]=useState([]);

        
    const [flight,setFlight]= useState({
      Flight_No:'',
      From:'',
      To:'',
      DateD:'',
      DateA:'',
      FirstSeats:'',
      ReservedFirstSeats:'',
      FirstPrice:'',
      FirstSeatsNumbers:[],
      ReservedFirstSeatsNumbers:[],
      BusinessSeats:'',
      ReservedBusinessSeats:'',
      BusinessPrice:'',
      BusinessSeatsNumbers:[],
      ReservedBusinessSeatsNumbers:[],
      EconomySeats:'',
      ReservedEconomySeats:'',
      EconomyPrice:'',
      EconomySeatsNumbers:[],
      ReservedEconomySeatsNumbers:[],
      BaggageAllowanceFirst:'',
      BaggageAllowanceBusiness:'',
      BaggageAllowanceEconomy:''
    });

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
      <MainScreen title="Update Flight">

      <TableContainer sx={{width: '85ch' }} component={Paper}>
    <Table  sx={{width: '85ch' }} aria-label="simple table">
    <TableRow>
      </TableRow>

      <TableRow>

      <TextField id="outlined-basic" label="Flight_No" variant="outlined" sx={{ m: 1, width: '82.5ch' }} type="number" value={flight.Flight_No} onChange={(event) =>{
          setFlight({...flight, Flight_No:event.target.value})
      }} />
      </TableRow>

      <TableRow>
       <TextField id="outlined-basic" label="From" variant="outlined"  sx={{ m: 1, width: '40ch' }}value={flight.From} onChange={(event) =>{
          setFlight({...flight, From:event.target.value})
      }} />
      <TextField id="outlined-basic" label="To" variant="outlined" sx={{ m: 1, width: '40ch' }} value={flight.To} onChange={(event) =>{
          setFlight({...flight, To:event.target.value})
      }} /> 
      </TableRow>


      <TableRow>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} sx={{ m: 1, width: '40ch' }} />}
        label="Departure Date"
        value={flight.DateD}
        onChange={(newValue) =>{
          setFlight({...flight, DateD:newValue})
      }} 
      />
    </LocalizationProvider>
      
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props}  sx={{ m: 1, width: '40ch' }}/>}
        label="Arrival Date"
        value={flight.DateA}
        onChange={(newValue) =>{
          setFlight({...flight, DateA:newValue})
      }}
      />
    </LocalizationProvider>
       
    </TableRow>




    <TableRow>

      <FormControl sx={{ m:1,width: '40ch' }}>
     
          <InputLabel id="demo-multiple-name-label">Remove available first seats</InputLabel>
          <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={DseatsF}
          onChange={(event) =>{setDseatsF(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)}}
          input={<OutlinedInput label="Remove available first seats" />}
          MenuProps={MenuProps}
          
        >
          {flight.FirstSeatsNumbers.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, DseatsF, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select> 
        </FormControl>

              <FormControl sx={{ m:1, width: '40ch' }}>
     
          <InputLabel id="demo-multiple-name-label">Cancel reserved first seats</InputLabel>
          <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={DseatsFR}
          onChange={(event) =>{setDseatsFR(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)}}
          input={<OutlinedInput label="Remove reserved first seats" />}
          MenuProps={MenuProps}
          
        >
          {flight.ReservedFirstSeatsNumbers.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, DseatsFR, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select> 
        </FormControl>

    </TableRow>
    
    <TableRow>

<FormControl sx={{ m:1,width: '40ch' }}>

    <InputLabel id="demo-multiple-name-label">Remove available business seats</InputLabel>
    <Select
    labelId="demo-multiple-name-label"
    id="demo-multiple-name"
    multiple
    value={DseatsB}
    onChange={(event) =>{setDseatsB(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)}}
    input={<OutlinedInput label="Remove available business seats" />}
    MenuProps={MenuProps}
    
  >
    {flight.BusinessSeatsNumbers.map((name) => (
      <MenuItem
        key={name}
        value={name}
        style={getStyles(name, DseatsB, theme)}
      >
        {name}
      </MenuItem>
    ))}
  </Select> 
  </FormControl>

        <FormControl sx={{ m:1, width: '40ch' }}>

    <InputLabel id="demo-multiple-name-label">Cancel reserved business seats</InputLabel>
    <Select
    labelId="demo-multiple-name-label"
    id="demo-multiple-name"
    multiple
    value={DseatsBR}
    onChange={(event) =>{setDseatsBR(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)}}
    input={<OutlinedInput label="Cancel reserved business seats" />}
    MenuProps={MenuProps}
    
  >
    {flight.ReservedBusinessSeatsNumbers.map((name) => (
      <MenuItem
        key={name}
        value={name}
        style={getStyles(name, DseatsBR, theme)}
      >
        {name}
      </MenuItem>
    ))}
  </Select> 
  </FormControl>

</TableRow>

<TableRow>

<FormControl sx={{ m:1,width: '40ch' }}>

    <InputLabel id="demo-multiple-name-label">Remove available economy seats</InputLabel>
    <Select
    labelId="demo-multiple-name-label"
    id="demo-multiple-name"
    multiple
    value={DseatsE}
    onChange={(event) =>{setDseatsE(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)}}
    input={<OutlinedInput label="Remove available economy seats" />}
    MenuProps={MenuProps}
    
  >
    {flight.EconomySeatsNumbers.map((name) => (
      <MenuItem
        key={name}
        value={name}
        style={getStyles(name, DseatsE, theme)}
      >
        {name}
      </MenuItem>
    ))}
  </Select> 
  </FormControl>

        <FormControl sx={{ m:1, width: '40ch' }}>

    <InputLabel id="demo-multiple-name-label">Cancel reserved economy seats</InputLabel>
    <Select
    labelId="demo-multiple-name-label"
    id="demo-multiple-name"
    multiple
    value={DseatsER}
    onChange={(event) =>{setDseatsER(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)}}
    input={<OutlinedInput label="Cancel reserved economy seats" />}
    MenuProps={MenuProps}
    
  >
    {flight.ReservedEconomySeatsNumbers.map((name) => (
      <MenuItem
        key={name}
        value={name}
        style={getStyles(name, DseatsER, theme)}
      >
        {name}
      </MenuItem>
    ))}
  </Select> 
  </FormControl>

</TableRow>

    <TableRow>
    <TextField id="outlined-basic" label="FirstPrice" variant="outlined" sx={{ m: 1, width: '26ch' }} value={flight.FirstPrice} type='Number' onChange={(event) =>{
          setFlight({...flight, FirstPrice:event.target.value})
      }} InputProps={{ inputProps: { min: 0} }} />
        <TextField id="outlined-basic" label="BusinessPrice" variant="outlined" sx={{ m: 1, width: '26ch' }}value={flight.BusinessPrice} type='Number' onChange={(event) =>{
                setFlight({...flight, BusinessPrice:event.target.value})
            }} InputProps={{ inputProps: { min: 0} }} />
        <TextField id="outlined-basic" label="EconomyPrice" variant="outlined" sx={{ m: 1, width: '26ch' }} value={flight.EconomyPrice} type='Number' onChange={(event) =>{
                setFlight({...flight, EconomyPrice:event.target.value})
            }} InputProps={{ inputProps: { min: 0} }} />

    </TableRow>

    <TableRow>
    <TextField id="outlined-basic" label="Baggage allowance first" variant="outlined" sx={{ m: 1, width: '26ch' }} value={flight.BaggageAllowanceFirst} type='Number' onChange={(event) =>{
          setFlight({...flight, BaggageAllowanceFirst:event.target.value})
      }} InputProps={{ inputProps: { min: 0} }} />
        <TextField id="outlined-basic" label="Baggage allowance business" variant="outlined" sx={{ m: 1, width: '26ch' }}value={flight.BaggageAllowanceBusiness} type='Number' onChange={(event) =>{
                setFlight({...flight, BaggageAllowanceBusiness:event.target.value})
            }} InputProps={{ inputProps: { min: 0} }} />
        <TextField id="outlined-basic" label="Baggage allowance economy" variant="outlined" sx={{ m: 1, width: '26ch' }} value={flight.BaggageAllowanceEconomy} type='Number' onChange={(event) =>{
                setFlight({...flight, BaggageAllowanceEconomy:event.target.value})
            }} InputProps={{ inputProps: { min: 0} }} />

    </TableRow>
    

    <TableRow>
      <Button variant="contained" onClick={updateFlight} style={{left:'200px'}}sx={{ m: 1, width: '20ch' }}>update</Button>
      </TableRow>
 
      </Table>
      </TableContainer>
      </MainScreen>
    </>

    


  );
  
}

