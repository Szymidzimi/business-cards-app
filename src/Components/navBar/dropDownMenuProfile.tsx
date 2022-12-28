import "./navbar.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";

const DropDownMenuProfile: React.FC = () => {
  return (
    <>
      <div className="profile">
        <img src="user.png" alt=""></img>
      </div>

      <div className="menu">
        <h3>
          User Account
          <div>Operational Team</div>
        </h3>
        <ul>
          <li>
            <span className="material-icons icons-size">person</span>
            <a href="#">My Profile</a>
          </li>
          <li>
            <span className="material-icons icons-size">mode</span>
            <a href="#">Edit Account</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DropDownMenuProfile;
