import React, { useEffect, useState } from "react";
import BackButtonBar from "../components/BackButtonBar";
import Footer from "../components/footer";
import { getAllStudents } from "../api/student";
import { Box, LinearProgress, Typography, Paper } from "@mui/material";
import SchoolBus from "../lotties/schoolBus";
import NotFound from "../lotties/notFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faIdBadge, faPhone, faSchool } from "@fortawesome/free-solid-svg-icons";

const AllStudents = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchAllStudents = async () => {
      try {
        const response = await getAllStudents();
        if (response.data) {
          setAllStudents(response.data);
        } else {
          setAllStudents([]);
          setErrorMessage(response.message || "No students found");
        }
      } catch (error) {
        console.log("Error fetching students:", error);
        setErrorMessage("Error fetching students' list");
      } finally {
        setLoading(false);
      }
    };
    fetchAllStudents();
  }, []);

  return (
    <>
      <BackButtonBar />

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
        </Box>
      ) : (
        <Box
          sx={{
            mt: "80px",
            mb: "60px",
            px: 2,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 2,
          }}
        >
          {allStudents.map((student) => (
            <Paper
              key={student._id}
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 3,
                background: "#f7f8fa",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, color: "#1976d2" }}
              >
                <FontAwesomeIcon icon={faUser} /> {student.student_name}
              </Typography>

              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <FontAwesomeIcon icon={faIdBadge} /> NC No: {student.nc}
              </Typography>

              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <FontAwesomeIcon icon={faPhone} /> Phone: {student.phone_number}
              </Typography>

              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <FontAwesomeIcon icon={faSchool} /> School: {student.school}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}

      <Footer showButton={false} />
    </>
  );
};

export default AllStudents;
