import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import DemoButton from "./auth/DemoButton";
import "../styles/Navbar.css";
import "../styles/Search.css";
import LogoutButton from "./auth/LogoutButton";
import { Row, Col, Container } from "react-bootstrap"
import SearchInput from "./Search";
import Logo from "./images/logo.png"

const NavBar = ({ setAuthenticated, authenticated, user }) => {
  let location = useLocation();
  const currentPage = location.pathname;
  return (
    <Container>
      <Row>
        <Col>
          <NavLink to="/" exact={true} activeClassName="active">
            <div className="logo_wrapper">
              <i className="fas fa-money-bill-wave logo_icon"></i>
            </div>
          </NavLink>
        </Col>
        <Col>
          <div className="middle">{authenticated && <SearchInput />}</div>
        </Col>
        <Col>
          <ul className="NavbarContainer">
            {authenticated ? (
              ""
            ) : (
              <button className=" nav_button">
                <NavLink to="/login" exact={true} activeClassName="active">
                  Log In
                </NavLink>
              </button>
            )}
            {authenticated ? (
              ""
            ) : (
              <button className="nav_button">
                <NavLink to="/sign-up" exact={true} activeClassName="active">
                  Sign Up
                </NavLink>
              </button>
            )}
            {authenticated ? (
              <li className="">
                <NavLink
                  to="/profile"
                  exact={true}
                  activeClassName="active"
                ></NavLink>
              </li>
            ) : (
              ""
            )}
            {authenticated ? (
              <li className="navbar_links spacing">
                <LogoutButton setAuthenticated={setAuthenticated} />
              </li>
            ) : (
              ""
              )}
            {authenticated ? "" :
              <li className="nav_button">
                <DemoButton
                  setAuthenticated={setAuthenticated}
                  authenticated={authenticated}
                />
              </li>
            }
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default NavBar;
