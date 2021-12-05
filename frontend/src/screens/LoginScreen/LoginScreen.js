import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./LoginScreen.css";
import axios from 'axios'
import TextField from '@mui/material/TextField';


function LoginScreen({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading]=useState(false);
  const [userInfo, setUserInfo]=useState("");
  

// if(localStorage.getItem("userInfo")){
//   history.push('/homePage');
// }





  const submitHandler = async(e) => {
    e.preventDefault();
    
    try{
      setLoading(true);
      const config = {
        headers:{
          "Content-type":"application/json"
        }
      }
      const {data}=await axios.post('http://localhost:8000/flights/signin',{'email':email,'password':password},config); 
     
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
      setError(err.message)

    }
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
          <TextField 
            id="outlined-basic" 
            sx={{m:1 ,width: '60ch' }}
            label="Email"
              value={email}
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
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
          

          <Button variant="primary" style={{margin:'8px', width: '25ch' }} type="submit">
            Login
          </Button>
        </Form>
        <Row className="py-3">
          <Col style={{margin:'8px'}}>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default LoginScreen;
