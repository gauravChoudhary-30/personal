import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import CustomDrawer from "./customdrawer";

const Navbar = ({ title, showMenuIcon }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top AppBar */}
      <AppBar
        position="fixed"
        color="primary"
        sx={{ height: "60px", zIndex: 1000 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {showMenuIcon && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
          )}
          {title && (
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>
          )}
        </Toolbar>

        <CustomDrawer open={open} setOpen={setOpen} />
      </AppBar>
    </>
  );
};

export default Navbar;
