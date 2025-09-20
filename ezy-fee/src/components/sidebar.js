import React from "react";

const SidebarMenu = ({ isOpen, onClose, menuItems }) => {
  return (
    <>
      {/* Sidebar Drawer */}
      <div
        style={{
          ...styles.drawer,
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <button style={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <ul style={styles.menuList}>
          {menuItems.map((item, index) => (
            <li key={index} style={styles.menuItem}>
              <a href={item.link} style={styles.menuLink}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay to close drawer */}
      {isOpen && <div style={styles.overlay} onClick={onClose}></div>}
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
    cursor: "pointer",
    textAlign: "left",
  },
  menuLink: {
    color: "#fff",
    textDecoration: "none",
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
};

export default SidebarMenu;
