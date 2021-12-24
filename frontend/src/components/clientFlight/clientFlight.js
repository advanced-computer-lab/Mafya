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
import * as UnSearch from "../../86046-no-search-item-available.json";
import Lottie from "react-lottie";


const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const defaultOptions4 = {
  loop: true,
  autoplay: true,
  animationData: UnSearch.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}


export default function BasicTable({ history }) {


  const [firstId, setFirstId] = useState("");
  const [secondId, setSecondId] = useState("");
  const [flights, setFlight] = useState([]);
  const [flights2, setFlight2] = useState([]);


  const color1 = (id) => {
    if (firstId == id) return "#C0C0C0";
  };

  const color2 = (id) => {
    if (secondId == id) return "#C0C0C0";
  };

  useEffect(() => {
    let res1=null;
    let res2 =null;
    setProcessing(true);
    if (JSON.parse(sessionStorage.getItem("clientFlights"))) {
      const flightSearch1 = {
        From: JSON.parse(sessionStorage.getItem("clientFlights")).From,
        To: JSON.parse(sessionStorage.getItem("clientFlights")).To,
        DateD: JSON.parse(sessionStorage.getItem("clientFlights")).DateD,
        DateA: "",
        FirstSeats: JSON.parse(sessionStorage.getItem("clientFlights"))
          .FirstNumberOfSeats1,
        BusinessSeats: JSON.parse(sessionStorage.getItem("clientFlights"))
          .BusinessNumberOfSeats1,
        EconomySeats: JSON.parse(sessionStorage.getItem("clientFlights"))
          .EconomyNumberOfSeats1,
      };
      axios
        .post("http://localhost:8000/flights/getBookingFlights", flightSearch1)
        .then((res1) => {
          setFlight(res1.data);
      


    if (JSON.parse(sessionStorage.getItem("clientFlights"))) {
      const flightSearch2 = {
        From: JSON.parse(sessionStorage.getItem("clientFlights")).To,
        To: JSON.parse(sessionStorage.getItem("clientFlights")).From,
        DateD: JSON.parse(sessionStorage.getItem("clientFlights")).DateA,
        DateA: "",
        FirstSeats: JSON.parse(sessionStorage.getItem("clientFlights"))
          .FirstNumberOfSeats2,
        BusinessSeats: JSON.parse(sessionStorage.getItem("clientFlights"))
          .BusinessNumberOfSeats2,
        EconomySeats: JSON.parse(sessionStorage.getItem("clientFlights"))
          .EconomyNumberOfSeats2,
      };
      axios
        .post("http://localhost:8000/flights/getBookingFlights", flightSearch2)
        .then((res) => {
          setTimeout(() => {
            setFlight2(res.data);
            if(res.data.length==0||res1.data.length==0){
              setSearchMessage("unavailable Flights for this search criteria")
              setOption(defaultOptions4);
              setTimeout(() => {
                setProcessing(false);
                history.goBack();
              }, 3000);

            }
            else{
              setTimeout(() => {
                setProcessing(false);
              }, 1500);
            }

            
          }, 100);

        });
    }
  });
} 


  }, []);

  const book = () => {
    if (firstId == "" || secondId == "") {
      setErrorMessage("You have to choose two flights");
    } else {
      sessionStorage.setItem(
        "flightsBook",
        JSON.stringify({ firstId: firstId, secondId: secondId })
      );
      history.push("/book");
    }
  };
  const [processing, setProcessing] = useState(false);
  const [errorMessage,setErrorMessage] = useState();

  const [option,setOption]= useState(defaultOptions1);
  const [SearchMessage,setSearchMessage]=useState();

  return (
    <>
        <div>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap"
        rel="stylesheet"
      />
    
    {!processing ?(   
      <div className="flightsContainer">   
       <div className="progresss">
        <button className="progressButtonn"  onClick={()=>history.push("/search")} >Search</button>
        <div className="progressbarr1"></div>
        <button disabled className="progressButtonn1">Flights</button>
        <div className="progressbarr2"></div>
        <button disabled className="progressButtonn2">seats</button>
        <div className="progressbarr3"></div>
        <button disabled className="progressButtonn3">Payment</button>
      </div>


      <div style={{ margin: "50px" }}>
        <Table
          style={{ width: "1500px", position: "relative", borderRadius: "0" }}
          aria-label="simple table"
        >
          <TableRow>
            <TableContainer
              style={{ width: "740px", float: "left", borderRadius: "0" }}
              component={Paper}
            >
              <Table style={{ width: "740px" }} aria-label="simple table">
                <TableHead
                  style={{ backgroundColor: "#3c5977", color: "white" }}
                >
                  <TableRow>
                    <TableCell className="FlightCell" align="center">
                      From
                    </TableCell>
                    <TableCell className="FlightCell" align="center">
                      To
                    </TableCell>
                    <TableCell className="FlightCell" align="center">
                      Departure Date
                    </TableCell>
                    <TableCell className="FlightCell" align="center">
                      Arrival Date
                    </TableCell>
                    <TableCell className="FlightCell" align="center">
                      First ${" "}
                    </TableCell>
                    <TableCell className="FlightCell" align="center">
                      Economy $
                    </TableCell>
                    <TableCell className="FlightCell" align="center">
                      Business $
                    </TableCell>
                    <TableCell className="FlightCell" align="center">
                      Edit
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flights.map((flight, key) => (
                    <TableRow
                      key={flight._id}
                      style={{ backgroundColor: color1(flight._id) }}
                    >
                      <TableCell className="FlightSubCell" align="center">
                        {flight.From}
                      </TableCell>
                      <TableCell className="FlightSubCell" align="center">
                        {flight.To}
                      </TableCell>

                      <TableCell className="FlightSubCell" align="center">
                        {formatDate(flight.DateD)}
                      </TableCell>
                      <TableCell className="FlightSubCell" align="center">
                        {formatDate(flight.DateA)}
                      </TableCell>

                      <TableCell className="FlightSubCell" align="center">
                        {flight.FirstPrice}$
                      </TableCell>
                      <TableCell className="FlightSubCell" align="center">
                        {flight.BusinessPrice}$
                      </TableCell>
                      <TableCell className="FlightSubCell" align="center">
                        {flight.EconomyPrice}$
                      </TableCell>

                      <TableCell className="FlightSubCell" align="center">
                        <Button
                          aria-label="edit"
                          size="small"
                          onClick={() => setFirstId(flight._id)}
                          className="editButton"
                        >
                          <EditIcon fontSize="small" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TableContainer
              style={{ width: "740px", float: "right", borderRadius: "0" }}
              component={Paper}
            >
              <Table style={{ width: "740px" }} aria-label="simple table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#3c5977" }}>
                    <TableCell className="FlightCell" align="center">
                      From
                    </TableCell>
                    <TableCell className="FlightCell" align="center">
                      To
                    </TableCell>
                    <TableCell className="FlightCell" align="center">
                      Departure Date
                    </TableCell>
                    <TableCell className="FlightCell" align="center">
                      Arrival Date
                    </TableCell>
                    <TableCell className="FlightCell" align="center">
                      First ${" "}
                    </TableCell>
                    <TableCell className="FlightCell" align="center">
                      Economy $
                    </TableCell>
                    <TableCell className="FlightCell" align="center">
                      Business $
                    </TableCell>
                    <TableCell className="FlightCell" align="center">
                      Edit
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flights2.map((flight, key) => (
                    <TableRow
                      key={flight._id}
                      style={{ backgroundColor: color2(flight._id) }}
                    >
                      <TableCell className="FlightSubCell" align="center">
                        {flight.From}
                      </TableCell>
                      <TableCell className="FlightSubCell" align="center">
                        {flight.To}
                      </TableCell>

                      <TableCell className="FlightSubCell" align="center">
                        {formatDate(flight.DateD)}
                      </TableCell>
                      <TableCell className="FlightSubCell" align="center">
                        {formatDate(flight.DateA)}
                      </TableCell>
                      <TableCell className="FlightSubCell" align="center">
                        {flight.FirstPrice}$
                      </TableCell>
                      <TableCell className="FlightSubCell" align="center">
                        {flight.BusinessPrice}$
                      </TableCell>
                      <TableCell className="FlightSubCell" align="center">
                        {flight.EconomyPrice}$
                      </TableCell>

                      <TableCell className="FlightSubCell" align="center">
                        <Button
                          aria-label="edit"
                          size="small"
                          onClick={() => setSecondId(flight._id)}
                          className="editButton"
                        >
                          <EditIcon fontSize="small" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TableRow>
        </Table>

        <h4 style={{color:"red",textAlign:'center',marginTop: "20px"}}>{errorMessage}</h4>
        <Button
          className="loginbutton"
          style={{ marginLeft: "43.5%" }}
          onClick={() => book()}
        >
          Book
        </Button>
      </div>
    </div>
    ):(<></>)}
    <>
        {processing ? (
            <div style={{width:"1519px",height:"690px",backgroundColor:"#282c34",opacity:"1",position:'absolute',top:"50px",paddingTop:"17%",}}>
                <Lottie options={option} height={200} width={200} />
                <h2 style={{color:"#034694",left :"670px" ,textAlign:'center'}}>{SearchMessage}</h2>
           
              </div>
          ) : (
    <></>
          )}
    </>
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
