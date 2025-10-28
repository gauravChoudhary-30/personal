import React from "react";
import { Typography, Drawer, Box, Avatar, Divider, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserPlus, faUsers, faBookOpen, faPen, faSchool } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";

const CustomDrawer = ({ open, setOpen }) => {
  const user = useStore((state) => state.user);
  const clearUser = useStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };

  const baseMenuItems = [
  {
    label: "Add Student",
    icon: faUserPlus,
    path: "/add-student",
  },
  {
    label: "Show All Students",
    icon: faUsers,
    path: "/all-students",
  },
  {
    label: "View Last Payments",
    icon: faBookOpen,
    path: "/last-payments",
  },
];

const menuItems = user?.isSuperAdmin
    ? [
        ...baseMenuItems,
        {
          label: "Manage Schools",
          icon: faSchool,
          path: "/manage-schools",
        },
      ]
    : baseMenuItems;
  return (
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
    position: "relative", // make container relative
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
  {/* Pencil Icon at top-right */}
  <FontAwesomeIcon
    icon={faPen}
    color="white"
    style={{
      position: "absolute",
      top: 16,
      right: 16,
      cursor: "pointer",
      fontSize: "1rem",
    }}
    onClick={() => {
      // handle edit click
      console.log("Edit profile clicked");
    }}
  />

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
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(item.path);
                    setOpen(false);
                  }}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom:
                      index !== menuItems.length - 1
                        ? "1px solid #ccc"
                        : "none", // border as divider
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{ color: "#1976d2", fontWeight: "bold" }}
                  />
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <FontAwesomeIcon icon={item.icon} color="#1976d2" />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box>
            <Divider sx={{ backgroundColor: "#1976d2", my: 2 }} />

            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleLogout}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <ListItemText
                    primary="Logout"
                    sx={{ color: "#1976d2", fontWeight: "bold" }}
                  />
                  <ListItemIcon sx={{ minWidth: 0 }}>
                    <FontAwesomeIcon icon={faSignOutAlt} color="#1976d2" />
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
