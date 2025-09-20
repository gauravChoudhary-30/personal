import React, { useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import Footer from "../components/footer";

const Login = () => {
  const [credentials, setCredentials] = useState({ mob: null });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async() => {

    const response = await login(credentials);
    console.log(response);
    if(response){
        alert("Login Successful");
        console.log("Login Successful");
        navigate("/");
    } else{
        alert("Login Failed");
        console.log("Login Failed");
        setError("Invalid Credentials");
    }
  };

  return (
    <>
      <Navbar title="EzyFee" showMenuIcon={true}/>
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.heading}>Login</h2>
          {error && <p style={styles.error}>{error}</p>}

          <input
            type="text"
            name="mob"
            placeholder="Enter your Mobile Number"
            value={credentials.mob}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    backgroundColor: "#f4f4f4",
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#506645",
    color: "#fff",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    fontSize: "16px",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
};

export default Login;
