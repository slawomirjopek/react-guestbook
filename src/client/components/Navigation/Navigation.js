import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/" activeClassName="active" exact>Guest book</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" activeClassName="active">Contact</NavLink>
                </li>
            </ul>
        </nav>
    )
};

export default Navigation;