import React from "react";
import { Box, Container, Fab, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { keyframes } from "@mui/system";
import SchoolBus from "../lotties/schoolBus";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";

// Bounce animation for welcome text
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0); 
  }
  40% {
    transform: translateY(-15px);
  }
  60% {
    transform: translateY(-8px);
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const LaunchScreen = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (user) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };
  return (
    <Container
      maxWidth="md"
      disableGutters
      sx={{
        minHeight: "100vh",
        bgcolor: "#1976d2",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Top blue section */}
      <Box
        sx={{
          height: "30vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            animation: `${bounce} 2s infinite`,
            textAlign: "center",
          }}
        >
          EzyFee!
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 2,
            fontWeight: 500,
            animation: `${fadeIn} 2s ease-in-out forwards`,
            textAlign: "center",
          }}
        >
          A platform to manage student fees
        </Typography>
      </Box>

      {/* Bottom white section */}
      <Box
        sx={{
          height: "70vh",
          bgcolor: "white",
          borderTopLeftRadius: "40px",
          borderTopRightRadius: "40px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          position: "relative",
          pt: 4,
        }}
      >
        <SchoolBus />

        <Fab
          color="primary"
          sx={{
            position: "absolute",
            bottom: "30%",
            bgcolor: "#1976d2",
            "&:hover": { bgcolor: "#0f3aa7" },
          }}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </Fab>
      </Box>
    </Container>
  );
};

export default LaunchScreen;
