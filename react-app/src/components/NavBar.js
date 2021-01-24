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
      <div class="vertical-menu">
        <a href="#" class="active">Portfolio</a>
        <a href="#">Home</a>
      </div>
      <Row>
        <Col>
          <div className="middle">{authenticated && <SearchInput />}</div>

          <NavLink to="/" exact={true} activeClassName="active">
            <img
              src={Logo}
              alt="ProTrader Logo"
              style={{ maxWidth: 80, height: "auto", margin: 20 }}
            />
          </NavLink>
        </Col>
        <Col>
          <ul className="NavbarContainer">
            {authenticated ? (
              ""
            ) : (
              <li className="navbar_links">
                <NavLink to="/login" exact={true} activeClassName="active">
                  <p className="navbar_link">Log In</p>
                </NavLink>
              </li>
            )}
            {authenticated ? (
              ""
            ) : (
              <li className="navbar_links">
                <NavLink to="/sign-up" exact={true} activeClassName="active">
                  <p className="navbar_link">Sign Up</p>{" "}
                </NavLink>
              </li>
            )}

            {authenticated ? (
              <li className="navbar_links">
                <NavLink to="/profile" exact={true} activeClassName="active">
                  <p className="navbar_link">BuyingPower</p>
                </NavLink>
              </li>
            ) : (
              ""
            )}
            {authenticated ? (
              <li className="navbar_links">
                <NavLink to="/profile" exact={true} activeClassName="active">
                  <p className="navbar_link">Portfolio</p>
                </NavLink>
              </li>
            ) : (
              ""
            )}
            {authenticated ? (
              <li className="navbar_links">
                <LogoutButton setAuthenticated={setAuthenticated} />
              </li>
            ) : (
              ""
            )}
            <li className="navbar_links">
              <DemoButton
                setAuthenticated={setAuthenticated}
                authenticated={authenticated}
              />
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default NavBar;
