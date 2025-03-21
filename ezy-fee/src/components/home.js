import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.menuIcon} onClick={toggleMenu}>☰</div>
        <div style={styles.logo}>EzyFee</div>
      </nav>

      {/* Side Drawer Menu */}
      <div style={{ ...styles.drawer, transform: menuOpen ? "translateX(0)" : "translateX(-100%)" }}>
        <button style={styles.closeButton} onClick={toggleMenu}>✖</button>
        <ul style={styles.menuList}>
          <li style={styles.menuItem}>Home</li>
          <li style={styles.menuItem}>About</li>
          <li style={styles.menuItem}>Login</li>
        </ul>
      </div>

      {/* Overlay to close drawer */}
      {menuOpen && <div style={styles.overlay} onClick={toggleMenu}></div>}

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
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          {/* Phone */}
          <div style={styles.footerItem}>
          <h1>EzyFee - Choudhary Auto Agency</h1>
          </div>
          <div style={styles.footerItem}>
            <FontAwesomeIcon icon={faPhone} style={styles.icon} />
            <div>
              <p>+91 8210443680, +91 8987896845</p>
            </div>
          </div>

          {/* Email */}
          <div style={styles.footerItem}>
            <FontAwesomeIcon icon={faEnvelope} style={styles.icon} />
            <div>
              <p>karunasingh14121974@gmail.com, thisisgaurav30@gmail.com</p>
            </div>
          </div>

          {/* Address */}
          <div style={styles.footerItem}>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={styles.icon} />
            <div>
              <p>House Number: 2105, Sector: 11/D, Bokaro Steel City, Jharkhand, Pin: 827009</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#506645",
    color: "#fff",
    position: "fixed",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  menuIcon: {
    fontSize: "24px",
    cursor: "pointer",
    zIndex: 1100,
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    position: "absolute",
    right: "70px",
  },
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
  footer: {
    backgroundColor: "#506645",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
    marginTop: "40px",
  },
  footerContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    gap: "10px",
  },
  footerItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    fontSize: "20px",
  },
};

export default Home;
