import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./RegisterScreen.css";
import axios from 'axios'
import TextField from '@mui/material/TextField';

function RegisterScreen({ history }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [passport, setPassport] = useState("");

  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading]=useState(false);


  const userInfo = localStorage.getItem("userInfo");
  // useEffect(() => {
  //   if (userInfo) {
  //     history.push("/");
  //   }
  // }, [history,userInfo]);


  const submitHandler = async(e) => {
    e.preventDefault();
    setLoading(true);
    
    if (password !== confirmpassword) {
      setLoading(false);
      setError("Passwords do not match");
    } 
    else{
    try{


      const config = {
        headers:{
          "Content-type":"application/json"
        }
      }
      const{data}=await axios.post('http://localhost:8000/flights/signup',{'name':name ,'email':email,'age':age,'passport':passport,'password':password},config); 
      
      if(data instanceof Array){
        setLoading(false);
        setError(data)
      }
      else{
        localStorage.setItem('userInfo',JSON.stringify(data))
        setLoading(false);
        setError('')
        history.push('/homePage');
        window.location.reload();
      }

    }
    catch(err){
      setLoading(false);
      setError("error try again")

    }
  }
  };

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <TextField 
            id="outlined-basic" 
            sx={{m:1,width: '60ch' }}
              type="name"
              value={name}
              label = "Name"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            >
          </TextField>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <TextField 
            id="outlined-basic" 
            sx={{m:1,width: '60ch' }}
            label="Email address"
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            >
              </TextField>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <TextField 
            id="outlined-basic" 
            sx={{m:1,width: '60ch' }}
            label="Age"
              type="number"
              value={age}
              placeholder="Enter Your Age"
              onChange={(e) => setAge(e.target.value)}
            >
            </TextField>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <TextField 
            id="outlined-basic" 
            sx={{m:1,width: '60ch' }}
            label="Passport Number"
              value={passport}
              placeholder="Enter Passport Number"
              onChange={(e) => setPassport(e.target.value)}
            >
            </TextField>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <TextField 
            id="outlined-basic" 
            sx={{m:1,width: '60ch' }}
            label="Password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            >
            </TextField>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <TextField 
            id="outlined-basic" 
            sx={{m:1,width: '60ch' }}
            label="Confirm Password"
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            >
              </TextField>
          </Form.Group>

          <Button variant="primary" style={{margin:'10px', width: '25ch' }} type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col style={{margin:'8px'}} >
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RegisterScreen;
