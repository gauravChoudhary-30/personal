import React, { useEffect, useState } from "react";
import { Box, Button, LinearProgress, Paper, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { addNewSchool, getAllSchools } from "../api/school";
import BackButtonBar from "../components/BackButtonBar";
import Footer from "../components/footer";
import NotFound from "../lotties/notFound";
import SchoolBus from "../lotties/schoolBus";
import AddSchoolSheet from "../components/AddSchoolSheet";

const ManageSchools = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [allSchools, setAllSchools] = useState([]);
  const [openAddSheet, setOpenAddSheet] = useState(false);
  const [schoolName, setSchoolName] = useState("");
  const [slug, setSlug] = useState("");
  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await getAllSchools();
      if (response?.data) {
        setAllSchools(response.data);
        setErrorMessage("");
      } else {
        setAllSchools([]);
        setErrorMessage(response?.message || "No schools found");
      }
    } catch (error) {
      console.error("Error fetching Schools:", error);
      setErrorMessage("Error fetching Schools list");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSchools();
  }, []);

  const handleAddSchool = async (e) => {
    e.preventDefault();

    if (!schoolName.trim() || !slug.trim()) {
      alert("Please enter both School Name and Slug");
      return;
    }
    try {
      setLoading(true);
      const payload = {
        name: schoolName.trim(),
        slug: slug.trim(),
      };
      const response = await addNewSchool(payload);
      if (response?.data) {
        alert("School added successfully");
        fetchSchools();
      }
    } catch (error) {
      alert("Error adding school");
    } finally {
      setLoading(false);
      setOpenAddSheet(false);
    }
  };

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
              Manage Schools
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total: {allSchools.length} schools
            </Typography>
          </Paper>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              startIcon={<FontAwesomeIcon icon={faPlus} />}
              onClick={() => setOpenAddSheet(true)}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                backgroundColor: "#1976d2",
              }}
            >
              Add School
            </Button>
          </Box>
          {allSchools.length === 0 ? (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                textAlign: "center",
                gridColumn: "1 / -1",
                mt: 4,
              }}
            >
              <NotFound /> No schools available
            </Typography>
          ) : (
            allSchools.map((school) => (
              <Paper
                key={school.slug}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "#fafafa",
                  border: "1px solid #eee",
                  position: "relative",
                  overflow: "visible",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#1976d2" }}
                >
                  {school.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Slug:{" "}
                  <Typography
                    component="span"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    {school.slug}
                  </Typography>
                </Typography>
              </Paper>
            ))
          )}
        </Box>
      )}
      <AddSchoolSheet
        open={openAddSheet}
        onClose={() => setOpenAddSheet(false)}
        handleSubmit={handleAddSchool}
        schoolName={schoolName}
        setSchoolName={setSchoolName}
        slug={slug}
        setSlug={setSlug}
      />

      <Footer showButton={false} />
    </>
  );
};

export default ManageSchools;
