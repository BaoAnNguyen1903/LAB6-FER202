import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

const CustomNavbar = () => {
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">
        Home
      </NavbarBrand>
      <Nav className="me-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/">
            About
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/">
            News
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/">
            Quiz
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/">
            Contact
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default CustomNavbar;
