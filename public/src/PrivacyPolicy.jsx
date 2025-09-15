import React from "react";
import Navbar from "./Navbar.jsx";

export default function PrivacyPolicy() {
  return (
    <div>
      <Navbar />
      <div style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
        lineHeight: 1.6,
        color: "#333",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "#f5f5f5"
      }}>
        <div style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{
            color: "#2c3e50",
            borderBottom: "3px solid #3498db",
            paddingBottom: "0.5rem",
            marginBottom: "2rem"
          }}>Privacy Policy</h1>

          <p style={{
            backgroundColor: "#e8f4fd",
            padding: "1rem",
            borderRadius: "4px",
            marginBottom: "2rem",
            borderLeft: "4px solid #3498db"
          }}>Last updated: September 9, 2025</p>

          <section style={{marginBottom: "2rem"}}>
            <h2 style={{color: "#34495e", marginTop: "2rem", marginBottom: "1rem"}}>Information We Collect</h2>
            <p style={{marginBottom: "1rem"}}>Our Password Generator is designed with privacy in mind. We collect minimal information:</p>
            <ul style={{marginBottom: "1rem", paddingLeft: "1.5rem"}}>
              <li style={{marginBottom: "0.5rem"}}><strong>Generated Passwords:</strong> All passwords are generated locally in your browser and are not stored or transmitted to our servers.</li>
              <li style={{marginBottom: "0.5rem"}}><strong>Usage Analytics:</strong> We may collect anonymous usage statistics to improve our service, such as page views and general usage patterns.</li>
              <li style={{marginBottom: "0.5rem"}}><strong>Device Information:</strong> Basic technical information like browser type and operating system for compatibility purposes.</li>
            </ul>
          </section>

          <section style={{marginBottom: "2rem"}}>
            <h2 style={{color: "#34495e", marginTop: "2rem", marginBottom: "1rem"}}>How We Use Your Information</h2>
            <p style={{marginBottom: "1rem"}}>The limited information we collect is used solely to:</p>
            <ul style={{marginBottom: "1rem", paddingLeft: "1.5rem"}}>
              <li style={{marginBottom: "0.5rem"}}>Improve the functionality and performance of our password generator</li>
              <li style={{marginBottom: "0.5rem"}}>Analyze usage patterns to enhance user experience</li>
              <li style={{marginBottom: "0.5rem"}}>Ensure technical compatibility across different devices and browsers</li>
            </ul>
          </section>

          <section style={{marginBottom: "2rem"}}>
            <h2 style={{color: "#34495e", marginTop: "2rem", marginBottom: "1rem"}}>Data Security</h2>
            <p style={{marginBottom: "1rem"}}>Your privacy and security are our top priorities:</p>
            <ul style={{marginBottom: "1rem", paddingLeft: "1.5rem"}}>
              <li style={{marginBottom: "0.5rem"}}><strong>Local Generation:</strong> All passwords are generated using cryptographically secure random number generation directly in your browser</li>
              <li style={{marginBottom: "0.5rem"}}><strong>No Storage:</strong> We do not store, log, or transmit any generated passwords</li>
              <li style={{marginBottom: "0.5rem"}}><strong>HTTPS Encryption:</strong> All communications with our website are encrypted using industry-standard SSL/TLS protocols</li>
              <li style={{marginBottom: "0.5rem"}}><strong>No Third-Party Sharing:</strong> We do not sell, trade, or share any user data with third parties</li>
            </ul>
          </section>

          <section style={{marginBottom: "2rem"}}>
            <h2 style={{color: "#34495e", marginTop: "2rem", marginBottom: "1rem"}}>Cookies and Tracking</h2>
            <p style={{marginBottom: "1rem"}}>Our website may use:</p>
            <ul style={{marginBottom: "1rem", paddingLeft: "1.5rem"}}>
              <li style={{marginBottom: "0.5rem"}}><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li style={{marginBottom: "0.5rem"}}><strong>Analytics Cookies:</strong> Anonymous data to understand how users interact with our site</li>
              <li style={{marginBottom: "0.5rem"}}><strong>No Tracking:</strong> We do not use invasive tracking technologies or create detailed user profiles</li>
            </ul>
          </section>

          <section style={{marginBottom: "2rem"}}>
            <h2 style={{color: "#34495e", marginTop: "2rem", marginBottom: "1rem"}}>Third-Party Services</h2>
            <p style={{marginBottom: "1rem"}}>We may use third-party services for:</p>
            <ul style={{marginBottom: "1rem", paddingLeft: "1.5rem"}}>
              <li style={{marginBottom: "0.5rem"}}>Website analytics (with anonymized data)</li>
              <li style={{marginBottom: "0.5rem"}}>Content delivery and website hosting</li>
              <li style={{marginBottom: "0.5rem"}}>These services operate under their own privacy policies and do not have access to your generated passwords</li>
            </ul>
          </section>

          <section style={{marginBottom: "2rem"}}>
            <h2 style={{color: "#34495e", marginTop: "2rem", marginBottom: "1rem"}}>Your Rights</h2>
            <p style={{marginBottom: "1rem"}}>You have the right to:</p>
            <ul style={{marginBottom: "1rem", paddingLeft: "1.5rem"}}>
              <li style={{marginBottom: "0.5rem"}}>Use our service completely anonymously</li>
              <li style={{marginBottom: "0.5rem"}}>Disable cookies in your browser settings</li>
              <li style={{marginBottom: "0.5rem"}}>Contact us with any privacy concerns or questions</li>
              <li style={{marginBottom: "0.5rem"}}>Request information about any data we may have collected</li>
            </ul>
          </section>

          <section style={{marginBottom: "2rem"}}>
            <h2 style={{color: "#34495e", marginTop: "2rem", marginBottom: "1rem"}}>Children's Privacy</h2>
            <p style={{marginBottom: "1rem"}}>Our service is suitable for all ages. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.</p>
          </section>

          <section style={{marginBottom: "2rem"}}>
            <h2 style={{color: "#34495e", marginTop: "2rem", marginBottom: "1rem"}}>Changes to This Policy</h2>
            <p style={{marginBottom: "1rem"}}>We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.</p>
          </section>

          <section style={{marginBottom: "2rem"}}>
            <h2 style={{color: "#34495e", marginTop: "2rem", marginBottom: "1rem"}}>Open Source Commitment</h2>
            <p style={{marginBottom: "1rem"}}>Our password generator is built with transparency in mind. The source code will be made available for public review to ensure the security and privacy of our implementation: <a href="https://github.com/muiznaveedrana/passwordgen" style={{color: "#3498db", textDecoration: "none"}}>https://github.com/muiznaveedrana/passwordgen</a></p>
          </section>

          <div style={{
            backgroundColor: "#ecf0f1",
            padding: "1rem",
            borderRadius: "4px",
            marginTop: "2rem"
          }}>
            <h2 style={{color: "#34495e", marginTop: 0, marginBottom: "1rem"}}>Contact Us</h2>
            <p style={{marginBottom: 0}}>If you have any questions about this Privacy Policy or our practices, please contact us through our website or repository.</p>
          </div>
        </div>
      </div>
    </div>
  );
}