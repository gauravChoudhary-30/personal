import React, { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  TextField,
  Fade,
  Alert,
  Button,
} from "@mui/material";

const BottomSheet = ({ open, onClose }) => {
  const [ncNo, setncNo] = useState("");
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setncNo(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("Searching...");
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  }

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: "40vh", // half screen
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">NC No.</Typography>
        <Divider sx={{ my: 2 }} />

        <TextField
          label="NC Number"
          value={ncNo}
          onChange={handleChange}
          type="tel" // allows numeric keypad on mobile
          name="ncNo"
          fullWidth
          variant="filled"
          inputProps={{
            inputMode: "numeric", // ensures numeric keypad on mobile
            pattern: "[0-9]*", // allows only digits
            maxLength: 3, // optional: max length of phone number
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 4,
            py: 1.5,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
            bgcolor: "#1976d2",
            "&:hover": { bgcolor: "#0f3aa7" },
          }}
          onClick={handleSubmit}
        >
          Search
        </Button>

        {error && (
          <Fade in={showError}>
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          </Fade>
        )}
      </Box>
    </Drawer>
  );
};

export default BottomSheet;
