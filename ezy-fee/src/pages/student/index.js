import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../components/footer";
import BackButtonBar from "../../components/BackButtonBar";
import { getStudentByNC } from "../../api/student";
import SchoolBus from "../../lotties/schoolBus";
import NotFound from "../../lotties/notFound";
import { Box, LinearProgress, Typography, Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import {
  faIdCard,
  faMoneyBill,
  faUsers,
  faPhone,
  faMapMarkerAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const Student = () => {
  const [params] = useSearchParams();
  const ncNo = params.get("nc");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setErrorMessage(""); // reset error

    const fetchStudentByNC = async () => {
      try {
        const response = await getStudentByNC(ncNo);

        if (response.data) {
          setStudent(response.data);
        } else {
          setStudent(null);
          setErrorMessage("Oops! Student not found.");
        }
      } catch (error) {
        console.log("Error fetching student:", error);
        setErrorMessage("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
      fetchStudentByNC();
  }, [ncNo]);

  return (
    <>
      <BackButtonBar buttonText={'PAYMENT'} onClick={() => navigate(`/student/payment?nc=${ncNo}`)} />

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
            Please check the NC number and try again.
          </Typography>
        </Box>
      ) : (
        // Student Details
        <Box
          sx={{
            mt: "120px",
            mb: "60px",
            px: 2,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {/* Profile Card */}
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              textAlign: "center",
              backgroundColor: "#fafafa",
              border: "1px solid #eee",
              position: "relative",
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "-40px", // move icon up (half out of box)
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "8px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <FontAwesomeIcon
                icon={faCircleUser}
                style={{
                  fontSize: "5rem",
                  color: "#1976d2",
                }}
              />
            </Box>

            <Box sx={{ mt: 6 }}>
              <Typography variant="h6" fontWeight="bold">
                {student?.student_name || "-"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Class {student?.class_section || "-"} · {student?.school || "-"}
              </Typography>
            </Box>
          </Paper>

          {/* Details Grid */}
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            sx={{ mt: 3, mb: 1 }}
          >
            Student Details
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row", // stack vertically
              gap: 2, // spacing between cards
              width: "100%",
            }}
          >
            {/* NC Number */}
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                textAlign: "center",
                backgroundColor: "#fafafa",
                border: "1px solid #eee",
                width: "100%", // full width
              }}
            >
              <FontAwesomeIcon
                icon={faIdCard}
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "0.75rem",
                  color: "#1976d2",
                }}
              />
              <Typography variant="h6" fontWeight="bold">
                {student?.nc || "-"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                NC Number
              </Typography>
            </Paper>

            {/* Monthly Fee */}
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                textAlign: "center",
                backgroundColor: "#fafafa",
                border: "1px solid #eee",
                width: "100%", // full width
              }}
            >
              <FontAwesomeIcon
                icon={faMoneyBill}
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "0.75rem",
                  color: "#1976d2",
                }}
              />
              <Typography variant="h6" fontWeight="bold">
                {student?.monthly_fees || "-"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Monthly Fee
              </Typography>
            </Paper>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row", // stack vertically
              gap: 2, // spacing between cards
              width: "100%",
              marginTop: 2,
            }}
          >
            {/* NC Number */}
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                textAlign: "center",
                backgroundColor: "#fafafa",
                border: "1px solid #eee",
                width: "100%", // full width
              }}
            >
              <FontAwesomeIcon
                icon={faUsers}
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "0.75rem",
                  color: "#1976d2",
                }}
              />
              <Typography variant="h6" fontWeight="bold">
                {student?.no_of_students || "-"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No of Students
              </Typography>
            </Paper>

            {/* Monthly Fee */}
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                textAlign: "center",
                backgroundColor: "#fafafa",
                border: "1px solid #eee",
                width: "100%", // full width
              }}
              onClick={() => {
                navigate(`tel:${student?.phone_number}`);
              }}
            >
              <FontAwesomeIcon
                icon={faPhone}
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "0.75rem",
                  color: "#1976d2",
                }}
              />
              <Typography variant="h6" fontWeight="bold">
                {student?.phone_number || "-"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Mobile Number
              </Typography>
            </Paper>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row", // stack vertically
              gap: 2, // spacing between cards
              width: "100%",
              marginTop: 2,
            }}
          >
            {/* NC Number */}
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                textAlign: "center",
                backgroundColor: "#fafafa",
                border: "1px solid #eee",
                width: "100%", // full width
              }}
            >
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "0.75rem",
                  color: "#1976d2",
                }}
              />
              <Typography variant="h6" fontWeight="bold">
                Qr.No.- {student?.address.qr_no || "-"}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                Sector- {student?.address.sector_1 || "-"}/
                {student?.address.sector_2 || "-"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Address
              </Typography>
            </Paper>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // centers horizontally
              marginTop: 2,
              width: "100%", // take full available width
            }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                textAlign: "center",
                backgroundColor: "#fafafa",
                border: "1px solid #eee",
                width: "50%", // optional, control the card size
                minWidth: 200, // optional, ensures card doesn't shrink too much
              }}
            >
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "0.75rem",
                  color: "#1976d2",
                }}
              />
              <Typography variant="h6" fontWeight="bold">
                {student?.going_from.day || "-"} /{" "}
                {student?.going_from.month || "-"} /{" "}
                {student?.going_from.year || "-"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Going From
              </Typography>
            </Paper>
          </Box>
        </Box>
      )}

      <Footer showButton={false} />
    </>
  );
};

export default Student;
