import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import {
  Form,
  Jumbotron as Jumbo,
  Container,
  Button,
  Row,
  Col,
} from "react-bootstrap";


const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [full_name, setFullName] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password, full_name);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFullName = (e) => {
    setFullName(e.target.value);
  };
  

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Jumbo className="bg=lt">
      <Container>
        <Row>
          <Col>
            <h1 className="display-4">Sign in to be a Pro Trader!</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="lead">We Bring You everything for stocks! </p>
          </Col>
        </Row>
        <Form onSubmit={onSignUp}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Row>
              <Col lg={4}>
                <input
                  type="text"
                  onChange={updateUsername}
                  value={username}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Label>Email</Form.Label>
          <Row>
            <Col lg={4}>
              <input
                type="text"
                onChange={updateEmail}
                value={email}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Col>
          </Row>
          <Form.Label>Password</Form.Label>
          <Row>
            <Col lg={4}>
              <input
                type="password"
                onChange={updatePassword}
                value={password}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Col>
          </Row>
          <Form.Label>Repeat Password</Form.Label>
          <Row>
            <Col lg={4}>
              <input
                type="password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              />
            </Col>
          </Row>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Full Name</Form.Label>
            <Row>
              <Col lg={4}>
                <input
                  type="text"
                  onChange={updateFullName}
                  value={full_name}
                  required={true}
                />
              </Col>
            </Row>
          </Form.Group>
          <Button variant="info" type="submit">
            Sign Up
          </Button>
        </Form>
      </Container>
    </Jumbo>
  );
};

export default SignUpForm;
