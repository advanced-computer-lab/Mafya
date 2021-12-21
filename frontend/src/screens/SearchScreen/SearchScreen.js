import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./SearchScreen.css";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DateFnsUtils from "@date-io/date-fns";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { width } from "@mui/system";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

function SearchScreen({ history }) {
  const [search, setSearch] = useState({
    From: "",
    To: "",
    DateD: "",
    DateA: "",
    FirstNumberOfSeats1: "0",
    BusinessNumberOfSeats1: "0",
    EconomyNumberOfSeats1: "0",
    FirstNumberOfSeats2: "0",
    BusinessNumberOfSeats2: "0",
    EconomyNumberOfSeats2: "0",
    children1: 0,
    children2: "0",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);


    if (
      formatDate(search.DateD).getDate() <=
        formatDate(search.DateA).getDate() &&
      formatDate(search.DateD).getDate() >= new Date().getDate()
    ) {
      if (
        search.FirstNumberOfSeats1 +
          search.BusinessNumberOfSeats1 +
          search.EconomyNumberOfSeats1 >
          0 &&
        search.FirstNumberOfSeats1 +
          search.BusinessNumberOfSeats1 +
          search.EconomyNumberOfSeats1 >
          search.children1 &&
        search.FirstNumberOfSeats2 +
          search.BusinessNumberOfSeats2 +
          search.EconomyNumberOfSeats2 >
          0 &&
        search.FirstNumberOfSeats2 +
          search.BusinessNumberOfSeats2 +
          search.EconomyNumberOfSeats2 >
          search.children2
      ) {
        setLoading(false);
        history.push("/show");
      } else {
        setLoading(false);
        confirmAlert({
          title: "Error",
          message: "invalid seats Number",
          buttons: [
            {
              label: "Ok",
            },
          ],
        });
      }
    } else {

  
    if(formatDate(search.DateD).getDate()<=formatDate(search.DateA).getDate()){
      if(search.FirstNumberOfSeats1+search.BusinessNumberOfSeats1+search.EconomyNumberOfSeats1>0&&search.FirstNumberOfSeats1+search.BusinessNumberOfSeats1+search.EconomyNumberOfSeats1>search.children1 &&
        search.FirstNumberOfSeats2+search.BusinessNumberOfSeats2+search.EconomyNumberOfSeats2>0&&search.FirstNumberOfSeats2+search.BusinessNumberOfSeats2+search.EconomyNumberOfSeats2>search.children2){
          setLoading(false);
          history.push('/show')
        }
        else{
          setLoading(false);
          confirmAlert({
            title: 'Error',
            message: "invalid seats Number",
            buttons: [
              {
                label: 'Ok',
              }
            ]
          });
        }
          
    }
    else{

      setLoading(false);
      confirmAlert({
        title: "Error",
        message: "invalid Dates",
        buttons: [
          {
            label: "Ok",
          },
        ],
      });
    }
  };

  return (
    <div className="inquiryMain" style={{ flexDirection: "column" }}>
      <div className="progress">
        <button className="progressButton">first stage</button>
        <div className="progressbar1"></div>
        <button className="progressButton1">second stage</button>
        <div className="progressbar2"></div>
        <button className="progressButton2">third stage</button>
      </div>
      <div className="reservationContainer">
        <div className="searchSubContainer">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <Form onSubmit={submitHandler}>
            <div
              className="form-group"
              style={{
                paddingTop: "0px",
              }}
            >
              <h3
                className="heading"
                style={{ paddingLeft: "10px", color: "#3c5977" }}
              >
                Make A Reservation
              </h3>
              <TextField
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                label="Filled"
                variant="filled"
                sx={{ m: 1, width: "60ch" }}
                required
                label="From"
                value={search.From}
                onChange={(event) => {
                  setSearch({ ...search, From: event.target.value });
                }}
              />
              <TextField
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                label="Filled"
                variant="filled"
                sx={{ m: 1, width: "60ch" }}
                required
                label="To"
                value={search.To}
                onChange={(event) => {
                  setSearch({ ...search, To: event.target.value });
                }}
              />
            </div>

            <div className="form-group">
              <TextField
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                label="Filled"
                variant="filled"
                sx={{ m: 1, width: "60ch" }}
                required
                label="First Number Of Seats "
                type="Number"
                value={search.FirstNumberOfSeats1}
                onChange={(event) => {
                  setSearch({
                    ...search,
                    FirstNumberOfSeats1: event.target.value,
                  });
                }}
              />
              <TextField
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                label="Filled"
                variant="filled"
                sx={{ m: 1, width: "60ch" }}
                required
                label="First Number Of Seats "
                type="Number"
                value={search.FirstNumberOfSeats2}
                onChange={(event) => {
                  setSearch({
                    ...search,
                    FirstNumberOfSeats2: event.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group">
              <TextField
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                label="Filled"
                variant="filled"
                sx={{ m: 1, width: "60ch" }}
                required
                label="Business Number Of Seats"
                type="Number"
                value={search.BusinessNumberOfSeats1}
                onChange={(event) => {
                  setSearch({
                    ...search,
                    BusinessNumberOfSeats1: event.target.value,
                  });
                }}
              />
              <TextField
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                label="Filled"
                variant="filled"
                sx={{ m: 1, width: "60ch" }}
                required
                label="Business Number Of Seats"
                type="Number"
                value={search.BusinessNumberOfSeats2}
                onChange={(event) => {
                  setSearch({
                    ...search,
                    BusinessNumberOfSeats2: event.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group">
              <TextField
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                label="Filled"
                variant="filled"
                sx={{ m: 1, width: "60ch" }}
                required
                label="Economy Number Of Seats"
                type="Number"
                value={search.EconomyNumberOfSeats1}
                onChange={(event) => {
                  setSearch({
                    ...search,
                    EconomyNumberOfSeats1: event.target.value,
                  });
                }}
              />
              <TextField
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                label="Filled"
                variant="filled"
                sx={{ m: 1, width: "60ch" }}
                required
                label="Economy Number Of Seats"
                type="Number"
                value={search.EconomyNumberOfSeats2}
                onChange={(event) => {
                  setSearch({
                    ...search,
                    EconomyNumberOfSeats2: event.target.value,
                  });
                }}
              />
            </div>

            <div className="form-group">
              <TextField
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                label="Filled"
                variant="filled"
                sx={{ m: 1, width: "60ch" }}
                required
                label="Number of children"
                type="Number"
                value={search.children1}
                onChange={(event) => {
                  setSearch({ ...search, children1: event.target.value });
                }}
              />
              <TextField
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                label="Filled"
                variant="filled"
                sx={{ m: 1, width: "60ch" }}
                required
                label="Number of children"
                type="Number"
                value={search.children2}
                onChange={(event) => {
                  setSearch({ ...search, children2: event.target.value });
                }}
              />
            </div>

            <div className="form-group">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => (
                    <TextField
                      InputLabelProps={{ className: "textfield_label" }}
                      InputProps={{ className: "textfield_input" }}
                      label="Filled"
                      variant="filled"
                      {...props}
                      required
                      sx={{ m: 1, width: "60ch" }}
                    />
                  )}
                  label="Departure Date"
                  value={search.DateD}
                  onChange={(newValue) => {
                    setSearch({ ...search, DateD: newValue });
                  }}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => (
                    <TextField
                      InputLabelProps={{ className: "textfield_label" }}
                      InputProps={{ className: "textfield_input" }}
                      label="Filled"
                      variant="filled"
                      {...props}
                      required
                      sx={{ m: 1, width: "60ch" }}
                    />
                  )}
                  label="Arrival Date"
                  value={search.DateA}
                  onChange={(newValue) => {
                    setSearch({ ...search, DateA: newValue });
                  }}
                />
              </LocalizationProvider>
            </div>

            <div className="form-group">
              <Button
                className="searchbutton"
                type="submit"
                onClick={() =>
                  sessionStorage.setItem(
                    "clientFlights",
                    JSON.stringify(search)
                  )
                }
              >
                Search
              </Button>
              {loading && <Loading />}
            </div>
          </Form>
        </div>
      </div>
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

  return new Date(sYear, sMonth, sDay, sHour, sMinute, 0);
}
function padValue(value) {
  return value < 10 ? "0" + value : value;
}

export default SearchScreen;
