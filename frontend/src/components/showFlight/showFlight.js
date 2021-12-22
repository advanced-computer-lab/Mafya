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
import Loading from "../../components/Loading";
import "./showFlight.css";
export default function BasicTable({ history }) {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const [loading, setLoading] = useState(false);
  const [loadingEffect, setLoadingEffect] = useState(false);

  const deleteconf = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this Flight",
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
      .delete(`http://localhost:8000/flights/deleteFlights/${id}`, config)
      .then(() => {
        setLoading(false);
        window.location.reload(false);
      });
  };

  useEffect(() => {
    if (
      !userInfo ||
      !userInfo.isAdmin ||
      !sessionStorage.getItem("adminSearch")
    ) {
      setLoadingEffect(false);
      history.push("/homepage");
    } else {
      setFlightSearch(JSON.parse(sessionStorage.getItem("adminSearch")));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      axios
        .post("http://localhost:8000/flights/getFlights", flightSearch, config)
        .then((res) => {
          setLoadingEffect(false);
          setFlight(res.data);
        });
    }
  }, []);

  const [flightSearch, setFlightSearch] = useState({
    Flight_No: "",
    From: "",
    To: "",
    DateD: "",
    DateA: "",
    FirstSeats: "",
    BusinessSeats: "",
    EconomySeats: "",
    ReservedFirstSeats: "",
    ReservedBusinessSeats: "",
    ReservedEconomySeats: "",
    FirstPrice: "",
    BusinessPrice: "",
    EconomyPrice: "",
  });

  return (
    <div className="flightsContainer" style={{ display: "flex" }}>
      {loadingEffect && <Loading />}
      <div style={{ position: "absolute", top: "150px" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ borderRadius: "0" }}>
              <TableRow
                style={{
                  backgroundColor: "#3c5977",
                  color: "white",
                  width: "1500px",
                }}
              >
                <TableCell className="FlightCell" align="center">
                  Flight_No
                </TableCell>

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
                  First_Seats
                </TableCell>
                <TableCell className="FlightCell" align="center">
                  Reseved First Seats
                </TableCell>
                <TableCell className="FlightCell" align="center">
                  First Price
                </TableCell>

                <TableCell className="FlightCell" align="center">
                  Business Seats
                </TableCell>
                <TableCell className="FlightCell" align="center">
                  Reseved Business Seats
                </TableCell>
                <TableCell className="FlightCell" align="center">
                  Business Price
                </TableCell>

                <TableCell className="FlightCell" align="center">
                  Economy Seats
                </TableCell>
                <TableCell className="FlightCell" align="center">
                  Reseved Economy Seats
                </TableCell>
                <TableCell className="FlightCell" align="center">
                  Economy Price
                </TableCell>

                <TableCell className="FlightCell" align="center">
                  Delete / Edit
                </TableCell>
                {/* <TableCell className="FlightCell" align="center">
                  Edit
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {flights.map((flight, key) => (
                <TableRow key={flight._id}>
                  <TableCell className="FlightSubCell" align="center">
                    {flight.Flight_No}
                  </TableCell>

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
                    {flight.FirstSeats}
                  </TableCell>
                  <TableCell className="FlightSubCell" align="center">
                    {flight.ReservedFirstSeats}
                  </TableCell>
                  <TableCell className="FlightSubCell" align="center">
                    {flight.FirstPrice}
                  </TableCell>

                  <TableCell className="FlightSubCell" align="center">
                    {flight.BusinessSeats}
                  </TableCell>
                  <TableCell className="FlightSubCell" align="center">
                    {flight.ReservedBusinessSeats}
                  </TableCell>
                  <TableCell className="FlightSubCell" align="center">
                    {flight.BusinessPrice}
                  </TableCell>

                  <TableCell className="FlightSubCell" align="center">
                    {flight.EconomySeats}
                  </TableCell>
                  <TableCell className="FlightSubCell" align="center">
                    {flight.ReservedEconomySeats}
                  </TableCell>
                  <TableCell className="FlightSubCell" align="center">
                    {flight.EconomyPrice}
                  </TableCell>

                  <TableCell className="FlightSubCell" align="center">
                    <Button
                      className="editButton"
                      aria-label="delete"
                      size="small"
                      onClick={() => deleteconf(flight._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </Button>
                    <Link to={`/updateFlight/${flight._id}`}>
                      <Button
                        className="editButton"
                        aria-label="edit"
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </Button>
                    </Link>
                  </TableCell>
                  {/* <TableCell className="FlightSubCell" align="center">
                    <Link to={`/updateFlight/${flight._id}`}>
                      <Button
                        className="editButton"
                        aria-label="edit"
                        size="small"
                      >
                        <EditIcon fontSize="small" />
                      </Button>
                    </Link>
                  </TableCell> */}
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
