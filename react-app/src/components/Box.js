import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap/";
import Active from "./Active"


const Box = () => {
  return (
    <>
      <div className="section_title user_balance">
        <i className="fas fa-fire card_icon"></i>Most Active
      </div>
      <Row className="Box">
        <Active />
      </Row>
    </>
  );

}

export default Box