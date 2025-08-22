import React, { useState } from "react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
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

    </div>
  );
}
