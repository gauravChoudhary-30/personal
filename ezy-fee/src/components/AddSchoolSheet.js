import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Divider,
  TextField,
  Button,
} from "@mui/material";

const AddSchoolSheet = ({ schoolName, setSchoolName, slug, setSlug, open, onClose, handleSubmit }) => {

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: "50vh",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
          <Typography variant="h6">Add New School</Typography>
        <Divider sx={{ my: 2 }} />

        <form onSubmit={handleSubmit}>
          <TextField
            label="School Name"
            fullWidth
            variant="filled"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Slug"
            fullWidth
            variant="filled"
            value={slug}
            onChange={(e) =>
              setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))
            }
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
          >
            Add School
          </Button>
        </form>
      </Box>
    </Drawer>
  );
};

export default AddSchoolSheet;
