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

import MainScreen from "../../components/MainScreen";

import * as location from "../../1055-world-locations.json";
import * as success from "../../1127-success.json";
import * as fail from "../../56947-icon-failed.json";
import Lottie from "react-lottie";


const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions3 = {
  loop: true,
  autoplay: true,
  animationData: fail.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const colorG = "#3ABC5E";
const colorR = "#B2243C";

export default function BasicTable({ history }) {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const [idDel,setIdDel] = useState(); 
const [flights, setFlight] = useState([]);
  const deleteconf = (id) => {
    setIdDel(id);
    setProcessing(false);
    setloading(false);
    setConfirm(true);
  };




  const deleteFlight = () => {
    const id = idDel;
    setloading(true);
    setConfirm(false);
    setOption(defaultOptions1);
 
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .delete(`http://localhost:8000/flights/cancelBooking/${id}`, config)
      .then(() => {
        setOption(defaultOptions2);
        setMessage("Your Flights has been cancelled successfully");
        setmessageColor(colorG);
        setTimeout(() => {
          setloading(false);
          setOption(defaultOptions1);
          setMessage(null);
          window.location.reload(false);
        }, 3000);
      }).
      catch(err=>{
        setOption(defaultOptions3);
        setMessage("Error , please try again later");
        setmessageColor(colorR);
        setTimeout(() => {
          setloading(false);
          setOption(defaultOptions1);
          setMessage(null);
          
        }, 3000);

      })
  };

  useEffect(() => {
    setProcessing(true);
    if (!userInfo) {
      history.push("/homepage");
    } else {
      
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      axios
        .get(
          `http://localhost:8000/flights/getBookings/${userInfo._id}`,
          config
        )
        .then((res) => {
         
          setFlight(res.data);
          setTimeout(() => {
             setProcessing(false);
          }, 1500);
        });
    }
  }, []);
  const comb = (arr) => {
    var s = "";
    for (let i = 0; i < arr.length; i++) {
      s += arr[i] + " , ";
    }
    return s;
  };
  const editF=(Id,From,To,DateD, FirstNumberOfSeats,BusinessNumberOfSeats,EconomyNumberOfSeats,children)=>{
    var x ={
      
    Id:Id,
    From:From,
    To:To,
    DateD:DateD,
    FirstNumberOfSeats:FirstNumberOfSeats,
    BusinessNumberOfSeats:BusinessNumberOfSeats,
    EconomyNumberOfSeats:EconomyNumberOfSeats,
    children:children
  };
    sessionStorage.setItem('editFlightsClient',JSON.stringify(x));
    history.push("/searchNewFlight");

  }

  const editS=(flight)=>{
    sessionStorage.setItem('editSeats',JSON.stringify(flight));
    history.push("/editFlightSeats");

  }

  const [processing, setProcessing] = useState(false);

  const [loading, setloading] = useState(false);

  const [confirm,setConfirm] = useState(false);

  const [option,setOption]= useState(defaultOptions1);
  const [message,setMessage]= useState("");
  const [messageColor,setmessageColor]=useState("#3ABC5E");


  return (
    <>
    {!processing ?(    <div className="flightsContainer">

<div className="flightSubContainer">
  <TableContainer component={Paper} sx={{ width: 1300 }}>
    <Table aria-label="simple table" sx={{ width: 1300 }}>
      <TableHead>
        <TableRow style={{ backgroundColor: "#3c5977", color: "white" }}>
          <TableCell style={{ color: "white" }} align="center">
            Flight_No
          </TableCell>

          <TableCell style={{ color: "white" }} align="center">
            From
          </TableCell>
          <TableCell style={{ color: "white" }} align="center">
            To
          </TableCell>

          <TableCell style={{ color: "white" }} align="center">
            Departure Date
          </TableCell>
          <TableCell style={{ color: "white" }} align="center">
            Arrival Date
          </TableCell>

          <TableCell
            style={{ color: "white" }}
            sx={{ width: 200 }}
            align="center"
          >
            First Seats Numbers{" "}
          </TableCell>
          <TableCell
            style={{ color: "white" }}
            sx={{ width: 200 }}
            align="center"
          >
            Business Seats Numbers
          </TableCell>
          <TableCell
            style={{ color: "white" }}
            sx={{ width: 200 }}
            align="center"
          >
            Economy Seats Numbers
          </TableCell>

          <TableCell style={{ color: "white" }} align="center">
            Number of children
          </TableCell>
          <TableCell style={{ color: "white" }} align="center">
            Total Price
          </TableCell>
          <TableCell style={{ color: "white" }} align="center">
            Total baggage alowance
          </TableCell>

          <TableCell style={{ color: "white" }} align="center">
            Cancel
          </TableCell>
          <TableCell style={{color:'white'}} align="right">Change my Flight</TableCell>
          <TableCell style={{color:'white'}} align="right">Change Seats Numbers</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {flights.map((flight, key) => (
          <TableRow key={flight._id}>
            <TableCell align="center">{flight.Flight_No}</TableCell>

            <TableCell align="center">{flight.From}</TableCell>
            <TableCell align="center">{flight.To}</TableCell>

            <TableCell align="center">
              {formatDate(flight.DateD)}
            </TableCell>
            <TableCell align="center">
              {formatDate(flight.DateA)}
            </TableCell>

            <TableCell align="center">
              {comb(flight.FirstSeatsNumbers)}
            </TableCell>

            <TableCell align="center">
              {comb(flight.BusinessSeatsNumbers)}
            </TableCell>

            <TableCell align="center">
              {comb(flight.EconomySeatsNumbers)}
            </TableCell>

            <TableCell align="center">
              {flight.NumberOfChildren}
            </TableCell>
            <TableCell align="center">{flight.TotalPrice}</TableCell>
            <TableCell align="center">
              {flight.TotalBaggageAlowance}
            </TableCell>

            <TableCell align="center">
              <Button
                aria-label="delete"
                size="small"
                className="editButton"
                onClick={() => deleteconf(flight._id)}
              >
                <DeleteIcon fontSize="small" />
              </Button>
            </TableCell>

            <TableCell align="right">
       
          <Button className="editButton" aria-label="edit" size="small" onClick={()=>editF(flight._id,flight.From,flight.To,flight.DateD,flight.FirstNumberOfSeats,
                         flight.BusinessNumberOfSeats,flight.EconomyNumberOfSeats,flight.NumberOfChildren)}>
             <EditIcon fontSize="small" />
         </Button>   
         
       </TableCell>

       <TableCell align="right">
       
       <Button className="editButton" aria-label="edit" size="small" onClick={()=>editS(flight)}>
          <EditIcon fontSize="small" />
      </Button>   
      
    </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</div>
</div>):(<></>)}



    <>
    <>
    {processing ? (
      <>
        <div style={{width:"1519px",height:"690px",backgroundColor:"#282c34",opacity:"1",position:'absolute',top:"50px",paddingTop:"20%",}}>
        </div>
        <div  style={{width:"1519px",height:"690px",position:'absolute',top:"50px",paddingTop:"17%",}} >
            <Lottie options={defaultOptions1} height={200} width={200} />
            
        </div>
          </>
      ) : (<></>
      )}
    </>

    <>
    {loading ? (
      <>
        <div style={{width:"1519px",height:"690px",backgroundColor:"#282c34",opacity:"0.8",position:'absolute',top:"50px",paddingTop:"20%",}}>
        </div>
        <div  style={{width:"1519px",height:"690px",position:'absolute',top:"50px",paddingTop:"17%",}} >
            <Lottie options={option} height={200} width={200} />
            
            <h2 style={{color:messageColor,left :"670px" ,textAlign:'center'}}>{message}</h2>
            
        </div>
          </>
      ) : (<></>
      )}
    </>

    <>
    {confirm ? (
      <>
        <div style={{width:"1519px",height:"690px",backgroundColor:"#282c34",opacity:"0.8",position:'absolute',top:"50px",paddingTop:"20%",}}>
        </div>
        <div  style={{width:"1519px",height:"690px",position:'absolute',top:"50px",paddingTop:"20%",}} >
            
            <h2 style={{color:"white",left :"670px" ,textAlign:'center'}}>Are you sure to cancel this Flight</h2>
            <Button className="loginbutton" style={{ marginTop: "30px",left :"580px",position:'absolute',width:"60px",height:"40px"}} onClick={deleteFlight}>Yes</Button>
            <Button className="loginbutton" style={{ marginTop: "30px",left :"660px",position:'absolute',width:"60px",height:"40px"}} onClick={()=>setConfirm(false)}>No</Button>
            
        </div>
          </>
      ) : (<></>
      )}
    </>
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
  } else if (iHourCheck === 0) {
    sHour = "12";
  }

  sHour = padValue(sHour);

  return (
    sMonth +
    "/" +
    sDay +
    "/" +
    sYear +
    " " +
    sHour +
    ":" +
    sMinute +
    " " +
    sAMPM
  );
}

function padValue(value) {
  return value < 10 ? "0" + value : value;
}
