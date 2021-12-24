import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Component, useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DateAdapter from "@mui/lab/AdapterDateFns";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "react-bootstrap";
import DateFnsUtils from "@date-io/date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";


import { color, height } from "@mui/system";

import * as location from "../../1055-world-locations.json";
import * as success from "../../1127-success.json";
import Lottie from "react-lottie";


const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};




export default function BasicTable({history}) {




  

  const[firstId,setFirstId]=useState("");
  //const[secondId,setSecondId]=useState("");
  const[flights,setFlight]=useState([]);
 // const[flights2,setFlight2]=useState([]);

 


  const color1=(id)=>{
  if(firstId==id)
      return '#C0C0C0'

  }








  useEffect(() => {
    setProcessing(true);

    if(JSON.parse(sessionStorage.getItem("changeDpFlight"))){
      
      const flightSearch1 ={
        From:JSON.parse(sessionStorage.getItem("changeDpFlight")).From,
        To:JSON.parse(sessionStorage.getItem("changeDpFlight")).To,
        DateD:JSON.parse(sessionStorage.getItem("changeDpFlight")).DateD,
        DateA:'',
        FirstSeats:JSON.parse(sessionStorage.getItem("changeDpFlight")).FirstSeats,
        BusinessSeats:JSON.parse(sessionStorage.getItem("changeDpFlight")).BusinessSeats,
        EconomySeats:JSON.parse(sessionStorage.getItem("changeDpFlight")).EconomySeats
      }
      axios.post('http://localhost:8000/flights/getBookingFlights',flightSearch1).then((res)=>{
        setFlight(res.data)
        setTimeout(() => {
          setProcessing(false);
        }, 2000);
      })

    }
      else{
          history.push("/homePage")
    }

   

  },[]);

  const book=()=>{
    if(firstId==""){
      setErrorMessage('You have to choose a flights')
    }
    else{
    sessionStorage.setItem('flightsBook',JSON.stringify({'firstId':firstId}));
    history.push('/bookDp')
    }
  
    }

    const [processing, setProcessing] = useState(false);
    const [errorMessage,setErrorMessage] = useState();

  return (
      <>
      {!processing ?(
               <div className="flightsContainer">
               <link rel="preconnect" href="https://fonts.googleapis.com" />
               <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
               <link
                 href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap"
                 rel="stylesheet"
               />
         
                  <div className="flightSubContainer">
         
         
         
          
                <div style={{ margin: "50px" }}>
            
                <TableContainer
                   style={{ width: "740px", borderRadius: "0" }}
                   component={Paper}
                 >
                 <Table
                     style={{ width: "740px", borderRadius: "0" }}
                     aria-label="simple table"
                   >
                 <TableHead
                       style={{
                         backgroundColor: "#3c5977",
                         color: "white",
                         borderRadius: "0",
                       }}
                     >
         
                   <TableRow style={{ borderRadius: "0" }}>
                     <TableCell className="FlightCell" align="center" >From</TableCell>
                     <TableCell className="FlightCell" align="center">To</TableCell>
                     <TableCell className="FlightCell" align="center">Departure Date</TableCell>
                     <TableCell className="FlightCell" align="center">Arrival Date</TableCell>
                     <TableCell className="FlightCell" align="center">First $ </TableCell>
                     <TableCell className="FlightCell" align="center">Economy $</TableCell>
                     <TableCell className="FlightCell" align="center">Business $</TableCell>
                     <TableCell className="FlightCell" align="center">Edit</TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {flights.map((flight,key) => (
                     <TableRow
                       key={flight._id}
                       style={{ backgroundColor:color1(flight._id)}}
                     >
         
                       <TableCell align="center" className="FlightSubCell">{flight.From}</TableCell>
                       <TableCell align="center" className="FlightSubCell">{flight.To}</TableCell>
         
                       <TableCell align="center" className="FlightSubCell">{formatDate(flight.DateD)}</TableCell>
                       <TableCell align="center" className="FlightSubCell">{formatDate(flight.DateA)}</TableCell>
         
                       <TableCell align="center" className="FlightSubCell">{flight.FirstPrice}$</TableCell>
                       <TableCell align="center" className="FlightSubCell">{flight.BusinessPrice}$</TableCell>
                       <TableCell align="center" className="FlightSubCell">{flight.EconomyPrice}$</TableCell>
                       
         
                       <TableCell align="center" className="FlightSubCell">
                       
           
                       <Button  className="editButton"
                                 aria-label="edit"
                                 size="small"  onClick={()=> setFirstId(flight._id)}>
                             <EditIcon fontSize="small" />
                       </Button>   
                       
                      
                      
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
         
             </TableContainer>
         
         
             <div className="form-group">
             
             <h4 style={{color:"red",textAlign:'center',marginTop: "20px"}}>{errorMessage}</h4>
             <Button
                   className="loginbutton"
                   style={{ marginLeft: "36%"}}
                   onClick={()=> book()}
                 >
                   Book
                 </Button>
                 </div>
             </div>
             </div>
                </div>
      ):(<></>)}

<>
        {processing ? (
            <div style={{width:"1519px",height:"690px",backgroundColor:"#282c34",opacity:"1",position:'absolute',top:"50px",paddingTop:"20%",}}>
                <Lottie options={defaultOptions1} height={200} width={200} />
           
              </div>
          ) : (
    <></>
          )}
    </>


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