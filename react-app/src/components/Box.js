import React from "react";
import { Row } from "react-bootstrap/";
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