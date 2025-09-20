import React ,{useState }from "react";

const Navbar = ({ title, showMenuIcon }) => {
    const [menuOpen, setMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };
  return (
    <nav style={styles.navbar}>
      {showMenuIcon && (
        <div style={styles.menuIcon} onClick={toggleMenu}>
          ☰
        </div>
      )}
      {title && <div style={styles.logo}>{title}</div>}
    </nav>
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
};

export default Navbar;
