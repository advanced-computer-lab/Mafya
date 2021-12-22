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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { textAlign } from '@mui/system';
import Paper from '@mui/material/Paper';
import  IconButton  from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loading from "../../components/Loading";
//import TextField from '@material-ui/core/TextField';
//import createFlight from '../'




{/**Function must start with upper case */}
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


export default function CreateFlight({history}) {
  const theme = useTheme();



  const userInfo  = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

  const[DseatsF,setDseatsF]=useState([]);
  const[DseatsB,setDseatsB]=useState([]);
  const[DseatsE,setDseatsE]=useState([]);


  const [f1,setF1] = useState(0);;
  const [b1,setB1] = useState(0);;
  const [e1,setE1] = useState(0);;

  const [loading, setLoading]=useState(false);
  const [loadingEffect,setLoadingEffect]=useState(false);

  //const fid=JSON.parse(sessionStorage.getItem("editFlightsClient")).Id;
  
   

 


  useEffect(() => {
    if(!userInfo){
      history.push("/homepage");
    }
    

    var firstId = JSON.parse(sessionStorage.getItem("flightsBook")).firstId;
   // var secondId = JSON.parse(sessionStorage.getItem("flightsBook")).secondId;

    axios.get(`http://localhost:8000/flights/bookFlights/${firstId}`).then((res)=>{
      setF1(JSON.parse(sessionStorage.getItem("changeDpFlight")).FirstNumberOfSeats*res.data.FirstPrice);
      setB1(JSON.parse(sessionStorage.getItem("changeDpFlight")).BusinessNumberOfSeats*res.data.BusinessPrice);
      setE1(JSON.parse(sessionStorage.getItem("changeDpFlight")).EconomyNumberOfSeats*res.data.EconomyPrice);

      setFlight1({
        clientId:userInfo?userInfo._id:'',
        flightId:firstId,
        Flight_No:res.data.Flight_No,
        From:res.data.From,
        To:res.data.To,
        DateD:res.data.DateD,
        DateA:res.data.DateA,
        FirstNumberOfSeats:JSON.parse(sessionStorage.getItem("changeDpFlight")).FirstNumberOfSeats,
        FirstPrice:res.data.FirstPrice,
        BusinessNumberOfSeats:JSON.parse(sessionStorage.getItem("changeDpFlight")).BusinessNumberOfSeats,
        BusinessPrice:res.data.BusinessPrice,
        EconomyNumberOfSeats:JSON.parse(sessionStorage.getItem("changeDpFlight")).EconomyNumberOfSeats,
        EconomyPrice:res.data.EconomyPrice,
        FirstSeatsNumbers:[],
        BusinessSeatsNumbers :[],
        EconomySeatsNumbers : [],
        TotalPrice:(JSON.parse(sessionStorage.getItem("changeDpFlight")).FirstNumberOfSeats*res.data.FirstPrice)+
                   (JSON.parse(sessionStorage.getItem("changeDpFlight")).BusinessNumberOfSeats*res.data.BusinessPrice)+
                   (JSON.parse(sessionStorage.getItem("changeDpFlight")).EconomyNumberOfSeats*res.data.EconomyPrice),
        BaggageAllowanceFirst:res.data.BaggageAllowanceFirst,
        BaggageAllowanceBusiness:res.data.BaggageAllowanceBusiness,
        BaggageAllowanceEconomy:res.data.BaggageAllowanceEconomy,
        TotalBaggageAlowance:(JSON.parse(sessionStorage.getItem("changeDpFlight")).FirstNumberOfSeats*res.data.BaggageAllowanceFirst)+
                             (JSON.parse(sessionStorage.getItem("changeDpFlight")).BusinessNumberOfSeats*res.data.BaggageAllowanceBusiness)+
                             (JSON.parse(sessionStorage.getItem("changeDpFlight")).EconomyNumberOfSeats*res.data.BaggageAllowanceEconomy),
        NumberOfChildren:JSON.parse(sessionStorage.getItem("changeDpFlight")).children1
      }) 

      setDseatsF(res.data.FirstSeatsNumbers)
      setDseatsB(res.data.BusinessSeatsNumbers)
      setDseatsE(res.data.EconomySeatsNumbers)
      
      
    
    })

      

  },[]);
        
    const [flight1,setFlight1]= useState({
      clientId:'',
      flightId:'',
      Flight_No:'',
      From:'',
      To:'',
      DateD:'',
      DateA:'',
      FirstNumberOfSeats:'0',
      FirstPrice:'0',
      BusinessNumberOfSeats:'0',
      BusinessPrice:'0',
      EconomyNumberOfSeats:'0',
      EconomyPrice:'0',
      FirstSeatsNumbers:[],
      BusinessSeatsNumbers :[],
      EconomySeatsNumbers : [],
      totalPrice:'0',
      BaggageAllowanceFirst:'0',
      BaggageAllowanceBusiness:'0',
      BaggageAllowanceEconomy:'0',
      BaggageAllowanceBusiness:'0',
      TotalBaggageAlowance:'0',
      NumberOfChildren:'0'
  
        
    });


    



    const bookSeats =async () =>{
      setLoading(true);

      
        if(flight1.FirstSeatsNumbers.length==flight1.FirstNumberOfSeats && flight1.BusinessSeatsNumbers.length==flight1.BusinessNumberOfSeats && flight1.EconomySeatsNumbers.length==flight1.EconomyNumberOfSeats){

            setLoading(false);
            confirmAlert({
            title: 'confirm to Book',
            message: 'Are you Sure to book these tickts ?',
            buttons: [
              {
                label: 'Yes',
                onClick: () =>  bookSeatsCon()
              },
              {
                label: 'No',
              }
            ]
          });
        }
        else{
          setLoading(false);
          confirmAlert({
            title: 'Error',
            message: 'Invalid seats Numbers',
            buttons: [
              {
                label: 'ok',

              }
            ]
          });
 
      }
      

    
    }

    const bookSeatsCon =async () =>{
      setLoading(true);
 
     
            //Authorization: `Bearer ${userInfo.token}`
            sessionStorage.setItem('bookFlights',JSON.stringify({'flight1':flight1}));
            const paymentInfo =[{"s":"First Class  seats ","n":f1},{"s":"Business seats ","n":b1}, {"s":"Economy  seats ","n":e1},{"s":"Total Depature Flight","n":f1+b1+e1}];
             sessionStorage.setItem('payment',JSON.stringify(paymentInfo));
             sessionStorage.setItem('amount',JSON.stringify(f1+b1+e1));
             history.push("/payment")

   }
   const handleChange = (event,x,y) => {
       console.log(x+"  "+y);
    const {
      target: { value },
    } = event;

    return typeof value === 'string' ? (value.split(',').length>y?x: value.split(',')): (value.length>y?x:value)

  };


  return (
  

    
      <>
      {loadingEffect && <Loading />}

       {loading && <Loading />}
     <div style={{width: '700px',float:'right'}}>
     
     <div style={{width: '700px',float:'right'}}>
     <Card style={{width: '700px',float:'right'}}  sx={{ m: 3 }}>
       <h3>Mafya Air Ticket</h3>
         <CardContent>

             
<TableContainer component={Paper} style={{ width: '650px' ,float:'left' }} sx={{ m: 0.5}}>
      <Table  style={{ width: '650px' ,float:'left'}} aria-label="simple table">
        <TableHead >
              <TableRow>
          <TableCell align="left" >Flight_No &nbsp;&nbsp;&nbsp;&nbsp; {flight1.Flight_No}</TableCell>
              </TableRow>
              <TableRow>
          <TableCell align="left" >Total Price &nbsp;&nbsp;&nbsp;&nbsp; {flight1.TotalPrice} $</TableCell>
          <TableCell align="left" > Total Baggage Alowance &nbsp;&nbsp;&nbsp;&nbsp; {flight1.TotalBaggageAlowance}</TableCell>
              </TableRow>
              <TableRow>
          <TableCell >From &nbsp;&nbsp;&nbsp;&nbsp; {flight1.From}</TableCell>
          <TableCell >To  &nbsp;&nbsp;&nbsp;&nbsp;{flight1.To}</TableCell>
              </TableRow>
              <TableRow>

                
              
          <TableCell >Departure Time &nbsp;&nbsp;&nbsp;&nbsp; {departureHour(flight1.DateD)}</TableCell>
          <TableCell align="left" >Arrival Time &nbsp;&nbsp;&nbsp;&nbsp;{ departureHour(flight1.DateA)}</TableCell>
          
          </TableRow>


              <TableRow>
              <TableCell >Departure Day &nbsp;&nbsp;&nbsp;&nbsp; {departureDay(flight1.DateD)}</TableCell>
          <TableCell align="left" >Arrival Day &nbsp;&nbsp;&nbsp;&nbsp;{departureDay(flight1.DateA)}</TableCell>
          <TableCell align="right" ></TableCell>
              </TableRow>
          <TableRow>
          <TableCell> 
            <h5>First Class Seats Number</h5>
          </TableCell>
          <TableCell> 
          <div>
     
      <FormControl sx={{  width: 240 }}>
     
          <InputLabel id="demo-multiple-name-label">Select Seats</InputLabel>
          <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={flight1.FirstSeatsNumbers}
          onChange={(event) =>{setFlight1({...flight1, FirstSeatsNumbers:handleChange(event,flight1.FirstSeatsNumbers,flight1.FirstNumberOfSeats)})}}
          input={<OutlinedInput label="Select Seats" />}
          MenuProps={MenuProps}
          
        >
          {DseatsF.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, flight1.FirstSeatsNumbers, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select> 
        </FormControl>
    </div>
        </TableCell>
          </TableRow>
          <TableRow>
          <TableCell> 
            <h5>Business Seats Number</h5>
          </TableCell>
          <TableCell> 
          <div>
     
      <FormControl sx={{  width: 240 }}>
     
          <InputLabel id="demo-multiple-name-label">Select Seats</InputLabel>
          <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={flight1.BusinessSeatsNumbers}
          onChange={(event) =>{setFlight1({...flight1, BusinessSeatsNumbers:handleChange(event,flight1.BusinessSeatsNumbers,flight1.BusinessNumberOfSeats)})}}
          input={<OutlinedInput label="Select Seats" />}
          MenuProps={MenuProps}
          
        >
          {DseatsB.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, flight1.FirstSeatsNumbers, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select> 
        </FormControl>
    </div>
        </TableCell>
          </TableRow>
          <TableRow>
          <TableCell> 
            <h5>Economy Seats Number</h5>
          </TableCell>
          <TableCell> 
          <div>
     
      <FormControl sx={{  width: 240 }}>
     
          <InputLabel id="demo-multiple-name-label">Select Seats</InputLabel>
          <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={flight1.EconomySeatsNumbers}
          onChange={(event) =>{setFlight1({...flight1, EconomySeatsNumbers:handleChange(event,flight1.EconomySeatsNumbers,flight1.EconomyNumberOfSeats)})}}
          input={<OutlinedInput label="Select Seats" />}
          MenuProps={MenuProps}
          
        >
          {DseatsE.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, flight1.FirstSeatsNumbers, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select> 
        </FormControl>
    </div>
        </TableCell>
          </TableRow>
          </TableHead>
              </Table>
              </TableContainer>  

            
                     
         </CardContent>
     </Card>

     </div>


     <Button variant="contained" style={{ width: '300px', left:'160px'}} sx={{ m: 0.5 }} onClick={bookSeats}>Book</Button>
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
  
    return new Date(sYear,sMonth,sDay,sHour,sMinute ,0);
  }
 
  function departureHour(dateVal) {
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
  
    return   sHour + ":" + sMinute + " " + sAMPM;
  }
  function departureDay(dateVal) {
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
  
    return   sMonth + "/" + sDay + "/" + sYear
  }  
  
  function padValue(value) {
    return (value < 10) ? "0" + value : value;
  }

