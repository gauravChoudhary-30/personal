import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Alert,
  TextField,
  Fade,
} from "@mui/material";
import { loginNew } from "../api/auth";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginNew(Number(phoneNumber));
    console.log(response);
    if (response.error || response.data === null || response.status !== 200) {
      setError("Phone Number Verification Failed");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } else {
      alert("Login Successful");
    }
  };

  return (
    <Container
      maxWidth="sm"
      disableGutters
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Poppins', sans-serif",
        bgcolor: "#1450dc",
      }}
    >
      {/* Top section */}
      <Box
        sx={{
          height: "20vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          Welcome Back!
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mt: 1, fontWeight: 500, textAlign: "center", opacity: 0.9 }}
        >
          Login to manage student fees easily
        </Typography>
      </Box>

      {/* Bottom white card */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "white",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          display: "flex",
          flexDirection: "column",
          // justifyContent: "space-between",
          p: 4,
        }}
      >
        {/* Form top content */}
        <Box>
          <Typography
            variant="h4"
            color="primary"
            fontWeight="bold"
            align="center"
            mb={10}
            sx={{ color: "#1450dc" }}
          >
            Sign In
          </Typography>

          {/* Animated error message */}
          {error && (
            <Fade in={showError}>
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            </Fade>
          )}

          {/* Input */}
          <TextField
            label="Mobile Number"
            value={phoneNumber}
            onChange={handleChange}
            type="tel" // allows numeric keypad on mobile
            name="phoneNumber"
            fullWidth
            variant="filled"
            inputProps={{
              inputMode: "numeric", // ensures numeric keypad on mobile
              pattern: "[0-9]*", // allows only digits
              maxLength: 10, // optional: max length of phone number
            }}
          />
        </Box>

        {/* Bottom button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 8,
            py: 1.5,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
            bgcolor: "#1450dc",
            "&:hover": { bgcolor: "#0f3aa7" },
          }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
