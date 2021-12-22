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
import MainScreen from "../../components/MainScreen";
import StripeCheckout from "react-stripe-checkout";

//import TextField from '@material-ui/core/TextField';
//import createFlight from '../'
export default function CreateFlight({history}) {
    const [flight1,setFlight1]= useState({});
    const [flight2,setFlight2]= useState({});
    const [paymentInfo,setPaymentInfo]= useState([]);
    const [amountPay,setAmount]= useState(0);
    const [loading, setLoading]=useState(false);
    const [id,setId]=useState(null);
    const userInfo  = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
    useEffect(() => {
        
        setPaymentInfo(JSON.parse(sessionStorage.getItem("payment")))
        setAmount(JSON.parse(sessionStorage.getItem("amount")));
        setFlight1(JSON.parse(sessionStorage.getItem("bookFlights")).flight1)
        setFlight2(JSON.parse(sessionStorage.getItem("bookFlights")).flight2)
        const x = sessionStorage.getItem("editFlightsClient");
        if(x){
            setId(JSON.parse(sessionStorage.getItem("editFlightsClient")).Id);
        }


        
    },[])

    


    const makePayment = token => {
        const config = {
            headers:{
              "Content-type":"application/json",
              Authorization: `Bearer ${userInfo.token}`

            }
          }
        const body = {
          token
        };
        const headers = {
          "Content-Type": "application/json"
        };

        axios.post("http://localhost:8000/flights/payment",body,config) .then(response => {
              console.log("RESPONSE ", response);
              const { status } = response;
              bookSeatsCon();
              console.log("STATUS ", status);
            })
            .catch(error => console.log(error));

      };

      const bookSeatsCon =async () =>{
        setLoading(true);
   
          try{
              //Authorization: `Bearer ${userInfo.token}`
              const config = {
                headers:{
                  "Content-type":"application/json",
                  Authorization: `Bearer ${userInfo.token}`
    
                }
              }
              if(id){
                await axios.delete(`http://localhost:8000/flights/cancelBooking/${id}`,config);
              }
          
              const booking1 = await axios.post('http://localhost:8000/flights/book',flight1,config);
              if(typeof booking1 === 'string'){
                setLoading(false);
                confirmAlert({
                  title: 'Error',
                  message: booking1,
                  buttons: [
                    {
                      label: 'Ok',
                      onClick: () =>  history.push('/homepage')
                    }
                  ]
                });
                
              }
              else if(!id){
              const booking2 = await axios.post('http://localhost:8000/flights/book',flight2,config);
              if(typeof booking2 === 'string'){
  
                ////// remove booking1
                setLoading(false);
                confirmAlert({
                  title: 'Error',
                  message: booking2,
                  buttons: [
                    {
                      label: 'Ok',
                      onClick: () =>  history.push('/homepage')
                    }
                  ]
                });
                
              }
              else{
                setLoading(false);
                  confirmAlert({
                    title: '',
                    message: 'Your flights booked successfully' ,
                    buttons: [
                      {
                        label: 'Ok',
                        onClick: () =>  history.push('/homepage')
                      }
                    ]
                  });
                  
              
              }
              }
              else{
                setLoading(false);
                confirmAlert({
                  title: '',
                  message: 'Your flights booked successfully' ,
                  buttons: [
                    {
                      label: 'Ok',
                      onClick: () =>  history.push('/homepage')
                    }
                  ]
                });
              }
  
          
          }
          catch(error){
            setLoading(false);
            history.push('/homePage');
          }
  
  
     }


    return (
        
        <>
        <MainScreen title="Payment">

        {loading && <Loading />}
        <TableContainer component={Paper} sx={{m:4}} style={{ width: '500px' ,float:'left' }} sx={{ m: 0.5}}>
        <Table  style={{ width: '500px' ,float:'left'}} aria-label="simple table">
        <TableHead  >
            <h2>Payment  Info</h2>
            
        </TableHead >
        <TableBody>
        {paymentInfo.map((payment,key) => (
                    <TableRow>
                    <TableCell><h5>{payment.s}</h5></TableCell>
                    <TableCell><h5>{payment.n}</h5></TableCell>
                </TableRow>

        ))}
        
        
        <TableRow>
        <StripeCheckout
            stripeKey="pk_test_51K8TPLHG9DEEaFkHJfY1B91ETxQykw5Escd7jvXXrWB0iP17P0n9OPVdHcESNe9Mhf0jiLWYt88hB9qIhSSllYyR00R0wEHU43"
            token={makePayment}
            name="Pay for Mafya"
            amount={amountPay*100}
          >
            <Button variant="contained" style={{ width: '200px'}} sx={{ m: 0.5 }}> Pay </Button>
             
            
          </StripeCheckout>
        </TableRow>
        </TableBody>
        </Table>
        </TableContainer>
            
            
        </MainScreen>
       
        
        </>

    );










}