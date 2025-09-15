import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PasswordGenerator from "./passwordGenerator.jsx";
import PasswordChecker from "./passwordChecker.jsx";
import BreachChecker from "./BreachChecker.jsx";
import SecurityQuiz from "./SecurityQuiz.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PasswordGenerator />} />
        <Route path="/passwordchecker" element={<PasswordChecker />} />
        <Route path="/breachchecker" element={<BreachChecker />} />
        <Route path="/securityquiz" element={<SecurityQuiz />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;
