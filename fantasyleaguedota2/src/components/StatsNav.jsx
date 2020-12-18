import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import "./style.css";

//import { Switch, Route, Link } from "react-router-dom";

const StatsNav = () => {
  return (
    <Navbar
      style={{
        marginTop: "-32px",
        height: "50px",
        background: "rgba(0 0 0 0.9)",
        borderTop: "0.5px solid grey",
        borderBottom: "0.5px solid grey",
      }}
      id="statsnav"
      collapseOnSelect
      expand="lg"
      //bg="light"
      //variant="light"
    >
      <Navbar.Brand id="statsnav" href="/">
        Home
      </Navbar.Brand>
      <Navbar.Toggle id="statsnav" aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link id="statsnav" href="/teams">
            Teams
          </Nav.Link>
          <Nav.Link id="statsnav" href="/players">
            Players
          </Nav.Link>
          <Nav.Link id="statsnav" href="/fantasyboard">
            Fantasy Board
          </Nav.Link>
        </Nav>
        {/* <Nav>
          <Nav.Link id="statsnav" href="#deets">
            More deets
          </Nav.Link>
          <Nav.Link id="statsnav" eventKey={2} href="#memes">
            Dank memes
          </Nav.Link>
        </Nav> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default StatsNav;
