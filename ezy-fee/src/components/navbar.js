import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ title, showMenuIcon }) => {
  return (
    <AppBar position="fixed" color="primary" sx={{ height: "60px", zIndex: 1000 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {showMenuIcon && (
          <IconButton edge="start" color="inherit" aria-label="menu">
            <FontAwesomeIcon icon={faBars} />
          </IconButton>
        )}
        {title && (
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
