import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState } from "react";
import SchoolBus from "../lotties/schoolBus";
import { Box, Divider, Grid, InputAdornment, LinearProgress, TextField, Typography } from "@mui/material";
import BackButtonBar from "../components/BackButtonBar";
import NotFound from "../lotties/notFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faHome, faIdBadge, faMoneyBillWave, faPhone, faSchool, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

const AddStudent = () => {
  const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
  return (
    <>
      <BackButtonBar buttonText={"SUBMIT"} />
      {loading ? (
        <Box
          sx={{
            marginTop: "60px",
            marginBottom: "60px",
            minHeight: "calc(100vh - 120px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SchoolBus />
          <Box sx={{ width: "60%" }}>
            <LinearProgress />
          </Box>
        </Box>
      ) : errorMessage ? (
        // Show "Not Found" or "Error"
        <Box
          sx={{
            marginTop: "60px",
            marginBottom: "60px",
            minHeight: "calc(100vh - 120px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: 2,
          }}
        >
          <NotFound />
          <Typography variant="h5" color="error" sx={{ fontWeight: "bold" }}>
            {errorMessage}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            New Student Not Added.
          </Typography>
        </Box>
      ) : (
        <>
          <Box
           sx={{
            marginTop: "60px",
            marginBottom: "60px",
            minHeight: "calc(100vh - 120px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "top",
            alignItems: "center",
            gap: 2,
          }}
        >
            <Box sx={{ mt: 2 }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                mb: 3,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Add New Student
            </Typography>
            </Box>
            <form >
              {/* Basic Info */}
              <Typography variant="subtitle1" sx={{ mb: 1, color: "#444" }}>
                👤 Basic Info
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Student Name"
                    name="student_name"
                    fullWidth
                    required
                    // value={formData.student_name}
                    // onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faUser} color="#1976d2" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Class / Section"
                    name="class_section"
                    fullWidth
                    // value={formData.class_section}
                    // onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faIdBadge} color="#1976d2" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="School"
                    name="school"
                    fullWidth
                    // value={formData.school}
                    // onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faSchool} color="#1976d2" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Fees */}
              <Typography variant="subtitle1" sx={{ mb: 1, color: "#444" }}>
                💰 Fees & Enrollment
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Monthly Fees"
                    name="monthly_fees"
                    type="number"
                    fullWidth
                    // value={formData.monthly_fees}
                    // onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon
                            icon={faMoneyBillWave}
                            color="#2e7d32"
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="No. of Students"
                    name="no_of_students"
                    type="number"
                    fullWidth
                    // value={formData.no_of_students}
                    // onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faUsers} color="#1565c0" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Contact Info */}
              <Typography variant="subtitle1" sx={{ mb: 1, color: "#444" }}>
                ☎️ Contact Info
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    name="phone_number"
                    type="tel"
                    fullWidth
                    required
                    // value={formData.phone_number}
                    // onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faPhone} color="#1976d2" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Address */}
              <Typography variant="subtitle1" sx={{ mb: 1, color: "#444" }}>
                🏠 Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="QR No."
                    name="qr_no"
                    fullWidth
                    // value={formData.address.qr_no}
                    // onChange={(e) => handleNestedChange(e, "address")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faHome} color="#1976d2" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Sector 1"
                    name="sector_1"
                    type="number"
                    fullWidth
                    // value={formData.address.sector_1}
                    // onChange={(e) => handleNestedChange(e, "address")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Sector 2"
                    name="sector_2"
                    fullWidth
                    // value={formData.address.sector_2}
                    // onChange={(e) => handleNestedChange(e, "address")}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Date Fields */}
              <Typography variant="subtitle1" sx={{ mb: 1, color: "#444" }}>
                📅 Starting Date
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="Year"
                    name="year"
                    type="number"
                    fullWidth
                    // value={formData.going_from.year}
                    // onChange={(e) => handleNestedChange(e, "going_from")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FontAwesomeIcon icon={faCalendarDays} color="#1976d2" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Month"
                    name="month"
                    type="number"
                    fullWidth
                    // value={formData.going_from.month}
                    // onChange={(e) => handleNestedChange(e, "going_from")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Day"
                    name="day"
                    type="number"
                    fullWidth
                    // value={formData.going_from.day}
                    // onChange={(e) => handleNestedChange(e, "going_from")}
                  />
                </Grid>
              </Grid>
            </form>
          </Box>
        </>
      )}
      <Footer showButton={false} />
    </>
  );
};

export default AddStudent;
