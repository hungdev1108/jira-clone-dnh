import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuJira() {
  return (
    <div className="menu">
      <div className="account">
        <div className="avatar">
          <img src={require("../../assets/img/download (1).jfif")} alt="" />
        </div>
        <div className="account-info">
          <p>hungdev1108</p>
          <p>Report bugs</p>
        </div>
      </div>
      <div className="control">
        <div>
          <i className="fa fa-credit-card" />
          <NavLink className="ml-1 text-dark" to="/jira" activeClassName="font-weight-bold">
            Cyber Board
          </NavLink>
        </div>
        <div>
          <i className="fa fa-user-shield" />
          <NavLink className="ml-1 text-dark" to="/projectmanagement" activeClassName="font-weight-bold">
            Project Management
          </NavLink>
        </div>
        <div>
          <i className="fa fa-cog" />
          <NavLink className="ml-1 text-dark" to="/createproject" activeClassName="font-weight-bold">
            Create Project
          </NavLink>
        </div>
      </div>
      <div className="feature">
        <div>
          <i className="fa fa-truck" />
          <span className="ml-1">Releases</span>
        </div>
        <div>
          <i className="fa fa-equals" />
          <span className="ml-1">Issues and filters</span>
        </div>
        <div>
          <i className="fa fa-paste" />
          <span className="ml-1">Pages</span>
        </div>
        <div>
          <i className="fa fa-location-arrow" />
          <span className="ml-1">Reports</span>
        </div>
        <div>
          <i className="fa fa-box" />
          <span className="ml-1">Components</span>
        </div>
      </div>
    </div>
  );
}
