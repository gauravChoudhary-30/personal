import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
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
    )
}
const styles = {
    footer: {
        backgroundColor: "#506645",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
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
    }

export default Footer;