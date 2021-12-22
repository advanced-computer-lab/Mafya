import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./LandingStyles.css";


function LandingPage({ history }) {
 //const userLogin = useSelector((state) => state.userLogin);
  //const { userInfo } = "";

  // useEffect(()=>{
  //   const userInfo = localStorage.getItem("userInfo");

  //   if(userInfo){
  //     history.push("/mynotes")
  //   }

  // },[history,userInfo])

  return (
    <div className="main">
      
        <Container>
        <Row>
          <div className="intro-text">
            <div>
              <p className="title" >  WELCOME TO MAFYA AIR</p> 
              <p className="subtitle">One Safe place for all your trips.</p>
            </div>
            <div className="buttonContainer">
              <Link to="/Inquiry">
                <Button size="lg" className="landingbutton">
                  Inquiry
                </Button>
              </Link>
              <Link to="/search">
                <Button
                  size="lg"
                  className="landingbutton"
                >
                  Reservations
                </Button>
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;
