import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useState } from "react";
import SchoolBus from "../lotties/schoolBus";
import { Box, LinearProgress } from "@mui/material";

const Home = () => {
    const [loading, setLoading] = useState(false);
  
  return (
    <>
      {/* Navigation Bar */}
      <Navbar title="EzyFee" showMenuIcon={true} />
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
      ):(
        <></>
      )}
      <Footer showButton={true} />
    </>
  );
};


export default Home;
