import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

const Navigation = () => {
    return (
        <Nav pills={true} className="my-2">
            <NavItem>
                <NavLink to="/" activeClassName="active" className="nav-link" exact>Guest book</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/contact" activeClassName="active" className="nav-link">Contact</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/login" activeClassName="active" className="nav-link">Login</NavLink>
            </NavItem>
        </Nav>
    )
};

export default Navigation;