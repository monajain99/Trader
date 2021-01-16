import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import {
  Form,
  Jumbotron as Jumbo,
  Container,
  Button,
  Row,
  Col,
} from "react-bootstrap";

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
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
        <Form onSubmit={onLogin}>
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email </Form.Label>
            <Row>
              <Col lg={4}>
                   <input
                  name="email"
                  type="text"
                  value={email}
                  onChange={updateEmail}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Row>
              <Col lg={4}>
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={updatePassword}
                />
              </Col>
            </Row>
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
      </Container>
    </Jumbo>
  );
};

export default LoginForm;
