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
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import MainScreen from "../../components/MainScreen";
import Loading from "../../components/Loading";

export default function BasicTable({ history }) {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const [loading, setLoading] = useState(false);
  const [loadingEffect, setLoadingEffect] = useState(false);
  const deleteconf = (id) => {
    confirmAlert({
      title: "Confirm to cancel",
      message: "Are you sure to cancel this ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteFlight(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const [flights, setFlight] = useState([]);

  const deleteFlight = (id) => {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .delete(`http://localhost:8000/flights/cancelBooking/${id}`, config)
      .then(() => {
        setLoading(false);
        window.location.reload(false);
      });
  };

  useEffect(() => {
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
          //setLoadingEffect(false);
          setFlight(res.data);
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

  const editS=(Id,From,To,DateD, FirstNumberOfSeats,BusinessNumberOfSeats,EconomyNumberOfSeats,children)=>{
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

  return (
    <div className="flightsContainer">
      {loadingEffect && <Loading />}
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
             
             <Button className="editButton" aria-label="edit" size="small" onClick={()=>editS(flight._id,flight.From,flight.To,flight.DateD,flight.FirstNumberOfSeats,
                            flight.BusinessNumberOfSeats,flight.EconomyNumberOfSeats,flight.NumberOfChildren)}>
                <EditIcon fontSize="small" />
            </Button>   
            
          </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {loading && <Loading />}
    </div>
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
