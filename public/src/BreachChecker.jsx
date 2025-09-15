import React, { useState } from "react";
import Navbar from "./Navbar.jsx";

export default function BreachChecker() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [hasChecked, setHasChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // SHA-1 hash function
  const sha1 = async (str) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex.toUpperCase();
  };

  const checkPassword = async () => {
    if (!password) {
      setError("Please enter a password to check");
      return;
    }

    if (password.length < 1) {
      setError("Please enter a password");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);
    setHasChecked(false);

    try {
      // Step 1: Hash the password using SHA-1
      const hash = await sha1(password);

      // Step 2: Send the first 5 characters to the API
      const prefix = hash.substring(0, 5);
      const suffix = hash.substring(5);

      // Step 3: Query the HaveIBeenPwned Pwned Passwords API
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);

      if (!response.ok) {
        throw new Error("Failed to check password");
      }

      const responseText = await response.text();

      // Step 4: Check if our hash suffix appears in the results
      const lines = responseText.split('\n');
      let pwnCount = 0;
      let found = false;

      for (const line of lines) {
        const [hashSuffix, count] = line.split(':');
        if (hashSuffix.trim() === suffix) {
          pwnCount = parseInt(count.trim(), 10);
          found = true;
          break;
        }
      }

      setResult({
        isCompromised: found,
        count: pwnCount,
        hash: hash
      });
      setHasChecked(true);

    } catch (err) {
      console.error('Error checking password:', err);
      setError("Unable to check password at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (count) => {
    if (count > 1000000) return "#d32f2f"; // Very High - Red
    if (count > 100000) return "#f57c00";  // High - Orange
    if (count > 10000) return "#fbc02d";   // Medium - Yellow
    if (count > 100) return "#ff9800";     // Low-Medium - Orange
    return "#689f38"; // Low - Green
  };

  const getSeverityLabel = (count) => {
    if (count > 1000000) return "Very High Risk";
    if (count > 100000) return "High Risk";
    if (count > 10000) return "Medium Risk";
    if (count > 100) return "Low-Medium Risk";
    return "Low Risk";
  };

  // Clear all data when component unmounts
  React.useEffect(() => {
    return () => {
      setPassword("");
      setResult(null);
      setError("");
      setHasChecked(false);
      setShowPassword(false);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <header>
          <h1 className="title">Password Breach Checker</h1>
          <p className="subtitle">Check if your password has been compromised in known data breaches. Powered by HaveIBeenPwned's Pwned Passwords database with over 850 million compromised passwords. Uses k-anonymity to protect your privacy.</p>
        </header>

        <div className="card">
          <h2 className="section-title">Check Your Password</h2>
          <p style={{marginBottom: "1.5rem", color: "#666"}}>Enter a password to see if it has been compromised in data breaches. Your password is hashed locally and never sent to our servers.</p>

          <div className="form-group">
            <label className="input-label" style={{display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333"}}>
              Password to Check:
            </label>
            <div style={{display: "flex", gap: "0.5rem", marginBottom: "2rem"}}>
              <div style={{position: "relative", flex: 1}}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter password to check..."
                  className="modern-input"
                  style={{
                    width: "100%",
                    padding: "1rem 3rem 1rem 1rem",
                    fontSize: "1.1rem",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    transition: "border-color 0.3s ease",
                    boxSizing: "border-box"
                  }}
                  onFocus={(e) => e.target.style.borderColor = "#4CAF50"}
                  onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
                  onKeyPress={(e) => e.key === 'Enter' && checkPassword()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    color: "#666",
                    padding: "0.25rem",
                    borderRadius: "4px",
                    transition: "color 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.color = "#333"}
                  onMouseLeave={(e) => e.target.style.color = "#666"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
              <button
                onClick={checkPassword}
                disabled={isLoading}
                style={{
                  padding: "1rem 2rem",
                  backgroundColor: isLoading ? "#ccc" : "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "background-color 0.3s ease",
                  whiteSpace: "nowrap"
                }}
                onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = "#45a049")}
                onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = "#4CAF50")}
              >
                {isLoading ? "Checking..." : "Check Password"}
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              padding: "1rem",
              backgroundColor: "#ffebee",
              borderLeft: "4px solid #f44336",
              borderRadius: "4px",
              marginBottom: "1rem",
              color: "#d32f2f"
            }}>
              {error}
            </div>
          )}

          {hasChecked && result !== null && (
            <div style={{
              background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "1.5rem",
              marginTop: "1rem"
            }}>
              {!result.isCompromised ? (
                <div style={{textAlign: "center"}}>
                  <div style={{fontSize: "3rem", marginBottom: "1rem"}}>✅</div>
                  <h3 style={{color: "#2e7d32", marginBottom: "0.5rem"}}>Password Secure!</h3>
                  <p style={{color: "#666", margin: 0}}>
                    This password was not found in the HaveIBeenPwned database of compromised passwords.
                  </p>
                  <div style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                    borderRadius: "8px",
                    border: "1px solid rgba(76, 175, 80, 0.3)"
                  }}>
                    <p style={{margin: 0, fontSize: "0.9rem", color: "#2e7d32"}}>
                      ✓ Your password appears to be secure and has not been compromised in known data breaches.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{textAlign: "center", marginBottom: "2rem"}}>
                    <div style={{fontSize: "3rem", marginBottom: "1rem"}}>🚨</div>
                    <h3 style={{color: "#d32f2f", marginBottom: "0.5rem"}}>
                      Password Compromised!
                    </h3>
                    <p style={{color: "#666", margin: 0}}>
                      This password has been found in data breaches and should not be used.
                    </p>
                  </div>

                  <div style={{
                    border: "1px solid #ffcdd2",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    backgroundColor: "#ffebee"
                  }}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem"}}>
                      <div>
                        <h4 style={{margin: 0, marginBottom: "0.5rem", color: "#d32f2f", fontSize: "1.2rem"}}>
                          Password Found in Breaches
                        </h4>
                        <p style={{margin: 0, color: "#666", fontSize: "0.9rem"}}>
                          This password has been compromised {result.count.toLocaleString()} times
                        </p>
                      </div>
                      <div style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "12px",
                        fontSize: "0.9rem",
                        fontWeight: "600",
                        color: "white",
                        backgroundColor: getSeverityColor(result.count)
                      }}>
                        {getSeverityLabel(result.count)}
                      </div>
                    </div>

                    <div style={{
                      padding: "1rem",
                      backgroundColor: "white",
                      borderRadius: "6px",
                      border: "1px solid #ffcdd2",
                      marginBottom: "1rem"
                    }}>
                      <h5 style={{margin: 0, marginBottom: "0.5rem", color: "#d32f2f"}}>⚠️ Security Risk</h5>
                      <p style={{margin: 0, fontSize: "0.9rem", color: "#666", lineHeight: 1.5}}>
                        This password has appeared in {result.count.toLocaleString()} known data breaches.
                        Attackers commonly use lists of compromised passwords to gain unauthorized access to accounts.
                      </p>
                    </div>

                    <div style={{
                      padding: "1rem",
                      backgroundColor: "white",
                      borderRadius: "6px",
                      border: "1px solid #ffcdd2"
                    }}>
                      <h5 style={{margin: 0, marginBottom: "0.5rem", color: "#d32f2f"}}>🔒 Immediate Actions Required</h5>
                      <ul style={{margin: "0.5rem 0 0 1rem", padding: 0, fontSize: "0.9rem", color: "#666"}}>
                        <li style={{marginBottom: "0.25rem"}}>Change this password immediately on all accounts where it's used</li>
                        <li style={{marginBottom: "0.25rem"}}>Generate a new, unique password using our password generator</li>
                        <li style={{marginBottom: "0.25rem"}}>Enable two-factor authentication on important accounts</li>
                        <li>Consider using a password manager for unique passwords</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div style={{
                marginTop: "1.5rem",
                padding: "1rem",
                backgroundColor: "rgba(255,255,255,0.7)",
                borderRadius: "8px",
                border: "1px solid #f0f0f0"
              }}>
                <h5 style={{margin: 0, marginBottom: "0.5rem", color: "#333", fontSize: "0.9rem"}}>🔒 Privacy Protected</h5>
                <p style={{margin: 0, fontSize: "0.8rem", color: "#666", lineHeight: 1.4}}>
                  Your password was checked using k-anonymity. Only the first 5 characters of the password hash were sent to the API.
                  The full password never leaves your device and is not stored anywhere.
                </p>
              </div>
            </div>
          )}
        </div>

        <section className="seo-content">
          <h2>Understanding Password Security</h2>
          <p>Compromised passwords are a major security risk. Our password breach checker uses HaveIBeenPwned's database to help you identify if your passwords have been exposed in data breaches.</p>

          <div className="features-grid">
            <div className="feature">
              <h3>How K-Anonymity Works</h3>
              <p>We use k-anonymity to protect your privacy. Only the first 5 characters of your password's SHA-1 hash are sent to the API, ensuring your actual password never leaves your device.</p>
            </div>

            <div className="feature">
              <h3>Why Check Passwords?</h3>
              <p>Checking passwords against breach databases helps identify compromised credentials before attackers can exploit them to access your accounts.</p>
            </div>

            <div className="feature">
              <h3>What if Password is Compromised?</h3>
              <p>Change the password immediately on all accounts, generate new unique passwords, enable two-factor authentication, and consider using a password manager.</p>
            </div>

            <div className="feature">
              <h3>Complete Privacy</h3>
              <p>Your passwords are hashed locally using SHA-1. We never see your actual password, and the hash fragments are not stored or logged anywhere.</p>
            </div>
          </div>
        </section>

        <section className="password-tips">
          <h2>What to Do If Your Password Is Compromised</h2>
          <ul>
            <li><strong>Change password immediately</strong> - Update the compromised password on all accounts where it's used</li>
            <li><strong>Generate new unique passwords</strong> - Use our password generator to create strong, unique passwords</li>
            <li><strong>Enable two-factor authentication</strong> - Add an extra layer of security to all important accounts</li>
            <li><strong>Use a password manager</strong> - Store unique passwords safely and avoid reusing passwords</li>
            <li><strong>Monitor your accounts</strong> - Watch for suspicious activity or unauthorized access attempts</li>
            <li><strong>Regular password audits</strong> - Periodically check your passwords against breach databases</li>
          </ul>
        </section>

        <section className="faq">
          <h2>Password Breach Checker FAQ</h2>
          <div className="faq-item">
            <h3>How accurate is this password breach checker?</h3>
            <p>This tool uses the HaveIBeenPwned Pwned Passwords database, which contains over 850 million compromised passwords from verified data breaches. It's the most comprehensive database of compromised passwords available.</p>
          </div>

          <div className="faq-item">
            <h3>Is it safe to enter my password?</h3>
            <p>Yes, it's completely safe. We use k-anonymity to protect your privacy. Your password is hashed locally using SHA-1, and only the first 5 characters of the hash are sent to the API. Your actual password never leaves your device.</p>
          </div>

          <div className="faq-item">
            <h3>What should I do if my password is compromised?</h3>
            <p>Change the password immediately on all accounts where it's used. Generate a new, unique password using our password generator, enable two-factor authentication, and consider using a password manager.</p>
          </div>

          <div className="faq-item">
            <h3>How does the k-anonymity model work?</h3>
            <p>Your password is hashed using SHA-1, then only the first 5 characters of the hash are sent to the API. The API returns all hashes starting with those 5 characters, and we check locally if yours matches any of them.</p>
          </div>

          <div className="faq-item">
            <h3>Can I check multiple passwords?</h3>
            <p>Yes, you can check as many passwords as you want by entering them one at a time. This is useful for auditing all your current passwords to ensure none have been compromised.</p>
          </div>

          <div className="faq-item">
            <h3>Why should I care if my password was breached?</h3>
            <p>Attackers often use lists of compromised passwords in credential stuffing attacks. If your password appears in breaches, it's likely being used by cybercriminals to attempt unauthorized access to accounts.</p>
          </div>
        </section>

        <footer style={{textAlign: 'center', padding: '2rem', marginTop: '3rem', borderTop: '1px solid #e0e0e0', color: '#666'}}>
          <p>© 2025 PasswordGen — Licensed under the MIT License</p>
        </footer>
      </div>
    </div>
  );
}