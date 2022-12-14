import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <NavLink className="navbar-brand logo-jira" to="/home">
        Jira App
      </NavLink>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink activeClassName="activeNavItem" className="nav-link" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="activeNavItem" className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="activeNavItem" className="nav-link" to="/contact">
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="activeNavItem" className="nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="activeNavItem" className="nav-link" to="/login">
              Login
            </NavLink>
          </li>

          {/* Dropdown TASK */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="/" id="dropdownId" data-toggle="dropdown">
              Task
            </a>
            <div className="dropdown-menu">
              <NavLink className="dropdown-item" to="/todolistRCC">
                TodoList RCC
              </NavLink>
              <NavLink className="dropdown-item" to="/todolistRFC">
                TodoList RFC
              </NavLink>
              <NavLink className="dropdown-item" to="/todolistredux">
                TodoList Redux
              </NavLink>
              <NavLink className="dropdown-item" to="/todolistsaga">
                TodoList Saga
              </NavLink>
            </div>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="text" placeholder="Search" />
          <button className="btn btn-outline-warning my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
