import React, { useEffect, useState } from "react";
import BackButtonBar from "../../components/BackButtonBar";
import { useSearchParams } from "react-router-dom";
import { getStudentByNC } from "../../api/student";
import {
  Box,
  LinearProgress,
  Typography,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import SchoolBus from "../../lotties/schoolBus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/footer";
import {
  getLastDues,
  paymentByNC,
  getLastPayment,
  getPaidMonths,
} from "../../api/paymentApis";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const years = Array.from({ length: 16 }, (_, i) => 2020 + i); // 2020-2035

const Payment = () => {
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [paymentInput, setPaymentInput] = useState("");
  const [lastDues, setLastDues] = useState({
    id: "--",
    nc: "--",
    due_amount: "--",
    lastUpdated: "--",
  });
  const [lastPayment, setLastPayment] = useState({
    id: "--",
    nc: "--",
    paid_amount: "--",
    paid_month: "--",
    paid_no_of_months: "--",
    payment_date: "--",
    year: "--",
    mode: "--",
    taken_by: "--",
  });
  const [mode, setMode] = useState("");
  const [takenBy, setTakenBy] = useState("");
  const [paidMonthsByYear, setPaidMonthsByYear] = useState([]);
  const ncNo = params.get("nc");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const studRes = await getStudentByNC(ncNo);
        if (studRes.data) {
          setStudent(studRes.data);
        } else {
          setStudent(null);
        }
        const duesRes = await getLastDues(ncNo);
        if (duesRes.data) {
          setLastDues(duesRes.data);
        } else {
          setLastDues({
            id: "--",
            nc: "--",
            due_amount: "--",
            lastUpdated: "--",
          });
        }
        const paymentRes = await getLastPayment(ncNo);
        if (paymentRes.data) {
          setLastPayment(paymentRes.data);
        } else {
          setLastPayment({
            id: "--",
            nc: "--",
            paid_amount: "--",
            paid_month: "--",
            paid_no_of_months: "--",
            payment_date: "--",
            year: "--",
            mode: "--",
            taken_by: "--",
          });
        }
        const paidMonthsRes = await getPaidMonths(ncNo);
        if (paidMonthsRes?.data) {
          setPaidMonthsByYear(paidMonthsRes.data); // save aggregated months by year
        } else {
          setPaidMonthsByYear([]);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        setLastDues({
          id: "--",
          nc: "--",
          due_amount: "--",
          lastUpdated: "--",
        });
        setLastPayment({
          id: "--",
          nc: "--",
          paid_amount: "--",
          paid_month: "--",
          paid_no_of_months: "--",
          payment_date: "--",
          year: "--",
          mode: "--",
          taken_by: "--",
        });
        setPaidMonthsByYear([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [ncNo]);

  const paidMonthsForSelectedYear =
  paidMonthsByYear.find((p) => p.year === selectedYear)?.months || [];
 // Handle month click
const handleMonthClick = (month) => {
  // Only allow selection if the month is not already paid for the selected year
  if (!paidMonthsForSelectedYear.includes(month)) {
    setSelectedMonths((prev) =>
      prev.includes(month)
        ? prev.filter((m) => m !== month) // deselect if already selected
        : [...prev, month] // add if not selected
    );
  }
};

// --- Bill calculations ---
const monthlyFee = student?.monthly_fees || 0; // use correct field from student schema
const unpaidSelectedMonths = selectedMonths.filter(
  (m) => !paidMonthsForSelectedYear.includes(m)
);

const dueAmount =
  lastDues?.due_amount === "--" ? 0 : Number(lastDues?.due_amount || 0);

const totalAmount = unpaidSelectedMonths.length * monthlyFee + dueAmount;

  const handlePayment = async () => {
    const paid = parseInt(paymentInput || 0, 10);
    if (isNaN(paid) || paid <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (!mode || !takenBy) {
      alert("Please select both Mode and Taken By before proceeding.");
      return;
    }
    const newDue = Math.max(totalAmount - paid, 0);
    const payload = {
      nc: ncNo,
      fee_per_month: student?.monthly_fees || 0,
      paid_amount: paid,
      paid_month: unpaidSelectedMonths,
      paid_no_of_months: unpaidSelectedMonths.length,
      payment_date: new Date(),
      year: selectedYear,
      mode,
      taken_by: takenBy,
    };

    try {
      const paymentRes = await paymentByNC(payload);
      if (paymentRes?.status === 201) {
        alert("Payment recorded successfully!", newDue);
      } else {
        alert("Failed to record payment. Please try again.");
      }
    } catch (err) {
      console.error("Payment API error:", err);
      alert("Error while processing payment.");
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
      ) : (
        <Box
          sx={{
            mt: "80px",
            mb: "60px",
            px: 2,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {/* Last Bill Bar */}
          {student && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">
                Name: {student?.student_name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                NC No: {student?.nc}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              background: "#e9ecef",
              borderRadius: 2,
              p: 2,
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                Last Bill Paid: ₹
                {lastPayment?.paid_amount === "--"
                  ? "--"
                  : lastPayment?.paid_amount}
              </Typography>
              <Typography variant="subtitle2">
                Date:{" "}
                {lastPayment?.payment_date === "--"
                  ? "--"
                  : new Date(lastPayment?.payment_date).toLocaleDateString(
                      "en-IN"
                    )}
              </Typography>
              <Typography variant="subtitle2">
                Months Paid:{" "}
                {lastPayment?.paid_month === "--"
                  ? "--"
                  : Array.isArray(lastPayment?.paid_month)
                  ? lastPayment?.paid_month.join(", ")
                  : lastPayment?.paid_month}
              </Typography>
              <Typography variant="subtitle2">
                Mode: {lastPayment?.mode || "--"}
              </Typography>
              <Typography variant="subtitle2">
                Taken By: {lastPayment?.taken_by.charAt(0).toUpperCase() + lastPayment?.taken_by.slice(1) || "--"}
              </Typography>
            </Box>
            <Typography variant="subtitle1" fontWeight="bold" color="error">
              Dues: ₹{lastDues.due_amount === "--" ? "--" : lastDues.due_amount}
            </Typography>
          </Box>

          {/* Bill Preview */}
          <Box
            sx={{
              backgroundColor: "#e6f2ff",
              borderRadius: 2,
              p: 2,
              mb: 3,
            }}
          >
            {[
              { label: "Monthly Fee", value: `₹${monthlyFee}` },
              {
                label: "Months Selected",
                value: unpaidSelectedMonths.length || "0",
              },
              {
                label: "Amount for Months",
                value: `₹${unpaidSelectedMonths.length * monthlyFee}`,
              },
              {
                label: "Previous Dues",
                value: `₹${lastDues?.due_amount ?? "--"}`,
                color: "error.main",
              },
              { label: "Total Amount", value: `₹${totalAmount}` },
            ].map((item, index, arr) => (
              <Box
                key={item.label}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  py: 1,
                  borderBottom:
                    index !== arr.length - 1 ? "1px solid #ccc" : "none",
                }}
              >
                <Typography variant="body1">{item.label}</Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color={item.color || "inherit"}
                >
                  {item.value}
                </Typography>
              </Box>
            ))}
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              {/* Payment Mode Dropdown */}
              <Select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                size="small"
                fullWidth
                displayEmpty
                sx={{ backgroundColor: "#fff", flex: 1 }}
                renderValue={(selected) =>
                  selected === "" ? (
                    <span style={{ color: "#aaa" }}>Select Mode</span>
                  ) : (
                    selected.charAt(0).toUpperCase() + selected.slice(1)
                  )
                }
              >
                <MenuItem value="" disabled>
                  Select Mode
                </MenuItem>
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="online">Online</MenuItem>
              </Select>

              {/* Taken By Dropdown */}
              <Select
                value={takenBy}
                onChange={(e) => setTakenBy(e.target.value)}
                size="small"
                fullWidth
                displayEmpty
                sx={{ backgroundColor: "#fff", flex: 1 }}
                renderValue={(selected) =>
                  selected === "" ? (
                    <span style={{ color: "#aaa" }}>Select Taken By</span>
                  ) : (
                    selected.charAt(0).toUpperCase() + selected.slice(1)
                  )
                }
              >
                <MenuItem value="" disabled>
                  Select Taken By
                </MenuItem>
                <MenuItem value="sudhir">Sudhir</MenuItem>
                <MenuItem value="rajesh">Rajesh</MenuItem>
                <MenuItem value="karuna">Karuna</MenuItem>
              </Select>
            </Box>

            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <TextField
                label="Enter Payment Amount"
                type="number"
                size="small"
                value={paymentInput}
                onChange={(e) => setPaymentInput(e.target.value)}
                sx={{ flex: 1, backgroundColor: "#fff" }}
                inputProps={{ min: 0 }}
              />

              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handlePayment}
              >
                Pay
              </Button>
            </Box>
          </Box>

          {/* Year Dropdown */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Select Year
            </Typography>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              fullWidth
              size="medium" // reduced height
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300, // shorter dropdown menu
                  },
                },
              }}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Month Grid */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Select Months for Payment
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              marginTop: 2,
            }}
          >
            {months.map((month) => {
              const isPaid = paidMonthsForSelectedYear.includes(month);
              const isSelected = selectedMonths.includes(month);

              return (
                <Box
                  key={month}
                  onClick={() => handleMonthClick(month)}
                  sx={{
                    position: "relative",
                    padding: 2,
                    borderRadius: 2,
                    textAlign: "center",
                    cursor: isPaid ? "not-allowed" : "pointer",
                    opacity: isPaid ? 0.6 : 1,
                    backgroundColor: isPaid
                      ? "#d4edda" // green for paid
                      : isSelected
                      ? "#cce5ff" // blue for selected
                      : "#f5f5f5", // default gray
                    border: isSelected ? "2px solid #007bff" : "1px solid #ccc",
                    transition: "all 0.2s",
                    "&:hover": {
                      backgroundColor: !isPaid
                        ? isSelected
                          ? "#b8daff"
                          : "#e0e0e0"
                        : "#d4edda",
                    },
                  }}
                >
                  <Typography variant="subtitle1">{month}</Typography>
                  {isPaid && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      color="#28a745"
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        fontSize: 20,
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
      <Footer showButton={false} />
    </>
  );
};

export default Payment;
