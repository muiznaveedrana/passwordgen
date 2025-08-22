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
      
      <div className="card">
        <h1 className="title">Password Generator</h1>
        
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
            <h3 style={{marginBottom: "1.5rem", color: "#333", fontSize: "1.2rem"}}>Personal Information</h3>
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
            <div className="pattern-info">
              <small style={{color: "#666", fontStyle: "italic"}}>
                Generates passwords using your info with character substitutions (a→@, i→!, o→0, s→$)
              </small>
            </div>
          </div>
        )}

        {!usePersonalization && (
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="checkbox-input"
              />
              Uppercase Letters
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="checkbox-input"
              />
              Lowercase Letters
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="checkbox-input"
              />
              Numbers
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="checkbox-input"
              />
              Symbols
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

      <GoogleAd slot="YOUR_SLOT_ID" />
      
      <div style={{margin: "2rem 0"}}>
        <GoogleAd slot="YOUR_SLOT_ID_2" />
      </div>
      
      <div style={{margin: "2rem 0"}}>
        <GoogleAd slot="YOUR_SLOT_ID_3" />
      </div>
    </div>
  );
}
