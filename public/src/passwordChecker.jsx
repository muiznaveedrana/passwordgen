import React, { useState } from "react";
import Navbar from "./Navbar.jsx";

export default function PasswordChecker() {
  const [checkPassword, setCheckPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const checkPasswordStrength = (pwd) => {
    if (!pwd) {
      setPasswordStrength(null);
      return;
    }

    let score = 0;
    let feedback = [];
    let positives = [];
    let strengthLevel = "";
    let color = "";
    let maxScore = 10;

    // Length check with more detailed feedback
    if (pwd.length >= 16) {
      score += 3;
      positives.push("✓ Excellent length (16+ characters)");
    } else if (pwd.length >= 12) {
      score += 2;
      positives.push("✓ Good length (12+ characters)");
    } else if (pwd.length >= 8) {
      score += 1;
      positives.push("✓ Minimum acceptable length");
      feedback.push("Consider using 12+ characters for better security");
    } else if (pwd.length >= 6) {
      feedback.push("Password too short - use at least 8 characters");
      feedback.push("Aim for 12+ characters for strong security");
    } else {
      feedback.push("Password is very short - use at least 8 characters");
      feedback.push("Strong passwords should be 12+ characters long");
    }

    // Character variety checks with detailed feedback
    const hasLowercase = /[a-z]/.test(pwd);
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasNumbers = /[0-9]/.test(pwd);
    const hasBasicSymbols = /[!@#$%^&*()_+\-=\[\]{}|;':\",./<>?]/.test(pwd);
    const hasExtendedSymbols = /[~`\\]/.test(pwd);

    if (hasLowercase) {
      score += 1;
      positives.push("✓ Contains lowercase letters");
    } else {
      feedback.push("Add lowercase letters (a-z)");
    }

    if (hasUppercase) {
      score += 1;
      positives.push("✓ Contains uppercase letters");
    } else {
      feedback.push("Add uppercase letters (A-Z)");
    }

    if (hasNumbers) {
      score += 1;
      positives.push("✓ Contains numbers");
    } else {
      feedback.push("Add numbers (0-9)");
    }

    if (hasBasicSymbols) {
      score += 1;
      positives.push("✓ Contains special characters");
      if (hasExtendedSymbols) {
        score += 0.5;
        positives.push("✓ Uses diverse symbol types");
      }
    } else {
      feedback.push("Add special characters (!@#$%^&*)");
    }

    // Advanced pattern checks
    const hasRepeatedChars = /(..).*\1/.test(pwd) || /(..)\1/.test(pwd);
    const hasSequentialChars = /012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(pwd);
    const hasKeyboardPatterns = /qwerty|asdf|zxcv|1234|abcd|password|admin|login|user|guest|test|demo|welcome|master|root|default|dragon|monkey|baseball|football|princess|sunshine|shadow|welcome|iloveyou|trustno1/i.test(pwd);
    const hasPersonalData = /name|birth|date|phone|email|address|social|ssn|year|month|day/i.test(pwd);

    if (hasRepeatedChars) {
      score -= 1;
      feedback.push("Avoid repeated character patterns (e.g., 'aa', 'abab')");
    } else {
      positives.push("✓ No obvious repeated patterns");
    }

    if (hasSequentialChars) {
      score -= 1;
      feedback.push("Avoid sequential characters (e.g., '123', 'abc')");
    } else {
      positives.push("✓ No sequential character patterns");
    }

    if (hasKeyboardPatterns) {
      score -= 2;
      feedback.push("Avoid common words and keyboard patterns");
      feedback.push("Use random combinations instead of dictionary words");
    } else {
      positives.push("✓ No common dictionary words detected");
    }

    if (hasPersonalData) {
      score -= 1;
      feedback.push("Avoid personal information in passwords");
    }

    // Bonus points for good practices
    const uniqueChars = new Set(pwd).size;
    const uniqueRatio = uniqueChars / pwd.length;
    if (uniqueRatio > 0.7 && pwd.length > 8) {
      score += 0.5;
      positives.push("✓ Good character diversity");
    }

    // Entropy bonus
    if (pwd.length >= 12 && hasLowercase && hasUppercase && hasNumbers && hasBasicSymbols) {
      score += 1;
      positives.push("✓ High entropy password");
    }

    // Normalize score
    score = Math.max(0, Math.min(maxScore, score));

    // Determine strength level and color with more granular levels
    if (score <= 2) {
      strengthLevel = "Very Weak";
      color = "#d32f2f";
    } else if (score <= 4) {
      strengthLevel = "Weak";
      color = "#f57c00";
    } else if (score <= 6) {
      strengthLevel = "Fair";
      color = "#fbc02d";
    } else if (score <= 7.5) {
      strengthLevel = "Good";
      color = "#689f38";
    } else if (score <= 9) {
      strengthLevel = "Strong";
      color = "#388e3c";
    } else {
      strengthLevel = "Very Strong";
      color = "#1b5e20";
    }

    // Add contextual feedback based on strength
    if (score < 4) {
      feedback.unshift("⚠️ This password is vulnerable to attacks");
    } else if (score < 6) {
      feedback.unshift("⚠️ This password could be stronger");
    } else if (score < 8) {
      feedback.unshift("👍 This password is reasonably secure");
    }

    setPasswordStrength({
      score,
      maxScore,
      level: strengthLevel,
      color,
      feedback: feedback.length > 0 ? feedback : ["🎉 Excellent password! No improvements needed."],
      positives: positives
    });
  };

  // Clear all sensitive data when component unmounts
  React.useEffect(() => {
    return () => {
      setCheckPassword("");
      setPasswordStrength(null);
      setShowPassword(false);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <header>
        <h1 className="title">Password Strength Checker</h1>
        <p className="subtitle">Test your password strength and get detailed feedback on how to improve your password security. Check if your passwords are strong enough to protect your accounts.</p>
      </header>

      <div className="card">
        <h2 className="section-title">Check Password Strength</h2>
        <p style={{marginBottom: "1.5rem", color: "#666"}}>Enter your password below to analyze its security level</p>

        <div className="form-group">
          <label className="input-label" style={{display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#333"}}>
            Enter password to check:
          </label>
          <div style={{position: "relative", marginBottom: "2rem"}}>
            <input
              type={showPassword ? "text" : "password"}
              value={checkPassword}
              onChange={(e) => {
                setCheckPassword(e.target.value);
                checkPasswordStrength(e.target.value);
              }}
              placeholder="Type or paste your password here..."
              className="modern-input"
              style={{
                padding: "1rem 3rem 1rem 1rem",
                fontSize: "1.1rem",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                transition: "border-color 0.3s ease",
                width: "100%",
                boxSizing: "border-box"
              }}
              onFocus={(e) => e.target.style.borderColor = "#4CAF50"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
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
        </div>

        {passwordStrength && (
          <div className="strength-result" style={{background: "linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "1.5rem", marginTop: "1rem"}}>
            <div className="strength-header" style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem"}}>
              <span style={{fontSize: "1.2rem", fontWeight: "600", color: "#333"}}>Password Strength:</span>
              <span
                style={{
                  color: passwordStrength.color,
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  textShadow: "0 1px 2px rgba(0,0,0,0.1)"
                }}
              >
                {passwordStrength.level}
              </span>
            </div>

            <div className="strength-bar-container" style={{marginBottom: "2rem"}}>
              <div className="strength-bar" style={{
                width: "100%",
                height: "12px",
                backgroundColor: "#e0e0e0",
                borderRadius: "6px",
                overflow: "hidden",
                boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)"
              }}>
                <div
                  className="strength-fill"
                  style={{
                    width: `${(passwordStrength.score / passwordStrength.maxScore) * 100}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${passwordStrength.color}, ${passwordStrength.color}dd)`,
                    transition: "width 0.5s ease, background 0.3s ease",
                    borderRadius: "6px"
                  }}
                />
              </div>
              <div style={{display: "flex", justifyContent: "space-between", marginTop: "0.5rem", fontSize: "0.8rem", color: "#888"}}>
                <span>Very Weak</span>
                <span>Weak</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Strong</span>
                <span>Very Strong</span>
              </div>
            </div>

            <div className="score-breakdown" style={{marginBottom: "1.5rem", padding: "1rem", backgroundColor: "rgba(255,255,255,0.7)", borderRadius: "8px", border: "1px solid #f0f0f0"}}>
              <h4 style={{marginBottom: "0.5rem", color: "#333", fontSize: "1rem", display: "flex", alignItems: "center"}}>
                📊 Score: {passwordStrength.score.toFixed(1)} / {passwordStrength.maxScore}
              </h4>
              <p style={{margin: 0, color: "#666", fontSize: "0.9rem"}}>
                Based on length, character variety, pattern analysis, and security best practices.
              </p>
            </div>

            {passwordStrength.positives && passwordStrength.positives.length > 0 && (
              <div className="positives" style={{marginBottom: "1.5rem"}}>
                <h4 style={{marginBottom: "0.75rem", color: "#2e7d32", fontSize: "1rem", display: "flex", alignItems: "center"}}>
                  ✅ What's working well:
                </h4>
                <div style={{display: "grid", gap: "0.5rem"}}>
                  {passwordStrength.positives.map((item, index) => (
                    <div key={index} style={{
                      padding: "0.5rem 0.75rem",
                      backgroundColor: "rgba(76, 175, 80, 0.1)",
                      borderLeft: "3px solid #4CAF50",
                      borderRadius: "4px",
                      fontSize: "0.9rem",
                      color: "#2e7d32"
                    }}>{item}</div>
                  ))}
                </div>
              </div>
            )}

            {passwordStrength.feedback && passwordStrength.feedback.length > 0 && (
              <div className="feedback">
                <h4 style={{marginBottom: "0.75rem", color: passwordStrength.score < 4 ? "#d32f2f" : "#f57c00", fontSize: "1rem", display: "flex", alignItems: "center"}}>
                  💡 Suggestions for improvement:
                </h4>
                <div style={{display: "grid", gap: "0.5rem"}}>
                  {passwordStrength.feedback.map((item, index) => (
                    <div key={index} style={{
                      padding: "0.5rem 0.75rem",
                      backgroundColor: passwordStrength.score < 4 ? "rgba(244, 67, 54, 0.1)" : "rgba(255, 152, 0, 0.1)",
                      borderLeft: `3px solid ${passwordStrength.score < 4 ? "#f44336" : "#ff9800"}`,
                      borderRadius: "4px",
                      fontSize: "0.9rem",
                      color: passwordStrength.score < 4 ? "#d32f2f" : "#ef6c00"
                    }}>{item}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="seo-content">
        <h2>Understanding Password Strength</h2>
        <p>Password strength is measured by how difficult it would be for someone to guess or crack your password using automated tools. Our password strength checker analyzes multiple factors to give you a comprehensive security assessment.</p>

        <div className="features-grid">
          <div className="feature">
            <h3>Length Analysis</h3>
            <p>Longer passwords are exponentially harder to crack. We recommend at least 12 characters for strong security.</p>
          </div>

          <div className="feature">
            <h3>Character Variety</h3>
            <p>Using uppercase letters, lowercase letters, numbers, and symbols increases password complexity significantly.</p>
          </div>

          <div className="feature">
            <h3>Pattern Detection</h3>
            <p>We check for common patterns like repeated characters, sequences, and dictionary words that make passwords vulnerable.</p>
          </div>

          <div className="feature">
            <h3>Privacy First</h3>
            <p>All password analysis happens locally in your browser. Your passwords are never sent to our servers or stored anywhere.</p>
          </div>
        </div>
      </section>

      <section className="password-tips">
        <h2>How to Create Strong Passwords</h2>
        <ul>
          <li><strong>Use 12+ characters</strong> - Longer passwords are much harder to crack</li>
          <li><strong>Mix character types</strong> - Combine uppercase, lowercase, numbers, and symbols</li>
          <li><strong>Avoid common words</strong> - Dictionary words and common phrases are easily cracked</li>
          <li><strong>Use unique passwords</strong> - Never reuse passwords across different accounts</li>
          <li><strong>Consider a password manager</strong> - Tools can generate and store strong passwords safely</li>
        </ul>
      </section>

      <section className="faq">
        <h2>Password Security FAQ</h2>
        <div className="faq-item">
          <h3>How accurate is this password strength checker?</h3>
          <p>Our checker uses industry-standard methods to analyze password strength, including entropy calculation, pattern detection, and common password database checks. While no tool is 100% perfect, it provides a reliable assessment of your password's security level.</p>
        </div>

        <div className="faq-item">
          <h3>Is it safe to enter my real password here?</h3>
          <p>Yes, it's completely safe. All password analysis happens locally in your web browser using JavaScript. Your password is never transmitted to our servers, logged, or stored anywhere. The analysis is done entirely on your device.</p>
        </div>

        <div className="faq-item">
          <h3>What makes a password "strong"?</h3>
          <p>A strong password is typically 12+ characters long, contains a mix of uppercase and lowercase letters, numbers, and special characters, and doesn't contain easily guessable patterns or dictionary words.</p>
        </div>

        <div className="faq-item">
          <h3>Should I change passwords that score as "Fair"?</h3>
          <p>We recommend upgrading any password that doesn't score as "Strong," especially for important accounts like email, banking, or work systems. Fair passwords may be vulnerable to determined attackers.</p>
        </div>

        <div className="faq-item">
          <h3>How often should I check my password strength?</h3>
          <p>Check your passwords whenever you create new ones or suspect they might be compromised. It's also good practice to audit your important passwords every few months and upgrade any that aren't meeting current security standards.</p>
        </div>
      </section>

        <footer style={{textAlign: 'center', padding: '2rem', marginTop: '3rem', borderTop: '1px solid #e0e0e0', color: '#666'}}>
          <p>© 2025 PasswordGen — Licensed under the MIT License</p>
        </footer>
      </div>
    </div>
  );
}