import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const BackButtonBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
        zIndex: 1000,
        height: "60px",
      }}
    >
      <Button
        onClick={() => navigate(-1)}
        startIcon={<FontAwesomeIcon icon={faAngleLeft} />}
        color="#fff"
      />
    </AppBar>
  );
};

export default BackButtonBar;
