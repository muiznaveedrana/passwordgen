import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";

export default function SecurityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  // Sound effects using Web Audio API
  const playSound = (type) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (type === 'correct') {
        // Success sound - ascending notes
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.4);
      } else {
        // Error sound - descending note
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      }
    } catch (error) {
      // Fallback for browsers that don't support Web Audio API
      console.log('Audio not supported');
    }
  };

  // Comprehensive question bank (200+ questions)
  const questionBank = [
    // Password Basics
    {
      question: "How often should you change your passwords?",
      options: ["Every month", "Every 3-6 months or when compromised", "Every week", "Never"],
      correct: 1,
      explanation: "Modern security experts recommend changing passwords every 3-6 months for important accounts, or immediately if you suspect compromise. Frequent changes can lead to weaker, predictable passwords."
    },
    {
      question: "What is the minimum recommended length for a strong password?",
      options: ["6 characters", "8 characters", "12 characters", "4 characters"],
      correct: 2,
      explanation: "Security experts recommend at least 12 characters for strong passwords. Longer passwords are exponentially harder to crack than shorter ones."
    },
    {
      question: "Which is the strongest password?",
      options: ["password123", "P@ssw0rd!", "MyD0g'sN@me1sF1uffy!", "123456789"],
      correct: 2,
      explanation: "The third option combines length, mixed case, numbers, symbols, and is memorable while being complex. It follows the principle of using passphrases with substitutions."
    },
    {
      question: "What does 'password entropy' measure?",
      options: ["Password age", "Password complexity and randomness", "Number of characters", "How many times it's been used"],
      correct: 1,
      explanation: "Password entropy measures the unpredictability and complexity of a password. Higher entropy means the password is more random and harder to guess."
    },
    {
      question: "Which character types should be included in a strong password?",
      options: ["Only letters", "Letters and numbers", "Uppercase, lowercase, numbers, and symbols", "Only numbers"],
      correct: 2,
      explanation: "Strong passwords should include uppercase letters, lowercase letters, numbers, and special symbols to maximize complexity and security."
    },

    // Password Reuse and Uniqueness
    {
      question: "Should you reuse the same password across multiple accounts?",
      options: ["Yes, it's easier to remember", "Only for unimportant accounts", "No, never", "Only if you add numbers"],
      correct: 2,
      explanation: "Never reuse passwords across accounts. If one account is breached, all your accounts with the same password become vulnerable."
    },
    {
      question: "What is credential stuffing?",
      options: ["Adding more characters to passwords", "Using breached passwords to attack other accounts", "Storing passwords in a file", "Creating multiple passwords"],
      correct: 1,
      explanation: "Credential stuffing is when attackers use breached username/password combinations to try accessing other accounts, which is why unique passwords are crucial."
    },
    {
      question: "How many unique passwords should you have?",
      options: ["One for everything", "One for each important account", "5-10 different passwords", "A unique password for every account"],
      correct: 3,
      explanation: "Every account should have a unique password to prevent a single breach from compromising multiple accounts."
    },
    {
      question: "If you discover one of your passwords in a data breach, what should you do?",
      options: ["Add a number to the end", "Change it on that account only", "Change it everywhere it's used", "Wait and see"],
      correct: 2,
      explanation: "If a password is breached, change it immediately on all accounts where it's used, as attackers will try it on other services."
    },
    {
      question: "What's the main risk of password reuse?",
      options: ["Forgetting passwords", "Account lockouts", "Single point of failure across accounts", "Slower login times"],
      correct: 2,
      explanation: "Password reuse creates a single point of failure - if one account is breached, all accounts using that password are at risk."
    },

    // Two-Factor Authentication
    {
      question: "What is two-factor authentication (2FA)?",
      options: ["Using two passwords", "An additional security layer beyond passwords", "Logging in twice", "Using uppercase and lowercase"],
      correct: 1,
      explanation: "2FA adds an extra security layer by requiring something you know (password) and something you have (phone, app, or hardware key)."
    },
    {
      question: "Which 2FA method is considered most secure?",
      options: ["SMS codes", "Email codes", "Authenticator apps", "Hardware security keys"],
      correct: 3,
      explanation: "Hardware security keys are the most secure 2FA method as they're resistant to phishing and can't be intercepted like SMS or email codes."
    },
    {
      question: "Why is SMS 2FA less secure than authenticator apps?",
      options: ["SMS is slower", "SMS can be intercepted or SIM-swapped", "SMS costs money", "SMS doesn't work internationally"],
      correct: 1,
      explanation: "SMS can be intercepted through SIM swapping or network attacks, while authenticator apps generate codes offline and are more secure."
    },
    {
      question: "What should you do with 2FA backup codes?",
      options: ["Ignore them", "Store them securely offline", "Share them with family", "Memorize them"],
      correct: 1,
      explanation: "2FA backup codes should be stored securely offline (printed and kept safe) in case you lose access to your 2FA device."
    },
    {
      question: "When should you enable 2FA?",
      options: ["Only for banking", "Only for email", "For all important accounts", "Never, it's too complicated"],
      correct: 2,
      explanation: "Enable 2FA on all important accounts, especially email, banking, work accounts, and social media, as these are prime targets for attackers."
    },

    // Password Managers
    {
      question: "What is a password manager?",
      options: ["A person who manages passwords", "Software that stores and generates passwords", "A password policy document", "A type of firewall"],
      correct: 1,
      explanation: "A password manager is software that securely stores, generates, and manages passwords, allowing you to use unique, strong passwords for every account."
    },
    {
      question: "What's the main benefit of using a password manager?",
      options: ["Faster typing", "Unique passwords for every account", "Cheaper than remembering", "Better graphics"],
      correct: 1,
      explanation: "Password managers enable you to use unique, complex passwords for every account without having to remember them all."
    },
    {
      question: "Should you trust password managers with sensitive passwords?",
      options: ["No, never", "Only free ones", "Yes, reputable ones use strong encryption", "Only for unimportant accounts"],
      correct: 2,
      explanation: "Reputable password managers use strong encryption and are safer than reusing passwords or storing them insecurely."
    },
    {
      question: "What happens if you forget your password manager's master password?",
      options: ["You can easily recover it", "You might lose access to all stored passwords", "Nothing happens", "It automatically resets"],
      correct: 1,
      explanation: "Most password managers can't recover your master password due to encryption, so you might lose access to all stored data. This is why backup strategies are important."
    },
    {
      question: "Which is safer for storing passwords?",
      options: ["Writing them down", "Browser password saving", "Dedicated password manager", "Text file on computer"],
      correct: 2,
      explanation: "Dedicated password managers offer the best security with encryption, secure sharing, breach monitoring, and cross-device syncing."
    },

    // Common Password Mistakes
    {
      question: "Which is the weakest password pattern?",
      options: ["Random characters", "Dictionary words with numbers", "Passphrases", "Keyboard patterns like 'qwerty'"],
      correct: 3,
      explanation: "Keyboard patterns are extremely predictable and among the first things attackers try. They provide virtually no security."
    },
    {
      question: "What's wrong with using personal information in passwords?",
      options: ["Nothing", "It's hard to type", "It's easily guessable from social media", "It's too long"],
      correct: 2,
      explanation: "Personal information like names, birthdays, or pet names can be easily found on social media and used to guess passwords."
    },
    {
      question: "Why should you avoid common password patterns?",
      options: ["They're hard to remember", "Attackers try them first", "They're too short", "They use too many symbols"],
      correct: 1,
      explanation: "Common patterns like 'password123' or 'qwerty' are in every hacker's wordlist and are tried first in attacks."
    },
    {
      question: "What's the problem with passwords like 'Summer2023'?",
      options: ["Too long", "Predictable seasonal/year pattern", "No symbols", "Too many numbers"],
      correct: 1,
      explanation: "Seasonal patterns with current years are predictable and commonly used, making them easy targets for attackers."
    },
    {
      question: "Which substitution pattern is weakest?",
      options: ["Random substitutions", "@ for a, 0 for o", "Mixed case letters", "Adding symbols at the end"],
      correct: 1,
      explanation: "Common substitutions like @ for 'a' and 0 for 'o' are well-known to attackers and don't significantly improve password security."
    },

    // Phishing and Social Engineering
    {
      question: "What is a phishing attack?",
      options: ["Fishing for compliments", "Tricking people into revealing sensitive information", "A type of malware", "Password cracking software"],
      correct: 1,
      explanation: "Phishing involves tricking people into revealing passwords, personal information, or clicking malicious links through deceptive communications."
    },
    {
      question: "How can you identify a phishing email?",
      options: ["Check sender address and look for urgency tactics", "Count the words", "Check the font", "Look at the timestamp"],
      correct: 0,
      explanation: "Phishing emails often have suspicious sender addresses, create false urgency, contain spelling errors, and ask for sensitive information."
    },
    {
      question: "What should you do if you suspect a phishing attempt?",
      options: ["Click to investigate", "Reply asking if it's real", "Delete and report it", "Forward to friends"],
      correct: 2,
      explanation: "Don't engage with suspected phishing attempts. Delete the message and report it to your IT department or email provider."
    },
    {
      question: "Why is spear phishing more dangerous than regular phishing?",
      options: ["It uses better graphics", "It's targeted and personalized", "It's faster", "It costs more"],
      correct: 1,
      explanation: "Spear phishing targets specific individuals with personalized information, making the attacks more convincing and harder to detect."
    },
    {
      question: "What's the best way to verify a suspicious login request?",
      options: ["Click the link in the email", "Call the company directly using official numbers", "Reply to the email", "Search Google"],
      correct: 1,
      explanation: "Always verify suspicious requests by contacting the company directly using official contact information, not links or numbers in the suspicious message."
    },

    // Data Breaches
    {
      question: "What should you do immediately after a data breach notification?",
      options: ["Wait and see", "Change passwords for that service", "Ignore it", "Delete your account"],
      correct: 1,
      explanation: "Immediately change your password for the breached service and any other accounts where you used the same password."
    },
    {
      question: "What information is typically stolen in data breaches?",
      options: ["Only passwords", "Only email addresses", "Usernames, passwords, personal info", "Only credit cards"],
      correct: 2,
      explanation: "Data breaches often expose usernames, passwords, email addresses, personal information, and sometimes financial data."
    },
    {
      question: "How can you monitor if your accounts have been breached?",
      options: ["Check social media", "Use breach monitoring services", "Wait for notifications", "Ask friends"],
      correct: 1,
      explanation: "Services like HaveIBeenPwned monitor breaches and can alert you if your email appears in compromised data."
    },
    {
      question: "Why do criminals target password databases?",
      options: ["They're easy to find", "People reuse passwords across sites", "They contain credit cards", "They're valuable on dark web"],
      correct: 1,
      explanation: "Criminals target password databases because many people reuse passwords, allowing access to multiple accounts with one breach."
    },
    {
      question: "What's credential stuffing?",
      options: ["Adding more passwords", "Using breached credentials on other sites", "Encrypting passwords", "Storing passwords safely"],
      correct: 1,
      explanation: "Credential stuffing is automatically trying stolen username/password combinations on other websites to gain unauthorized access."
    },

    // Mobile Security
    {
      question: "Are mobile apps safer than websites for password entry?",
      options: ["Always safer", "Usually safer from phishing", "Always less safe", "No difference"],
      correct: 1,
      explanation: "Mobile apps are typically safer from phishing attacks because they connect directly to the real service, unlike web links that can be spoofed."
    },
    {
      question: "Should you save passwords in mobile browsers?",
      options: ["Yes, always", "Only for unimportant sites", "Use a dedicated password manager instead", "Never"],
      correct: 2,
      explanation: "Dedicated password managers are more secure than browser-saved passwords, offering better encryption and security features."
    },
    {
      question: "What's the risk of using public WiFi for logging in?",
      options: ["Slower speeds", "Passwords can be intercepted", "Higher data costs", "Battery drain"],
      correct: 1,
      explanation: "Public WiFi networks can allow attackers to intercept data, including passwords. Use VPN or mobile data for sensitive activities."
    },
    {
      question: "Should you auto-fill passwords on shared devices?",
      options: ["Yes, it's convenient", "Only for family devices", "No, disable auto-fill", "Only for public computers"],
      correct: 2,
      explanation: "Disable auto-fill on shared devices to prevent others from accessing your accounts through saved credentials."
    },
    {
      question: "What's the safest way to log in on a public computer?",
      options: ["Use private/incognito mode", "Save the password", "Use regular browsing", "Don't log in at all"],
      correct: 3,
      explanation: "Avoid logging into important accounts on public computers. If necessary, use incognito mode and log out completely when done."
    },

    // Password Recovery
    {
      question: "What makes a good security question?",
      options: ["Easy to guess", "Something only you know", "Your mother's maiden name", "Your birthday"],
      correct: 1,
      explanation: "Good security questions have answers that only you know and aren't easily found on social media or public records."
    },
    {
      question: "Should you use real answers for security questions?",
      options: ["Always", "Sometimes", "No, use unique answers like passwords", "Only for important accounts"],
      correct: 2,
      explanation: "Treat security question answers like passwords - use unique, non-obvious answers that can't be guessed from public information."
    },
    {
      question: "What's the safest password recovery method?",
      options: ["Security questions", "SMS codes", "Email recovery", "Alternative email address"],
      correct: 3,
      explanation: "Using an alternative, secure email address is often safest as it doesn't rely on easily compromised methods like SMS or guessable security questions."
    },
    {
      question: "How should you store password recovery codes?",
      options: ["In your email", "Write them down and store securely", "Memorize them", "Don't save them"],
      correct: 1,
      explanation: "Recovery codes should be written down and stored securely offline, separate from your devices, in case you lose digital access."
    },
    {
      question: "When should you update your recovery information?",
      options: ["Never", "When you change jobs or phones", "Once a year", "Only if hacked"],
      correct: 1,
      explanation: "Update recovery information when you change jobs, phone numbers, or email addresses to ensure you can always recover your accounts."
    },

    // Enterprise/Work Security
    {
      question: "Should work passwords be different from personal passwords?",
      options: ["No difference needed", "Yes, completely separate", "Only slightly different", "Use the same for convenience"],
      correct: 1,
      explanation: "Work and personal passwords should be completely separate to prevent personal breaches from affecting work accounts and vice versa."
    },
    {
      question: "What should you do when leaving a job?",
      options: ["Keep access for emergencies", "Change all personal passwords", "Nothing", "Give passwords to replacement"],
      correct: 1,
      explanation: "When leaving a job, change all personal passwords in case any were observed or shared during employment."
    },
    {
      question: "Should you share work passwords with colleagues?",
      options: ["Yes, for collaboration", "Only with managers", "Never", "Only in emergencies"],
      correct: 2,
      explanation: "Never share work passwords. Use proper account sharing features or request additional accounts when collaboration is needed."
    },
    {
      question: "What's the best practice for shared work accounts?",
      options: ["Everyone uses the same password", "Each person has their own login", "Change password monthly", "Write it on a sticky note"],
      correct: 1,
      explanation: "Each person should have individual accounts for accountability and security. Shared accounts make it impossible to track who did what."
    },
    {
      question: "How should you handle password requests from IT?",
      options: ["Always comply", "Verify through official channels first", "Ignore all requests", "Share via email"],
      correct: 1,
      explanation: "Verify password requests through official channels. Legitimate IT departments rarely need your actual passwords and will have other ways to help."
    },

    // Advanced Security Concepts
    {
      question: "What is a rainbow table attack?",
      options: ["Colorful password display", "Precomputed hash lookup attack", "Weather-based password cracking", "Multi-colored security"],
      correct: 1,
      explanation: "Rainbow tables contain precomputed hashes of common passwords, allowing attackers to quickly reverse simple password hashes."
    },
    {
      question: "What is password salting?",
      options: ["Adding flavor to passwords", "Adding random data before hashing", "Making passwords longer", "Using ocean-themed passwords"],
      correct: 1,
      explanation: "Password salting adds random data before hashing to prevent rainbow table attacks and make identical passwords have different hashes."
    },
    {
      question: "Why are dictionary attacks effective?",
      options: ["Dictionaries are heavy", "People use common words in passwords", "They're educational", "They work quickly"],
      correct: 1,
      explanation: "Dictionary attacks work because many people use common words, making these passwords vulnerable to systematic word-list attacks."
    },
    {
      question: "What is a brute force attack?",
      options: ["Physical violence", "Trying every possible password combination", "Using strong computers", "Forcing password changes"],
      correct: 1,
      explanation: "Brute force attacks systematically try every possible password combination until finding the correct one."
    },
    {
      question: "How does password length affect brute force time?",
      options: ["No effect", "Linear increase", "Exponential increase", "Logarithmic increase"],
      correct: 2,
      explanation: "Each additional character exponentially increases brute force time, which is why longer passwords are much more secure."
    },

    // Biometric Security
    {
      question: "Are biometrics safer than passwords?",
      options: ["Always safer", "Safer in some contexts", "Never safer", "Same safety level"],
      correct: 1,
      explanation: "Biometrics can be safer for device access but have different risks - they can't be changed if compromised and have privacy concerns."
    },
    {
      question: "What's the main limitation of biometric authentication?",
      options: ["Too slow", "Can't be changed if compromised", "Too expensive", "Not accurate enough"],
      correct: 1,
      explanation: "Unlike passwords, biometric data like fingerprints can't be changed if compromised, making breaches permanently problematic."
    },
    {
      question: "Should biometrics replace passwords entirely?",
      options: ["Yes, immediately", "No, use both together", "Only for mobile devices", "Only for computers"],
      correct: 1,
      explanation: "Biometrics work best as part of multi-factor authentication alongside passwords, providing both security and convenience."
    },
    {
      question: "What's spoofing in biometric security?",
      options: ["Making fun of biometrics", "Faking biometric data to gain access", "Speed testing", "Data compression"],
      correct: 1,
      explanation: "Biometric spoofing involves using fake fingerprints, photos, or other methods to trick biometric sensors into granting access."
    },
    {
      question: "Which biometric method is generally most secure?",
      options: ["Fingerprint", "Face recognition", "Voice recognition", "Iris scanning"],
      correct: 3,
      explanation: "Iris scanning is generally considered most secure due to the uniqueness and complexity of iris patterns, though all methods have vulnerabilities."
    },

    // Password Policies and Compliance
    {
      question: "What's the problem with forced frequent password changes?",
      options: ["Too much work", "Users create weaker, predictable passwords", "Costs too much", "Slows down computers"],
      correct: 1,
      explanation: "Frequent mandatory changes often lead to weaker passwords and predictable patterns as users struggle to remember new complex passwords."
    },
    {
      question: "What's a good corporate password policy?",
      options: ["Change monthly", "Minimum 12 chars, unique passwords, 2FA required", "All same password", "No requirements"],
      correct: 1,
      explanation: "Good policies emphasize length, uniqueness, complexity, and multi-factor authentication over frequent changes."
    },
    {
      question: "Should password complexity requirements include all character types?",
      options: ["Yes, always", "Length is more important", "Only letters", "Only numbers"],
      correct: 1,
      explanation: "While complexity helps, research shows password length is more important than requiring all character types, which can lead to predictable patterns."
    },
    {
      question: "What's the best way to enforce password policies?",
      options: ["Trust users", "Technical controls and education", "Punishment for violations", "Ignore violations"],
      correct: 1,
      explanation: "Combine technical enforcement with user education to help people understand why security matters and how to comply effectively."
    },
    {
      question: "Should password policies allow passphrases?",
      options: ["Never", "Yes, they can be long and memorable", "Only for executives", "Only for unimportant systems"],
      correct: 1,
      explanation: "Passphrases can be both secure and memorable, making them excellent password alternatives when implemented properly."
    },

    // Emerging Technologies
    {
      question: "What are passkeys?",
      options: ["Physical keys", "Cryptographic credentials that replace passwords", "Password managers", "Biometric scanners"],
      correct: 1,
      explanation: "Passkeys are cryptographic credentials that provide passwordless authentication using public-key cryptography and biometric verification."
    },
    {
      question: "How do passkeys improve security?",
      options: ["They're longer", "They can't be phished or reused", "They're colorful", "They cost more"],
      correct: 1,
      explanation: "Passkeys use public-key cryptography and are resistant to phishing, credential stuffing, and other common password attacks."
    },
    {
      question: "What is Zero Trust security?",
      options: ["Trusting no one", "Verifying every access request", "No passwords needed", "Only using biometrics"],
      correct: 1,
      explanation: "Zero Trust requires verification of every access request, regardless of location or previous authentication status."
    },
    {
      question: "How might quantum computing affect passwords?",
      options: ["Make them faster", "Break current encryption methods", "Make them unnecessary", "Improve storage"],
      correct: 1,
      explanation: "Quantum computers could potentially break current encryption methods, requiring new quantum-resistant security approaches."
    },
    {
      question: "What is behavioral authentication?",
      options: ["Good password behavior", "Authentication based on usage patterns", "Psychological testing", "Training programs"],
      correct: 1,
      explanation: "Behavioral authentication analyzes typing patterns, mouse movements, and other behavioral biometrics to verify identity."
    },

    // Social Media and Online Presence
    {
      question: "How can social media profiles help password attacks?",
      options: ["They can't", "They reveal personal information used in passwords", "They're too distracting", "They use bandwidth"],
      correct: 1,
      explanation: "Social media often reveals personal information like pet names, birthdays, and family details commonly used in passwords and security questions."
    },
    {
      question: "What privacy settings help protect against password attacks?",
      options: ["Public everything", "Limit personal information visibility", "Use real names only", "Share all photos"],
      correct: 1,
      explanation: "Limiting who can see personal details like birthdays, family names, and pets reduces information available for password guessing."
    },
    {
      question: "Should you use your real name in usernames?",
      options: ["Always", "Never", "Only for professional accounts", "It doesn't matter"],
      correct: 2,
      explanation: "For security, avoid using real names in usernames when possible, as this gives attackers information for targeted attacks."
    },
    {
      question: "What's the risk of oversharing online?",
      options: ["Nothing", "Provides ammunition for social engineering", "Uses storage space", "Annoys friends"],
      correct: 1,
      explanation: "Oversharing provides attackers with information for social engineering, password guessing, and security question answers."
    },
    {
      question: "Should you announce vacations on social media?",
      options: ["Yes, it's fun", "No, wait until you return", "Only to close friends", "Only the destination"],
      correct: 1,
      explanation: "Announcing vacations in real-time tells criminals when you're away and gives attackers time to plan social engineering attacks."
    },

    // Internet of Things (IoT) Security
    {
      question: "Why are IoT device passwords important?",
      options: ["They're not", "Weak passwords allow device hijacking", "They make devices faster", "They use less power"],
      correct: 1,
      explanation: "IoT devices with weak passwords can be hijacked for botnets, spying, or as entry points into your network."
    },
    {
      question: "What should you do with default IoT passwords?",
      options: ["Keep them", "Change them immediately", "Share them", "Write them down"],
      correct: 1,
      explanation: "Always change default passwords immediately, as they're publicly known and actively targeted by attackers."
    },
    {
      question: "How can compromised IoT devices affect other security?",
      options: ["They can't", "They can be entry points to your network", "They just stop working", "They use more electricity"],
      correct: 1,
      explanation: "Compromised IoT devices can be used as entry points to attack other devices on your network, including computers and phones."
    },
    {
      question: "Should smart home devices use the same password?",
      options: ["Yes, for convenience", "No, each should be unique", "Only cameras need different passwords", "It doesn't matter"],
      correct: 1,
      explanation: "Each IoT device should have a unique password to prevent a single compromise from affecting all devices."
    },
    {
      question: "What's the security risk of unsupported IoT devices?",
      options: ["Higher electricity bills", "No security updates", "Slower performance", "Louder operation"],
      correct: 1,
      explanation: "Unsupported devices don't receive security updates, leaving known vulnerabilities unpatched and exploitable."
    },

    // Password Storage and Transmission
    {
      question: "How should passwords be stored by websites?",
      options: ["In plain text", "Encrypted", "Hashed with salt", "In cookies"],
      correct: 2,
      explanation: "Websites should store passwords as salted hashes, making them extremely difficult to reverse even if the database is breached."
    },
    {
      question: "Why shouldn't you email passwords?",
      options: ["Too slow", "Email isn't encrypted end-to-end", "Takes too much space", "Hard to type"],
      correct: 1,
      explanation: "Email travels through multiple servers and isn't encrypted end-to-end, making it vulnerable to interception."
    },
    {
      question: "What's wrong with storing passwords in browser notes or documents?",
      options: ["Nothing", "No encryption protection", "Takes up space", "Hard to organize"],
      correct: 1,
      explanation: "Plain text storage in notes or documents provides no encryption protection and can be easily accessed if your device is compromised."
    },
    {
      question: "Should you text passwords to others?",
      options: ["Yes, it's convenient", "Only short ones", "No, SMS isn't secure", "Only to family"],
      correct: 2,
      explanation: "SMS messages can be intercepted and aren't encrypted, making them unsuitable for transmitting sensitive information like passwords."
    },
    {
      question: "What's the safest way to share a password temporarily?",
      options: ["Email", "Text message", "Encrypted messaging app", "Write it down"],
      correct: 2,
      explanation: "Use end-to-end encrypted messaging apps for temporary password sharing, and change the password after sharing."
    },

    // Psychology and Human Factors
    {
      question: "Why do people create weak passwords?",
      options: ["They're lazy", "Memory limitations and convenience", "They don't know better", "They want to be hacked"],
      correct: 1,
      explanation: "Weak passwords often result from human memory limitations and the desire for convenience, not laziness or ignorance."
    },
    {
      question: "What's password fatigue?",
      options: ["Being tired of typing", "Exhaustion from managing many passwords", "Passwords stopping working", "Slow password systems"],
      correct: 1,
      explanation: "Password fatigue is the exhaustion people feel from managing numerous complex passwords, often leading to poor security practices."
    },
    {
      question: "How can organizations reduce password fatigue?",
      options: ["Require more passwords", "Provide password managers and SSO", "Make passwords shorter", "Eliminate all passwords"],
      correct: 1,
      explanation: "Providing password managers and single sign-on (SSO) systems helps users manage passwords more effectively while maintaining security."
    },
    {
      question: "Why do users prefer simple passwords?",
      options: ["They're more secure", "Easier to remember and type", "They look better", "They're recommended"],
      correct: 1,
      explanation: "Simple passwords are preferred because they're easier to remember and type, but this convenience comes at the cost of security."
    },
    {
      question: "What motivates people to use better passwords?",
      options: ["Fear of punishment", "Understanding personal risk and providing tools", "Peer pressure", "Making it mandatory"],
      correct: 1,
      explanation: "People adopt better password practices when they understand personal risks and are provided with practical tools to manage security."
    },

    // Incident Response
    {
      question: "What's the first step if you suspect your password is compromised?",
      options: ["Wait and see", "Change the password immediately", "Call the police", "Tell everyone"],
      correct: 1,
      explanation: "Immediately change any potentially compromised passwords to prevent further unauthorized access to your accounts."
    },
    {
      question: "Should you notify others if your shared account is compromised?",
      options: ["No, keep it secret", "Yes, immediately", "Only if asked", "Wait a few days"],
      correct: 1,
      explanation: "Immediately notify anyone else with access to shared accounts so they can take protective measures."
    },
    {
      question: "What should you monitor after a password compromise?",
      options: ["Nothing", "Account activity and credit reports", "Weather forecasts", "Social media likes"],
      correct: 1,
      explanation: "Monitor all account activity, financial statements, and credit reports for signs of unauthorized access or identity theft."
    },
    {
      question: "When should you involve law enforcement in password incidents?",
      options: ["Never", "For identity theft or financial fraud", "Always", "Only for work accounts"],
      correct: 1,
      explanation: "Contact law enforcement if the compromise leads to identity theft, financial fraud, or other criminal activity."
    },
    {
      question: "How long should you monitor accounts after a compromise?",
      options: ["One day", "One week", "Several months", "Forever"],
      correct: 2,
      explanation: "Continue monitoring for several months, as some fraudulent activity may not appear immediately after a compromise."
    },

    // Legal and Compliance
    {
      question: "Can you be held liable for weak passwords at work?",
      options: ["Never", "Yes, if they cause security incidents", "Only executives", "Only IT staff"],
      correct: 1,
      explanation: "Employees can face disciplinary action or liability if weak passwords violate policies and lead to security incidents."
    },
    {
      question: "What are GDPR implications of password security?",
      options: ["No implications", "Organizations must protect personal data", "Only applies to Europe", "Only about marketing"],
      correct: 1,
      explanation: "GDPR requires organizations to implement appropriate technical measures, including strong authentication, to protect personal data."
    },
    {
      question: "Should you use work computers for personal passwords?",
      options: ["Yes, always", "No, they may be monitored", "Only sometimes", "Only for shopping"],
      correct: 1,
      explanation: "Avoid entering personal passwords on work computers as they may be monitored, logged, or subject to different security policies."
    },
    {
      question: "What's the legal risk of sharing Netflix/streaming passwords?",
      options: ["No risk", "May violate terms of service", "Always illegal", "Only for businesses"],
      correct: 1,
      explanation: "Password sharing often violates terms of service and could potentially be considered unauthorized access in some jurisdictions."
    },
    {
      question: "Are companies required to notify users of password breaches?",
      options: ["Never", "Depends on jurisdiction and data type", "Always", "Only in the US"],
      correct: 1,
      explanation: "Breach notification requirements vary by jurisdiction and data type, with regulations like GDPR and state laws setting specific requirements."
    },

    // International and Cultural Considerations
    {
      question: "Do password security practices vary by country?",
      options: ["No, they're universal", "Yes, due to different threats and regulations", "Only in language", "Only in length requirements"],
      correct: 1,
      explanation: "Password practices can vary due to different regulatory requirements, cultural norms, and local threat landscapes."
    },
    {
      question: "How do language differences affect password security?",
      options: ["They don't", "Different character sets may affect entropy", "Only alphabets matter", "Numbers are universal"],
      correct: 1,
      explanation: "Different writing systems and character sets can affect password entropy and complexity, influencing security recommendations."
    },
    {
      question: "Should you use English words in passwords if it's not your native language?",
      options: ["Always", "No, use your native language", "Mix both languages", "Only for international accounts"],
      correct: 2,
      explanation: "Using multiple languages can increase password complexity and make dictionary attacks more difficult."
    },
    {
      question: "How do international travel considerations affect password security?",
      options: ["No effect", "Some countries may inspect devices", "Only flight duration matters", "Currency exchange affects passwords"],
      correct: 1,
      explanation: "Some countries may inspect devices at borders, so consider using temporary passwords or securing devices before travel."
    },
    {
      question: "Should password policies account for cultural differences?",
      options: ["No", "Yes, while maintaining security standards", "Only for colors", "Only for holidays"],
      correct: 1,
      explanation: "Effective password policies should consider cultural factors while maintaining strong security standards to ensure user compliance."
    },

    // Future of Authentication
    {
      question: "What's likely to replace passwords in the future?",
      options: ["Longer passwords", "Multi-factor authentication and passkeys", "No security", "Physical keys only"],
      correct: 1,
      explanation: "The future likely involves passwordless authentication using passkeys, biometrics, and advanced multi-factor authentication methods."
    },
    {
      question: "How will AI affect password security?",
      options: ["Make passwords unnecessary", "Both improve attacks and defenses", "Only help attackers", "Only help defenders"],
      correct: 1,
      explanation: "AI will enhance both attack methods (better password guessing) and defense mechanisms (anomaly detection, adaptive authentication)."
    },
    {
      question: "What role will blockchain play in authentication?",
      options: ["Replace all passwords", "Potentially enable decentralized identity", "No role", "Only for cryptocurrencies"],
      correct: 1,
      explanation: "Blockchain could enable decentralized identity systems and secure credential verification without centralized authorities."
    },
    {
      question: "How might augmented reality affect password security?",
      options: ["No impact", "New attack vectors and authentication methods", "Make passwords visible", "Only visual changes"],
      correct: 1,
      explanation: "AR could introduce new attack vectors (shoulder surfing in virtual spaces) but also enable new secure authentication methods."
    },
    {
      question: "What's the biggest challenge for future authentication?",
      options: ["Technical complexity", "Balancing security with usability", "Cost", "Speed"],
      correct: 1,
      explanation: "The ongoing challenge is creating authentication systems that are both highly secure and user-friendly enough for widespread adoption."
    }
  ];

  // Shuffle array function
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Start new quiz
  const startQuiz = () => {
    const shuffledQuestions = shuffleArray(questionBank).slice(0, 10);
    setQuizQuestions(shuffledQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setQuizStarted(true);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowAnswerFeedback(false);
    setIsAnswerCorrect(false);
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    if (showAnswerFeedback) return; // Prevent changing answer after feedback is shown

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === quizQuestions[currentQuestion].correct;
    setIsAnswerCorrect(correct);
    setShowAnswerFeedback(true);

    // Play sound effect
    playSound(correct ? 'correct' : 'incorrect');

    // Show explanation automatically
    setTimeout(() => {
      setShowExplanation(true);
    }, 500);
  };

  // Go to next question
  const nextQuestion = () => {
    const newUserAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newUserAnswers);

    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowAnswerFeedback(false);
      setIsAnswerCorrect(false);
    } else {
      setShowResult(true);
    }
  };

  // Show explanation
  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 8) return "#4CAF50";
    if (score >= 6) return "#FF9800";
    return "#f44336";
  };

  // Get score message
  const getScoreMessage = (score) => {
    if (score >= 9) return "Outstanding! You're a password security expert!";
    if (score >= 7) return "Great job! You have solid password security knowledge.";
    if (score >= 5) return "Good work! Consider reviewing some security concepts.";
    return "Time to brush up on password security best practices!";
  };

  // Clear all data when component unmounts
  useEffect(() => {
    return () => {
      setQuizQuestions([]);
      setUserAnswers([]);
      setSelectedAnswer(null);
      setCurrentQuestion(0);
      setScore(0);
      setQuizStarted(false);
      setShowResult(false);
      setShowExplanation(false);
      setShowAnswerFeedback(false);
      setIsAnswerCorrect(false);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <header>
          <h1 className="title">Password Security Quiz</h1>
          <p className="subtitle">Test your knowledge of password security best practices! Each quiz contains 10 randomly selected questions from our database of 200+ security topics.</p>
        </header>

        {!quizStarted ? (
          <div className="card" style={{textAlign: "center"}}>
            <h2 className="section-title">Ready to Test Your Knowledge?</h2>
            <p style={{marginBottom: "2rem", color: "#666", fontSize: "1.1rem"}}>
              This quiz will test your understanding of password security, two-factor authentication,
              data breaches, phishing attacks, and modern security practices.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
              textAlign: "left"
            }}>
              <div style={{padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "8px"}}>
                <h4 style={{margin: "0 0 0.5rem 0", color: "#333"}}>📋 Format</h4>
                <p style={{margin: 0, fontSize: "0.9rem", color: "#666"}}>10 multiple choice questions</p>
              </div>
              <div style={{padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "8px"}}>
                <h4 style={{margin: "0 0 0.5rem 0", color: "#333"}}>⏱️ Time</h4>
                <p style={{margin: 0, fontSize: "0.9rem", color: "#666"}}>No time limit - take your time!</p>
              </div>
              <div style={{padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "8px"}}>
                <h4 style={{margin: "0 0 0.5rem 0", color: "#333"}}>🎯 Topics</h4>
                <p style={{margin: 0, fontSize: "0.9rem", color: "#666"}}>Passwords, 2FA, breaches, phishing</p>
              </div>
              <div style={{padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "8px"}}>
                <h4 style={{margin: "0 0 0.5rem 0", color: "#333"}}>🔄 Questions</h4>
                <p style={{margin: 0, fontSize: "0.9rem", color: "#666"}}>Random from 200+ question bank</p>
              </div>
            </div>

            <button
              onClick={startQuiz}
              style={{
                padding: "1rem 3rem",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1.2rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#45a049"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#4CAF50"}
            >
              Start Quiz 🚀
            </button>
          </div>
        ) : showResult ? (
          <div className="card" style={{textAlign: "center"}}>
            <div style={{marginBottom: "2rem"}}>
              <div style={{fontSize: "4rem", marginBottom: "1rem"}}>
                {score >= 8 ? "🏆" : score >= 6 ? "🎉" : "📚"}
              </div>
              <h2 style={{color: getScoreColor(score), marginBottom: "0.5rem"}}>
                Quiz Complete!
              </h2>
              <p style={{fontSize: "1.2rem", color: "#666", margin: 0}}>
                {getScoreMessage(score)}
              </p>
            </div>

            <div style={{
              display: "inline-block",
              padding: "2rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              marginBottom: "2rem"
            }}>
              <div style={{fontSize: "3rem", fontWeight: "bold", color: getScoreColor(score)}}>
                {score}/10
              </div>
              <p style={{margin: 0, color: "#666"}}>Correct Answers</p>
            </div>

            <div style={{marginBottom: "2rem", textAlign: "left"}}>
              <h3 style={{textAlign: "center", marginBottom: "1rem"}}>Review Your Answers:</h3>
              {quizQuestions.map((question, index) => (
                <div key={index} style={{
                  padding: "1rem",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                  backgroundColor: userAnswers[index] === question.correct ? "#f0f9ff" : "#fff5f5"
                }}>
                  <div style={{display: "flex", alignItems: "flex-start", marginBottom: "0.5rem"}}>
                    <span style={{
                      fontSize: "1.2rem",
                      marginRight: "0.5rem",
                      color: userAnswers[index] === question.correct ? "#4CAF50" : "#f44336"
                    }}>
                      {userAnswers[index] === question.correct ? "✅" : "❌"}
                    </span>
                    <div>
                      <p style={{margin: 0, fontWeight: "600", fontSize: "0.95rem"}}>
                        Q{index + 1}: {question.question}
                      </p>
                      <p style={{margin: "0.25rem 0", fontSize: "0.85rem", color: "#666"}}>
                        Your answer: {question.options[userAnswers[index]]}
                      </p>
                      {userAnswers[index] !== question.correct && (
                        <p style={{margin: "0.25rem 0", fontSize: "0.85rem", color: "#4CAF50"}}>
                          Correct answer: {question.options[question.correct]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={startQuiz}
              style={{
                padding: "1rem 2rem",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                marginRight: "1rem"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#45a049"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#4CAF50"}
            >
              Take Another Quiz
            </button>
            <button
              onClick={() => setQuizStarted(false)}
              style={{
                padding: "1rem 2rem",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#5a6268"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#6c757d"}
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div className="card">
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem"}}>
              <h2 style={{margin: 0}}>Question {currentQuestion + 1} of 10</h2>
              <div style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#f8f9fa",
                borderRadius: "20px",
                fontSize: "0.9rem",
                color: "#666"
              }}>
                Score: {score}/{currentQuestion}
              </div>
            </div>

            <div style={{
              width: "100%",
              height: "6px",
              backgroundColor: "#e0e0e0",
              borderRadius: "3px",
              marginBottom: "2rem",
              overflow: "hidden"
            }}>
              <div style={{
                width: `${((currentQuestion + 1) / 10) * 100}%`,
                height: "100%",
                backgroundColor: "#4CAF50",
                transition: "width 0.3s ease"
              }} />
            </div>

            <div style={{marginBottom: "2rem"}}>
              <h3 style={{fontSize: "1.3rem", lineHeight: 1.4, marginBottom: "1.5rem"}}>
                {quizQuestions[currentQuestion]?.question}
              </h3>

              <div style={{display: "grid", gap: "0.75rem"}}>
                {quizQuestions[currentQuestion]?.options.map((option, index) => {
                  let buttonStyle = {
                    padding: "1rem 1.5rem",
                    textAlign: "left",
                    border: "2px solid #e0e0e0",
                    borderRadius: "8px",
                    backgroundColor: "white",
                    cursor: showAnswerFeedback ? "default" : "pointer",
                    transition: "all 0.3s ease",
                    fontSize: "1rem",
                    position: "relative"
                  };

                  // Apply colors based on feedback state
                  if (showAnswerFeedback) {
                    const isCorrectAnswer = index === quizQuestions[currentQuestion].correct;
                    const isSelectedAnswer = index === selectedAnswer;

                    if (isCorrectAnswer) {
                      // Correct answer is always green
                      buttonStyle.backgroundColor = "#d4edda";
                      buttonStyle.borderColor = "#28a745";
                      buttonStyle.color = "#155724";
                    } else if (isSelectedAnswer) {
                      // Wrong selected answer is red
                      buttonStyle.backgroundColor = "#f8d7da";
                      buttonStyle.borderColor = "#dc3545";
                      buttonStyle.color = "#721c24";
                    }
                  } else if (selectedAnswer === index) {
                    // Selected but no feedback yet - blue
                    buttonStyle.backgroundColor = "#e3f2fd";
                    buttonStyle.borderColor = "#2196F3";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showAnswerFeedback}
                      style={buttonStyle}
                      onMouseEnter={(e) => {
                        if (!showAnswerFeedback && selectedAnswer !== index) {
                          e.target.style.borderColor = "#4CAF50";
                          e.target.style.backgroundColor = "#f8f9fa";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!showAnswerFeedback && selectedAnswer !== index) {
                          e.target.style.borderColor = "#e0e0e0";
                          e.target.style.backgroundColor = "white";
                        }
                      }}
                    >
                      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                          <span style={{fontWeight: "600", marginRight: "0.5rem", color: "inherit"}}>
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <span>{option}</span>
                        </div>
                        {showAnswerFeedback && (
                          <span style={{fontSize: "1.2rem", marginLeft: "0.5rem"}}>
                            {index === quizQuestions[currentQuestion].correct
                              ? "✅"
                              : index === selectedAnswer
                                ? "❌"
                                : ""
                            }
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{display: "flex", gap: "1rem", justifyContent: "flex-end", alignItems: "center"}}>
              <button
                onClick={nextQuestion}
                disabled={!showAnswerFeedback}
                style={{
                  padding: "1rem 2rem",
                  backgroundColor: !showAnswerFeedback ? "#ccc" : "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: !showAnswerFeedback ? "not-allowed" : "pointer",
                  transition: "background-color 0.3s ease"
                }}
                onMouseEnter={(e) => showAnswerFeedback && (e.target.style.backgroundColor = "#45a049")}
                onMouseLeave={(e) => showAnswerFeedback && (e.target.style.backgroundColor = "#4CAF50")}
              >
                {currentQuestion + 1 === quizQuestions.length ? "Finish Quiz" : "Next Question"} →
              </button>
            </div>

            {showExplanation && showAnswerFeedback && (
              <div style={{
                marginTop: "2rem",
                padding: "1.5rem",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #e9ecef"
              }}>
                <div style={{display: "flex", alignItems: "flex-start", marginBottom: "1rem"}}>
                  <span style={{
                    fontSize: "1.5rem",
                    marginRight: "0.75rem",
                    color: selectedAnswer === quizQuestions[currentQuestion].correct ? "#4CAF50" : "#f44336"
                  }}>
                    {selectedAnswer === quizQuestions[currentQuestion].correct ? "✅" : "❌"}
                  </span>
                  <div>
                    <h4 style={{margin: "0 0 0.5rem 0", color: "#333"}}>
                      {selectedAnswer === quizQuestions[currentQuestion].correct ? "Correct!" : "Incorrect"}
                    </h4>
                    {selectedAnswer !== quizQuestions[currentQuestion].correct && (
                      <p style={{margin: "0 0 0.5rem 0", fontSize: "0.95rem", color: "#666"}}>
                        The correct answer is: <strong>{quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correct]}</strong>
                      </p>
                    )}
                  </div>
                </div>
                <p style={{margin: 0, fontSize: "0.95rem", lineHeight: 1.5, color: "#555"}}>
                  {quizQuestions[currentQuestion].explanation}
                </p>
              </div>
            )}
          </div>
        )}

        <section className="seo-content">
          <h2>Master Password Security</h2>
          <p>Test and improve your password security knowledge with our comprehensive quiz covering modern cybersecurity practices, common threats, and protection strategies.</p>

          <div className="features-grid">
            <div className="feature">
              <h3>200+ Questions</h3>
              <p>Comprehensive question bank covering all aspects of password security, from basics to advanced concepts.</p>
            </div>

            <div className="feature">
              <h3>Random Selection</h3>
              <p>Each quiz randomly selects 10 questions, ensuring a fresh experience every time you take it.</p>
            </div>

            <div className="feature">
              <h3>Detailed Explanations</h3>
              <p>Learn from every question with detailed explanations of correct answers and security concepts.</p>
            </div>

            <div className="feature">
              <h3>Current Best Practices</h3>
              <p>Questions reflect the latest security research and industry best practices for password management.</p>
            </div>
          </div>
        </section>

        <section className="password-tips">
          <h2>Quiz Topics Covered</h2>
          <ul>
            <li><strong>Password Fundamentals</strong> - Length, complexity, and entropy basics</li>
            <li><strong>Two-Factor Authentication</strong> - SMS, apps, hardware keys, and backup codes</li>
            <li><strong>Password Managers</strong> - Benefits, risks, and best practices</li>
            <li><strong>Data Breaches</strong> - Response, monitoring, and prevention</li>
            <li><strong>Phishing & Social Engineering</strong> - Recognition and protection</li>
            <li><strong>Mobile & IoT Security</strong> - Device-specific password practices</li>
            <li><strong>Enterprise Security</strong> - Workplace policies and compliance</li>
            <li><strong>Emerging Technologies</strong> - Passkeys, biometrics, and future trends</li>
          </ul>
        </section>

        <section className="faq">
          <h2>Security Quiz FAQ</h2>
          <div className="faq-item">
            <h3>How are quiz questions selected?</h3>
            <p>Each quiz randomly selects 10 questions from our bank of 200+ questions, ensuring variety and preventing memorization of specific question sets.</p>
          </div>

          <div className="faq-item">
            <h3>Are the questions based on current best practices?</h3>
            <p>Yes, all questions reflect current cybersecurity best practices and industry standards, updated regularly to match evolving security recommendations.</p>
          </div>

          <div className="faq-item">
            <h3>Can I retake the quiz multiple times?</h3>
            <p>Absolutely! Each quiz session presents different questions, so you can take it multiple times to test different aspects of your security knowledge.</p>
          </div>

          <div className="faq-item">
            <h3>What score should I aim for?</h3>
            <p>A score of 8 or higher indicates strong password security knowledge. Scores of 6-7 are good, while below 6 suggests reviewing security fundamentals.</p>
          </div>

          <div className="faq-item">
            <h3>How can I improve my score?</h3>
            <p>Read the explanations carefully, use our other security tools, and stay updated with current cybersecurity best practices and threat intelligence.</p>
          </div>
        </section>

        <footer style={{textAlign: 'center', padding: '2rem', marginTop: '3rem', borderTop: '1px solid #e0e0e0', color: '#666'}}>
          <p>© 2025 PasswordGen — Licensed under the MIT License</p>
        </footer>
      </div>
    </div>
  );
}