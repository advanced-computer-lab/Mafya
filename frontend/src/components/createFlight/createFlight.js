import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "react-bootstrap";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import DateFnsUtils from "@date-io/date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterDateFns";
import axios from "axios";
import DateTimePicker from "@mui/lab/DateTimePicker";

import Stack from "@mui/material/Stack";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import DesktopDateTimePicker from "@mui/lab/DesktopDateTimePicker";
//import Airports from '/airports.js'
import Autocomplete from "@mui/material/Autocomplete";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import MainScreen from "../../components/MainScreen";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Loading from "../../components/Loading";
import "./createFlight.css";
export default function CreateFlight({ history }) {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const [loading, setLoading] = useState(false);
  const [loadingEffect, setLoadingEffect] = useState(false);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/homepage");
    }
  });

  const [flight, setFlight] = useState({
    Flight_No: "",
    From: "",
    To: "",
    DateD: "",
    DateA: "",
    FirstSeats: "",
    BusinessSeats: "",
    EconomySeats: "",
    FirstPrice: "",
    BusinessPrice: "",
    EconomyPrice: "",
    BaggageAllowanceFirst: "",
    BaggageAllowanceBusiness: "",
    BaggageAllowanceEconomy: "",
  });

  const createFlight = () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .post("http://localhost:8000/flights/createFlights", flight, config)
      .then((res) => {
        setLoading(false);
        confirmAlert({
          title: "messege",
          message: res.data,
          buttons: [
            {
              label: "ok",
            },
          ],
        });
      });
  };

  return (
    <div className="inquiryMain">
      <div className="reservationContainer">
        <TableContainer
          className="searchSubContainer"
          sx={{ borderRadius: "0" }}
          component={Paper}
        >
          <h3
            className="heading"
            style={{ paddingLeft: "13px", color: "#3c5977" }}
          >
            Create A Flight
          </h3>
          <Table sx={{ width: "85ch" }} aria-label="simple table">
            <TableRow></TableRow>
            <TableRow>
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                variant="filled"
                label="Flight_No"
                sx={{ m: 1, width: "82.5ch" }}
                type="number"
                value={flight.Flight_No}
                onChange={(event) => {
                  setFlight({ ...flight, Flight_No: event.target.value });
                }}
              />
            </TableRow>

            <TableRow>
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="From"
                variant="filled"
                sx={{ m: 1, width: "40ch" }}
                value={flight.From}
                onChange={(event) => {
                  setFlight({ ...flight, From: event.target.value });
                }}
              />

              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="To"
                variant="filled"
                sx={{ m: 1, width: "40ch" }}
                value={flight.To}
                onChange={(event) => {
                  setFlight({ ...flight, To: event.target.value });
                }}
              />
            </TableRow>

            <TableRow>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField
                      id="filled-basic"
                      InputLabelProps={{ className: "textfieldlabel" }}
                      InputProps={{ className: "textfieldinput" }}
                      label="Filled"
                      variant="filled"
                      {...props}
                      sx={{ m: 1, width: "40ch" }}
                    />
                  )}
                  label="Departure Date"
                  value={flight.DateD}
                  onChange={(newValue) => {
                    setFlight({ ...flight, DateD: newValue });
                  }}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField
                      id="filled-basic"
                      InputLabelProps={{ className: "textfieldlabel" }}
                      InputProps={{ className: "textfieldinput" }}
                      label="Filled"
                      variant="filled"
                      {...props}
                      sx={{ m: 1, width: "40ch" }}
                    />
                  )}
                  label="Arrival Date"
                  value={flight.DateA}
                  onChange={(newValue) => {
                    setFlight({ ...flight, DateA: newValue });
                  }}
                />
              </LocalizationProvider>
            </TableRow>

            <TableRow>
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Filled"
                variant="filled"
                label="First Seats"
                sx={{ m: 1, width: "26ch" }}
                value={flight.FirstSeats}
                type="Number"
                onChange={(event) => {
                  setFlight({ ...flight, FirstSeats: event.target.value });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                label="FirstPrice"
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                variant="filled"
                sx={{ m: 1, width: "26ch" }}
                value={flight.FirstPrice}
                type="Number"
                onChange={(event) => {
                  setFlight({ ...flight, FirstPrice: event.target.value });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Filled"
                variant="filled"
                label="Baggage allowance first"
                sx={{ m: 1, width: "26ch" }}
                value={flight.BaggageAllowanceFirst}
                type="Number"
                onChange={(event) => {
                  setFlight({
                    ...flight,
                    BaggageAllowanceFirst: event.target.value,
                  });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </TableRow>

            <TableRow>
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Filled"
                variant="filled"
                label="Business Seats"
                sx={{ m: 1, width: "26ch" }}
                value={flight.BusinessSeats}
                type="Number"
                onChange={(event) => {
                  setFlight({ ...flight, BusinessSeats: event.target.value });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />

              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Filled"
                variant="filled"
                label="BusinessPrice"
                sx={{ m: 1, width: "26ch" }}
                value={flight.BusinessPrice}
                type="Number"
                onChange={(event) => {
                  setFlight({ ...flight, BusinessPrice: event.target.value });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />

              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Filled"
                variant="filled"
                label="Baggage allowance business"
                sx={{ m: 1, width: "26ch" }}
                value={flight.BaggageAllowanceBusiness}
                type="Number"
                onChange={(event) => {
                  setFlight({
                    ...flight,
                    BaggageAllowanceBusiness: event.target.value,
                  });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </TableRow>

            <TableRow>
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Economy Seats"
                variant="filled"
                sx={{ m: 1, width: "26ch" }}
                value={flight.EconomySeats}
                type="Number"
                onChange={(event) => {
                  setFlight({ ...flight, EconomySeats: event.target.value });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />

              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Filled"
                variant="filled"
                label="EconomyPrice"
                sx={{ m: 1, width: "26ch" }}
                value={flight.EconomyPrice}
                type="Number"
                onChange={(event) => {
                  setFlight({ ...flight, EconomyPrice: event.target.value });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />

              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfieldlabel" }}
                InputProps={{ className: "textfieldinput" }}
                label="Filled"
                variant="filled"
                label="Baggage allowance economy"
                sx={{ m: 1, width: "26ch" }}
                value={flight.BaggageAllowanceEconomy}
                type="Number"
                onChange={(event) => {
                  setFlight({
                    ...flight,
                    BaggageAllowanceEconomy: event.target.value,
                  });
                }}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </TableRow>

            <TableRow>
              <Button
                className="createbutton"
                style={{ marginTop: "20px", marginLeft: "195px" }}
                onClick={createFlight}
              >
                Save
              </Button>
              {loading && <Loading />}
            </TableRow>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
