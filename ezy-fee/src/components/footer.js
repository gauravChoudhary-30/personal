import React, { useState } from "react";
import { Box } from "@mui/material";
import FabButton from "./FabButton";
import BottomSheet from "./BottomSheet";

const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        component="footer"
        sx={{
          bgcolor: "background.paper",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.2)",
          position: "fixed",
          bottom: 0,
          width: "100%",
          zIndex: 1000,
          p: 2,
        }}
      >
        <FabButton onClick={() => setOpen(true)} />
      </Box>

      <BottomSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Footer;
