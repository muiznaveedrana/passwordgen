import React, { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Password Generator", href: "/", active: window.location.pathname === "/" },
    { name: "Password Checker", href: "/passwordchecker.html", active: window.location.pathname.includes("passwordchecker") },
    { name: "Breach Checker", href: "/breachchecker.html", active: window.location.pathname.includes("breachchecker") },
    { name: "Security Quiz", href: "/securityquiz.html", active: window.location.pathname.includes("securityquiz") },
    { name: "Privacy Policy", href: "/privacy.html", active: window.location.pathname.includes("privacy") }
  ];

  return (
    <nav style={{
      background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      borderBottom: "1px solid #e0e0e0"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 1rem"
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "60px"
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <a
              href="/"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#333",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              🔐 PasswordGen
            </a>
          </div>

          {/* Desktop Navigation */}
          <div style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center"
          }} className="desktop-nav">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                style={{
                  color: "#333",
                  textDecoration: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                  fontSize: "1rem",
                  fontWeight: "500",
                  background: item.active ? "#e9ecef" : "transparent",
                  border: item.active ? "1px solid #dee2e6" : "1px solid transparent"
                }}
                onMouseEnter={(e) => {
                  if (!item.active) {
                    e.target.style.background = "#f8f9fa";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.active) {
                    e.target.style.background = "transparent";
                  }
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#333",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "0.5rem"
            }}
            className="mobile-menu-btn"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div style={{
            display: "none",
            flexDirection: "column",
            gap: "0.5rem",
            paddingBottom: "1rem",
            borderTop: "1px solid #e0e0e0",
            paddingTop: "1rem"
          }} className="mobile-nav">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                style={{
                  color: "#333",
                  textDecoration: "none",
                  padding: "0.75rem 1rem",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                  fontSize: "1rem",
                  fontWeight: "500",
                  background: item.active ? "#e9ecef" : "transparent"
                }}
                onMouseEnter={(e) => {
                  if (!item.active) {
                    e.target.style.background = "#f8f9fa";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.active) {
                    e.target.style.background = "transparent";
                  }
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-nav {
            display: flex !important;
          }
        }
        `
      }} />
    </nav>
  );
}