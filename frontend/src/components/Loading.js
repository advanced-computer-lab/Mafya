import React from "react";
import { Spinner } from "react-bootstrap";

function Loading({ size = 100 }) {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        top:"-50px",
        left:"50px"

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
