# PasswordGen

A secure, privacy-focused password generator built with React and Vite. Generate cryptographically strong passwords with customizable options and advanced personalization features.

## Features

### 🛡️ Security First
- **Cryptographically Secure Random Number Generation (CSPRNG)** using Web Crypto API
- **Uniform Distribution** eliminates modulo bias for true randomness
- **Memory Protection** automatically clears sensitive data from memory
- **No Tracking** completely free of analytics and ad trackers
- **Client-Side Only** all generation happens locally in your browser

### ⚙️ Customizable Options
- **Password Length** from 4 to 50 characters
- **Character Types** uppercase, lowercase, numbers, and symbols
- **Personalization Mode** create memorable passwords with personal information
- **Character Substitutions** automatic replacement (a→@, i→!, o→0, s→$)

### 🎯 User Experience
- **One-Click Copy** to clipboard
- **Auto-Clear** passwords automatically removed from memory after 30 seconds
- **Responsive Design** works on desktop and mobile devices
- **SEO Optimized** with comprehensive security guides and FAQ

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/muiznaveedrana/PasswordGen.git
   cd PasswordGen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Usage

### Basic Password Generation
1. Select desired character types (uppercase, lowercase, numbers, symbols)
2. Adjust password length using the slider (4-50 characters)
3. Click "Generate Password"
4. Copy the generated password to clipboard

### Personalized Password Generation
1. Toggle "Use Personalization"
2. Enter your first name, last name, and date of birth
3. Click "Generate Password"
4. The system creates patterns using your information with character substitutions

## Security Features

### Cryptographic Security
- Uses `crypto.getRandomValues()` instead of `Math.random()`
- Implements rejection sampling to ensure uniform distribution
- No modulo bias in random number generation

### Privacy Protection
- No data sent to external servers
- Memory cleared after password generation
- Automatic cleanup on component unmount
- No cookies, tracking, or analytics

### Memory Management
```javascript
// Example of memory clearing
const getSecureRandomInt = (max) => {
  const array = new Uint32Array(1);
  // ... generation logic ...
  array.fill(0); // Clear from memory
  return result;
};
```

## Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: CSS3 with modern responsive design
- **Security**: Web Crypto API for CSPRNG
- **Build**: Vite with ESLint for code quality

## Project Structure

```
PasswordGen/
├── src/
│   ├── passwordGenerator.jsx    # Main component
│   ├── index.css               # Styles
│   ├── main.jsx               # App entry point
│   └── App.jsx                # App wrapper
├── public/                    # Static assets
├── package.json              # Dependencies
└── README.md                # This file
```

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security Best Practices

### Password Guidelines
- Use unique passwords for each account
- Minimum 12 characters length
- Include all character types
- Avoid personal information (unless using personalization mode)
- Use a password manager
- Enable two-factor authentication

### Technical Security
- All passwords generated with cryptographically secure randomness
- No server-side processing or storage
- Memory automatically cleared after use
- No third-party tracking or analytics

## Browser Compatibility

- Chrome 37+
- Firefox 34+
- Safari 10.1+
- Edge 12+

*Requires browsers with Web Crypto API support*

## FAQ

**Q: Are generated passwords stored anywhere?**
A: No, all password generation happens locally in your browser. Nothing is stored, logged, or transmitted.

**Q: How secure are the generated passwords?**
A: Extremely secure. We use cryptographically secure random number generation with uniform distribution to ensure maximum entropy.

**Q: Can I use this offline?**
A: Yes, once loaded, the generator works completely offline.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Web Crypto API for secure random number generation
- React team for the excellent framework
- Vite for lightning-fast development experience

---

© 2025 PasswordGen — Licensed under the MIT License

**Built with security and privacy in mind** 🛡️