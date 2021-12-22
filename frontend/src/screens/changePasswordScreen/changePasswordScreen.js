import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
//import "./RegisterScreen.css";
import axios from 'axios'
import TextField from '@mui/material/TextField';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // 
function RegisterScreen({ history }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [passport, setPassport] = useState("");

 // const [password, setPassword] = useState("");
  //const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  //const [loading, setLoading]=useState(false);


  //const userInfo = localStorage.getItem("userInfo");
  // useEffect(() => {
  //   if (userInfo) {
  //     history.push("/");
  //   }
  // }, [history,userInfo]);
  const [password, setPassword] = useState({
      "password":"",
      "newPassword":""
  });

  const userInfo  = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
  const [loading, setLoading]=useState(false);
  const [loadingEffect,setLoadingEffect]=useState(false);

  useEffect(() => {
    if(!userInfo){
        history.push('/homePage');


  }
  },[]);

  

  const submitHandler = async(e) => {
    e.preventDefault();
    confirmAlert({
        title: 'confirm to Change Password',
        message: 'Are you Sure to Change your Password ?',
        buttons: [
          {
            label: 'Yes',
            onClick: () =>  changePassword()
          },
          {
            label: 'No',
          }
        ]
      });
  }
  const changePassword =async()=>{
      setLoading(true);
    const config = {
        headers:{
              "Content-type":"application/json",
                Authorization: `Bearer ${userInfo.token}`

              }
            }

           const  ans =  await axios.post('http://localhost:8000/flights/getPassword',password,config);
           setLoading(false);
           
           if(ans.data=="ok"){
            confirmAlert({
                title: 'confirm to Change Password',
                message: 'Are you Sure to Change your Password ?',
                buttons: [
                  {
                    label: 'Ok',
                    onClick: () =>history.push("/profile")
                  },
                ]
              });
            

           }
           else{
            confirmAlert({
                title: 'confirm to Change Password',
                message: 'Wrong Password?',
                buttons: [
                  {
                    label: 'Ok',
                  },
                ]
              });  

           }
    

  }
   

  return (
    <MainScreen title="Change Password">
      <div className="loginContainer">
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
           <TextField id="outlined-basic" label="Old Password" type="password" required variant="outlined"  sx={{m:1 ,width:'60ch'}} value={password.password} 
      onChange={(event) =>{setPassword({...password, password:event.target.value})}}
     />
          </Form.Group>

          
          <Form.Group controlId="formBasicPassword">
            <TextField 
            id="outlined-basic" 
            sx={{m:1,width: '60ch' }}
            label="New Password"
              type="password"
              required
              value={password.newPassword}
              placeholder="Password"
              onChange={(event) =>{setPassword({...password, newPassword:event.target.value})}}            >
            </TextField>
          </Form.Group>

          

          <Button variant="primary" style={{margin:'10px', width: '25ch' }} type="submit">
            update 
          </Button>
        </Form>
        
      </div>
    </MainScreen>
  );
}

export default RegisterScreen;
