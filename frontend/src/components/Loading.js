import { color } from "@mui/system";
import React from "react";
import { Spinner } from "react-bootstrap";

function Loading({ size = 50 }) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: "50%",
         top:"20px",
         left:"110px",
         color:"rgba(34, 48, 60, 0.8)"

      }}
    >
      <Spinner
        style={{
          width: size,
          height: size,
        }}
        animation="border"
      />
    </div>
  );
}

export default Loading;
