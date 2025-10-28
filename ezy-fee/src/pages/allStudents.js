import React, { useEffect, useMemo, useState } from "react";
import BackButtonBar from "../components/BackButtonBar";
import Footer from "../components/footer";
import { getAllStudents } from "../api/student";
import { getAllSchools } from "../api/school";
import { Box, LinearProgress, Typography, Paper, Divider, MenuItem, Menu } from "@mui/material";
import SchoolBus from "../lotties/schoolBus";
import NotFound from "../lotties/notFound";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

const AllStudents = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [allStudents, setAllStudents] = useState([]);
  const [allSchools, setAllSchools] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const studentsResponse = await getAllStudents();
        const schoolsResponse = await getAllSchools();
        if (studentsResponse?.data) {
          setAllStudents(studentsResponse.data);
        } else {
          setAllStudents([]);
          setErrorMessage(studentsResponse?.message || "No students found");
        }

        if (schoolsResponse?.data) {
          setAllSchools(schoolsResponse.data);
        } else {
          setAllSchools([]);
          setErrorMessage(schoolsResponse?.message || "No schools found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Error fetching students or schools list");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectSchool = (schoolName) => {
    setSelectedSchool(schoolName);
    handleClose();
  };

const filteredStudents = useMemo(() => {
  return selectedSchool
    ? allStudents.filter((s) => s.school === selectedSchool)
    : allStudents;
}, [selectedSchool, allStudents]);


  return (
    <>
      <BackButtonBar
  buttonIcon={<FontAwesomeIcon icon={faFilter} style={{ fontSize: 22, color: "white" }} />}
  onClick={handleFilterClick}
  aria-label="Filter students by school"
/>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {allSchools.length > 0 ? (
          allSchools.map((school) => (
            <MenuItem
              key={school.slug}
              onClick={() => handleSelectSchool(school.name)}
              sx={{
                fontWeight: selectedSchool === school.name ? "bold" : "normal",
                color: selectedSchool === school.name ? "#1976d2" : "inherit",
                bgcolor:
                  selectedSchool === school.name
                    ? "rgba(25, 118, 210, 0.1)"
                    : "inherit",
              }}
            >
              {school.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No schools available</MenuItem>
        )}
        {selectedSchool && (
          <MenuItem
            onClick={() => handleSelectSchool("")}
            sx={{ color: "red", fontWeight: "bold" }}
          >
            Clear Filter
          </MenuItem>
        )}
      </Menu>
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
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              textAlign: "center",
              backgroundColor: "#fafafa",
              border: "1px solid #eee",
              position: "relative",
              overflow: "visible",
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ color: "#1976d2" }}
            >
              All Students
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total: {filteredStudents.length} students
            </Typography>
          </Paper>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <Paper
                key={student._id}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  textAlign: "left",
                  backgroundColor: "#fafafa",
                  border: "1px solid #eee",
                  position: "relative",
                  overflow: "visible",
                }}
                onClick={() => navigate(`/student?nc=${student.nc}`)}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#1976d2" }}
                >
                  {student.student_name}
                </Typography>
                <Divider
                  sx={{
                    borderColor: "rgba(0, 0, 0, 0.1)",
                    borderBottomWidth: 2,
                    my: 2,
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    NC:{" "}
                    <Typography component="span" sx={{ fontWeight: "bold" }}>
                      {student.nc}
                    </Typography>
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    Phone:{" "}
                    <Typography component="span" sx={{ fontWeight: "bold" }}>
                      {student.phone_number}
                    </Typography>
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  School:{" "}
                  <Typography component="span" sx={{ fontWeight: "bold" }}>
                    {student.school}
                  </Typography>
                </Typography>
              </Paper>
            ))
          ) : (
            <Box
              sx={{
                gridColumn: "1 / -1", // make it span full width of grid
                textAlign: "center",
                mt: 4,
                p: 2,
              }}
            >
              <NotFound />{" "}
              {/* You can remove this line if you only want text */}
              <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                {selectedSchool
                  ? `No students found for ${selectedSchool}`
                  : "No students available at the moment"}
              </Typography>
            </Box>
          )}
        </Box>
      )}

      <Footer showButton={false} />
    </>
  );
};

export default AllStudents;
