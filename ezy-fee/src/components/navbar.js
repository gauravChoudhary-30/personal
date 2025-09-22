import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = ({ title, showMenuIcon }) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

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
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 280,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top 30% Blue Section */}
          <Box
            sx={{
              height: "30%",
              bgcolor: "#1976d2",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#fff",
                color: "#1976d2",
                width: 80,
                height: 80,
                mb: 1,
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              {user?.firstName?.charAt(0)}
            </Avatar>
            <Typography variant="h6" fontWeight="bold">
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {user?.phoneNumber}
            </Typography>
          </Box>

          {/* Bottom 70% White Section */}
          <Box
            sx={{
              flex: 1,
              bgcolor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Divider sx={{backgroundColor:"#1976d2"}} />{" "}
            <List>
              {" "}
              <ListItem disablePadding>
                {" "}
                <ListItemButton onClick={handleLogout}>
                  {" "}
                  <ListItemIcon>
                    {" "}
                    <FontAwesomeIcon icon={faSignOutAlt} color="#1976d2"/>{" "}
                  </ListItemIcon>{" "}
                  <ListItemText primary="Logout" sx={{ color: "#1976d2", fontWeight:"bold"}} />{" "}
                </ListItemButton>{" "}
              </ListItem>{" "}
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
