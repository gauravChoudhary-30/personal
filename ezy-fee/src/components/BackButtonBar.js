import React from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const BackButtonBar = ({ buttonText, buttonIcon, onClick }) => {
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
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%"}}
      >
        <Button
          onClick={() => navigate(-1)}
          startIcon={<FontAwesomeIcon icon={faAngleLeft} />}
          color="#fff"
        />
        {(buttonText || buttonIcon) && (
          <Button
            onClick={onClick}
          >
            {buttonIcon && buttonIcon}

            {buttonText && (
              <Typography color="#fff" sx={{pr: 1}}>{buttonText}</Typography>
            )}
          </Button>
        )}
      </Box>
    </AppBar>
  );
};

export default BackButtonBar;
