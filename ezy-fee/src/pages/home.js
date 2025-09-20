import React, { useState } from "react";
import Navbar from "../components/navbar";
import SidebarMenu from "../components/sidebar";
import Footer from "../components/footer";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Login", link: "/login" },
  ];

  return (
    <>
      {/* Navigation Bar */}
      <Navbar title="EzyFee" showMenuIcon={true} />
      <SidebarMenu isOpen={menuOpen} onClose={toggleMenu} menuItems={menuItems} />

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <div style={styles.heroContent}>
            <h1 style={styles.heading}>Aapke laadle ki suraksha, hamari pehli prathmikta!</h1>
            <p style={styles.subheading}>Your child’s safety, our responsibility!</p>
            <button style={styles.ctaButton}>Get Started</button>
          </div>
        </div>

        {/* Features Section */}
        <div style={styles.hero}>
          <img src="https://i.imgur.com/YvOIrjO.png" alt="Car Payment Illustration" style={styles.heroImage} />
          <h1 style={styles.title}>Hassle-Free Monthly Auto Fees!</h1>
          <p style={styles.subtitle}>Never miss a payment again with EzyFee.</p>
          <button style={styles.payNowButton}>Pay Now</button>
        </div>

        {/* Monthly Fee Reminder Section */}
        <div style={styles.reminderSection}>
          <h2>Stay Updated on Your Payments</h2>
          <p>We send friendly reminders so you never forget your car’s monthly fee!</p>
          <img src="https://i.imgur.com/KIqH6pU.png" alt="Reminder Illustration" style={styles.reminderImage} />
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </>
  );
};

const styles = {
  drawer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "250px",
    height: "100%",
    backgroundColor: "#506645",
    paddingTop: "60px",
    transition: "transform 0.3s ease-in-out",
    zIndex: 1200,
  },
  closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "none",
    color: "#fff",
    fontSize: "20px",
    border: "none",
    cursor: "pointer",
  },
  menuList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  menuItem: {
    padding: "15px",
    color: "#fff",
    cursor: "pointer",
    textAlign: "left",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1100,
  },
  mainContent: {
    marginTop: "80px",
    padding: "20px",
    textAlign: "center",
  },
  hero: {
    backgroundColor: "#f5f5f5",
    padding: "30px",
    borderRadius: "10px",
  },
  heroImage: {
    width: "80%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  subtitle: {
    fontSize: "18px",
    color: "#666",
  },
  payNowButton: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#506645",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  reminderSection: {
    marginTop: "40px",
  },
  reminderImage: {
    width: "80%",
    maxWidth: "300px",
  },
  heroSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundImage: "url('https://source.unsplash.com/1600x900/?family,security')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    padding: "20px",
  },
  heroContent: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  subheading: {
    fontSize: "1.2rem",
    marginTop: "10px",
  },
  ctaButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#506645",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  
};

export default Home;
