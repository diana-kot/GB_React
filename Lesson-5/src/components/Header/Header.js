import React from "react";
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import "./styles.scss";

export default function Header() {
  return (
    <div className="header">
      <div className="header-content">
        <div className="left-header">
          <Link to="/">
            <h2>Messenger</h2>
          </Link>
        </div>
        <div className="right-header">
          <h3 className="user-name">User</h3>
          <Link to="/profile">
            <Avatar src="/broken-image.jpg" />
          </Link>
        </div>
      </div>
    </div>
  );
}
