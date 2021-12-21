import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./AdminScreen.css";
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

function AdminScreen({ history }) {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const [search, setSearch] = useState({
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

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/homepage");
    }
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    history.push("/showFlights");
  };

  return (
    <div className="inquiryMain">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}

      <div className="reservationContainer">
        <div className="searchSubContainer">
          <h3
            className="heading"
            style={{ paddingLeft: "13px", color: "#3c5977" }}
          >
            Search For A Flight
          </h3>
          <Form onSubmit={submitHandler}>
            <div className="form-group">
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                variant="filled"
                sx={{ m: 1, width: "82ch" }}
                label="Flight Number"
                type="Number"
                value={search.Flight_No}
                onChange={(event) => {
                  setSearch({ ...search, Flight_No: event.target.value });
                }}
              />
            </div>

            <div className="form-group">
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                variant="filled"
                sx={{ m: 1, width: "40ch" }}
                label="From"
                value={search.From}
                onChange={(event) => {
                  setSearch({ ...search, From: event.target.value });
                }}
              />
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                variant="filled"
                sx={{ m: 1, width: "40ch" }}
                label="To"
                value={search.To}
                onChange={(event) => {
                  setSearch({ ...search, To: event.target.value });
                }}
              />
            </div>

            <div className="form-group">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  renderInput={(props) => (
                    <TextField
                      id="filled-basic"
                      InputLabelProps={{ className: "textfield_label" }}
                      InputProps={{ className: "textfield_input" }}
                      variant="filled"
                      {...props}
                      sx={{ m: 1, width: "40ch" }}
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
                      id="filled-basic"
                      InputLabelProps={{ className: "textfield_label" }}
                      InputProps={{ className: "textfield_input" }}
                      variant="filled"
                      {...props}
                      sx={{ m: 1, width: "40ch" }}
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
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                variant="filled"
                sx={{ m: 1, width: "26ch" }}
                label="First Seats "
                type="Number"
                value={search.FirstSeats}
                onChange={(event) => {
                  setSearch({ ...search, FirstSeats: event.target.value });
                }}
              />
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                variant="filled"
                sx={{ m: 1, width: "26ch" }}
                label="Reseved First"
                type="Number"
                value={search.ReservedFirstSeats}
                onChange={(event) => {
                  setSearch({
                    ...search,
                    ReservedFirstSeats: event.target.value,
                  });
                }}
              />
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                variant="filled"
                sx={{ m: 1, width: "26ch" }}
                label="First Price"
                type="Number"
                value={search.FirstPrice}
                onChange={(event) => {
                  setSearch({ ...search, FirstPrice: event.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                variant="filled"
                sx={{ m: 1, width: "26ch" }}
                label="Business Seats "
                type="Number"
                value={search.BusinessSeats}
                onChange={(event) => {
                  setSearch({ ...search, BusinessSeats: event.target.value });
                }}
              />
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                variant="filled"
                sx={{ m: 1, width: "26ch" }}
                label="Reseved Business"
                type="Number"
                value={search.ReservedBusinessSeats}
                onChange={(event) => {
                  setSearch({
                    ...search,
                    ReservedBusinessSeats: event.target.value,
                  });
                }}
              />
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                variant="filled"
                sx={{ m: 1, width: "26ch" }}
                label="Business Price"
                type="Number"
                value={search.BusinessPrice}
                onChange={(event) => {
                  setSearch({ ...search, BusinessPrice: event.target.value });
                }}
              />
            </div>

            <div className="form-group">
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                variant="filled"
                sx={{ m: 1, width: "26ch" }}
                label="Economy Seats"
                type="Number"
                value={search.EconomySeats}
                onChange={(event) => {
                  setSearch({ ...search, EconomySeats: event.target.value });
                }}
              />
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                variant="filled"
                sx={{ m: 1, width: "26ch" }}
                label="Reseved Economy"
                type="Number"
                value={search.ReservedEconomySeats}
                onChange={(event) => {
                  setSearch({
                    ...search,
                    ReservedEconomySeats: event.target.value,
                  });
                }}
              />
              <TextField
                id="filled-basic"
                InputLabelProps={{ className: "textfield_label" }}
                InputProps={{ className: "textfield_input" }}
                variant="filled"
                sx={{ m: 1, width: "26ch" }}
                label="Economy Price"
                type="Number"
                value={search.EconomyPrice}
                onChange={(event) => {
                  setSearch({ ...search, EconomyPrice: event.target.value });
                }}
              />
            </div>

            <div className="form-group">
              <Button
                className="searchFlights"
                type="submit"
                onClick={() =>
                  sessionStorage.setItem("adminSearch", JSON.stringify(search))
                }
              >
                Search
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AdminScreen;
