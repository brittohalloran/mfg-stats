import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark mb-4"
      style={{ background: "#4A4E69" }}
    >
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/" exact activeClassName="active">
            Basic Analysis
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/sample-size-determination"
            activeClassName="active"
          >
            Sample Size Determination
          </NavLink>
        </li>
        <li className="nav-item" activeClassName="active">
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
