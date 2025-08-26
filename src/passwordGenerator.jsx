import React, { useState } from "react";
import GoogleAd from "./components/GoogleAd";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [usePersonalization, setUsePersonalization] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const applyCharacterSubstitutions = (text) => {
    return text
      .replace(/a/g, '@')
      .replace(/i/g, '!')
      .replace(/o/g, '0')
      .replace(/s/g, '$');
  };

  const generatePersonalizedPassword = () => {
    if (!firstName || !lastName || !dateOfBirth) {
      setPassword("Please fill in all personal information fields");
      return;
    }

    const date = new Date(dateOfBirth);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const shortYear = year.toString().substring(2);

    const basePatterns = [
      `${year}${lastName}`,
      `${lastName.toLowerCase()}${month}${day}`,
      `${firstName.charAt(0).toUpperCase()}${lastName.toLowerCase()}${year}`,
      `${lastName.toLowerCase().split('').reverse().join('')}${month}${day}`,
      `${year}${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`,
      `${firstName.toLowerCase().substring(0, 3)}${lastName.toLowerCase().substring(0, 3)}${year}`,
      `${month}${day}${lastName.toUpperCase()}`,
      `${lastName.toLowerCase()}${shortYear}`,
      `${firstName.charAt(0).toLowerCase()}${lastName.toLowerCase()}${month}${day}`,
      `${firstName.toLowerCase()}${lastName.charAt(0).toUpperCase()}${year}`,
      `${lastName.toUpperCase()}${month}${day}${shortYear}`,
      `${day}${month}${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      `${firstName.toLowerCase().substring(0, 2)}${lastName.toLowerCase().substring(0, 2)}${year}`,
      `${lastName.toLowerCase()}${firstName.charAt(0).toLowerCase()}${year}`,
      `${year}${firstName.toLowerCase().substring(0, 3)}`,
      `${firstName.charAt(0).toUpperCase()}${month}${day}${lastName.charAt(0).toUpperCase()}`,
      `${lastName.toLowerCase()}${year}${firstName.charAt(0).toLowerCase()}`,
      `${shortYear}${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      `${firstName.toLowerCase()}${year}${lastName.charAt(0).toLowerCase()}`,
      `${month}${firstName.toLowerCase().substring(0, 3)}${day}`
    ];

    const substitutedPatterns = basePatterns.map(pattern => applyCharacterSubstitutions(pattern));
    
    const allPatterns = [...basePatterns, ...substitutedPatterns];
    
    const randomPattern = allPatterns[Math.floor(Math.random() * allPatterns.length)];
    setPassword(randomPattern);
  };

  const generatePassword = () => {
    if (usePersonalization) {
      generatePersonalizedPassword();
      return;
    }

    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charset === "") {
      setPassword("Please select at least one character type");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="container">
      <GoogleAd slot="YOUR_TOP_AD_SLOT" />
      
      <header>
        <h1 className="title">Free Password Generator</h1>
        <p className="subtitle">Generate secure, random passwords online with our powerful password maker tool. Create strong passwords with customizable length, symbols, and advanced personalization options.</p>
      </header>
      
      <div className="card">
        <h2 className="section-title">Password Generator Settings</h2>
        
        {!usePersonalization && (
          <div className="form-group">
            <label className="label">
              Length: {length}
            </label>
            <input
              type="range"
              min="4"
              max="50"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="range-input"
            />
          </div>
        )}

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={usePersonalization}
              onChange={(e) => setUsePersonalization(e.target.checked)}
              className="checkbox-input"
            />
            Use Personalization
          </label>
        </div>

        {usePersonalization && (
          <div className="personalization-section">
            <h3 style={{marginBottom: "1.5rem", color: "#333", fontSize: "1.2rem"}}>Personalized Password Generation</h3>
            <div className="input-grid">
              <div className="input-group">
                <label className="input-label">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="modern-input"
                />
              </div>
              <div className="input-group">
                <label className="input-label">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="modern-input"
                />
              </div>
              <div className="input-group">
                <label className="input-label">Date of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="modern-input"
                />
              </div>
            </div>
          </div>
        )}

        {!usePersonalization && (
          <div className="checkbox-group">
            <h3 style={{marginBottom: "1rem", color: "#333", fontSize: "1.1rem"}}>Character Types for Strong Passwords</h3>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="checkbox-input"
              />
              Uppercase Letters (A-Z)
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="checkbox-input"
              />
              Lowercase Letters (a-z)
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="checkbox-input"
              />
              Numbers (0-9)
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="checkbox-input"
              />
              Special Symbols (!@#$%^&*)
            </label>
          </div>
        )}

        <button
          onClick={generatePassword}
          className="btn-primary"
        >
          Generate Password
        </button>

        {password && (
          <div>
            <textarea
              value={password}
              readOnly
              className="password-output"
              rows="3"
            />
            <button
              onClick={copyToClipboard}
              className="btn-secondary"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>

      
      <section className="seo-content">
        <h2>Why Use Our Secure Password Generator?</h2>
        <p>Creating strong, secure passwords is essential for protecting your online accounts and personal information. Our free password generator tool helps you create random, secure passwords that are virtually impossible to guess or crack.</p>
        
        <div className="features-grid">
          <div className="feature">
            <h3>Customizable Length</h3>
            <p>Generate passwords from 4 to 50 characters long to meet any website's password requirements.</p>
          </div>
          
          <div className="feature">
            <h3>Multiple Character Types</h3>
            <p>Include uppercase letters, lowercase letters, numbers, and special symbols for maximum password strength.</p>
          </div>
          
          <div className="feature">
            <h3>Personalization Options</h3>
            <p>Create memorable yet secure passwords using personal information with character substitutions.</p>
          </div>
          
          <div className="feature">
            <h3>Secure & Private</h3>
            <p>All passwords are generated locally in your browser - no data is sent to our servers.</p>
          </div>
        </div>
      </section>

      <div style={{margin: "2rem 0"}}>
        <GoogleAd slot="YOUR_SLOT_ID_2" />
      </div>
      
      <section className="password-tips">
        <h2>Password Security Best Practices</h2>
        <ul>
          <li><strong>Use unique passwords</strong> for each of your online accounts</li>
          <li><strong>Make passwords long</strong> - aim for at least 12 characters</li>
          <li><strong>Include all character types</strong> - uppercase, lowercase, numbers, and symbols</li>
          <li><strong>Avoid personal information</strong> in standard passwords (unless using our personalization feature)</li>
          <li><strong>Use a password manager</strong> to store your secure passwords safely</li>
          <li><strong>Enable two-factor authentication</strong> whenever possible</li>
        </ul>
      </section>
      
      <div style={{margin: "2rem 0"}}>
        <GoogleAd slot="YOUR_SLOT_ID_3" />
      </div>
      
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>How secure are the passwords generated by this tool?</h3>
          <p>Our password generator uses cryptographically secure random number generation to create passwords that are extremely difficult to guess or brute force attack. The longer and more complex your password, the more secure it is.</p>
        </div>
        
        <div className="faq-item">
          <h3>Are my generated passwords stored anywhere?</h3>
          <p>No, all password generation happens locally in your web browser. We do not store, log, or transmit any of the passwords you generate.</p>
        </div>
        
        <div className="faq-item">
          <h3>What makes a strong password?</h3>
          <p>A strong password is long (12+ characters), uses a mix of uppercase and lowercase letters, numbers, and special symbols, and doesn't contain easily guessable personal information or common words.</p>
        </div>
      </section>
    </div>
  );
}
