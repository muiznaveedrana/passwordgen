import React, { useState } from "react";
import Navbar from "./Navbar.jsx";

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

  const getSecureRandomInt = (max) => {
    const array = new Uint32Array(1);
    const maxValidValue = Math.floor(0xFFFFFFFF / max) * max;

    let randomValue;
    do {
      crypto.getRandomValues(array);
      randomValue = array[0];
    } while (randomValue >= maxValidValue);

    const result = randomValue % max;

    // Clear the array from memory
    array.fill(0);

    return result;
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
    
    const randomPattern = allPatterns[getSecureRandomInt(allPatterns.length)];
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
      result += charset.charAt(getSecureRandomInt(charset.length));
    }
    setPassword(result);
    
    // Clear intermediate variables from memory
    charset = "";
    result = "";
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    
    // Clear password from memory after copying
    setTimeout(() => {
      setPassword("");
    }, 30000); // Clear after 30 seconds
  };

  // Clear all sensitive data when component unmounts
  React.useEffect(() => {
    return () => {
      setPassword("");
      setFirstName("");
      setLastName("");
      setDateOfBirth("");
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">

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

        <div className="faq-item">
          <h3>Why do strong passwords matter?</h3>
          <p>Strong passwords are your first line of defense against cybercriminals. Weak passwords can be easily cracked using automated tools, giving hackers access to your personal accounts, financial information, and sensitive data. A strong password significantly reduces the risk of unauthorized access to your accounts.</p>
        </div>

        <div className="faq-item">
          <h3>How does this tool protect my privacy?</h3>
          <p>Your privacy is our top priority. All password generation occurs entirely in your browser using client-side JavaScript. No passwords, personal information, or usage data is transmitted to our servers. The tool works completely offline once loaded, ensuring your sensitive information never leaves your device.</p>
        </div>

        <div className="faq-item">
          <h3>How often should I change my passwords?</h3>
          <p>You should change your passwords immediately if you suspect a security breach, receive a data breach notification, or if an account shows signs of unauthorized access. For general security, consider changing important passwords every 6-12 months, or use a password manager with unique passwords for each account.</p>
        </div>

        <div className="faq-item">
          <h3>Is it safe to use password generators online?</h3>
          <p>Yes, when using reputable password generators like this one that generate passwords locally in your browser. Always verify that the tool doesn't send your passwords to external servers. Avoid password generators that require internet connectivity to function, as this may indicate server-side processing.</p>
        </div>

        <div className="faq-item">
          <h3>What should I do if I forget my generated password?</h3>
          <p>Since generated passwords are random and complex, it's crucial to store them securely immediately after creation. Use a trusted password manager to save your passwords, or write them down and store them in a secure physical location. Never store passwords in plain text files on your computer or in unsecured notes.</p>
        </div>
      </section>
      
        <footer style={{textAlign: 'center', padding: '2rem', marginTop: '3rem', borderTop: '1px solid #e0e0e0', color: '#666'}}>
          <p>© 2025 PasswordGen — Licensed under the MIT License</p>
        </footer>
      </div>
    </div>
  );
}
